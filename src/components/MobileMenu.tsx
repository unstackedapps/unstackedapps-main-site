import { useState } from "react"
import { Menu, Moon, Sun, Monitor, Linkedin, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"
import { SITE_CONFIG } from "@/config/constants"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light Mode"
      case "dark":
        return "Dark Mode"
      case "system":
        return "System Theme"
      default:
        return "Toggle Theme"
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="mr-2 h-4 w-4" />
      case "dark":
        return <Moon className="mr-2 h-4 w-4" />
      case "system":
        return <Monitor className="mr-2 h-4 w-4" />
      default:
        return <Sun className="mr-2 h-4 w-4" />
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] h-auto top-4 right-4 rounded-lg">
        <SheetHeader className="pb-4">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu with theme toggle and contact options
          </SheetDescription>
        </SheetHeader>
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {getThemeIcon()}
                  {getThemeLabel()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button variant="outline" className="w-full justify-start" asChild>
              <a
                href={SITE_CONFIG.social.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button variant="outline" className="w-full justify-start" asChild>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link 
                to="/contact"
                onClick={() => setOpen(false)}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

