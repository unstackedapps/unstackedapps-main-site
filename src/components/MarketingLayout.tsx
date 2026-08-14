import type { ReactNode } from "react";
import { MarketingAtmosphere } from "@/components/MarketingAtmosphere";

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden text-[#f3efe6]">
      <MarketingAtmosphere />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
