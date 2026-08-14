import type { ReactNode } from "react";

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
      {eyebrow ? (
        <p
          className="mb-4 font-medium text-[#f3efe6]/65 text-[11px] uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h1
        className="font-light text-3xl tracking-tight sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export const marketingCardClass =
  "border-white/10 bg-[#141c27]/55 text-[#f3efe6] backdrop-blur-sm shadow-none";
