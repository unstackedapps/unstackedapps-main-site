// Site configuration constants
export const SITE_CONFIG = {
  author: {
    linkedIn: "https://www.linkedin.com/in/caleb-moore-90528120a/",
    name: "Caleb Moore",
  },
  /** n8n webhook for the floating contact chat (override with VITE_CHAT_WEBHOOK_URL) */
  chatWebhookUrl:
    (import.meta.env.VITE_CHAT_WEBHOOK_URL as string | undefined) ?? "",
  companyName: "Unstacked Apps LLC",
  contactEmail: "contact@unstackedapps.com",
  keywords: [
    "Unstacked Apps",
    "Chrome extensions",
    "NetSuite",
    "SuitePreferences",
    "OpenSuiteMCP",
    "n8n",
    "Open Dental",
    "n8n-nodes-opendental",
    "SPA development",
    "AI applications",
    "custom websites",
    "Branch and Blooms Co",
  ],
  locale: "en_US",
  ogImage: "https://www.unstackedapps.com/og-image.png",
  siteDescription:
    "Unstacked Apps builds Chrome extensions, SPAs, AI assistants, and n8n community nodes — including SuitePreferences, OpenSuiteMCP, Open Dental for n8n, and custom business websites.",
  siteName: "Unstacked Apps",
  siteUrl: "https://www.unstackedapps.com",
  social: {
    github: "https://github.com/unstackedapps",
    linkedIn: "https://www.linkedin.com/in/caleb-moore-90528120a/",
  },
} as const;
