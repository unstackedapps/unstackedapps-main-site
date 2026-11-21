import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/MarketingPageHeader";
import {
  PROJECT_SECTIONS,
  type Project,
  type ProjectLink,
} from "@/config/projects";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[#f3efe6] text-sm transition-colors hover:border-[#f3efe6]/50 hover:bg-white/5";

export function PanelLink({ link }: { link: ProjectLink }) {
  if (link.action === "open-chat") {
    return (
      <button
        className={linkClass}
        onClick={() =>
          window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"))
        }
        type="button"
      >
        {link.label}
      </button>
    );
  }
  if (link.external === false) {
    return (
      <Link className={linkClass} to={link.href}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      className={linkClass}
      href={link.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link.label}
      <ArrowUpRight className="size-3.5 opacity-60" />
    </a>
  );
}

interface ProjectPanelProps {
  count: number;
  number: number;
  project: Project;
  tile: number;
}

/** One product in the scrolling column; `data-tile` tells the page which stack tile to lift. */
export function ProjectPanel({
  count,
  number,
  project,
  tile,
}: ProjectPanelProps) {
  const reduced = useReducedMotion();
  const section = PROJECT_SECTIONS.find((s) => s.id === project.category);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <article
      className="flex scroll-mt-24 flex-col justify-center border-white/10 border-t py-16 lg:min-h-[80dvh]"
      data-tile={tile}
      id={project.id}
    >
      <Eyebrow>
        {pad(number)} / {pad(count)} · {section?.title}
      </Eyebrow>
      <div className="mt-5 flex items-center gap-3">
        <img
          alt=""
          className={project.logoClassName ?? "h-8 w-8 object-contain"}
          height={32}
          src={project.logo}
          width={32}
        />
        <h3 className="font-light font-raleway text-3xl tracking-tight md:text-4xl">
          {project.name}
        </h3>
      </div>
      <p className="mt-4 max-w-xl text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
        {project.description}
      </p>
      {project.metrics ? (
        <p className="mt-3 font-mono text-[#f3efe6]/55 text-xs">
          {project.metrics}
        </p>
      ) : null}
      {project.preview ? (
        <motion.img
          alt={project.previewAlt ?? `${project.name} preview`}
          className="mt-8 aspect-[1024/560] w-full rounded-xl border border-white/10 object-cover object-top"
          height={560}
          initial={
            reduced ? false : { clipPath: "inset(0 0 100% 0 round 12px)" }
          }
          loading="lazy"
          src={project.preview}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ margin: "-15% 0px", once: true }}
          whileInView={{ clipPath: "inset(0 0 0% 0 round 12px)" }}
          width={1024}
        />
      ) : null}
      <p className="mt-6 font-mono text-[#f3efe6]/45 text-[11px] uppercase tracking-[0.14em]">
        {project.tags.join(" · ")}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.links.map((link) => (
          <PanelLink key={link.href} link={link} />
        ))}
      </div>
    </article>
  );
}
