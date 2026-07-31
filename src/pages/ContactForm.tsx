import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"
import { Seo } from "@/components/Seo"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function ContactForm() {
  // Prevent scroll restoration on page load
  useEffect(() => {
    // Set immediately
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Force scroll to top multiple times to override browser restoration
    window.scrollTo(0, 0)
    // Use requestAnimationFrame to ensure it happens after browser restoration
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      // Also set on next frame for good measure
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [])

  const [formData, setFormData] = useState({
    projectType: "",
    spaType: "",
    companySize: "",
    companyName: "",
    contactName: "",
    contactEmail: "",
    existingWebsite: "",
    companyUrl: "",
    existingGHAccount: "",
    githubUsername: "",
    domainDNSAccess: "",
    projectTimeline: "",
    budget: "",
    hostingPreference: "",
    resumeFeatures: "",
    aiUseCase: "",
    integrationPlatform: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  // Clear domainDNSAccess if it's "not-applicable" and project type changes away from chrome-extension
  useEffect(() => {
    if (formData.projectType !== "chrome-extension" && formData.domainDNSAccess === "not-applicable") {
      setFormData(prev => ({ ...prev, domainDNSAccess: "" }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.projectType])

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.projectType || !formData.companySize || 
        !formData.contactName || !formData.contactEmail || !formData.existingWebsite ||
        !formData.existingGHAccount || !formData.hostingPreference || 
        !formData.projectTimeline || !formData.budget) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    
    // Company name is only required if not an individual
    if (formData.companySize !== "individual" && !formData.companyName) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    
    // Domain DNS access is only required for web-based projects (not Chrome extensions)
    // Also reject "not-applicable" value for non-Chrome-extension projects
    if (formData.projectType !== "chrome-extension" && (!formData.domainDNSAccess || formData.domainDNSAccess === "not-applicable")) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    
    // Validate conditional required fields
    if (formData.projectType === "ai-assistant" && !formData.aiUseCase) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    if (formData.projectType === "ipaas-integration" && !formData.integrationPlatform) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }
    if (formData.projectType === "spa-landing" && !formData.spaType) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Get Formspree endpoint from environment variable
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID"
      
      // Send all fields individually so Formspree can use them in email templates
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Standard Formspree fields
          email: formData.contactEmail,
          name: formData.contactName,
          subject: `New Project Request: ${formData.projectType}`,
          _replyto: formData.contactEmail,
          
          // Custom form fields (Formspree will include all of these in the email)
          projectType: formData.projectType,
          spaType: formData.spaType || "",
          companySize: formData.companySize,
          companyName: formData.companyName,
          contactEmail: formData.contactEmail,
          existingWebsite: formData.existingWebsite,
          companyUrl: formData.companyUrl || "",
          existingGHAccount: formData.existingGHAccount,
          githubUsername: formData.githubUsername || "",
          domainDNSAccess: formData.domainDNSAccess,
          projectTimeline: formData.projectTimeline,
          budget: formData.budget,
          hostingPreference: formData.hostingPreference || "",
          resumeFeatures: formData.resumeFeatures || "",
          aiUseCase: formData.aiUseCase || "",
          integrationPlatform: formData.integrationPlatform || "",
          additionalInfo: formData.additionalInfo || "",
        }),
      })

      if (response.ok || response.status === 204) {
        setSubmitStatus("success")
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
          setFormData({
            projectType: "",
            spaType: "",
            companySize: "",
            companyName: "",
            contactName: "",
            contactEmail: "",
            existingWebsite: "",
            companyUrl: "",
            existingGHAccount: "",
            githubUsername: "",
            domainDNSAccess: "",
            projectTimeline: "",
            budget: "",
            hostingPreference: "",
            resumeFeatures: "",
            aiUseCase: "",
            integrationPlatform: "",
            additionalInfo: "",
          })
        }, 3000)
      } else {
        const errorText = await response.text()
        console.error("GitHub API error:", response.status, errorText)
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Seo
        title="Contact"
        description="Contact Unstacked Apps to discuss Chrome extensions, SPAs, AI assistants, n8n nodes, or custom website projects."
        path="/contact"
      />
      {/* Navigation */}
      <motion.nav 
        className="container mx-auto px-4 py-3 sm:py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-wrapper flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Unstacked Apps" 
              className="brand-logo"
            />
            <div className="brand-container">
              <span className="brand-name">
                <span className="brand-name-thin">un</span>stacked
              </span>
              <span className="brand-subtitle">apps</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="sm:size-default whitespace-nowrap" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <MobileMenu />
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <motion.section 
        className="container mx-auto px-4 py-8 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1 
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Let's Build Together
          </motion.h1>
          <motion.p 
            className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Tell us about your project—sites, extensions, AI assistants, integrations, or anything else—and we'll get back to you soon
          </motion.p>
        </div>
      </motion.section>

      {/* Form */}
      <motion.section 
        className="container mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Project Details</CardTitle>
              <CardDescription>
                Fill out the form below and we'll reach out to discuss your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Primary Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="projectType">What are you looking to build? *</Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chrome-extension">Chrome Extension</SelectItem>
                      <SelectItem value="resume-portfolio">Resume / Interactive Portfolio</SelectItem>
                      <SelectItem value="spa-landing">SPA Company Landing Page</SelectItem>
                      <SelectItem value="ai-assistant">AI Assistant / Application</SelectItem>
                      <SelectItem value="ipaas-integration">iPaaS Integration (n8n, etc.)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* SPA Type (conditional - only for SPA Landing) */}
                {formData.projectType === "spa-landing" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="spaType">What type of SPA landing page? *</Label>
                    <Select value={formData.spaType} onValueChange={(value) => handleChange("spaType", value)}>
                      <SelectTrigger id="spaType">
                        <SelectValue placeholder="Select a site type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company-landing">Company Landing Page</SelectItem>
                        <SelectItem value="product-landing">Product Landing Page</SelectItem>
                        <SelectItem value="service-landing">Service Landing Page</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                {/* Resume Features (conditional - only for Resume Portfolio) */}
                {formData.projectType === "resume-portfolio" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="resumeFeatures">What features would you like? (Select all that apply)</Label>
                    <Textarea
                      id="resumeFeatures"
                      value={formData.resumeFeatures}
                      onChange={(e) => handleChange("resumeFeatures", e.target.value)}
                      placeholder="e.g., Interactive scheduler, video 'About Me' section, project showcase, blog, contact form..."
                      rows={3}
                    />
                  </motion.div>
                )}

                {/* AI Use Case (conditional - only for AI Assistant) */}
                {formData.projectType === "ai-assistant" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="aiUseCase">What will the AI assistant be used for? *</Label>
                    <Textarea
                      id="aiUseCase"
                      value={formData.aiUseCase}
                      onChange={(e) => handleChange("aiUseCase", e.target.value)}
                      placeholder="Describe the use case, what problems it should solve, and any specific integrations needed..."
                      rows={4}
                      required
                    />
                  </motion.div>
                )}

                {/* Integration Platform (conditional - only for iPaaS Integration) */}
                {formData.projectType === "ipaas-integration" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="integrationPlatform">Which platform(s) do you want to integrate? *</Label>
                    <Textarea
                      id="integrationPlatform"
                      value={formData.integrationPlatform}
                      onChange={(e) => handleChange("integrationPlatform", e.target.value)}
                      placeholder="e.g., n8n, Zapier, Make.com, or custom integrations. Describe what needs to be connected..."
                      rows={3}
                      required
                    />
                  </motion.div>
                )}

                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual / Freelancer</SelectItem>
                      <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                      <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large Business (200+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company / Organization Name {formData.companySize !== "individual" ? "*" : ""}
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    placeholder={formData.companySize === "individual" ? "Leave blank if not applicable" : "Your company or organization name"}
                    required={formData.companySize !== "individual"}
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Your Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Existing Website */}
                <div className="space-y-3">
                  <Label>Do you have an existing website? *</Label>
                  <RadioGroup 
                    value={formData.existingWebsite} 
                    onValueChange={(value) => handleChange("existingWebsite", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="website-yes" />
                      <Label htmlFor="website-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="website-no" />
                      <Label htmlFor="website-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Company URL (conditional) */}
                {formData.existingWebsite === "yes" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="companyUrl">Current Website URL</Label>
                    <Input
                      id="companyUrl"
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => handleChange("companyUrl", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </motion.div>
                )}

                {/* Existing GitHub Account */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Do you have an existing GitHub account? *</Label>
                    <p className="text-xs text-muted-foreground">
                      We'll set up your project code in your GitHub organization so you own it 100%. If you don't have an account, we can help you create one (it's free).
                    </p>
                  </div>
                  <RadioGroup 
                    value={formData.existingGHAccount} 
                    onValueChange={(value) => handleChange("existingGHAccount", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="gh-yes" />
                      <Label htmlFor="gh-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="gh-no" />
                      <Label htmlFor="gh-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* GitHub Username (conditional) */}
                {formData.existingGHAccount === "yes" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="githubUsername">GitHub Username</Label>
                    <Input
                      id="githubUsername"
                      type="text"
                      value={formData.githubUsername}
                      onChange={(e) => handleChange("githubUsername", e.target.value)}
                      placeholder="your-github-username"
                    />
                  </motion.div>
                )}

                {/* Domain DNS Access */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="domainDNSAccess">
                      Do you have access to your domain's DNS settings? {formData.projectType !== "chrome-extension" ? "*" : ""}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {formData.projectType === "chrome-extension" 
                        ? "Only needed if you plan to host a website or landing page"
                        : "We need this to configure your domain to point to your hosting (e.g., GitHub Pages). If you're not sure, we can help you find this information."}
                    </p>
                  </div>
                  <Select value={formData.domainDNSAccess} onValueChange={(value) => handleChange("domainDNSAccess", value)}>
                    <SelectTrigger id="domainDNSAccess">
                      <SelectValue placeholder={formData.projectType === "chrome-extension" ? "Select if applicable" : "Select an option"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I have full access</SelectItem>
                      <SelectItem value="limited">Limited access (I can request changes)</SelectItem>
                      <SelectItem value="no">No access</SelectItem>
                      <SelectItem value="unsure">I'm not sure</SelectItem>
                      {formData.projectType === "chrome-extension" && (
                        <SelectItem value="not-applicable">Not applicable (Chrome extension only)</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hosting Preference */}
                <div className="space-y-2">
                  <Label htmlFor="hostingPreference">Where would you like to host? *</Label>
                  <Select value={formData.hostingPreference} onValueChange={(value) => handleChange("hostingPreference", value)}>
                    <SelectTrigger id="hostingPreference">
                      <SelectValue placeholder="Select hosting preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="github-pages">GitHub Pages (Recommended - Free)</SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="gcp">Google Cloud Platform (GCP)</SelectItem>
                      <SelectItem value="vercel">Vercel</SelectItem>
                      <SelectItem value="netlify">Netlify</SelectItem>
                      <SelectItem value="other">Other / Not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Timeline */}
                <div className="space-y-2">
                  <Label htmlFor="projectTimeline">Project Timeline *</Label>
                  <Select value={formData.projectTimeline} onValueChange={(value) => handleChange("projectTimeline", value)}>
                    <SelectTrigger id="projectTimeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP / Urgent</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="flexible">Flexible / No rush</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
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
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                    rows={5}
                  />
                </div>

                {/* FAQ Section */}
                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-2">
                    {/* FAQ Item 1 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "cost" ? null : "cost")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">How do you determine pricing and what are your payment terms?</span>
                        {openFAQ === "cost" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "cost" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground space-y-3">
                            <p>
                              Our pricing is delivered as a fixed project fee following a successful client vetting process (via our intake form). Our focus is on building and deploying high-performance Single Page Applications (SPAs) using open-source, React-based technologies.
                            </p>
                            <p>
                              Projects start at <strong className="text-foreground">$3,500</strong> and range up to <strong className="text-foreground">$8,000+</strong> depending on the complexity of features and required API integrations.
                            </p>
                            <div className="pt-2 border-t">
                              <p className="font-semibold text-foreground mb-2">Payment Structure:</p>
                              <p className="mb-2">
                                We operate on a <strong className="text-foreground">50/50 payment split</strong> to guarantee project commitment and secure your time:
                              </p>
                              <ul className="list-disc list-inside space-y-1.5 ml-2">
                                <li>
                                  <strong className="text-foreground">50% Non-Refundable Deposit:</strong> Due upon contract signing to secure your development slot and begin architectural setup.
                                </li>
                                <li>
                                  <strong className="text-foreground">50% Final Payment:</strong> Due upon client approval of the finished application on our staging environment, prior to final code transfer and domain configuration.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "hosting" ? null : "hosting")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">Where will the site be hosted?</span>
                        {openFAQ === "hosting" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "hosting" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            By default, we deploy to GitHub Pages (free hosting). This is perfect for most single-page applications and static sites. If you prefer AWS, Google Cloud Platform, Vercel, Netlify, or another hosting provider, we can discuss options and set it up on your preferred platform. You'll have full control over your hosting account.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "timeline" ? null : "timeline")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">How long does a project take?</span>
                        {openFAQ === "timeline" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "timeline" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            Project timelines vary based on complexity. Simple landing pages or Chrome extensions can be completed in 1-2 weeks. More complex projects like interactive resume portfolios or AI applications typically take 3-6 weeks. We'll provide a detailed timeline after reviewing your requirements and can work with your schedule.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "support" ? null : "support")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">Do you provide ongoing support?</span>
                        {openFAQ === "support" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "support" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            The initial project includes setup, deployment, and configuration. Once your project is live and you have access to everything, ongoing development work (new features, updates, changes) are handled as new contracts. This gives you full control and transparency - you only pay for work when you need it.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 5 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "technical" ? null : "technical")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">Do I need technical knowledge?</span>
                        {openFAQ === "technical" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "technical" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            No technical knowledge required! We handle all the setup, deployment, and configuration. You'll receive everything set up and ready to use. If you want to make changes later, you can either request updates (as new contracts) or, if you're comfortable, you'll have access to the codebase to make your own modifications.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 6 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "examples" ? null : "examples")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">Can I see examples of your work?</span>
                        {openFAQ === "examples" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "examples" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground">
                            This website is a prime example of what we can build! It's a single-page application built with React, TypeScript, and Tailwind CSS, deployed on GitHub Pages. You can also check out our <Link to="/spa-showcase" className="text-primary underline">SPA Examples</Link> page to see interactive demos of user management systems and professional resume portfolios.
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FAQ Item 7 */}
                    <div className="border rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOpenFAQ(openFAQ === "investment" ? null : "investment")}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">Why is the investment in a custom SPA higher than a standard website builder?</span>
                        {openFAQ === "investment" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openFAQ === "investment" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground space-y-3">
                            <p>
                              We don't just build a website; we engineer a turnkey, professional web application designed for speed, security, and long-term maintainability. Our price reflects the following key advantages that you own outright:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>
                                <strong className="text-foreground">Engineered Performance:</strong> We build using the latest React frameworks, delivering an unparalleled user experience and site speed that Google favors.
                              </li>
                              <li>
                                <strong className="text-foreground">Full Ownership & Control:</strong> You own the code 100% (in your GitHub organization). There are no vendor lock-ins, proprietary licenses, or monthly fees for the software we use.
                              </li>
                              <li>
                                <strong className="text-foreground">Zero-Maintenance Deployment:</strong> We configure a custom GitHub Actions CI/CD pipeline for you. This means any future developer can push a small update to the code and the site automatically updates globally—eliminating manual, error-prone deployment steps.
                              </li>
                              <li>
                                <strong className="text-foreground">Specialized Consulting:</strong> Our fee covers the architecture, setup, testing, and a personalized handover session to ensure you or your team can confidently manage the application going forward.
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    disabled={isSubmitting || submitStatus === "success"}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <span className="mr-2">✓</span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  {submitStatus === "success" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-green-600 dark:text-green-400 flex items-center"
                    >
                      We'll be in touch soon!
                    </motion.p>
                  )}
                  {submitStatus === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 dark:text-red-400 flex items-center"
                    >
                      Something went wrong. Please try again or email us directly.
                    </motion.p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}
