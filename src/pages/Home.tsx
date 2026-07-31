import { useEffect, useRef, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Chrome, Sparkles, Zap, Code, Rocket, Mail, ExternalLink, Github, Globe, Linkedin, MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/config/constants"
import { PROJECTS, PROJECT_BACKLINKS, type ProjectLink } from "@/config/projects"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"
import { Seo } from "@/components/Seo"
import { technologiesByCategory } from "@/config/technologies"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero"

function ProjectLinkIcon({ icon }: { icon?: ProjectLink["icon"] }) {
  switch (icon) {
    case "github":
      return <Github className="mr-2 h-4 w-4" />
    case "chrome":
      return <Chrome className="mr-2 h-4 w-4" />
    case "globe":
      return <Globe className="mr-2 h-4 w-4" />
    case "message":
      return <MessageCircle className="mr-2 h-4 w-4" />
    default:
      return null
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
  )

  if (link.action === "open-chat") {
    return (
      <Button
        key={link.href}
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"))}
      >
        {content}
      </Button>
    )
  }

  if (link.external === false) {
    return (
      <Button key={link.href} asChild variant="outline" className="w-full">
        <Link to={link.href}>{content}</Link>
      </Button>
    )
  }

  return (
    <Button key={link.href} asChild variant="outline" className="w-full">
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </Button>
  )
}

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
}

