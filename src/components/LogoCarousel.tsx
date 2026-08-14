import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Technologies actually used in this project with official logos available
// logosNeedingInvert: logos that are black/dark and need to be inverted in dark mode
const technologiesWithLogos = [
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    name: "React",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reactrouter.svg",
    name: "React Router",
    needsInvert: true,
  },
  { logo: "/logos/next-js.svg", name: "Next.js", needsInvert: false },
  {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    name: "NextAuth.js",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    name: "TypeScript",
    needsInvert: false,
  },
  { logo: "https://vitejs.dev/logo.svg", name: "Vite", needsInvert: false },
  {
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    name: "Tailwind CSS",
    needsInvert: false,
  },
  {
    logo: "https://avatars.githubusercontent.com/u/139895814?s=48&v=4",
    name: "shadcn/ui",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/radixui.svg",
    name: "Radix UI",
    needsInvert: true,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/framer.svg",
    name: "Framer Motion",
    needsInvert: true,
  },
  {
    logo: "https://lucide.dev/logo.svg",
    name: "Lucide React",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    name: "GitHub",
    needsInvert: true,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    name: "Docker",
    needsInvert: false,
  },
  {
    logo: "/logos/chrome-ext.svg",
    name: "Chrome Extensions",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    name: "Node.js",
    needsInvert: false,
  },
  { logo: "/logos/drizzle.png", name: "Drizzle", needsInvert: false },
  { logo: "/logos/gemini.png", name: "Gemini", needsInvert: false },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    name: "PostgreSQL",
    needsInvert: false,
  },
  {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    name: "Redis",
    needsInvert: false,
  },
  { logo: "/logos/zod.png", name: "Zod", needsInvert: false },
  {
    logo: "https://prettier.io/icon.png",
    name: "Prettier",
    needsInvert: false,
  },
  { logo: "/logos/eslint.png", name: "ESLint", needsInvert: false },
];

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const logoItemRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(80); // Default desktop width

  useEffect(() => {
    // Calculate actual item width (logo + gap)
    const updateItemWidth = () => {
      const logoItem = logoItemRef.current;
      if (!logoItem) {
        return;
      }
      const rect = logoItem.getBoundingClientRect();
      const gap = window.innerWidth >= 640 ? 32 : 16; // sm:gap-8 = 32px, gap-4 = 16px
      setItemWidth(rect.width + gap);
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);
    return () => window.removeEventListener("resize", updateItemWidth);
  }, []);

  const oneSetWidth = technologiesWithLogos.length * itemWidth;

  useEffect(() => {
    if (oneSetWidth === 0) {
      return;
    }

    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 45_000; // 45 seconds in milliseconds

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const currentX = -progress * oneSetWidth;

      x.set(currentX);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [x, oneSetWidth]);

  // Create enough duplicates to ensure seamless loop
  const duplicatedTechnologies = [
    ...technologiesWithLogos,
    ...technologiesWithLogos,
    ...technologiesWithLogos,
  ];

  return (
    <TooltipProvider>
      <div className="relative w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-[#141c27] via-[#141c27]/50 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#141c27] via-[#141c27]/50 to-transparent sm:w-20" />

        <motion.div
          className="flex gap-4 sm:gap-8"
          ref={containerRef}
          style={{ x }}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <Tooltip key={`${tech.name}-${index}`}>
              <TooltipTrigger asChild>
                <motion.div
                  className="flex flex-shrink-0 cursor-pointer items-center justify-center"
                  ref={index === 0 ? logoItemRef : null}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative rounded-lg bg-white/[0.04] p-2 transition-colors hover:bg-white/[0.08]">
                    <img
                      alt={tech.name}
                      className={`h-10 w-10 opacity-80 transition-opacity hover:opacity-100 sm:h-12 sm:w-12 ${
                        tech.needsInvert ? "brightness-0 invert" : ""
                      }`}
                      height={48}
                      loading="lazy"
                      src={tech.logo}
                      width={48}
                    />
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
