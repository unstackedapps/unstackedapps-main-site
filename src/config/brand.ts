/** Unstacked Apps studio palette — monochrome navy + cream accents */
export const BRAND_COLORS = {
  cream: "#f3efe6",
  navy: "#0c1219",
  navyCard: "#141c27",
  navyMid: "#121a24",
  navyMuted: "#101820",
} as const;

/** Product-specific colors — only for branded project cards / demos */
export const PRODUCT_COLORS = {
  opensuitemcp: {
    blue: "#4a81e8",
    orange: "#ea580c",
  },
} as const;

/** Shared Tailwind class strings for the studio brand */
export const brandClasses = {
  accentBg: "bg-white/[0.06]",
  accentBorder: "border-white/20",
  accentLine: "from-[#f3efe6]/35 via-[#f3efe6]/10 to-transparent",
  accentText: "text-[#f3efe6]/75",
  cardBorderLeft: "border-l-[#f3efe6]/30",
  ctaOutline:
    "border border-white/20 bg-white/[0.06] text-[#f3efe6] transition-colors hover:bg-white/10",
  ctaPrimary:
    "bg-[#f3efe6] text-[#0c1219] font-medium transition-opacity hover:opacity-90",
  ctaSecondary:
    "border border-white/15 bg-white/5 text-[#f3efe6] transition-colors hover:bg-white/10",
  eyebrow: "text-[#f3efe6]/55",
  heroGlow: "from-[#f3efe6]/10 via-[#f3efe6]/4 to-transparent",
  icon: "text-[#f3efe6]/80",
  iconAccent: "text-[#f3efe6]",
  link: "text-[#f3efe6] underline-offset-4 hover:underline",
  navHover: "hover:text-[#f3efe6]",
  text: "text-[#f3efe6]",
  textFaint: "text-[#f3efe6]/55",
  textMuted: "text-[#f3efe6]/70",
  textSubtle: "text-[#f3efe6]/65",
} as const;

export function projectCardHoverClass(projectId: string): string {
  if (projectId === "opensuitemcp") {
    return "group-hover:border-[#ea580c]/35 group-hover:shadow-[0_0_40px_-12px_rgba(234,88,12,0.35)]";
  }
  return "group-hover:border-white/25 group-hover:shadow-[0_0_40px_-12px_rgba(243,239,230,0.1)]";
}
