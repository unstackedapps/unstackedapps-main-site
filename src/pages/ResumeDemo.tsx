import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Briefcase, GraduationCap, Linkedin, Github, Mail, Phone, Calendar, Play, Video, Code, ExternalLink, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"
import { Seo } from "@/components/Seo"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function ResumeDemo() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Prevent scroll restoration on page load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Seo
        title="Resume Demo"
        description="A professional resume SPA demo from Unstacked Apps showcasing interactive scheduling and profile layouts."
        path="/resume-demo"
      />
      {/* Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="brand-wrapper">
              <img 
                src="/logo.svg" 
                alt="Unstacked Apps" 
                className="brand-logo"
              />
              <div className="brand-container">
                <span className="brand-name">
                  <span className="brand-name-thin">un</span>stacked
                </span>
                <span className="brand-subtitle">apps</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                <Button variant="outline" size="sm" asChild>
                  <Link to="/spa-showcase">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Examples
                  </Link>
                </Button>
              </div>
              <div className="md:hidden flex items-center gap-2">
                <MobileMenu />
                <Button variant="outline" size="sm" asChild>
                  <Link to="/spa-showcase">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Resume Content */}
      <motion.section 
        className="container mx-auto px-4 py-8 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center border-b pb-6 relative">
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-border overflow-hidden">
                      <img 
                        src="/sample_profile.png" 
                        alt="John Doe" 
                        className="w-full h-full object-cover"
                        style={{ transform: 'scale(1.5) translateY(15%)', objectPosition: 'center 40%' }}
                      />
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">John Doe</h1>
                  <p className="text-lg text-muted-foreground mb-4">Senior Software Engineer</p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 987-6543</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      <span>linkedin.com/in/johndoe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <span>github.com/johndoe</span>
                    </div>
                  </div>
                </div>

                {/* Virtual Resume Video Section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-lg p-6 bg-muted/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold">Virtual Resume</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get to know me in 30 seconds. Watch a quick introduction video.
                  </p>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {!isVideoPlaying ? (
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors group"
                      >
                        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <Play className="h-10 w-10 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </button>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <div className="text-center p-8">
                          <Video className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                          <p className="text-muted-foreground">
                            Video player would be embedded here
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            (30 second introduction video)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Book Time Section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold">Book Time With Me</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a 30-minute call to discuss opportunities or collaboration.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        placeholder="Select a date"
                        label="Select a date"
                      />
                    </div>
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium mb-2 block">Available times</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setSelectedTime(time)
                                setIsBookingDialogOpen(true)
                              }}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-2 pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                        <div>
                          <h3 className="font-semibold">Senior Software Engineer</h3>
                          <p className="text-sm text-muted-foreground">Tech Company Inc.</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2020 - Present</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Lead development of scalable web applications using React and Node.js. 
                        Mentored junior developers and improved code quality standards.
                      </p>
                    </div>
                    <div className="border-l-2 pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                        <div>
                          <h3 className="font-semibold">Software Engineer</h3>
                          <p className="text-sm text-muted-foreground">Startup Co.</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2018 - 2020</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Built and maintained customer-facing features. Collaborated with design team 
                        to implement responsive UI components.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Projects Section with React Flow Wireframe */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold">Projects</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Integration Architecture - n8n Workflow</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Designed and implemented a complex integration system connecting multiple APIs 
                        using n8n. This wireframe shows the workflow architecture.
                      </p>
                      <div className="border rounded-lg bg-muted/30 p-4 aspect-video flex items-center justify-center">
                        <div className="text-center">
                          <Code className="h-12 w-12 mx-auto mb-3 text-primary/50" />
                          <p className="text-sm text-muted-foreground mb-2">
                            React Flow wireframe would be embedded here
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Interactive diagram showing API connections and data flow
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">E-Commerce Platform</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Built a full-stack e-commerce solution with React, Node.js, and PostgreSQL.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Education Section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </h2>
                  <div className="border-l-2 pl-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <div>
                        <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                        <p className="text-sm text-muted-foreground">University of Technology</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2014 - 2018</span>
                    </div>
                  </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "n8n", "Git", "CI/CD"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-secondary rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Booking Confirmation Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle>Booking Confirmed</DialogTitle>
            </div>
            <DialogDescription>
              {selectedDate && selectedTime && (
                <div className="space-y-2 mt-4">
                  <p className="text-base">
                    Your meeting has been scheduled for:
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold text-lg">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-muted-foreground">
                      at {selectedTime}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    A calendar invitation will be sent to your email address.
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsBookingDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