export function Home() {
  const navRef = useRef<HTMLElement>(null)
  const [previewProject, setPreviewProject] = useState<(typeof PROJECTS)[number] | null>(null)

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight
        document.documentElement.style.setProperty('--header-height', `${height}px`)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Seo path="/" />

      {/* Navigation */}
      <motion.nav 
        ref={navRef}
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        aria-label="Primary"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="brand-wrapper">
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
          <div className="flex items-center gap-3">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="icon" asChild>
                <a
                  href={SITE_CONFIG.social.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Caleb Moore on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Unstacked Apps on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroGeometric
        title1="Apps. AI."
        title2="Open Source."
        description={
          <>
            <p className="mb-3">
              <span className="text-foreground font-medium">Chrome extensions</span>,{" "}
              <span className="text-foreground font-medium">AI assistants</span>,{" "}
              <span className="text-foreground font-medium">single-page applications</span> and{" "}
              <span className="text-foreground font-medium">end-to-end integrations</span>.
            </p>
            <p className="text-muted-foreground/80">
              Built with modern tools and open source technologies.
            </p>
          </>
        }
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center">
          <Button size="lg" className="text-lg w-auto" asChild>
            <a href="#projects">Explore Our Projects</a>
          </Button>
          <Button size="lg" variant="outline" className="text-lg w-auto" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </HeroGeometric>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30">
              Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools and modern web applications
            </p>
          </motion.div>
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {PROJECTS.map((project) => {
              return (
                <motion.div key={project.id} variants={cardVariants} className="h-full">
                  <Card className="hover:shadow-lg transition-shadow flex flex-col h-full overflow-hidden">
                    {project.preview && (
                      <button
                        type="button"
                        onClick={() => setPreviewProject(project)}
                        className="group relative block w-full border-b border-border/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`View larger screenshot of ${project.name}`}
                      >
                        <img
                          src={project.preview}
                          alt={project.previewAlt ?? `${project.name} preview`}
                          className="aspect-[2/1] w-full object-cover object-left-top transition-opacity group-hover:opacity-90"
                        />
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent px-3 py-2 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          Click to enlarge
                        </span>
                      </button>
                    )}
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {project.logoIcon === "message" ? (
                          <span
                            aria-hidden="true"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/40 bg-secondary shadow-sm"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </span>
                        ) : (
                          <img
                            src={project.logo}
                            alt={`${project.name} logo`}
                            className={project.logoClassName ?? "h-8 w-8 object-contain"}
                          />
                        )}
                        <CardTitle className="text-2xl">{project.name}</CardTitle>
                      </div>
                      <CardDescription className="text-base min-h-[3rem]">
                        {project.description}
                      </CardDescription>
                      {project.metrics && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          {project.metrics}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-secondary rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          {project.links.map((link) => renderProjectLink(link))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <Dialog open={!!previewProject} onOpenChange={(open) => !open && setPreviewProject(null)}>
        <DialogContent className="max-w-4xl border-border/40 p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{previewProject?.name}</DialogTitle>
            <DialogDescription>
              {previewProject?.previewAlt ?? "Project workflow screenshot"}
            </DialogDescription>
          </DialogHeader>
          {previewProject?.preview && (
            <img
              src={previewProject.preview}
              alt={previewProject.previewAlt ?? `${previewProject.name} preview`}
              className="w-full object-contain bg-black/40"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30">
              What We Build
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Chrome extensions, AI assistants, and single-page applications designed to streamline your workflow.
            </p>
          </motion.div>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Chrome className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Chrome Extensions</CardTitle>
                  <CardDescription>
                    Powerful browser extensions that enhance your web experience and boost productivity
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI Assistants</CardTitle>
                  <CardDescription>
                    Intelligent AI-powered tools that help you work smarter and accomplish more
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Single-Page Applications</CardTitle>
                  <CardDescription>
                    Fast, modern SPAs built with React, deployed on GitHub Pages with custom domains. Quick to production.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Fast & Reliable</CardTitle>
                  <CardDescription>
                    Built with modern technologies for speed, security, and seamless user experience
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Code className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Clean Code</CardTitle>
                  <CardDescription>
                    Well-architected solutions that are maintainable, scalable, and future-proof
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={cardVariants} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <Rocket className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Open Source Powered</CardTitle>
                  <CardDescription>
                    Built with highly supported open source tools and best practices for reliability and maintainability
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button size="lg" className="text-lg" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30">
              Technologies We Use
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Modern, well-supported open source tools powering our applications
            </p>
          </motion.div>
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {technologiesByCategory.map((category) => (
              <motion.div 
                key={category.name} 
                className="w-full max-w-sm"
                variants={cardVariants}
              >
                <h3 className="text-lg font-semibold mb-3 text-center">{category.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.technologies.map((tech) => (
                    <a
                      key={tech.name}
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors"
                    >
                      {tech.name}
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <Card className="border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg mt-4">
                Discover our projects or get in touch to discuss your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-lg" asChild>
                <a href="#projects">View Our Projects</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <Link to="/" className="brand-wrapper w-fit">
                <img 
                  src="/logo.svg" 
                  alt="Unstacked Apps" 
                  className="brand-logo brand-logo-footer"
                />
                <div className="brand-container brand-container-footer">
                  <span className="brand-name brand-name-footer">
                    <span className="brand-name-thin">un</span>stacked
                  </span>
                  <span className="brand-subtitle brand-subtitle-footer">apps</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                {SITE_CONFIG.siteDescription}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={SITE_CONFIG.social.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Caleb Moore on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={SITE_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Unstacked Apps on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    aria-label="Email Unstacked Apps"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
                Projects
              </h2>
              <ul className="space-y-2 text-sm">
                {PROJECTS.filter((p) => p.id !== "this-website").map((project) => {
                  const primary =
                    project.links.find((l) => l.action === "open-chat") ??
                    project.links.find((l) => l.external) ??
                    project.links[0]

                  if (primary.action === "open-chat") {
                    return (
                      <li key={project.id}>
                        <button
                          type="button"
                          onClick={() => window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"))}
                          className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                        >
                          {project.name}
                        </button>
                      </li>
                    )
                  }

                  return (
                    <li key={project.id}>
                      <a
                        href={primary.href}
                        target={primary.external === false ? undefined : "_blank"}
                        rel={primary.external === false ? undefined : "noopener noreferrer"}
                        className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                      >
                        {project.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
                Links
              </h2>
              <ul className="space-y-2 text-sm">
                {PROJECT_BACKLINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                    >
                      {link.projectName} — {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={SITE_CONFIG.social.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                  >
                    LinkedIn — {SITE_CONFIG.author.name}
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-foreground/90 hover:text-foreground underline-offset-4 hover:underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.companyName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

