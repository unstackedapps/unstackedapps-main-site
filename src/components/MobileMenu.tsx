import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/config/constants";

interface MobileMenuProps {
  backTo?: { href: string; label: string };
}

function openChat() {
  window.dispatchEvent(new CustomEvent("unstackedapps:open-chat"));
}

export function MobileMenu({ backTo }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          className="text-[#f3efe6]/80 hover:bg-white/5 hover:text-[#f3efe6] md:hidden"
          size="icon"
          variant="ghost"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="top-4 right-4 h-auto w-[min(100vw-2rem,18rem)] rounded-lg border-white/10 bg-[#141c27] text-[#f3efe6]"
        side="right"
      >
        <SheetHeader className="pb-4">
          <SheetTitle
            className="text-[#f3efe6]"
            style={{ fontFamily: "var(--font-raleway, 'Raleway', sans-serif)" }}
          >
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu with chat and contact options
          </SheetDescription>
        </SheetHeader>
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {backTo ? (
            <Button
              asChild
              className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
              variant="outline"
            >
              <Link onClick={() => setOpen(false)} to={backTo.href}>
                <ArrowLeft className="mr-2 size-4" />
                {backTo.label}
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
                variant="outline"
              >
                <Link onClick={() => setOpen(false)} to="/#projects">
                  Projects
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
                variant="outline"
              >
                <Link onClick={() => setOpen(false)} to="/#approach">
                  Approach
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
                variant="outline"
              >
                <Link onClick={() => setOpen(false)} to="/#features">
                  About
                </Link>
              </Button>
            </>
          )}

          <Button
            className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
            onClick={() => {
              openChat();
              setOpen(false);
            }}
            type="button"
            variant="outline"
          >
            <MessageCircle className="mr-2 size-4" />
            Chat
          </Button>

          <Button
            asChild
            className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
            variant="outline"
          >
            <a
              href={SITE_CONFIG.social.linkedIn}
              onClick={() => setOpen(false)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="mr-2 size-4" />
              LinkedIn
            </a>
          </Button>

          <Button
            asChild
            className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
            variant="outline"
          >
            <a
              href={SITE_CONFIG.social.github}
              onClick={() => setOpen(false)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="mr-2 size-4" />
              GitHub
            </a>
          </Button>

          <Button
            asChild
            className="w-full justify-start border-white/15 bg-white/5 text-[#f3efe6] hover:bg-white/10"
            variant="outline"
          >
            <Link onClick={() => setOpen(false)} to="/contact">
              <Mail className="mr-2 size-4" />
              Contact Us
            </Link>
          </Button>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
