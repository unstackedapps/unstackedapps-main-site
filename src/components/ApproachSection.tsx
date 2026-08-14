import { Code2, GitBranch, Rocket, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollFade } from "@/components/ScrollFade";
import { UnstackedMark } from "@/components/UnstackedMark";
import { brandClasses } from "@/config/brand";

const PRINCIPLES = [
  {
    description:
      "Client work includes full source and handover in your organization. Our products and open-source tools publish to GitHub where we can — inspectable, portable, and never a black box.",
    icon: GitBranch,
    title: "You own what we ship",
  },
  {
    description:
      "React, TypeScript, n8n, and well-supported tools — chosen for longevity, not hype.",
    icon: Code2,
    title: "Open source first",
  },
  {
    description:
      "Chrome extensions, SPAs, and AI tools in production with real users — not mockups or slide decks.",
    icon: Rocket,
    title: "Shipped products",
  },
  {
    description:
      "Clean architecture, CI/CD, and handover docs so your team can maintain what we deliver.",
    icon: Shield,
    title: "Built to last",
  },
] as const;

export function ApproachSection() {
  return (
    <section
      className="relative border-white/10 border-t bg-[#0c1219]/35 backdrop-blur-[2px]"
      id="approach"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 right-8 hidden opacity-[0.05] lg:block"
      >
        <UnstackedMark className="size-32" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <ScrollFade>
          <div className="flex max-w-2xl items-start gap-4">
            <UnstackedMark className="mt-1 size-10 shrink-0 opacity-90" />
            <div>
              <h2
                className="font-light text-3xl tracking-tight md:text-4xl"
                style={{
                  fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                }}
              >
                How we work
              </h2>
              <p
                className={`mt-4 text-base leading-relaxed md:text-lg ${brandClasses.textMuted}`}
              >
                Unstacked Apps builds shipped products like OpenSuiteMCP and
                SuitePreferences — plus client work across NetSuite extensions,
                AI, integrations, and web apps.
              </p>
            </div>
          </div>
        </ScrollFade>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollFade delay={0.05 * index} key={item.title}>
                <div
                  className={`h-full border border-white/10 border-l-2 bg-[#141c27]/55 p-5 backdrop-blur-sm ${brandClasses.cardBorderLeft}`}
                >
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-lg border ${brandClasses.accentBorder} ${brandClasses.accentBg}`}
                  >
                    <Icon className={`size-4 ${brandClasses.iconAccent}`} />
                  </span>
                  <h3
                    className="mt-4 font-medium text-[#f3efe6] text-lg tracking-tight"
                    style={{
                      fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${brandClasses.textSubtle}`}
                  >
                    {item.description}
                  </p>
                </div>
              </ScrollFade>
            );
          })}
        </div>

        <ScrollFade delay={0.12}>
          <p
            className={`mt-10 max-w-2xl text-sm leading-relaxed ${brandClasses.textFaint}`}
          >
            Product sites like{" "}
            <a
              className={`${brandClasses.link} opacity-90`}
              href="https://opensuitemcp.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              OpenSuiteMCP
            </a>{" "}
            go deep on a single stack. This site covers everything we build and
            how to work with us.
          </p>
          <div className="mt-6">
            <Link
              className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm ${brandClasses.ctaPrimary}`}
              to="/contact"
            >
              Start a project
            </Link>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
