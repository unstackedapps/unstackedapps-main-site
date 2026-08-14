// Technologies used across our projects
export interface Technology {
  category: string;
  name: string;
  url: string;
}

export interface TechnologyCategory {
  name: string;
  technologies: Technology[];
}

export const technologies: Technology[] = [
  // Core Framework & Runtime
  { category: "Frontend", name: "React", url: "https://react.dev" },
  {
    category: "Frontend",
    name: "React Router",
    url: "https://reactrouter.com",
  },
  { category: "Frontend", name: "Next.js", url: "https://nextjs.org" },
  { category: "Build Tools", name: "Vite", url: "https://vitejs.dev" },
  {
    category: "Language",
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  { category: "Runtime", name: "Node.js", url: "https://nodejs.org" },

  // UI Components & Styling
  { category: "Styling", name: "Tailwind CSS", url: "https://tailwindcss.com" },
  {
    category: "UI Components",
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
  },
  {
    category: "UI Components",
    name: "Radix UI",
    url: "https://www.radix-ui.com",
  },
  {
    category: "Animation",
    name: "Framer Motion",
    url: "https://www.framer.com/motion",
  },
  { category: "Icons", name: "Lucide React", url: "https://lucide.dev" },
  {
    category: "UI Components",
    name: "react-day-picker",
    url: "https://react-day-picker.js.org",
  },
  {
    category: "Utilities",
    name: "class-variance-authority",
    url: "https://cva.style",
  },
  {
    category: "Utilities",
    name: "clsx",
    url: "https://github.com/lukeed/clsx",
  },
  {
    category: "Utilities",
    name: "tailwind-merge",
    url: "https://github.com/dcastil/tailwind-merge",
  },

  // AI & ML
  { category: "AI", name: "Vercel AI SDK", url: "https://sdk.vercel.ai" },
  { category: "AI", name: "Google Gemini", url: "https://ai.google.dev" },
  { category: "AI", name: "OpenAI", url: "https://openai.com" },

  // Database & ORM
  {
    category: "Database",
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
  },
  {
    category: "Database",
    name: "Drizzle ORM",
    url: "https://orm.drizzle.team",
  },
  { category: "Database", name: "Redis", url: "https://redis.io" },

  // Authentication
  {
    category: "Authentication",
    name: "NextAuth.js",
    url: "https://next-auth.js.org",
  },

  // Code Editing & Syntax
  {
    category: "Tools",
    name: "Monaco Editor",
    url: "https://microsoft.github.io/monaco-editor",
  },
  { category: "Tools", name: "CodeMirror", url: "https://codemirror.net" },
  { category: "Tools", name: "Prism.js", url: "https://prismjs.com" },
  { category: "Tools", name: "Shiki", url: "https://shiki.matsu.io" },
  { category: "Tools", name: "Marked.js", url: "https://marked.js.org" },

  // Validation & Utilities
  { category: "Utilities", name: "Zod", url: "https://zod.dev" },
  { category: "Utilities", name: "date-fns", url: "https://date-fns.org" },
  { category: "Utilities", name: "SWR", url: "https://swr.vercel.app" },

  // Chrome Extension
  {
    category: "Platform",
    name: "Chrome Extension API",
    url: "https://developer.chrome.com/docs/extensions",
  },
  {
    category: "Platform",
    name: "Manifest V3",
    url: "https://developer.chrome.com/docs/extensions/mv3",
  },

  // Data Visualization
  { category: "Tools", name: "React Flow", url: "https://reactflow.dev" },
  {
    category: "Tools",
    name: "React Data Grid",
    url: "https://adazzle.github.io/react-data-grid",
  },

  // Infrastructure
  {
    category: "Hosting",
    name: "GitHub Pages",
    url: "https://pages.github.com",
  },
  { category: "Hosting", name: "Vercel", url: "https://vercel.com" },
  { category: "Infrastructure", name: "Docker", url: "https://www.docker.com" },
  {
    category: "CI/CD",
    name: "GitHub Actions",
    url: "https://github.com/features/actions",
  },

  // Code Quality
  { category: "Tools", name: "ESLint", url: "https://eslint.org" },
  { category: "Tools", name: "Prettier", url: "https://prettier.io" },
  { category: "Tools", name: "Biome", url: "https://biomejs.dev" },

  // Observability
  { category: "Tools", name: "OpenTelemetry", url: "https://opentelemetry.io" },
  {
    category: "Tools",
    name: "Vercel Analytics",
    url: "https://vercel.com/analytics",
  },
];

// Group technologies by category
export const technologiesByCategory: TechnologyCategory[] = [
  {
    name: "Frontend",
    technologies: technologies.filter((t) => t.category === "Frontend"),
  },
  {
    name: "Styling & UI",
    technologies: technologies.filter(
      (t) =>
        t.category === "Styling" ||
        t.category === "UI Components" ||
        t.category === "Animation" ||
        t.category === "Icons"
    ),
  },
  {
    name: "Language & Runtime",
    technologies: technologies.filter(
      (t) => t.category === "Language" || t.category === "Runtime"
    ),
  },
  {
    name: "Build Tools",
    technologies: technologies.filter((t) => t.category === "Build Tools"),
  },
  {
    name: "AI & ML",
    technologies: technologies.filter((t) => t.category === "AI"),
  },
  {
    name: "Database",
    technologies: technologies.filter((t) => t.category === "Database"),
  },
  {
    name: "Authentication",
    technologies: technologies.filter((t) => t.category === "Authentication"),
  },
  {
    name: "Development Tools",
    technologies: technologies.filter((t) => t.category === "Tools"),
  },
  {
    name: "Utilities",
    technologies: technologies.filter((t) => t.category === "Utilities"),
  },
  {
    name: "Platform",
    technologies: technologies.filter((t) => t.category === "Platform"),
  },
  {
    name: "Infrastructure",
    technologies: technologies.filter(
      (t) =>
        t.category === "Hosting" ||
        t.category === "Infrastructure" ||
        t.category === "CI/CD"
    ),
  },
].filter((category) => category.technologies.length > 0);
