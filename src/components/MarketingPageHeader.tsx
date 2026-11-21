import type { ReactNode } from "react";

/** The small mono label above a heading, in the style of the hero figure's read-out. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[#f3efe6]/55 text-[11px] uppercase tracking-[0.16em] ${className}`}
    >
      {children}
    </p>
  );
}

interface MarketingPageHeaderProps {
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  title: string;
}

export function MarketingPageHeader({
  eyebrow,
  title,
  description,
  className = "",
}: MarketingPageHeaderProps) {
  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h1 className="text-balance font-light font-raleway text-4xl tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export const marketingCardClass =
  "rounded-2xl border-white/10 bg-white/[0.02] text-[#f3efe6] shadow-none";
