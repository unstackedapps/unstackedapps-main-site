import { Eyebrow } from "@/components/MarketingPageHeader";
import { ScrollFade } from "@/components/ScrollFade";

const PRINCIPLES = [
  {
    description:
      "Client work includes full source and handover in your organization. Our products and open-source tools publish to GitHub where we can — inspectable, portable, and never a black box.",
    title: "You own what we ship",
  },
  {
    description:
      "React, TypeScript, n8n, and well-supported tools — chosen for longevity, not hype.",
    title: "Open source first",
  },
  {
    description:
      "Chrome extensions, SPAs, and AI tools in production with real users — not mockups or slide decks.",
    title: "Shipped products",
  },
  {
    description:
      "Clean architecture, CI/CD, and handover docs so your team can maintain what we deliver.",
    title: "Built to last",
  },
] as const;

export function ApproachSection() {
  return (
    <section className="scroll-mt-20 border-white/10 border-t" id="approach">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
        <ScrollFade>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-4 font-light font-raleway text-4xl tracking-tight md:text-5xl">
            How we work
          </h2>
          <p className="mt-5 max-w-md text-[#f3efe6]/70 text-base leading-relaxed md:text-lg">
            Unstacked Apps builds shipped products like OpenSuiteMCP and
            SuitePreferences — plus client work across NetSuite extensions, AI,
            integrations, and web apps.
          </p>
        </ScrollFade>
        <ol className="grid border-white/10 border-t sm:grid-cols-2">
          {PRINCIPLES.map((item, index) => (
            <li
              className="border-white/10 border-b py-8 sm:even:pl-8 sm:odd:border-r sm:odd:pr-8"
              key={item.title}
            >
              <ScrollFade delay={0.06 * index}>
                <span className="font-mono text-[#f3efe6]/45 text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-raleway text-[#f3efe6] text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[#f3efe6]/65 text-sm leading-relaxed">
                  {item.description}
                </p>
              </ScrollFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
