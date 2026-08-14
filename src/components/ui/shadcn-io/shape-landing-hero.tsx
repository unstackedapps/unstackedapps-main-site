"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroMacEditorDemo } from "@/components/HeroMacEditorDemo";
import { brandClasses } from "@/config/brand";
import { cn } from "@/lib/utils";

interface HeroGeometricProps {
  children?: React.ReactNode;
  className?: string;
  description?: string | React.ReactNode;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
}

export function HeroGeometric({
  eyebrow,
  title,
  description,
  className,
  children,
}: HeroGeometricProps) {
  const prefersReducedMotion = useReducedMotion();
  const fade = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      className={cn(
        "mx-auto grid min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl items-center gap-10 px-5 pt-6 pb-16 md:grid-cols-[0.88fr_1.12fr] md:gap-12 md:px-8 md:pt-4 md:pb-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-[#f3efe6]/65 text-[11px] uppercase tracking-[0.18em]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
            transition={{ ...fade, delay: 0.05 }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[16ch] font-light text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-[3.35rem]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
          transition={{ ...fade, delay: 0.12 }}
        >
          {title}
        </motion.h1>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 max-w-lg text-[#f3efe6]/70 text-base leading-relaxed md:text-lg"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ ...fade, delay: 0.22 }}
        >
          {typeof description === "string" ? <p>{description}</p> : description}
        </motion.div>

        {children ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            transition={{ ...fade, delay: 0.32 }}
          >
            {children}
          </motion.div>
        ) : null}
      </div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[40rem] justify-self-center md:max-w-none md:justify-self-stretch"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        transition={{ ...fade, delay: 0.2 }}
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br blur-2xl ${brandClasses.heroGlow}`}
        />
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#141c27]/90 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm">
          <HeroMacEditorDemo reducedMotion={Boolean(prefersReducedMotion)} />
        </div>
      </motion.div>
    </section>
  );
}

export type { HeroGeometricProps };
