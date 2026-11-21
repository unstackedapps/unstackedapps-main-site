import { type CSSProperties, useCallback, useState } from "react";
import kernel from "@/hero/kernel.js?raw";
import figure from "@/hero/unstack.js?raw";

type Point = [number, number];

interface Figure {
  means: string;
  mount: (
    parts: {
      read: { textContent: string };
      stage: HTMLElement;
      svg: SVGSVGElement;
    },
    value: number
  ) => { destroy: () => void };
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

const palette = {
  "--hairline-hi": "#f3efe6",
  "--hairline-plate": "#141c27",
} as CSSProperties;

export function HeroUnstack() {
  const [name, setName] = useState("");

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
    const lap = HL.tour(stage, unstack.tour);
    return () => {
      lap.stop();
      handle.destroy();
      svg.remove();
    };
  }, []);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-3 right-4 z-10 font-mono text-[#f3efe6]/80 text-[11px] tracking-wide">
        {name}
      </span>
      <div
        aria-label={unstack.means}
        data-hairline="unstack"
        data-hairline-theme="dark"
        ref={mountStage}
        role="img"
        style={palette}
      />
    </div>
  );
}
