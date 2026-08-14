import { ArrowLeft, Github, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileMenu } from "@/components/MobileMenu";
import { brandClasses } from "@/config/brand";
import { SITE_CONFIG } from "@/config/constants";

interface SiteHeaderProps {
  backTo?: { href: string; label: string };
  variant?: "home" | "default";
}

function openChat() {
  window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"));
}

function HeaderNavLinks({
  backTo,
  variant,
}: {
  backTo?: { href: string; label: string };
  variant: "home" | "default";
}) {
  if (variant === "home") {
    return (
      <>
        <a
          className={`hidden rounded-md px-2 py-1.5 text-[#f3efe6]/80 text-sm transition-colors hover:bg-white/5 sm:inline ${brandClasses.navHover}`}
          href="#projects"
        >
          Projects
        </a>
        <a
          className={`hidden rounded-md px-2 py-1.5 text-[#f3efe6]/80 text-sm transition-colors hover:bg-white/5 sm:inline ${brandClasses.navHover}`}
          href="#approach"
        >
          Approach
        </a>
        <a
          className="hidden rounded-md px-2 py-1.5 text-[#f3efe6]/80 text-sm transition-colors hover:bg-white/5 hover:text-[#f3efe6] sm:inline"
          href="#features"
        >
          About
        </a>
      </>
    );
  }

  if (backTo) {
    return (
      <Link
        className="hidden items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[#f3efe6] text-sm transition-colors hover:bg-white/10 md:inline-flex"
        to={backTo.href}
      >
        <ArrowLeft className="size-4" />
        {backTo.label}
      </Link>
    );
  }

  return null;
}

export function SiteHeader({ variant = "default", backTo }: SiteHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5 md:px-8">
      <Link className="flex min-w-0 items-center gap-2 sm:gap-2.5" to="/">
        <img
          alt="Unstacked Apps"
          className="h-7 w-auto brightness-0 invert"
          height={28}
          src="/logo.svg"
          width={120}
        />
        <span
          className="hidden font-light text-lg tracking-tight sm:inline"
          style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
        >
          <span className="font-light">un</span>stacked
          <span className="font-semibold">apps</span>
        </span>
        <span className="sr-only sm:hidden">Unstacked Apps</span>
      </Link>

      <nav className="flex shrink-0 items-center gap-0.5 sm:gap-2">
        <HeaderNavLinks backTo={backTo} variant={variant} />

        <button
          aria-label="Open chat"
          className="rounded-md px-1.5 py-1.5 text-[#f3efe6]/80 transition-colors hover:bg-white/5 hover:text-[#f3efe6] sm:px-2"
          onClick={openChat}
          type="button"
        >
          <MessageCircle className="size-4" />
        </button>

        <a
          aria-label="Caleb Moore on LinkedIn"
          className="rounded-md px-1.5 py-1.5 text-[#f3efe6]/80 text-sm transition-colors hover:bg-white/5 hover:text-[#f3efe6] sm:px-2"
          href={SITE_CONFIG.social.linkedIn}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin className="size-4" />
        </a>
        <a
          aria-label="Unstacked Apps on GitHub"
          className="rounded-md px-1.5 py-1.5 text-[#f3efe6]/80 text-sm transition-colors hover:bg-white/5 hover:text-[#f3efe6] sm:px-2"
          href={SITE_CONFIG.social.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Github className="size-4" />
        </a>

        <MobileMenu backTo={variant === "default" ? backTo : undefined} />

        <Link
          className="ml-0.5 rounded-md bg-[#f3efe6] px-2.5 py-1.5 font-medium text-[#0c1219] text-sm transition-opacity hover:opacity-90 sm:ml-1 sm:px-3.5 sm:py-2"
          to="/contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
