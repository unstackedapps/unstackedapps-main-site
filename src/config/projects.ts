export type ProjectCategory = "netsuite" | "automation" | "web";

export interface ProjectSection {
  description: string;
  eyebrow: string;
  id: ProjectCategory;
  title: string;
}

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    description:
      "Browser extensions and AI assistants that make NetSuite faster to work in every day.",
    eyebrow: "Enterprise",
    id: "netsuite",
    title: "NetSuite Platform",
  },
  {
    description:
      "n8n nodes and chat workflows that connect your stack and move data where it needs to go.",
    eyebrow: "Integrations",
    id: "automation",
    title: "Workflow Automation",
  },
  {
    description:
      "Custom sites and production SPAs — designed, built, and deployed to real users.",
    eyebrow: "Shipped",
    id: "web",
    title: "Websites & Applications",
  },
];

export type ProjectLinkIcon =
  | "github"
  | "chrome"
  | "external"
  | "globe"
  | "npm"
  | "message";

export interface ProjectLink {
  /** Client-side action instead of navigation */
  action?: "open-chat";
  external?: boolean;
  href: string;
  icon?: ProjectLinkIcon;
  label: string;
}

export type ProjectLogoIcon = "message";

export interface Project {
  /** Primary section on the homepage */
  category: ProjectCategory;
  description: string;
  id: string;
  links: ProjectLink[];
  logo: string;
  logoClassName?: string;
  /** Render a themed icon mark instead of an image logo */
  logoIcon?: ProjectLogoIcon;
  /** Quiet social-proof line under the description */
  metrics?: string;
  name: string;
  /** Optional workflow/UI screenshot shown in the project card */
  preview?: string;
  previewAlt?: string;
  /** Used in JSON-LD / SEO */
  schemaType?: "SoftwareApplication" | "WebApplication" | "WebSite";
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    category: "netsuite",
    description:
      "A Chrome extension that enhances your NetSuite experience with customizable preferences and productivity features.",
    id: "suitepreferences",
    links: [
      {
        external: true,
        href: "https://www.suitepreferences.com/",
        icon: "external",
        label: "Visit Website",
      },
      {
        external: true,
        href: "https://chromewebstore.google.com/detail/suitepreferences-for-nets/gdaohblaiiefllpkhpolbfeiacbpommo",
        icon: "chrome",
        label: "Chrome Web Store",
      },
    ],
    logo: "/suitepreferences.png",
    logoClassName: "h-8 w-8 object-contain rounded-md bg-white",
    metrics: "5.0 ★ · 500+ users",
    name: "SuitePreferences",
    preview: "/suitepreferences-preview.jpg",
    previewAlt:
      "SuitePreferences for NetSuite on the Chrome Web Store with product screenshots and ratings",
    schemaType: "SoftwareApplication",
    tags: ["Chrome Extension", "NetSuite"],
  },
  {
    category: "netsuite",
    description:
      "An open-source AI assistant for NetSuite that helps you work smarter with intelligent automation and insights.",
    id: "opensuitemcp",
    links: [
      {
        external: true,
        href: "https://opensuitemcp.com/",
        icon: "external",
        label: "Try the app",
      },
      {
        external: true,
        href: "https://github.com/opensuitemcp/opensuitemcp",
        icon: "github",
        label: "View on GitHub",
      },
    ],
    logo: "/opensuitemcp.svg",
    logoClassName: "h-8 w-8 object-contain",
    name: "OpenSuiteMCP",
    preview: "/opensuitemcp-preview.jpg",
    previewAlt:
      "OpenSuiteMCP Ava chat interface asking about NetSuite data with Gemini Flash model selected",
    schemaType: "SoftwareApplication",
    tags: ["AI Assistant", "Open Source", "NetSuite"],
  },
  {
    category: "automation",
    description:
      "An n8n community node for the Open Dental REST API — automate patients, appointments, payments, and more.",
    id: "opendental-n8n",
    links: [
      {
        external: true,
        href: "https://github.com/unstackedapps/n8n-nodes-opendental",
        icon: "github",
        label: "View on GitHub",
      },
      {
        external: true,
        href: "https://www.npmjs.com/package/n8n-nodes-opendental",
        icon: "npm",
        label: "View on npm",
      },
    ],
    logo: "/opendental-node.svg",
    logoClassName: "h-8 w-8 object-contain rounded-md",
    metrics: "400+ weekly downloads",
    name: "Open Dental for n8n",
    preview: "/opendental-node-preview.jpg",
    previewAlt:
      "n8n-nodes-opendental package page on npmjs.com with install instructions and weekly downloads",
    schemaType: "SoftwareApplication",
    tags: ["n8n", "Open Dental", "Community Node"],
  },
  {
    category: "web",
    description:
      "A custom website for an Etsy-based handmade wood craft business — collections, story, and shop links, hosted on bare metal.",
    id: "branchandblooms",
    links: [
      {
        external: true,
        href: "https://www.branchandbloomsco.com/",
        icon: "external",
        label: "Visit Website",
      },
    ],
    logo: "/branchandbloomsco.png",
    logoClassName: "h-8 w-8 object-contain",
    name: "Branch & Blooms Co.",
    preview: "/branchandbloomsco-preview.jpg",
    previewAlt:
      "Branch & Blooms Co. website homepage with handmade wood craft hero and shop CTAs",
    schemaType: "WebSite",
    tags: ["Website", "Etsy", "Bare Metal"],
  },
  {
    category: "automation",
    description:
      "A branded contact chat widget wired to an n8n workflow — validates messages, stores them, and delivers instant Google Chat alerts.",
    id: "site-chat",
    links: [
      {
        action: "open-chat",
        external: false,
        href: "#chat",
        icon: "message",
        label: "Try the chat",
      },
    ],
    logo: "/logo.svg",
    logoIcon: "message",
    name: "Site Chat",
    preview: "/site-chat-workflow.jpg",
    previewAlt:
      "n8n workflow for Unstacked Apps Site Chat: webhook, validation, data table, and Google Chat notification",
    schemaType: "WebApplication",
    tags: ["n8n", "Google Chat", "React"],
  },
  {
    category: "web",
    description:
      "A production-ready single-page application built with React, Vite, and Tailwind CSS. Deployed on GitHub Pages with a custom domain.",
    id: "this-website",
    links: [
      {
        external: false,
        href: "/spa-showcase",
        icon: "globe",
        label: "View SPA Examples",
      },
    ],
    logo: "/logo.svg",
    logoClassName: "h-8 w-8 object-contain dark:brightness-0 dark:invert",
    name: "This Website",
    preview: "/unstackedapps-preview.png",
    previewAlt:
      "Unstacked Apps homepage hero with Apps. AI. Shipped. headline and code editor demo",
    schemaType: "WebApplication",
    tags: ["React", "SPA", "GitHub Pages"],
  },
];

export function projectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

/** External project URLs for SEO sameAs / footer backlinks (excludes internal-only pages). */
export const PROJECT_BACKLINKS = PROJECTS.flatMap((project) =>
  project.links
    .filter((link) => link.external && link.href.startsWith("http"))
    .map((link) => ({
      href: link.href,
      label: link.label,
      projectName: project.name,
    }))
);
