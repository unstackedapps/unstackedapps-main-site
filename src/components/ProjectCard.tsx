import {
  Chrome,
  ExternalLink,
  Github,
  Globe,
  MessageCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { projectCardHoverClass } from "@/config/brand";
import type { Project, ProjectLink } from "@/config/projects";
import { cn } from "@/lib/utils";

function ProjectLinkIcon({ icon }: { icon?: ProjectLink["icon"] }) {
  switch (icon) {
    case "github":
      return <Github className="mr-2 h-4 w-4" />;
    case "chrome":
      return <Chrome className="mr-2 h-4 w-4" />;
    case "globe":
      return <Globe className="mr-2 h-4 w-4" />;
    case "message":
      return <MessageCircle className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
}

function renderProjectLink(link: ProjectLink): ReactNode {
  const content = (
    <>
      <ProjectLinkIcon icon={link.icon} />
      {link.label}
      {link.external !== false && link.action !== "open-chat" && (
        <ExternalLink className="ml-2 h-4 w-4" />
      )}
    </>
  );

  if (link.action === "open-chat") {
    return (
      <Button
        className="w-full border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
        key={link.href}
        onClick={() =>
          window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"))
        }
        type="button"
        variant="outline"
      >
        {content}
      </Button>
    );
  }

  if (link.external === false) {
    return (
      <Button
        asChild
        className="w-full border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
        key={link.href}
        variant="outline"
      >
        <Link to={link.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      className="w-full border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
      key={link.href}
      variant="outline"
    >
      <a href={link.href} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    </Button>
  );
}

interface ProjectCardProps {
  imagePosition?: "left" | "right";
  onPreview?: (project: Project) => void;
  project: Project;
}

export function ProjectCard({
  imagePosition = "left",
  onPreview,
  project,
}: ProjectCardProps) {
  const accentBorder = projectCardHoverClass(project.id);
  const imageOnRight = imagePosition === "right";
  const contentSideClass = imageOnRight
    ? "lg:order-1 lg:border-r"
    : "lg:border-l";

  return (
    <article
      className={`group overflow-hidden border border-white/10 bg-[#141c27]/55 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ${accentBorder}`}
      id={project.id}
    >
      <div
        className={cn(
          "grid lg:items-stretch",
          imageOnRight
            ? "lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.35fr)]"
            : "lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]"
        )}
      >
        {project.preview && onPreview ? (
          <button
            aria-label={`View larger screenshot of ${project.name}`}
            className={cn(
              "relative block w-full text-left focus-visible:outline-none",
              imageOnRight && "lg:order-2"
            )}
            onClick={() => onPreview(project)}
            type="button"
          >
            <img
              alt={project.previewAlt ?? `${project.name} preview`}
              className="aspect-[16/10] w-full object-cover object-left-top transition-opacity group-hover:opacity-90 lg:aspect-auto lg:h-full lg:min-h-[22rem]"
              height={675}
              src={project.preview}
              width={1200}
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141c27]/80 to-transparent px-4 py-3 text-[#f3efe6]/50 text-xs opacity-0 transition-opacity group-hover:opacity-100">
              Click to enlarge
            </span>
          </button>
        ) : null}

        <div
          className={cn(
            "flex flex-col border-white/10",
            project.preview ? contentSideClass : undefined
          )}
        >
          <div className="flex-1 p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              {project.logoIcon === "message" ? (
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]"
                >
                  <MessageCircle className="h-4 w-4 text-[#f3efe6]/70" />
                </span>
              ) : (
                <img
                  alt={`${project.name} logo`}
                  className={project.logoClassName ?? "h-9 w-9 object-contain"}
                  height={36}
                  src={project.logo}
                  width={36}
                />
              )}
              <h4
                className="font-medium text-[#f3efe6] text-xl tracking-tight md:text-2xl"
                style={{
                  fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                }}
              >
                {project.name}
              </h4>
            </div>

            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[#f3efe6]/55 text-[10px] uppercase tracking-wide"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#f3efe6]/65 text-sm leading-relaxed md:text-base">
              {project.description}
            </p>
            {project.metrics ? (
              <p className="mt-4 text-[#f3efe6]/50 text-sm">
                {project.metrics}
              </p>
            ) : null}
          </div>

          <div className="border-white/10 border-t p-6 pt-4 md:px-8 md:pb-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {project.links.map((link) => (
                <div className="sm:min-w-[12rem] sm:flex-1" key={link.href}>
                  {renderProjectLink(link)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
