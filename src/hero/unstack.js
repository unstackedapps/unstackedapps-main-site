/**
 * Unstack: eight app tiles in a loose stack, one per product. The pointer
 * picks a tile by its resting side; every tile above it lifts off, the first
 * gap widest, staggered outwards from the pick on the 700ms curve, so the
 * chosen tile's screen and window dots come into view. The slider is the gap.
 */
const {
  Cam, fit, hull, poly, proj, facing, prism, rings, ringAt, rrect, clamp,
  tween, tset, tval, tdone, disposer, mk, place, pointer, register, reflect, solid, put,
} = HL;

const N = 8, W = 104, D = 70, T = 7, R = 9, B = 1.6, SPREAD = 4;
// bottom to top
const NAMES = ["b&b co", "od for n8n", "headless-ns", "lotprowl", "suiteprefs", "opensuitemcp", "pto hq", "carton pack pro"];
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
  const [ring0] = rings(DX[0], DY[0], DX[0] + W, DY[0] + D, R, B);
  reflect(svg, g, P, front, ring0, 0, 14);

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

  function draw(t, lift) {
    if (t.last === lift) return;
    t.last = lift;
    const z0 = t.i * T + lift, z1 = z0 + T;
    put(t.s, prism(P, front, t.ring, t.inner, z0, z1));
    t.scr.setAttribute("d", poly(ringAt(P, t.screen, z1)));
    t.dots.forEach((el, k) => place(el, P(t.x0 + 10 + k * 5, t.y0 + 8, z1)));
  }

  const L = register(stage, (_dt, now) => {
    let moving = false;
    for (const t of tiles) { draw(t, tval(t.z, now)); if (!tdone(t.z, now)) moving = true; }
    return moving;
  });
  bag.add(L.unregister);

  let act = -2;
  function mark(a) {
    // one bright place: the pick, or the top tile at rest
    const lit = a < 0 ? N - 1 : a;
    tiles.forEach((t) => {
      t.s.sil.classList.toggle("hi", t.i === lit);
      t.dots.forEach((el) => { el.setAttribute("class", t.i === lit ? "dot" : "dot off"); });
    });
  }
  function setActive(a) {
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
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { gap = v; const a = act; act = -2; setActive(a); },
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
