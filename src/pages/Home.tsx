import {
  Chrome,
  Code,
  ExternalLink,
  Globe,
  Mail,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ApproachSection } from "@/components/ApproachSection";
import { ProjectSections } from "@/components/ProjectSections";
import { ScrollFade } from "@/components/ScrollFade";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { UnstackedMark } from "@/components/UnstackedMark";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { brandClasses } from "@/config/brand";
import { SITE_CONFIG } from "@/config/constants";
import type { PROJECTS } from "@/config/projects";
import { technologiesByCategory } from "@/config/technologies";

export function Home() {
  const [previewProject, setPreviewProject] = useState<
    (typeof PROJECTS)[number] | null
  >(null);

  return (
    <div className="relative min-h-dvh overflow-x-hidden text-[#f3efe6]">
      <Seo path="/" />

      <SiteHeader variant="home" />

      <HeroGeometric
        description={
          <>
            NetSuite extensions, AI assistants, and production SPAs — built and
            shipped in production. Flagship work includes{" "}
            <span className="font-medium text-[#f3efe6]">OpenSuiteMCP</span> and{" "}
            <span className="font-medium text-[#f3efe6]">SuitePreferences</span>
            , plus n8n nodes, integrations, and custom sites.
          </>
        }
        eyebrow={
          <>
            <UnstackedMark className="mr-1.5 size-4 opacity-90" />
            <span>NetSuite · Automation · Web apps</span>
          </>
        }
        title={
          <>
            <span className="font-semibold">Apps. AI.</span>
            <br />
            Shipped.
          </>
        }
      >
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm ${brandClasses.ctaPrimary}`}
              to="/contact"
            >
              Start a project
            </Link>
            <a
              className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm ${brandClasses.ctaOutline}`}
              href="#projects"
            >
              View our work
            </a>
          </div>
          <p
            className="text-[#f3efe6]/45 text-[11px] sm:whitespace-nowrap sm:text-xs"
            style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
          >
            SuitePreferences · 5.0★ · 500+ users · OpenSuiteMCP on GitHub
          </p>
        </div>
      </HeroGeometric>

      <ProjectSections onPreview={setPreviewProject} />

      <ApproachSection />

      <Dialog
        onOpenChange={(open) => !open && setPreviewProject(null)}
        open={!!previewProject}
      >
        <DialogContent className="max-w-4xl overflow-hidden border-white/10 bg-[#141c27] p-0 text-[#f3efe6]">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              {previewProject?.name}
            </DialogTitle>
            <DialogDescription className="text-[#f3efe6]/65">
              {previewProject?.previewAlt ?? "Project workflow screenshot"}
            </DialogDescription>
          </DialogHeader>
          {previewProject?.preview ? (
            <img
              alt={
                previewProject.previewAlt ?? `${previewProject.name} preview`
              }
              className="w-full bg-[#0c1219]/40 object-contain"
              height={675}
              src={previewProject.preview}
              width={1200}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <section className="border-white/10 border-t" id="features">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <ScrollFade>
            <h2
              className="max-w-2xl font-light text-3xl tracking-tight md:text-4xl"
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              What We Build
            </h2>
            <p className="mt-4 max-w-2xl text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
              Chrome extensions, AI assistants, and single-page applications
              designed to streamline your workflow.
            </p>
          </ScrollFade>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                desc: "Powerful browser extensions that enhance your web experience and boost productivity",
                icon: Chrome,
                iconColor: brandClasses.iconAccent,
                title: "Chrome Extensions",
              },
              {
                desc: "Intelligent AI-powered tools that help you work smarter and accomplish more",
                icon: Sparkles,
                iconColor: brandClasses.iconAccent,
                title: "AI Assistants",
              },
              {
                desc: "Fast, modern SPAs built with React, deployed on GitHub Pages with custom domains. Quick to production.",
                icon: Globe,
                iconColor: brandClasses.iconAccent,
                title: "Single-Page Applications",
              },
              {
                desc: "Built with modern technologies for speed, security, and seamless user experience",
                icon: Zap,
                iconColor: brandClasses.iconAccent,
                title: "Fast & Reliable",
              },
              {
                desc: "Well-architected solutions that are maintainable, scalable, and future-proof",
                icon: Code,
                iconColor: brandClasses.iconAccent,
                title: "Clean Code",
              },
              {
                desc: "Built with highly supported open source tools and best practices for reliability and maintainability",
                icon: Rocket,
                iconColor: brandClasses.iconAccent,
                title: "Open Source Powered",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollFade delay={0.05 * index} key={feature.title}>
                  <div className="flex h-full flex-col border border-white/10 bg-[#141c27]/55 p-5 backdrop-blur-sm">
                    <Icon className={`size-5 ${feature.iconColor} mb-4`} />
                    <h3
                      className="font-medium text-[#f3efe6] text-lg tracking-tight"
                      style={{
                        fontFamily:
                          "var(--font-raleway, 'Raleway', sans-serif)",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[#f3efe6]/65 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </ScrollFade>
              );
            })}
          </div>
          <ScrollFade delay={0.14}>
            <div className="mt-12 text-center">
              <Button
                asChild
                className={`text-lg ${brandClasses.ctaPrimary}`}
                size="lg"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
            </div>
          </ScrollFade>
        </div>
      </section>

      <section className="border-white/10 border-t bg-[#0c1219]/35 backdrop-blur-[2px]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <ScrollFade>
            <p
              className="mb-4 font-medium text-[#f3efe6]/65 text-[11px] uppercase tracking-[0.18em]"
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              Stack
            </p>
            <h2
              className="max-w-2xl font-light text-3xl tracking-tight md:text-4xl"
              style={{
                fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
              }}
            >
              Technologies We Use
            </h2>
            <p className="mt-4 max-w-2xl text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
              Modern, well-supported open source tools powering our applications
            </p>
          </ScrollFade>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologiesByCategory.map((category, index) => (
              <ScrollFade delay={0.05 * (index % 3)} key={category.name}>
                <div>
                  <h3
                    className="mb-3 font-medium text-[#f3efe6]/80 text-base"
                    style={{
                      fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                    }}
                  >
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <a
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[#f3efe6]/70 text-xs transition-colors hover:bg-white/5"
                        href={tech.url}
                        key={tech.name}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {tech.name}
                        <ExternalLink className="size-3 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <section className="border-white/10 border-t">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <ScrollFade>
            <div className="overflow-hidden border border-white/10 bg-[#141c27]/55 p-6 backdrop-blur-sm md:p-10">
              <h2
                className="text-center font-light text-2xl text-[#f3efe6] md:text-3xl"
                style={{
                  fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                }}
              >
                Ready to Get Started?
              </h2>
              <p className="mt-3 text-center text-[#f3efe6]/65 text-base md:text-lg">
                Discover our projects or get in touch to discuss your needs
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  className={`text-lg ${brandClasses.ctaPrimary}`}
                  size="lg"
                >
                  <a href="#projects">View Our Projects</a>
                </Button>
                <Button
                  asChild
                  className="border-white/15 bg-white/5 text-[#f3efe6] text-lg hover:bg-white/10"
                  size="lg"
                  variant="outline"
                >
                  <Link to="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      <footer className="border-white/10 border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-[#f3efe6]/60 text-sm md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <UnstackedMark className="size-6 opacity-90" />
                <span
                  style={{
                    fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                  }}
                >
                  <span className="font-light">un</span>stacked
                  <span className="font-semibold text-[#f3efe6]">apps</span>
                </span>
              </div>
              <p className="max-w-sm text-[#f3efe6]/55 text-xs leading-relaxed">
                Shipped products, extensions, and integrations.
              </p>
              <p className="max-w-xs">{SITE_CONFIG.siteDescription}</p>
            </div>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <a
                className="text-[#f3efe6] underline-offset-4 hover:underline"
                href={SITE_CONFIG.social.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="underline-offset-4 hover:underline"
                href={SITE_CONFIG.social.linkedIn}
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="underline-offset-4 hover:underline"
                href={`mailto:${SITE_CONFIG.contactEmail}`}
              >
                Email
              </a>
            </p>
          </div>
          <p className="max-w-3xl border-white/10 border-t pt-5 text-[#f3efe6]/45 text-xs leading-relaxed">
            © {new Date().getFullYear()} {SITE_CONFIG.companyName}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
