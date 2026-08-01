export type ProjectLinkIcon = "github" | "chrome" | "external" | "globe" | "npm" | "message"

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
  icon?: ProjectLinkIcon
  /** Client-side action instead of navigation */
  action?: "open-chat"
}

export type ProjectLogoIcon = "message"

export type Project = {
  id: string
  name: string
  description: string
  logo: string
  logoClassName?: string
  /** Render a themed icon mark instead of an image logo */
  logoIcon?: ProjectLogoIcon
  /** Optional workflow/UI screenshot shown in the project card */
  preview?: string
  previewAlt?: string
  /** Quiet social-proof line under the description */
  metrics?: string
  tags: string[]
  links: ProjectLink[]
  /** Used in JSON-LD / SEO */
  schemaType?: "SoftwareApplication" | "WebApplication" | "WebSite"
}

export const PROJECTS: Project[] = [
  {
    id: "suitepreferences",
    name: "SuitePreferences",
    description:
      "A Chrome extension that enhances your NetSuite experience with customizable preferences and productivity features.",
    logo: "/suitepreferences.png",
    logoClassName: "h-8 w-8 object-contain rounded-md bg-white",
    preview: "/suitepreferences-preview.jpg",
    previewAlt: "SuitePreferences for NetSuite on the Chrome Web Store with product screenshots and ratings",
    metrics: "5.0 ★ · 500+ users",
    tags: ["Chrome Extension", "NetSuite"],
    schemaType: "SoftwareApplication",
    links: [
      {
        label: "Visit Website",
        href: "https://www.suitepreferences.com/",
        external: true,
        icon: "external",
      },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/suitepreferences-for-nets/gdaohblaiiefllpkhpolbfeiacbpommo",
        external: true,
        icon: "chrome",
      },
    ],
  },
  {
    id: "opensuitemcp",
    name: "OpenSuiteMCP",
    description:
      "An open-source AI assistant for NetSuite that helps you work smarter with intelligent automation and insights.",
    logo: "/opensuitemcp.svg",
    logoClassName: "h-8 w-8 object-contain",
    preview: "/opensuitemcp-preview.jpg",
    previewAlt: "OpenSuiteMCP Ava chat interface asking about NetSuite data with Gemini Flash model selected",
    tags: ["AI Assistant", "Open Source", "NetSuite"],
    schemaType: "SoftwareApplication",
    links: [
      {
        label: "Try the app",
        href: "https://opensuitemcp.com/",
        external: true,
        icon: "external",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/opensuitemcp/opensuitemcp",
        external: true,
        icon: "github",
      },
    ],
  },
  {
    id: "opendental-n8n",
    name: "Open Dental for n8n",
    description:
      "An n8n community node for the Open Dental REST API — automate patients, appointments, payments, and more.",
    logo: "/opendental-node.svg",
    logoClassName: "h-8 w-8 object-contain rounded-md",
    preview: "/opendental-node-preview.jpg",
    previewAlt: "n8n-nodes-opendental package page on npmjs.com with install instructions and weekly downloads",
    metrics: "400+ weekly downloads",
    tags: ["n8n", "Open Dental", "Community Node"],
    schemaType: "SoftwareApplication",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/unstackedapps/n8n-nodes-opendental",
        external: true,
        icon: "github",
      },
      {
        label: "View on npm",
        href: "https://www.npmjs.com/package/n8n-nodes-opendental",
        external: true,
        icon: "npm",
      },
    ],
  },
  {
    id: "branchandblooms",
    name: "Branch & Blooms Co.",
    description:
      "A custom website for an Etsy-based handmade wood craft business — collections, story, and shop links, hosted on bare metal.",
    logo: "/branchandbloomsco.png",
    logoClassName: "h-8 w-8 object-contain",
    preview: "/branchandbloomsco-preview.jpg",
    previewAlt: "Branch & Blooms Co. website homepage with handmade wood craft hero and shop CTAs",
    tags: ["Website", "Etsy", "Bare Metal"],
    schemaType: "WebSite",
    links: [
      {
        label: "Visit Website",
        href: "https://www.branchandbloomsco.com/",
        external: true,
        icon: "external",
      },
    ],
  },
  {
    id: "site-chat",
    name: "Site Chat",
    description:
      "A branded contact chat widget wired to an n8n workflow — validates messages, stores them, and delivers instant Google Chat alerts.",
    logo: "/logo.svg",
    logoIcon: "message",
    preview: "/site-chat-workflow.jpg",
    previewAlt: "n8n workflow for Unstacked Apps Site Chat: webhook, validation, data table, and Google Chat notification",
    tags: ["n8n", "Google Chat", "React"],
    schemaType: "WebApplication",
    links: [
      {
        label: "Try the chat",
        href: "#chat",
        external: false,
        icon: "message",
        action: "open-chat",
      },
    ],
  },
  {
    id: "this-website",
    name: "This Website",
    description:
      "A production-ready single-page application built with React, Vite, and Tailwind CSS. Deployed on GitHub Pages with a custom domain.",
    logo: "/logo.svg",
    logoClassName: "h-8 w-8 object-contain dark:brightness-0 dark:invert",
    preview: "/unstackedapps-preview.jpg",
    previewAlt: "Unstacked Apps homepage hero with Apps. AI. Open Source. headline and technology logos",
    tags: ["React", "SPA", "GitHub Pages"],
    schemaType: "WebApplication",
    links: [
      {
        label: "View SPA Examples",
        href: "/spa-showcase",
        external: false,
        icon: "globe",
      },
    ],
  },
]

/** External project URLs for SEO sameAs / footer backlinks (excludes internal-only pages). */
export const PROJECT_BACKLINKS = PROJECTS.flatMap((project) =>
  project.links
    .filter((link) => link.external && link.href.startsWith("http"))
    .map((link) => ({
      projectName: project.name,
      label: link.label,
      href: link.href,
    }))
)
