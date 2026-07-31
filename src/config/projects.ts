export type ProjectLinkIcon = "github" | "chrome" | "external" | "globe" | "npm"

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
  icon?: ProjectLinkIcon
}

export type Project = {
  id: string
  name: string
  description: string
  logo: string
  logoClassName?: string
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
    tags: ["AI Assistant", "Open Source", "NetSuite"],
    schemaType: "SoftwareApplication",
    links: [
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
    id: "this-website",
    name: "This Website",
    description:
      "A production-ready single-page application built with React, Vite, and Tailwind CSS. Deployed on GitHub Pages with a custom domain.",
    logo: "/logo.svg",
    logoClassName: "h-8 w-8 object-contain dark:brightness-0 dark:invert",
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
