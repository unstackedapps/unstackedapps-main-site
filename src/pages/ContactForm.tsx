import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MarketingPageHeader,
  marketingCardClass,
} from "@/components/MarketingPageHeader";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

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

  return (
    <>
      <Seo
        description="Contact Unstacked Apps to discuss Chrome extensions, SPAs, AI assistants, n8n nodes, or custom website projects."
        path="/contact"
        title="Contact"
      />
      <SiteHeader backTo={{ href: "/", label: "Back to Home" }} />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <MarketingPageHeader
          description="Tell us about your project—sites, extensions, AI assistants, integrations, or anything else—and we'll get back to you soon."
          eyebrow="Get in touch"
          title="Let's Build Together"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Card className={marketingCardClass}>
            <CardHeader>
              <CardTitle
                className="text-2xl text-[#f3efe6]"
                style={{
                  fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                }}
              >
                Project Details
              </CardTitle>
              <CardDescription className="text-[#f3efe6]/65">
                Fill out the form below and we'll reach out to discuss your
                project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Primary Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="projectType">
                    What are you looking to build? *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange("projectType", value)
                    }
                    value={formData.projectType}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome-extension">
                        Chrome Extension
                      </SelectItem>
                      <SelectItem value="resume-portfolio">
                        Resume / Interactive Portfolio
                      </SelectItem>
                      <SelectItem value="spa-landing">
                        SPA Company Landing Page
                      </SelectItem>
                      <SelectItem value="ai-assistant">
                        AI Assistant / Application
                      </SelectItem>
                      <SelectItem value="ipaas-integration">
                        iPaaS Integration (n8n, etc.)
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* SPA Type (conditional - only for SPA Landing) */}
                {formData.projectType === "spa-landing" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="spaType">
                      What type of SPA landing page? *
                    </Label>
                    <Select
                      onValueChange={(value) => handleChange("spaType", value)}
                      value={formData.spaType}
                    >
                      <SelectTrigger id="spaType">
                        <SelectValue placeholder="Select a site type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company-landing">
                          Company Landing Page
                        </SelectItem>
                        <SelectItem value="product-landing">
                          Product Landing Page
                        </SelectItem>
                        <SelectItem value="service-landing">
                          Service Landing Page
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                {/* Resume Features (conditional - only for Resume Portfolio) */}
                {formData.projectType === "resume-portfolio" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="resumeFeatures">
                      What features would you like? (Select all that apply)
                    </Label>
                    <Textarea
                      id="resumeFeatures"
                      onChange={(e) =>
                        handleChange("resumeFeatures", e.target.value)
                      }
                      placeholder="e.g., Interactive scheduler, video 'About Me' section, project showcase, blog, contact form..."
                      rows={3}
                      value={formData.resumeFeatures}
                    />
                  </motion.div>
                )}

                {/* AI Use Case (conditional - only for AI Assistant) */}
                {formData.projectType === "ai-assistant" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="aiUseCase">
                      What will the AI assistant be used for? *
                    </Label>
                    <Textarea
                      id="aiUseCase"
                      onChange={(e) =>
                        handleChange("aiUseCase", e.target.value)
                      }
                      placeholder="Describe the use case, what problems it should solve, and any specific integrations needed..."
                      required
                      rows={4}
                      value={formData.aiUseCase}
                    />
                  </motion.div>
                )}

                {/* Integration Platform (conditional - only for iPaaS Integration) */}
                {formData.projectType === "ipaas-integration" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="integrationPlatform">
                      Which platform(s) do you want to integrate? *
                    </Label>
                    <Textarea
                      id="integrationPlatform"
                      onChange={(e) =>
                        handleChange("integrationPlatform", e.target.value)
                      }
                      placeholder="e.g., n8n, Zapier, Make.com, or custom integrations. Describe what needs to be connected..."
                      required
                      rows={3}
                      value={formData.integrationPlatform}
                    />
                  </motion.div>
                )}

                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange("companySize", value)
                    }
                    value={formData.companySize}
                  >
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">
                        Individual / Freelancer
                      </SelectItem>
                      <SelectItem value="startup">
                        Startup (1-10 employees)
                      </SelectItem>
                      <SelectItem value="small">
                        Small Business (11-50 employees)
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium Business (51-200 employees)
                      </SelectItem>
                      <SelectItem value="large">
                        Large Business (200+ employees)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company / Organization Name{" "}
                    {formData.companySize === "individual" ? "" : "*"}
                  </Label>
                  <Input
                    id="companyName"
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
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

                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    onChange={(e) =>
                      handleChange("contactName", e.target.value)
                    }
                    placeholder="Full name"
                    required
                    type="text"
                    value={formData.contactName}
                  />
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Your Email *</Label>
                  <Input
                    id="contactEmail"
                    onChange={(e) =>
                      handleChange("contactEmail", e.target.value)
                    }
                    placeholder="your.email@example.com"
                    required
                    type="email"
                    value={formData.contactEmail}
                  />
                </div>

                {/* Existing Website */}
                <div className="space-y-3">
                  <Label>Do you have an existing website? *</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      handleChange("existingWebsite", value)
                    }
                    value={formData.existingWebsite}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="website-yes" value="yes" />
                      <Label
                        className="cursor-pointer font-normal"
                        htmlFor="website-yes"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="website-no" value="no" />
                      <Label
                        className="cursor-pointer font-normal"
                        htmlFor="website-no"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Company URL (conditional) */}
                {formData.existingWebsite === "yes" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="companyUrl">Current Website URL</Label>
                    <Input
                      id="companyUrl"
                      onChange={(e) =>
                        handleChange("companyUrl", e.target.value)
                      }
                      placeholder="https://example.com"
                      type="url"
                      value={formData.companyUrl}
                    />
                  </motion.div>
                )}

                {/* Existing GitHub Account */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Do you have an existing GitHub account? *</Label>
                    <p className="text-muted-foreground text-xs">
                      We'll set up your project code in your GitHub organization
                      so you own it 100%. If you don't have an account, we can
                      help you create one (it's free).
                    </p>
                  </div>
                  <RadioGroup
                    onValueChange={(value) =>
                      handleChange("existingGHAccount", value)
                    }
                    value={formData.existingGHAccount}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="gh-yes" value="yes" />
                      <Label
                        className="cursor-pointer font-normal"
                        htmlFor="gh-yes"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="gh-no" value="no" />
                      <Label
                        className="cursor-pointer font-normal"
                        htmlFor="gh-no"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* GitHub Username (conditional) */}
                {formData.existingGHAccount === "yes" && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="githubUsername">GitHub Username</Label>
                    <Input
                      id="githubUsername"
                      onChange={(e) =>
                        handleChange("githubUsername", e.target.value)
                      }
                      placeholder="your-github-username"
                      type="text"
                      value={formData.githubUsername}
                    />
                  </motion.div>
                )}

                {/* Domain DNS Access */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="domainDNSAccess">
                      Do you have access to your domain's DNS settings?{" "}
                      {formData.projectType === "chrome-extension" ? "" : "*"}
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      {formData.projectType === "chrome-extension"
                        ? "Only needed if you plan to host a website or landing page"
                        : "We need this to configure your domain to point to your hosting (e.g., GitHub Pages). If you're not sure, we can help you find this information."}
                    </p>
                  </div>
                  <Select
                    onValueChange={(value) =>
                      handleChange("domainDNSAccess", value)
                    }
                    value={formData.domainDNSAccess}
                  >
                    <SelectTrigger id="domainDNSAccess">
                      <SelectValue
                        placeholder={
                          formData.projectType === "chrome-extension"
                            ? "Select if applicable"
                            : "Select an option"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">
                        Yes, I have full access
                      </SelectItem>
                      <SelectItem value="limited">
                        Limited access (I can request changes)
                      </SelectItem>
                      <SelectItem value="no">No access</SelectItem>
                      <SelectItem value="unsure">I'm not sure</SelectItem>
                      {formData.projectType === "chrome-extension" && (
                        <SelectItem value="not-applicable">
                          Not applicable (Chrome extension only)
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hosting Preference */}
                <div className="space-y-2">
                  <Label htmlFor="hostingPreference">
                    Where would you like to host? *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange("hostingPreference", value)
                    }
                    value={formData.hostingPreference}
                  >
                    <SelectTrigger id="hostingPreference">
                      <SelectValue placeholder="Select hosting preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="github-pages">
                        GitHub Pages (Recommended - Free)
                      </SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="gcp">
                        Google Cloud Platform (GCP)
                      </SelectItem>
                      <SelectItem value="vercel">Vercel</SelectItem>
                      <SelectItem value="netlify">Netlify</SelectItem>
                      <SelectItem value="other">Other / Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Timeline */}
                <div className="space-y-2">
                  <Label htmlFor="projectTimeline">Project Timeline *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange("projectTimeline", value)
                    }
                    value={formData.projectTimeline}
                  >
                    <SelectTrigger id="projectTimeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP / Urgent</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="flexible">
                        Flexible / No rush
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select
                    onValueChange={(value) => handleChange("budget", value)}
                    value={formData.budget}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3.5k-5k">$3,500 - $5,000</SelectItem>
                      <SelectItem value="5k-8k">$5,000 - $8,000</SelectItem>
                      <SelectItem value="8k-10k">$8,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-plus">$25,000+</SelectItem>
                      <SelectItem value="discuss">Prefer to discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    onChange={(e) =>
                      handleChange("additionalInfo", e.target.value)
                    }
                    placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                    rows={5}
                    value={formData.additionalInfo}
                  />
                </div>

                {/* FAQ Section */}
                <div className="mt-6 border-white/10 border-t pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#f3efe6]" />
                    <h3
                      className="font-semibold text-[#f3efe6] text-lg"
                      style={{
                        fontFamily:
                          "var(--font-raleway, 'Raleway', sans-serif)",
                      }}
                    >
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {/* FAQ Item 1 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(openFAQ === "cost" ? null : "cost")
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          How do you determine pricing and what are your payment
                          terms?
                        </span>
                        {openFAQ === "cost" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "cost" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="space-y-3 px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            <p>
                              Our pricing is delivered as a fixed project fee
                              following a successful client vetting process (via
                              our intake form). Our focus is on building and
                              deploying high-performance Single Page
                              Applications (SPAs) using open-source, React-based
                              technologies.
                            </p>
                            <p>
                              Projects start at{" "}
                              <strong className="text-foreground">
                                $3,500
                              </strong>{" "}
                              and range up to{" "}
                              <strong className="text-foreground">
                                $8,000+
                              </strong>{" "}
                              depending on the complexity of features and
                              required API integrations.
                            </p>
                            <div className="border-t pt-2">
                              <p className="mb-2 font-semibold text-foreground">
                                Payment Structure:
                              </p>
                              <p className="mb-2">
                                We operate on a{" "}
                                <strong className="text-foreground">
                                  50/50 payment split
                                </strong>{" "}
                                to guarantee project commitment and secure your
                                time:
                              </p>
                              <ul className="ml-2 list-inside list-disc space-y-1.5">
                                <li>
                                  <strong className="text-foreground">
                                    50% Non-Refundable Deposit:
                                  </strong>{" "}
                                  Due upon contract signing to secure your
                                  development slot and begin architectural
                                  setup.
                                </li>
                                <li>
                                  <strong className="text-foreground">
                                    50% Final Payment:
                                  </strong>{" "}
                                  Due upon client approval of the finished
                                  application on our staging environment, prior
                                  to final code transfer and domain
                                  configuration.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(openFAQ === "hosting" ? null : "hosting")
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          Where will the site be hosted?
                        </span>
                        {openFAQ === "hosting" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "hosting" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            By default, we deploy to GitHub Pages (free
                            hosting). This is perfect for most single-page
                            applications and static sites. If you prefer AWS,
                            Google Cloud Platform, Vercel, Netlify, or another
                            hosting provider, we can discuss options and set it
                            up on your preferred platform. You'll have full
                            control over your hosting account.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(openFAQ === "timeline" ? null : "timeline")
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          How long does a project take?
                        </span>
                        {openFAQ === "timeline" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "timeline" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            Project timelines vary based on complexity. Simple
                            landing pages or Chrome extensions can be completed
                            in 1-2 weeks. More complex projects like interactive
                            resume portfolios or AI applications typically take
                            3-6 weeks. We'll provide a detailed timeline after
                            reviewing your requirements and can work with your
                            schedule.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(openFAQ === "support" ? null : "support")
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          Do you provide ongoing support?
                        </span>
                        {openFAQ === "support" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "support" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            The initial project includes setup, deployment, and
                            configuration. Once your project is live and you
                            have access to everything, ongoing development work
                            (new features, updates, changes) are handled as new
                            contracts. This gives you full control and
                            transparency - you only pay for work when you need
                            it.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 5 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(
                            openFAQ === "technical" ? null : "technical"
                          )
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          Do I need technical knowledge?
                        </span>
                        {openFAQ === "technical" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "technical" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            No technical knowledge required! We handle all the
                            setup, deployment, and configuration. You'll receive
                            everything set up and ready to use. If you want to
                            make changes later, you can either request updates
                            (as new contracts) or, if you're comfortable, you'll
                            have access to the codebase to make your own
                            modifications.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 6 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(openFAQ === "examples" ? null : "examples")
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          Can I see examples of your work?
                        </span>
                        {openFAQ === "examples" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "examples" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            This website is a prime example of what we can
                            build! It's a single-page application built with
                            React, TypeScript, and Tailwind CSS, deployed on
                            GitHub Pages. You can also check out our{" "}
                            <Link
                              className="text-[#f3efe6] underline underline-offset-4"
                              to="/spa-showcase"
                            >
                              SPA Examples
                            </Link>{" "}
                            page to see interactive demos of user management
                            systems and professional resume portfolios.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 7 */}
                    <div className="rounded-lg border border-white/10">
                      <button
                        className="flex w-full items-center justify-between p-4 text-left text-[#f3efe6] transition-colors hover:bg-white/5"
                        onClick={() =>
                          setOpenFAQ(
                            openFAQ === "investment" ? null : "investment"
                          )
                        }
                        type="button"
                      >
                        <span className="font-medium">
                          Why is the investment in a custom SPA higher than a
                          standard website builder?
                        </span>
                        {openFAQ === "investment" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "investment" && (
                        <motion.div
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          initial={{ height: 0, opacity: 0 }}
                        >
                          <div className="space-y-3 px-4 pb-4 text-[#f3efe6]/65 text-sm">
                            <p>
                              We don't just build a website; we engineer a
                              turnkey, professional web application designed for
                              speed, security, and long-term maintainability.
                              Our price reflects the following key advantages
                              that you own outright:
                            </p>
                            <ul className="ml-2 list-inside list-disc space-y-2">
                              <li>
                                <strong className="text-foreground">
                                  Engineered Performance:
                                </strong>{" "}
                                We build using the latest React frameworks,
                                delivering an unparalleled user experience and
                                site speed that Google favors.
                              </li>
                              <li>
                                <strong className="text-foreground">
                                  Full Ownership & Control:
                                </strong>{" "}
                                You own the code 100% (in your GitHub
                                organization). There are no vendor lock-ins,
                                proprietary licenses, or monthly fees for the
                                software we use.
                              </li>
                              <li>
                                <strong className="text-foreground">
                                  Zero-Maintenance Deployment:
                                </strong>{" "}
                                We configure a custom GitHub Actions CI/CD
                                pipeline for you. This means any future
                                developer can push a small update to the code
                                and the site automatically updates
                                globally—eliminating manual, error-prone
                                deployment steps.
                              </li>
                              <li>
                                <strong className="text-foreground">
                                  Specialized Consulting:
                                </strong>{" "}
                                Our fee covers the architecture, setup, testing,
                                and a personalized handover session to ensure
                                you or your team can confidently manage the
                                application going forward.
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto"
                    disabled={isSubmitting || submitStatus === "success"}
                    size="lg"
                    type="submit"
                  >
                    {(() => {
                      if (isSubmitting) {
                        return <span className="mr-2">Sending...</span>;
                      }
                      if (submitStatus === "success") {
                        return (
                          <>
                            <span className="mr-2">✓</span>
                            Message Sent!
                          </>
                        );
                      }
                      return (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Request
                        </>
                      );
                    })()}
                  </Button>
                  {submitStatus === "success" && (
                    <motion.p
                      animate={{ opacity: 1 }}
                      className="flex items-center text-green-600 text-sm dark:text-green-400"
                      initial={{ opacity: 0 }}
                    >
                      We'll be in touch soon!
                    </motion.p>
                  )}
                  {submitStatus === "error" && (
                    <motion.p
                      animate={{ opacity: 1 }}
                      className="flex items-center text-red-600 text-sm dark:text-red-400"
                      initial={{ opacity: 0 }}
                    >
                      Something went wrong. Please try again or email us
                      directly.
                    </motion.p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
