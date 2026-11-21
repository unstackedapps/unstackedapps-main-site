import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PROJECTS } from "@/config/projects";
import kernel from "@/hero/kernel.js?raw";
import figure from "@/hero/unstack.js?raw";

interface Handle {
  destroy: () => void;
  pick: (i: number) => void;
}

interface Figure {
  means: string;
  mount: (
    parts: {
      read: { textContent: string };
      stage: HTMLElement;
      svg: SVGSVGElement;
    },
    value: number
  ) => Handle;
  range: [number, number, number];
}

interface Hairline {
  inject: (root: Document) => void;
  mk: (
    tag: string,
    attrs: Record<string, string>,
    parent: Element
  ) => SVGSVGElement;
}

// Both files are copied verbatim from the hairline-create skill, so an adjusted figure is a re-copy.
const HL = new Function(`${kernel}\nreturn HL;`)() as Hairline;
const unstack = ((): Figure => {
  let f: Figure | undefined;
  new Function("HL", "hairline", figure)(HL, (x: Figure) => {
    f = x;
  });
  return f as Figure;
})();

// The figure's tiles, bottom to top; its NAMES match these project names.
export const TILES = [
  "branchandblooms",
  "opendental-n8n",
  "headless-ns",
  "lotprowl",
  "suitepreferences",
  "opensuitemcp",
  "ptohq",
  "cartonpackpro",
].map((id) => PROJECTS.find((p) => p.id === id) as (typeof PROJECTS)[number]);

const palette = {
  "--hairline-hi": "#f3efe6",
  "--hairline-plate": "#141c27",
} as CSSProperties;

type Live = { handle: Handle; play: (on: boolean) => void } | null;

// The hero lap: top tile first, one tile further down each beat, then back to rest.
const LAP = [...TILES.keys()].reverse().concat(-1);
const BEAT_MS = 1400;
const REST_MS = 2400;

// A picked tile holds the stack; none hands it back to the lap.
function settle(live: Live, tile: number | null) {
  if (!live) {
    return;
  }
  live.play(tile === null);
  live.handle.pick(tile ?? -1);
}

/** `active` is the tile of the project panel in view, or null in the hero. */
export function HeroUnstack({ active }: { active: number | null }) {
  const [name, setName] = useState("");
  const live = useRef<Live>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  // A ref callback with a cleanup runs once per element, so the figure mounts once.
  const mountStage = useCallback((stage: HTMLDivElement) => {
    HL.inject(document);
    const svg = HL.mk(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 400 320" },
      stage
    );
    const read = {
      set textContent(v: string) {
        setName(v === "rest" ? "" : v);
      },
    };
    const handle = unstack.mount({ read, stage, svg }, unstack.range[1]);
    // The lap plays in order until a pointer or a panel takes the stack over.
    let timer = 0;
    let step = 0;
    const beat = () => {
      const tile = LAP[step];
      handle.pick(tile);
      step = (step + 1) % LAP.length;
      timer = window.setTimeout(beat, tile < 0 ? REST_MS : BEAT_MS);
    };
    const play = (on: boolean) => {
      window.clearTimeout(timer);
      if (on && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        step = 0;
        timer = window.setTimeout(beat, BEAT_MS);
      }
    };
    const hand = () => play(false);
    const handBack = () => play(activeRef.current === null);
    stage.addEventListener("pointerenter", hand);
    stage.addEventListener("pointerleave", handBack);
    live.current = { handle, play };
    return () => {
      window.clearTimeout(timer);
      stage.removeEventListener("pointerenter", hand);
      stage.removeEventListener("pointerleave", handBack);
      handle.destroy();
      svg.remove();
      live.current = null;
    };
  }, []);

  useEffect(() => settle(live.current, active), [active]);

  // A hovered or focused logo takes the stack over; leaving it returns to the panel in view.
  const pick = (i: number | null) => settle(live.current, i ?? active);

  return (
    <div>
      <div className="scale-[1.35]">
        <div
          aria-label={unstack.means}
          data-hairline="unstack"
          data-hairline-theme="dark"
          ref={mountStage}
          role="img"
          style={palette}
        />
      </div>
      <ul className="relative z-10 mt-10 flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {TILES.map((p, i) => ({ i, p }))
          .reverse()
          .map(({ i, p }) => (
            <li key={p.id}>
              <a
                aria-label={p.name}
                className={`flex size-9 items-center justify-center rounded-lg border transition sm:size-11 ${
                  name === p.name
                    ? "border-[#f3efe6]/60 bg-white/10 opacity-100"
                    : "border-white/10 bg-white/[0.03] opacity-60 hover:opacity-100"
                }`}
                href={`#${p.id}`}
                onBlur={() => pick(null)}
                onFocus={() => pick(i)}
                onMouseEnter={() => pick(i)}
                onMouseLeave={() => pick(null)}
              >
                <img
                  alt=""
                  className={p.logoClassName ?? "h-8 w-8 object-contain"}
                  height={32}
                  src={p.logo}
                  width={32}
                />
              </a>
            </li>
          ))}
      </ul>
      <p className="mt-3 h-4 text-center font-mono text-[#f3efe6]/85 text-xs tracking-wide">
        {name}
      </p>
    </div>
  );
}
