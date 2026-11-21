import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApproachSection } from "@/components/ApproachSection";
import { HeroUnstack, TILES } from "@/components/HeroUnstack";
import { Eyebrow } from "@/components/MarketingPageHeader";
import { PanelLink, ProjectPanel } from "@/components/ProjectPanel";
import { ScrollFade } from "@/components/ScrollFade";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { UnstackedMark } from "@/components/UnstackedMark";
import { brandClasses } from "@/config/brand";
import { SITE_CONFIG } from "@/config/constants";
import { PROJECTS } from "@/config/projects";
import { technologies } from "@/config/technologies";

// Top tile first: scrolling down peels the stack one tile at a time.
const PANELS = TILES.map((project, tile) => ({ project, tile })).reverse();
const MORE = PROJECTS.filter((p) => !TILES.includes(p));

/** The tile whose panel crosses the middle of the screen; null while the hero is there. */
function useActiveTile() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const tile = Number((e.target as HTMLElement).dataset.tile);
            setActive(tile < 0 ? null : tile);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const el of document.querySelectorAll("[data-tile]")) {
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return active;
}

export function Home() {
  const active = useActiveTile();
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { opacity: 1, y: 0 },
          initial: { opacity: 0, y: 14 },
          transition: {
            delay,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <div className="relative min-h-dvh overflow-x-clip text-[#f3efe6]">
      <Seo path="/" />

      <SiteHeader variant="home" />

      <div className="mx-auto grid max-w-7xl gap-x-14 px-5 md:px-8 lg:grid-cols-2">
        <section
          className="relative z-10 flex flex-col justify-center pt-14 pb-10 lg:min-h-[calc(100dvh-4rem)] lg:py-0"
          data-tile={-1}
        >
          <motion.p
            {...rise(0.05)}
            className="mb-6 flex items-center gap-2 font-mono text-[#f3efe6]/55 text-[11px] uppercase tracking-[0.16em]"
          >
            <UnstackedMark className="size-4 opacity-90" />
            NetSuite · Automation · Web apps
          </motion.p>
          <motion.h1
            {...rise(0.12)}
            className="font-light font-raleway text-5xl leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl"
          >
            <span className="font-semibold">Apps. AI.</span>
            <br />
            Shipped.
          </motion.h1>
          <motion.p
            {...rise(0.22)}
            className="mt-6 max-w-lg text-[#f3efe6]/70 text-base leading-relaxed md:text-lg"
          >
            NetSuite extensions, AI assistants, and SPAs built and shipped for
            production. Flagship work includes{" "}
            <span className="font-medium text-[#f3efe6]">OpenSuiteMCP</span> and{" "}
            <span className="font-medium text-[#f3efe6]">SuitePreferences</span>
            , plus n8n nodes, integrations, and custom sites.
          </motion.p>
          <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap gap-3">
            <Link
              className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm ${brandClasses.ctaPrimary}`}
              to="/contact"
            >
              Start a project
            </Link>
            <a
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-[#f3efe6] text-sm transition-colors hover:border-[#f3efe6]/50 hover:bg-white/5"
              href="#projects"
            >
              View our work
            </a>
          </motion.div>
          <motion.p
            {...rise(0.4)}
            className="mt-6 font-mono text-[#f3efe6]/45 text-[11px]"
          >
            SuitePreferences · 4.6★ · 1,000 users · OpenSuiteMCP on GitHub
          </motion.p>
        </section>

        <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)] lg:items-center">
            <div className="w-full">
              <HeroUnstack active={active} />
            </div>
          </div>
        </aside>

        <section className="scroll-mt-20 pt-16 lg:pt-8" id="projects">
          <Eyebrow>Portfolio</Eyebrow>
          <h2 className="mt-3 font-light font-raleway text-3xl tracking-tight">
            Projects
          </h2>
          <div className="mt-8">
            {PANELS.map(({ project, tile }, i) => (
              <ProjectPanel
                count={PANELS.length}
                key={project.id}
                number={i + 1}
                project={project}
                tile={tile}
              />
            ))}
          </div>
          <ul className="grid gap-3 border-white/10 border-t py-12 sm:grid-cols-2">
            {MORE.map((p) => (
              <li
                className="flex h-full flex-col items-start gap-4 rounded-xl border border-white/10 p-5"
                id={p.id}
                key={p.id}
              >
                <div>
                  <span className="font-raleway text-lg">{p.name}</span>
                  <span className="mt-1 block text-[#f3efe6]/60 text-sm leading-relaxed">
                    {p.description}
                  </span>
                </div>
                {p.links.map((link) => (
                  <PanelLink key={link.href} link={link} />
                ))}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ApproachSection />

      <section
        aria-label="Technologies"
        className="overflow-hidden border-white/10 border-y py-6"
      >
        <div className="flex w-max animate-marquee gap-10 font-mono text-[#f3efe6]/45 text-sm motion-reduce:animate-none">
          {[0, 1].flatMap((copy) =>
            technologies.map((t) => (
              <span aria-hidden={copy === 1} key={`${copy}-${t.name}`}>
                {t.name}
              </span>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 lg:py-40">
        <ScrollFade>
          <h2 className="max-w-3xl font-light font-raleway text-5xl tracking-tight md:text-7xl">
            Ready to get started?
          </h2>
          <Link
            className={`mt-10 inline-flex items-center rounded-full px-6 py-3 ${brandClasses.ctaPrimary}`}
            to="/contact"
          >
            Start a project
          </Link>
        </ScrollFade>
      </section>

      <footer className="border-white/10 border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-[#f3efe6]/60 text-sm md:flex-row md:items-end md:justify-between md:px-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <UnstackedMark className="size-6 opacity-90" />
              <span className="font-raleway">
                <span className="font-light">un</span>stacked
                <span className="font-semibold text-[#f3efe6]">apps</span>
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed">
              {SITE_CONFIG.siteDescription}
            </p>
            <p className="font-mono text-[#f3efe6]/40 text-[11px]">
              © {new Date().getFullYear()} {SITE_CONFIG.companyName}
            </p>
          </div>
          <p className="flex gap-5 font-mono text-xs">
            <a
              className="hover:text-[#f3efe6]"
              href={SITE_CONFIG.social.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="hover:text-[#f3efe6]"
              href={SITE_CONFIG.social.linkedIn}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="hover:text-[#f3efe6]"
              href={`mailto:${SITE_CONFIG.contactEmail}`}
            >
              Email
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
