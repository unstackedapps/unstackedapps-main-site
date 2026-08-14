import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
      viewport={{ margin: "-10% 0px", once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
