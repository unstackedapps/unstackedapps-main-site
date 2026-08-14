// Static grid of tech logos for the hero side panel
const TECH_LOGOS = [
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    name: "React",
  },
  {
    invert: true,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reactrouter.svg",
    name: "React Router",
  },
  { invert: false, logo: "/logos/next-js.svg", name: "Next.js" },
  {
    invert: false,
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    name: "NextAuth.js",
  },
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    name: "TypeScript",
  },
  { invert: false, logo: "https://vitejs.dev/logo.svg", name: "Vite" },
  {
    invert: false,
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    name: "Tailwind CSS",
  },
  {
    invert: false,
    logo: "https://avatars.githubusercontent.com/u/139895814?s=48&v=4",
    name: "shadcn/ui",
  },
  {
    invert: true,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/radixui.svg",
    name: "Radix UI",
  },
  {
    invert: true,
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/framer.svg",
    name: "Framer Motion",
  },
  { invert: false, logo: "https://lucide.dev/logo.svg", name: "Lucide React" },
  {
    invert: true,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    name: "GitHub",
  },
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    name: "Docker",
  },
  { invert: false, logo: "/logos/chrome-ext.svg", name: "Chrome Extensions" },
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    name: "Node.js",
  },
  { invert: false, logo: "/logos/drizzle.png", name: "Drizzle" },
  { invert: false, logo: "/logos/gemini.png", name: "Gemini" },
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    name: "PostgreSQL",
  },
  {
    invert: false,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    name: "Redis",
  },
  { invert: false, logo: "/logos/zod.png", name: "Zod" },
  { invert: false, logo: "https://prettier.io/icon.png", name: "Prettier" },
  { invert: false, logo: "/logos/eslint.png", name: "ESLint" },
];

export function TechLogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {TECH_LOGOS.map((tech) => (
        <div
          className="flex items-center justify-center rounded-lg bg-white/[0.04] p-2 transition-colors hover:bg-white/[0.08]"
          key={tech.name}
          title={tech.name}
        >
          <img
            alt={tech.name}
            className={`h-8 w-8 opacity-70 transition-opacity hover:opacity-100 sm:h-10 sm:w-10 ${
              tech.invert ? "brightness-0 invert" : ""
            }`}
            height={40}
            loading="lazy"
            src={tech.logo}
            width={40}
          />
        </div>
      ))}
    </div>
  );
}
