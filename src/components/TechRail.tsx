import { useReducedMotion } from "framer-motion";
import { TECH_RAIL_MARKS } from "@/components/MarketingBrandIcons";

export function TechRail() {
  const prefersReducedMotion = useReducedMotion();
  const marks = prefersReducedMotion
    ? [...TECH_RAIL_MARKS]
    : [...TECH_RAIL_MARKS, ...TECH_RAIL_MARKS];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 bottom-0 left-0 z-[5] hidden w-14 overflow-hidden lg:block xl:w-16"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className={
            prefersReducedMotion
              ? "flex h-full flex-col justify-center gap-7 py-10 opacity-[0.22]"
              : "flex animate-tech-rail flex-col gap-7 py-10 opacity-[0.28]"
          }
        >
          {marks.map((mark) => (
            <div
              className="flex flex-col items-center gap-1.5 text-[#f3efe6]"
              key={mark.label}
            >
              <mark.Icon className="size-5 xl:size-[1.35rem]" size={20} />
              <span className="max-w-[3.25rem] text-center font-mono text-[#f3efe6]/55 text-[9px] leading-tight tracking-wide">
                {mark.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
