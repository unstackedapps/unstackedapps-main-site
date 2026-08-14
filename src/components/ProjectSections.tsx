import { Chrome, Globe, Sparkles, Workflow, Zap } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollFade } from "@/components/ScrollFade";
import { brandClasses } from "@/config/brand";
import {
  PROJECT_SECTIONS,
  type Project,
  projectsByCategory,
} from "@/config/projects";

const SECTION_ICONS = {
  automation: Workflow,
  netsuite: Chrome,
  web: Globe,
} as const;

const SECTION_DECOR = {
  automation: Zap,
  netsuite: Sparkles,
  web: Globe,
} as const;

interface ProjectSectionsProps {
  onPreview: (project: Project) => void;
}

export function ProjectSections({ onPreview }: ProjectSectionsProps) {
  return (
    <div id="projects">
      <section className="border-white/10 border-t bg-[#0c1219]/40 backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <ScrollFade>
            <p
              className={`mb-4 font-medium text-[11px] uppercase tracking-[0.18em] ${brandClasses.eyebrow}`}
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              Portfolio
            </p>
            <h2
              className="max-w-xl font-light text-3xl tracking-tight md:text-4xl"
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              Projects
            </h2>
            <p
              className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${brandClasses.textMuted}`}
            >
              Tools, integrations, and web apps — grouped by what they do best.
            </p>
          </ScrollFade>
        </div>
      </section>

      {PROJECT_SECTIONS.map((section, sectionIndex) => {
        const projects = projectsByCategory(section.id);
        const SectionIcon = SECTION_ICONS[section.id];
        const DecorIcon = SECTION_DECOR[section.id];
        const isAltBackground = sectionIndex % 2 === 1;

        return (
          <section
            className={`border-white/10 border-t ${
              isAltBackground
                ? "bg-[#141c27]/30 backdrop-blur-[2px]"
                : "bg-[#0c1219]/25"
            }`}
            id={`projects-${section.id}`}
            key={section.id}
          >
            <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
              <ScrollFade>
                <div className="relative">
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute top-0 -left-3 hidden h-full w-px bg-gradient-to-b md:block ${brandClasses.accentLine}`}
                  />

                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                    <div className="max-w-md shrink-0">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex size-9 items-center justify-center rounded-lg border ${brandClasses.accentBorder} ${brandClasses.accentBg}`}
                        >
                          <SectionIcon
                            className={`size-4 ${brandClasses.accentText}`}
                          />
                        </span>
                        <p
                          className={`font-medium text-[11px] uppercase tracking-[0.18em] ${brandClasses.eyebrow}`}
                          style={{
                            fontFamily:
                              "var(--font-raleway, 'Raleway', sans-serif)",
                          }}
                        >
                          {section.eyebrow}
                        </p>
                      </div>

                      <h3
                        className="mt-4 font-light text-2xl tracking-tight md:text-3xl"
                        style={{
                          fontFamily:
                            "var(--font-raleway, 'Raleway', sans-serif)",
                        }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed md:text-base ${brandClasses.textSubtle}`}
                      >
                        {section.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-[#f3efe6]/40 text-xs">
                        <DecorIcon
                          className={`size-3.5 ${brandClasses.accentText}`}
                        />
                        <span>
                          {projects.length} project
                          {projects.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`grid flex-1 gap-6 ${
                        projects.length > 1 ? "sm:grid-cols-2" : "max-w-xl"
                      }`}
                    >
                      {projects.map((project, index) => (
                        <ScrollFade delay={0.06 * (index + 1)} key={project.id}>
                          <ProjectCard
                            onPreview={onPreview}
                            project={project}
                          />
                        </ScrollFade>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </section>
        );
      })}
    </div>
  );
}
