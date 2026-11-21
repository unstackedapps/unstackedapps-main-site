import { type CSSProperties, useCallback, useRef, useState } from "react";
import { PROJECTS } from "@/config/projects";
import kernel from "@/hero/kernel.js?raw";
import figure from "@/hero/unstack.js?raw";

type Point = [number, number];

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
  tour: (Point | null)[];
}

interface Hairline {
  inject: (root: Document) => void;
  mk: (
    tag: string,
    attrs: Record<string, string>,
    parent: Element
  ) => SVGSVGElement;
  tour: (stage: HTMLElement, stops: (Point | null)[]) => { stop: () => void };
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
const TILES = [
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

export function HeroUnstack() {
  const [name, setName] = useState("");
  const live = useRef<{ handle: Handle; play: (on: boolean) => void } | null>(
    null
  );

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
    // The tour plays the lift on its own until a real pointer arrives.
    let lap = HL.tour(stage, unstack.tour);
    live.current = {
      handle,
      play: (on: boolean) => {
        lap.stop();
        if (on) {
          lap = HL.tour(stage, unstack.tour);
        }
      },
    };
    return () => {
      lap.stop();
      handle.destroy();
      svg.remove();
      live.current = null;
    };
  }, []);

  // A hovered or focused logo takes the stack over; leaving it hands back to the tour.
  const pick = (i: number) => {
    live.current?.play(i < 0);
    live.current?.handle.pick(i);
  };

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
                onBlur={() => pick(-1)}
                onFocus={() => pick(i)}
                onMouseEnter={() => pick(i)}
                onMouseLeave={() => pick(-1)}
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
