/** Unstack: eight app tiles in a loose stack. Pick one and every tile above it lifts off,
 * staggered outwards on the 700ms curve, to show its screen. The slider is the gap. */
const {
  Cam, fit, unproj, lerp, hull, poly, proj, facing, prism, rings, ringAt, rrect, clamp,
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

  // the idle scatter: a burst throws every tile off the top; they fall into one heap at the bottom of
  // the page's area, top tile first so tile 0 lands last, on top, and each bounces as it lands;
  // then they hop home one by one, bottom tile first, which is always the top of the heap
  const rnd = (a, b) => a + Math.random() * (b - a);
  let bursting = false, nextBurst = 0, reach = 1, area = null;
  for (const t of tiles) { t.cx = t.x0 + W / 2; t.cy = t.y0 + D / 2; t.back = tween(0); t.off = { dx: 0, dy: 0, ang: 0 }; t.legs = []; }
  function heap(t, hx, hy) {
    // a spot near the heap's centre (viewBox units), raised one layer for every tile already down
    const [wx, wy] = unproj(C, hx + rnd(-70, 70), hy + rnd(-30, 0), T / 2);
    return { dx: wx - t.cx, dy: wy - t.cy, lift: (N - 1 - t.i) * T * 0.9 - t.i * T, ang: rnd(-1.4, 1.4) };
  }
  function plan(now) {
    const a = area ? area() : { left: 0, right: 400, top: 0, bottom: 320 };
    const x0 = a.left + 180, x1 = a.right - 180, hx = x1 > x0 ? rnd(x0, x1) : (x0 + x1) / 2, hy = a.bottom - 70;
    let landed = now;
    for (const t of tiles) {
      const home = { dx: 0, dy: 0, lift: REST[t.i], ang: 0 }, up = N - 1 - t.i;
      const t0 = now + up * 400 + rnd(0, 60), t1 = t0 + 1500 + rnd(0, 120);
      t.legs = [{ t0, t1, a: home, b: heap(t, hx, hy), h: reach * rnd(260, 520), bounce: 34 * Math.sqrt(reach) }]; t.home = home;
      landed = Math.max(landed, t1);
    }
    const back = landed + 900 + rnd(700, 1300);
    for (const t of tiles) t.legs.push({ t0: back + t.i * 380, t1: back + t.i * 380 + 700, a: t.legs[0].b, b: t.home, h: reach * rnd(40, 80), bounce: 9 });
    nextBurst = back + N * 380 + 700 + rnd(1400, 2400);
  }
  // a landing: parabolic hops, each about a third as high and 0.6x as long as the one before
  function hop(leg, now) {
    let s = now - leg.t1, h = leg.bounce, d = 300;
    while (s > d && h > 0.5) { s -= d; h *= 0.35; d *= 0.6; }
    return s > 0 && s < d && h > 0.5 ? h * 4 * (s / d) * (1 - s / d) : 0;
  }
  function pose(t, now) {
    let f = { lift: tval(t.z, now), dx: 0, dy: 0, ang: 0 };
    for (const leg of bursting ? t.legs : []) {
      if (now < leg.t0) break;
      const u = clamp((now - leg.t0) / (leg.t1 - leg.t0), 0, 1), m = (key) => lerp(leg.a[key], leg.b[key], u);
      f = { lift: m("lift") + leg.h * 4 * u * (1 - u) + hop(leg, now), dx: m("dx"), dy: m("dy"), ang: m("ang") };
    }
    const k = tval(t.back, now);
    return k > 0 ? { ...f, dx: f.dx + t.off.dx * k, dy: f.dy + t.off.dy * k, ang: f.ang + t.off.ang * k } : f;
  }
  function stopBurst(now) {
    if (!bursting) return;
    // each tile glides home from exactly where it was
    for (const t of tiles) { const f = pose(t, now); t.z = tween(f.lift); t.off = f; t.back = tween(1); tset(t.back, 0, now, 0); }
    bursting = false; act = -2;
  }
  // paint back to front: height first, then nearness on the floor
  let order = tiles.map((t) => t.i).join();
  const depth = (t, f) => t.i * T + f.lift + 0.35 * (t.cx + f.dx + t.cy + f.dy);
  function repaint(poses) {
    const sorted = tiles.slice().sort((a, b) => depth(a, poses[a.i]) - depth(b, poses[b.i]));
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
    // the page's idle state, nothing lit; any pick ends it. reach scales the throw,
    // area() is the rect, in viewBox units, the tiles may land in
    wave: (on, r = 1, inside = null) => {
      if (!on) return stopBurst(performance.now());
      reach = r; area = inside;
      if (bursting) return;
      bursting = true; nextBurst = performance.now() + 900;
      for (const t of tiles) t.legs = [];
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
