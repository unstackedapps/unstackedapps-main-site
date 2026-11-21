/**
 * Unstack: eight app tiles in a loose stack, one per product. The pointer
 * picks a tile by its resting side; every tile above it lifts off, the first
 * gap widest, staggered outwards from the pick on the 700ms curve, so the
 * chosen tile's screen and window dots come into view. The slider is the gap.
 */
const {
  Cam, fit, hull, poly, proj, facing, prism, rings, ringAt, rrect, clamp,
  tween, tset, tval, tdone, disposer, mk, place, pointer, register, solid, put,
} = HL;

const N = 8, W = 104, D = 70, T = 7, R = 9, B = 1.6, SPREAD = 4;
// bottom to top
const NAMES = ["Branch & Blooms Co.", "Open Dental for n8n", "headless-ns", "LotProwl", "SuitePreferences", "OpenSuiteMCP", "PTO HQ", "Carton Pack Pro"];
// a loose stack: each tile sits a little off the one below
const DX = [0, 3, -2, 4, -1, 2, -3, 1], DY = [0, -2, 3, -1, 2, -3, 1, -2];
// rest is a slight explode at the top, never flat
const REST = [0, 0, 0, 0, 0, 0, 2.5, 7];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gap = value;

  const C = Cam(45, 0.5, 1.68);
  const zTop = N * T + 60 + (N - 2) * SPREAD;
  fit(C, [[-6, -6, 0], [W + 6, D + 6, -16], [W + 6, -6, 0], [-6, D + 6, 0], [-6, -6, zTop], [W + 6, -6, zTop]], 200, 158);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);

  const tiles = [];
  for (let i = 0; i < N; i++) {
    const x0 = DX[i], y0 = DY[i];
    const [ring, inner] = rings(x0, y0, x0 + W, y0 + D, R, B);
    const screen = rrect(x0 + 9, y0 + 15, x0 + W - 9, y0 + D - 9, 4, 4);
    const s = solid(g);
    const scr = mk("path", { class: "nf lo" }, s.g);
    const dots = [0, 1, 2].map(() => mk("circle", { r: 1.3, class: "dot off" }, s.g));
    tiles.push({ i, x0, y0, ring, inner, screen, s, scr, dots, z: tween(REST[i]), last: null });
  }

  // hit areas: each tile's RESTING silhouette, top tile first. They never move.
  const restHull = tiles.map((t) => {
    const z0 = t.i * T + REST[t.i];
    return hull(ringAt(P, t.ring, z0).concat(ringAt(P, t.ring, z0 + T)));
  });
  const inside = (pts, [x, y]) => {
    let c = false;
    for (let a = 0, b = pts.length - 1; a < pts.length; b = a++) {
      const [xa, ya] = pts[a], [xb, yb] = pts[b];
      if ((ya > y) !== (yb > y) && x < ((xb - xa) * (y - ya)) / (yb - ya) + xa) c = !c;
    }
    return c;
  };
  function hit(p) {
    for (let i = N - 1; i >= 0; i--) if (inside(restHull[i], p)) return i;
    return -1;
  }

  // a tile drawn at a lift, turned by ang about its centre and slid by (dx, dy): its flight pose
  const turn = (ring, t, c, sn, dx, dy) => ring.map((q) => {
    const u = q.u - t.cx, v = q.v - t.cy;
    return { ...q, u: t.cx + u * c - v * sn + dx, v: t.cy + u * sn + v * c + dy, nu: q.nu * c - q.nv * sn, nv: q.nu * sn + q.nv * c };
  });
  function draw(t, f) {
    const key = `${f.lift},${f.dx},${f.dy},${f.ang}`;
    if (t.last === key) return;
    t.last = key;
    const z0 = t.i * T + f.lift, z1 = z0 + T;
    const c = Math.cos(f.ang), sn = Math.sin(f.ang), go = (r) => (f.dx || f.dy || f.ang ? turn(r, t, c, sn, f.dx, f.dy) : r);
    const ring = go(t.ring), inner = go(t.inner), screen = go(t.screen);
    put(t.s, prism(P, front, ring, inner, z0, z1));
    t.scr.setAttribute("d", poly(ringAt(P, screen, z1)));
    t.dots.forEach((el, k) => {
      const u = t.x0 + 10 + k * 5 - t.cx, v = t.y0 + 8 - t.cy;
      place(el, P(t.cx + u * c - v * sn + f.dx, t.cy + u * sn + v * c + f.dy, z1));
    });
  }

  // the fountain: every burst throws each tile up on its own random arc, top tile first,
  // and gravity brings them home bottom tile first, so none falls through one that has landed
  const GRAVITY = 350, LAUNCH_MS = 70, LAND_MS = 1700, LAND_GAP_MS = 170;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const side = () => (Math.random() < 0.5 ? -1 : 1);
  let bursting = false, nextBurst = 0, reach = 1;
  for (const t of tiles) { t.cx = t.x0 + W / 2; t.cy = t.y0 + D / 2; t.back = tween(0); t.off = { dx: 0, dy: 0, ang: 0 }; t.fl = null; }
  function plan(now) {
    for (const t of tiles) {
      const t0 = now + (N - 1 - t.i) * LAUNCH_MS + rnd(0, 60);
      const t1 = now + LAND_MS + t.i * LAND_GAP_MS + rnd(0, 60);
      const sec = (t1 - t0) / 1000;
      const far = Math.sqrt(reach);
      t.fl = { t0, t1, h: (reach * GRAVITY * sec * sec) / 8 * rnd(0.7, 1.35), dx: side() * rnd(25, 110) * far, dy: side() * rnd(25, 110) * far, spin: rnd(-1.2, 1.2) };
    }
    nextBurst = now + LAND_MS + (N - 1) * LAND_GAP_MS + 60 + rnd(900, 1900);
  }
  function pose(t, now) {
    let lift = tval(t.z, now), dx = 0, dy = 0, ang = 0;
    if (bursting && t.fl) {
      const u = clamp((now - t.fl.t0) / (t.fl.t1 - t.fl.t0), 0, 1);
      const arc = u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0;
      if (arc) { lift += t.fl.h * 4 * u * (1 - u); dx = t.fl.dx * arc; dy = t.fl.dy * arc; ang = t.fl.spin * arc; }
    }
    const k = tval(t.back, now);
    if (k > 0) { dx += t.off.dx * k; dy += t.off.dy * k; ang += t.off.ang * k; }
    return { lift, dx, dy, ang };
  }
  function stopBurst(now) {
    if (!bursting) return;
    // each tile glides home from exactly where its flight left it
    for (const t of tiles) {
      const f = pose(t, now);
      t.z = tween(f.lift); t.off = f; t.back = tween(1); tset(t.back, 0, now, 0);
    }
    bursting = false;
    act = -2;
  }
  // a tile higher in the air is painted later, so it passes in front
  let order = tiles.map((t) => t.i).join();
  function repaint(poses) {
    const sorted = tiles.slice().sort((a, b) => (a.i * T + poses[a.i].lift) - (b.i * T + poses[b.i].lift));
    const next = sorted.map((t) => t.i).join();
    if (next === order) return;
    order = next;
    for (const t of sorted) g.appendChild(t.s.g);
  }

  const L = register(stage, (_dt, now) => {
    if (bursting && now >= nextBurst) plan(now);
    let moving = bursting;
    const poses = tiles.map((t) => pose(t, now));
    repaint(poses);
    for (const t of tiles) { draw(t, poses[t.i]); if (!tdone(t.z, now) || !tdone(t.back, now)) moving = true; }
    return moving;
  });
  bag.add(L.unregister);

  let act = -2;
  function mark(a) {
    // one bright place: the pick, the top tile at rest, or none while the fountain plays
    const lit = a === null ? -1 : a < 0 ? N - 1 : a;
    tiles.forEach((t) => {
      t.s.sil.classList.toggle("hi", t.i === lit);
      t.dots.forEach((el) => { el.setAttribute("class", t.i === lit ? "dot" : "dot off"); });
    });
  }
  function setActive(a) {
    stopBurst(performance.now());
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    for (const t of tiles) {
      const up = a >= 0 && t.i > a ? clamp(gap + (t.i - a - 1) * SPREAD, 0, 60 + (N - 2) * SPREAD) : 0;
      tset(t.z, a < 0 ? REST[t.i] : up, now, Math.abs(t.i - from) * 40);
    }
    mark(a);
    read.textContent = a < 0 ? "rest" : NAMES[a];
    L.wake();
  }

  setActive(-1);
  // over empty space the fountain keeps playing; only a tile under the pointer ends it
  bag.add(pointer(stage, {
    move: (p) => { const h = hit(p); if (!(bursting && h < 0)) setActive(h); },
    leave: () => { if (!bursting) setActive(-1); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { gap = v; const a = act; act = -2; setActive(a); },
    // a page control outside the figure (the product row) picks a tile, or -1 for rest
    pick: (i) => setActive(i),
    // the page's idle state: tiles fountain up and land back, nothing lit; any pick ends it.
    // reach scales the throw: 1 clears a desktop screen, smaller keeps it near the stack
    wave: (on, r = 1) => {
      if (!on) return stopBurst(performance.now());
      reach = r;
      if (bursting) return;
      bursting = true; nextBurst = performance.now() + 900;
      for (const t of tiles) t.fl = null;
      mark(null); read.textContent = "rest"; L.wake();
    },
    destroy: bag.dispose,
  };
}

hairline({
  name: "unstack",
  means: "Eight app tiles in a loose stack: pick one and everything above it lifts off to show it.",
  rules: [1, 2, 5, 9],
  range: [18, 34, 50],
  tour: [[220, 286], [220, 256], [220, 236], null],
  mount,
});
