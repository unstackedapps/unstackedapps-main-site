import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Eyebrow, MarketingPageHeader } from "@/components/MarketingPageHeader";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { brandClasses } from "@/config/brand";

const fieldClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-white/[0.02] px-3.5 py-2.5 text-[#f3efe6] text-sm placeholder:text-[#f3efe6]/35 focus-visible:border-[#f3efe6]/60 focus-visible:outline-none";
const labelClass = "font-medium text-[#f3efe6] text-sm";
const hintClass = "mt-1 text-[#f3efe6]/50 text-xs leading-relaxed";

/** A question answered by picking one pill: native radios, so keyboard and validation come free. */
function Chips({
  hint,
  label,
  name,
  onChange,
  options,
  required = true,
  value,
}: {
  hint?: ReactNode;
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: [string, string][];
  required?: boolean;
  value: string;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      {hint ? <p className={hintClass}>{hint}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(([optionValue, text]) => (
          <label
            className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-[#f3efe6]/75 text-sm transition-colors hover:border-[#f3efe6]/50 has-[:checked]:border-[#f3efe6] has-[:checked]:bg-[#f3efe6] has-[:checked]:text-[#0c1219] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#f3efe6] has-[:focus-visible]:outline-offset-2"
            key={optionValue}
          >
            <input
              checked={value === optionValue}
              className="sr-only"
              name={name}
              onChange={() => onChange(optionValue)}
              required={required}
              type="radio"
              value={optionValue}
            />
            {text}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A follow-up question that opens when an earlier answer calls for it. */
function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ height: "auto", opacity: 1 }}
      className="overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Group({
  children,
  number,
  title,
}: {
  children: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <div className="grid gap-6 border-white/10 border-t py-10 md:grid-cols-[9rem_1fr]">
      <div>
        <span className="font-mono text-[#f3efe6]/45 text-xs">{number}</span>
        <h2 className="mt-2 font-raleway text-[#f3efe6] text-xl tracking-tight">
          {title}
        </h2>
      </div>
      <div className="grid gap-7">{children}</div>
    </div>
  );
}

const strong = (text: string) => (
  <strong className="font-medium text-[#f3efe6]">{text}</strong>
);

const FAQS: { a: ReactNode; q: string }[] = [
  {
    a: (
      <>
        <p>
          Our pricing is delivered as a fixed project fee following a successful
          client vetting process (via our intake form). Our focus is on building
          and deploying high-performance Single Page Applications (SPAs) using
          open-source, React-based technologies.
        </p>
        <p>
          Projects start at {strong("$3,500")} and range up to{" "}
          {strong("$8,000+")} depending on the complexity of features and
          required API integrations.
        </p>
        <p>
          We operate on a {strong("50/50 payment split")} to guarantee project
          commitment and secure your time:
        </p>
        <ul className="ml-4 list-disc space-y-1.5">
          <li>
            {strong("50% Non-Refundable Deposit:")} Due upon contract signing to
            secure your development slot and begin architectural setup.
          </li>
          <li>
            {strong("50% Final Payment:")} Due upon client approval of the
            finished application on our staging environment, prior to final code
            transfer and domain configuration.
          </li>
        </ul>
      </>
    ),
    q: "How do you determine pricing and what are your payment terms?",
  },
  {
    a: "By default, we deploy to GitHub Pages (free hosting). This is perfect for most single-page applications and static sites. If you prefer AWS, Google Cloud Platform, Vercel, Netlify, or another hosting provider, we can discuss options and set it up on your preferred platform. You'll have full control over your hosting account.",
    q: "Where will the site be hosted?",
  },
  {
    a: "Project timelines vary based on complexity. Simple landing pages or Chrome extensions can be completed in 1-2 weeks. More complex projects like interactive resume portfolios or AI applications typically take 3-6 weeks. We'll provide a detailed timeline after reviewing your requirements and can work with your schedule.",
    q: "How long does a project take?",
  },
  {
    a: "The initial project includes setup, deployment, and configuration. Once your project is live and you have access to everything, ongoing development work (new features, updates, changes) are handled as new contracts. This gives you full control and transparency - you only pay for work when you need it.",
    q: "Do you provide ongoing support?",
  },
  {
    a: "No technical knowledge required! We handle all the setup, deployment, and configuration. You'll receive everything set up and ready to use. If you want to make changes later, you can either request updates (as new contracts) or, if you're comfortable, you'll have access to the codebase to make your own modifications.",
    q: "Do I need technical knowledge?",
  },
  {
    a: (
      <p>
        This website is a prime example of what we can build! It's a single-page
        application built with React, TypeScript, and Tailwind CSS, deployed on
        GitHub Pages.
      </p>
    ),
    q: "Can I see examples of your work?",
  },
  {
    a: (
      <>
        <p>
          We don't just build a website; we engineer a turnkey, professional web
          application designed for speed, security, and long-term
          maintainability. Our price reflects the following key advantages that
          you own outright:
        </p>
        <ul className="ml-4 list-disc space-y-2">
          <li>
            {strong("Engineered Performance:")} We build using the latest React
            frameworks, delivering an unparalleled user experience and site
            speed that Google favors.
          </li>
          <li>
            {strong("Full Ownership & Control:")} You own the code 100% (in your
            GitHub organization). There are no vendor lock-ins, proprietary
            licenses, or monthly fees for the software we use.
          </li>
          <li>
            {strong("Zero-Maintenance Deployment:")} We configure a custom
            GitHub Actions CI/CD pipeline for you. This means any future
            developer can push a small update to the code and the site
            automatically updates globally—eliminating manual, error-prone
            deployment steps.
          </li>
          <li>
            {strong("Specialized Consulting:")} Our fee covers the architecture,
            setup, testing, and a personalized handover session to ensure you or
            your team can confidently manage the application going forward.
          </li>
        </ul>
      </>
    ),
    q: "Why is the investment in a custom SPA higher than a standard website builder?",
  },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    additionalInfo: "",
    aiUseCase: "",
    budget: "",
    companyName: "",
    companySize: "",
    companyUrl: "",
    contactEmail: "",
    contactName: "",
    domainDNSAccess: "",
    existingGHAccount: "",
    existingWebsite: "",
    githubUsername: "",
    hostingPreference: "",
    integrationPlatform: "",
    projectTimeline: "",
    projectType: "",
    resumeFeatures: "",
    spaType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Clear domainDNSAccess if it's "not-applicable" and project type changes away from chrome-extension
  useEffect(() => {
    if (
      formData.projectType !== "chrome-extension" &&
      formData.domainDNSAccess === "not-applicable"
    ) {
      setFormData((prev) => ({ ...prev, domainDNSAccess: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.projectType, formData.domainDNSAccess]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !(
        formData.projectType &&
        formData.companySize &&
        formData.contactName &&
        formData.contactEmail &&
        formData.existingWebsite &&
        formData.existingGHAccount &&
        formData.hostingPreference &&
        formData.projectTimeline &&
        formData.budget
      )
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Company name is only required if not an individual
    if (formData.companySize !== "individual" && !formData.companyName) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Domain DNS access is only required for web-based projects (not Chrome extensions)
    // Also reject "not-applicable" value for non-Chrome-extension projects
    if (
      formData.projectType !== "chrome-extension" &&
      (!formData.domainDNSAccess ||
        formData.domainDNSAccess === "not-applicable")
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Validate conditional required fields
    if (formData.projectType === "ai-assistant" && !formData.aiUseCase) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }
    if (
      formData.projectType === "ipaas-integration" &&
      !formData.integrationPlatform
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }
    if (formData.projectType === "spa-landing" && !formData.spaType) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Get Formspree endpoint from environment variable
      const formspreeEndpoint =
        import.meta.env.VITE_FORMSPREE_ENDPOINT ||
        "https://formspree.io/f/YOUR_FORM_ID";

      // Send all fields individually so Formspree can use them in email templates
      const response = await fetch(formspreeEndpoint, {
        body: JSON.stringify({
          _replyto: formData.contactEmail,
          additionalInfo: formData.additionalInfo || "",
          aiUseCase: formData.aiUseCase || "",
          budget: formData.budget,
          companyName: formData.companyName,
          companySize: formData.companySize,
          companyUrl: formData.companyUrl || "",
          contactEmail: formData.contactEmail,
          domainDNSAccess: formData.domainDNSAccess,
          // Standard Formspree fields
          email: formData.contactEmail,
          existingGHAccount: formData.existingGHAccount,
          existingWebsite: formData.existingWebsite,
          githubUsername: formData.githubUsername || "",
          hostingPreference: formData.hostingPreference || "",
          integrationPlatform: formData.integrationPlatform || "",
          name: formData.contactName,
          projectTimeline: formData.projectTimeline,

          // Custom form fields (Formspree will include all of these in the email)
          projectType: formData.projectType,
          resumeFeatures: formData.resumeFeatures || "",
          spaType: formData.spaType || "",
          subject: `New Project Request: ${formData.projectType}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok || response.status === 204) {
        setSubmitStatus("success");
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setFormData({
            additionalInfo: "",
            aiUseCase: "",
            budget: "",
            companyName: "",
            companySize: "",
            companyUrl: "",
            contactEmail: "",
            contactName: "",
            domainDNSAccess: "",
            existingGHAccount: "",
            existingWebsite: "",
            githubUsername: "",
            hostingPreference: "",
            integrationPlatform: "",
            projectTimeline: "",
            projectType: "",
            resumeFeatures: "",
            spaType: "",
          });
        }, 3000);
      } else {
        const errorText = await response.text();
        console.error("GitHub API error:", response.status, errorText);
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isExtension = formData.projectType === "chrome-extension";
  const yesNo: [string, string][] = [
    ["yes", "Yes"],
    ["no", "No"],
  ];
  const submitLabel = (() => {
    if (isSubmitting) {
      return "Sending...";
    }
    if (submitStatus === "success") {
      return "✓ Message Sent!";
    }
    return "Submit Request";
  })();

  return (
    <>
      <Seo
        description="Contact Unstacked Apps to discuss Chrome extensions, SPAs, AI assistants, n8n nodes, or custom website projects."
        path="/contact"
        title="Contact"
      />
      <SiteHeader backTo={{ href: "/", label: "Back to Home" }} />

      <div className="mx-auto grid max-w-7xl gap-x-16 px-5 pt-14 pb-24 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_1fr] lg:pt-20">
        <MarketingPageHeader
          className="!mx-0 lg:col-start-1 lg:row-start-1"
          description="Tell us about your project—sites, extensions, AI assistants, integrations, or anything else—and we'll get back to you soon."
          eyebrow="Get in touch"
          title="Let's Build Together"
        />

        <form
          className="mt-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0"
          onSubmit={handleSubmit}
        >
          <Group number="01" title="Project Details">
            <Chips
              label="What are you looking to build? *"
              name="projectType"
              onChange={(v) => handleChange("projectType", v)}
              options={[
                ["chrome-extension", "Chrome Extension"],
                ["resume-portfolio", "Resume / Interactive Portfolio"],
                ["spa-landing", "SPA Company Landing Page"],
                ["ai-assistant", "AI Assistant / Application"],
                ["ipaas-integration", "iPaaS Integration (n8n, etc.)"],
                ["other", "Other"],
              ]}
              value={formData.projectType}
            />
            {formData.projectType === "spa-landing" && (
              <Reveal>
                <Chips
                  label="What type of SPA landing page? *"
                  name="spaType"
                  onChange={(v) => handleChange("spaType", v)}
                  options={[
                    ["company-landing", "Company Landing Page"],
                    ["product-landing", "Product Landing Page"],
                    ["service-landing", "Service Landing Page"],
                    ["other", "Other"],
                  ]}
                  value={formData.spaType}
                />
              </Reveal>
            )}
            {formData.projectType === "resume-portfolio" && (
              <Reveal>
                <label className={labelClass} htmlFor="resumeFeatures">
                  What features would you like? (Select all that apply)
                </label>
                <textarea
                  className={fieldClass}
                  id="resumeFeatures"
                  onChange={(e) =>
                    handleChange("resumeFeatures", e.target.value)
                  }
                  placeholder="e.g., Interactive scheduler, video 'About Me' section, project showcase, blog, contact form..."
                  rows={3}
                  value={formData.resumeFeatures}
                />
              </Reveal>
            )}
            {formData.projectType === "ai-assistant" && (
              <Reveal>
                <label className={labelClass} htmlFor="aiUseCase">
                  What will the AI assistant be used for? *
                </label>
                <textarea
                  className={fieldClass}
                  id="aiUseCase"
                  onChange={(e) => handleChange("aiUseCase", e.target.value)}
                  placeholder="Describe the use case, what problems it should solve, and any specific integrations needed..."
                  required
                  rows={4}
                  value={formData.aiUseCase}
                />
              </Reveal>
            )}
            {formData.projectType === "ipaas-integration" && (
              <Reveal>
                <label className={labelClass} htmlFor="integrationPlatform">
                  Which platform(s) do you want to integrate? *
                </label>
                <textarea
                  className={fieldClass}
                  id="integrationPlatform"
                  onChange={(e) =>
                    handleChange("integrationPlatform", e.target.value)
                  }
                  placeholder="e.g., n8n, Zapier, Make.com, or custom integrations. Describe what needs to be connected..."
                  required
                  rows={3}
                  value={formData.integrationPlatform}
                />
              </Reveal>
            )}
          </Group>

          <Group number="02" title="About you">
            <Chips
              label="Company Size *"
              name="companySize"
              onChange={(v) => handleChange("companySize", v)}
              options={[
                ["individual", "Individual / Freelancer"],
                ["startup", "Startup (1-10 employees)"],
                ["small", "Small Business (11-50 employees)"],
                ["medium", "Medium Business (51-200 employees)"],
                ["large", "Large Business (200+ employees)"],
              ]}
              value={formData.companySize}
            />
            <div className="grid gap-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="companyName">
                  Company / Organization Name{" "}
                  {formData.companySize === "individual" ? "" : "*"}
                </label>
                <input
                  className={fieldClass}
                  id="companyName"
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder={
                    formData.companySize === "individual"
                      ? "Leave blank if not applicable"
                      : "Your company or organization name"
                  }
                  required={formData.companySize !== "individual"}
                  type="text"
                  value={formData.companyName}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contactName">
                  Your Name *
                </label>
                <input
                  className={fieldClass}
                  id="contactName"
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  placeholder="Full name"
                  required
                  type="text"
                  value={formData.contactName}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contactEmail">
                  Your Email *
                </label>
                <input
                  className={fieldClass}
                  id="contactEmail"
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  type="email"
                  value={formData.contactEmail}
                />
              </div>
            </div>
          </Group>

          <Group number="03" title="Setup">
            <Chips
              label="Do you have an existing website? *"
              name="existingWebsite"
              onChange={(v) => handleChange("existingWebsite", v)}
              options={yesNo}
              value={formData.existingWebsite}
            />
            {formData.existingWebsite === "yes" && (
              <Reveal>
                <label className={labelClass} htmlFor="companyUrl">
                  Current Website URL
                </label>
                <input
                  className={fieldClass}
                  id="companyUrl"
                  onChange={(e) => handleChange("companyUrl", e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  value={formData.companyUrl}
                />
              </Reveal>
            )}
            <Chips
              hint="We'll set up your project code in your GitHub organization so you own it 100%. If you don't have an account, we can help you create one (it's free)."
              label="Do you have an existing GitHub account? *"
              name="existingGHAccount"
              onChange={(v) => handleChange("existingGHAccount", v)}
              options={yesNo}
              value={formData.existingGHAccount}
            />
            {formData.existingGHAccount === "yes" && (
              <Reveal>
                <label className={labelClass} htmlFor="githubUsername">
                  GitHub Username
                </label>
                <input
                  className={fieldClass}
                  id="githubUsername"
                  onChange={(e) =>
                    handleChange("githubUsername", e.target.value)
                  }
                  placeholder="your-github-username"
                  type="text"
                  value={formData.githubUsername}
                />
              </Reveal>
            )}
            <Chips
              hint={
                isExtension
                  ? "Only needed if you plan to host a website or landing page"
                  : "We need this to configure your domain to point to your hosting (e.g., GitHub Pages). If you're not sure, we can help you find this information."
              }
              label={`Do you have access to your domain's DNS settings? ${isExtension ? "" : "*"}`}
              name="domainDNSAccess"
              onChange={(v) => handleChange("domainDNSAccess", v)}
              options={[
                ["yes", "Yes, I have full access"],
                ["limited", "Limited access (I can request changes)"],
                ["no", "No access"],
                ["unsure", "I'm not sure"],
                ...(isExtension
                  ? ([
                      [
                        "not-applicable",
                        "Not applicable (Chrome extension only)",
                      ],
                    ] as [string, string][])
                  : []),
              ]}
              required={!isExtension}
              value={formData.domainDNSAccess}
            />
            <Chips
              label="Where would you like to host? *"
              name="hostingPreference"
              onChange={(v) => handleChange("hostingPreference", v)}
              options={[
                ["github-pages", "GitHub Pages (Recommended - Free)"],
                ["aws", "AWS"],
                ["gcp", "Google Cloud Platform (GCP)"],
                ["vercel", "Vercel"],
                ["netlify", "Netlify"],
                ["other", "Other / Not sure"],
              ]}
              value={formData.hostingPreference}
            />
          </Group>

          <Group number="04" title="Timeline and budget">
            <Chips
              label="Project Timeline *"
              name="projectTimeline"
              onChange={(v) => handleChange("projectTimeline", v)}
              options={[
                ["asap", "ASAP / Urgent"],
                ["1-month", "Within 1 month"],
                ["2-3-months", "2-3 months"],
                ["3-6-months", "3-6 months"],
                ["flexible", "Flexible / No rush"],
              ]}
              value={formData.projectTimeline}
            />
            <Chips
              label="Budget Range *"
              name="budget"
              onChange={(v) => handleChange("budget", v)}
              options={[
                ["3.5k-5k", "$3,500 - $5,000"],
                ["5k-8k", "$5,000 - $8,000"],
                ["8k-10k", "$8,000 - $10,000"],
                ["10k-25k", "$10,000 - $25,000"],
                ["25k-plus", "$25,000+"],
                ["discuss", "Prefer to discuss"],
              ]}
              value={formData.budget}
            />
            <div>
              <label className={labelClass} htmlFor="additionalInfo">
                Additional Information
              </label>
              <textarea
                className={fieldClass}
                id="additionalInfo"
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                rows={5}
                value={formData.additionalInfo}
              />
            </div>
          </Group>

          <div className="flex flex-col gap-4 border-white/10 border-t pt-10 sm:flex-row sm:items-center">
            <button
              className={`rounded-full px-6 py-3 disabled:opacity-60 ${brandClasses.ctaPrimary}`}
              disabled={isSubmitting || submitStatus === "success"}
              type="submit"
            >
              {submitLabel}
            </button>
            {submitStatus === "success" && (
              <p className="text-green-400 text-sm" role="status">
                We'll be in touch soon!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-400 text-sm" role="alert">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </div>
        </form>

        <section className="mt-16 self-start lg:col-start-1 lg:row-start-2 lg:mt-14">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <div className="mt-4 border-white/10 border-t">
            {FAQS.map((faq) => (
              <details className="group border-white/10 border-b" key={faq.q}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[#f3efe6] text-sm [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="font-mono text-[#f3efe6]/50 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-3 pb-5 text-[#f3efe6]/65 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
