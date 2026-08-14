import { cn } from "@/lib/utils";

interface UnstackedMarkProps {
  className?: string;
}

/** Parent-brand block mark — matches the favicon geometry. */
export function UnstackedMark({ className }: UnstackedMarkProps) {
  return (
    <svg
      aria-hidden
      className={cn("shrink-0 text-[#f3efe6]", className)}
      fill="none"
      overflow="visible"
      viewBox="0 0 130 125"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="currentColor" height="40" width="40" x="15" y="15" />
      <rect fill="currentColor" height="40" width="40" x="15" y="60" />
      <rect fill="currentColor" height="40" width="40" x="60" y="60" />
      <rect
        fill="currentColor"
        height="40"
        transform="rotate(-15 100 95)"
        width="40"
        x="80"
        y="75"
      />
    </svg>
  );
}
