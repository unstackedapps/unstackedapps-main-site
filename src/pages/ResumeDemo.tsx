import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Code,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Play,
  Video,
} from "lucide-react";
import { useState } from "react";
import { marketingCardClass } from "@/components/MarketingPageHeader";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, transition: { duration: 0.8 }, y: 0 },
};

export function ResumeDemo() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <>
      <Seo
        description="A professional resume SPA demo from Unstacked Apps showcasing interactive scheduling and profile layouts."
        path="/resume-demo"
        title="Resume Demo"
      />
      <SiteHeader
        backTo={{ href: "/spa-showcase", label: "Back to Examples" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-8 sm:py-12 md:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className={marketingCardClass}>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="relative border-b pb-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-border">
                      <img
                        alt="John Doe"
                        className="h-full w-full object-cover"
                        src="/sample_profile.png"
                        style={{
                          objectPosition: "center 40%",
                          transform: "scale(1.5) translateY(15%)",
                        }}
                      />
                    </div>
                  </div>
                  <h1 className="mb-2 font-bold text-3xl sm:text-4xl">
                    John Doe
                  </h1>
                  <p className="mb-4 text-lg text-muted-foreground">
                    Senior Software Engineer
                  </p>
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
                  animate="visible"
                  className="rounded-lg border bg-muted/30 p-6"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Video className="h-6 w-6 text-primary" />
                    <h2 className="font-semibold text-xl">Virtual Resume</h2>
                  </div>
                  <p className="mb-4 text-muted-foreground text-sm">
                    Get to know me in 30 seconds. Watch a quick introduction
                    video.
                  </p>
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {isVideoPlaying ? (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <div className="p-8 text-center">
                          <Video className="mx-auto mb-4 h-16 w-16 text-primary/50" />
                          <p className="text-muted-foreground">
                            Video player would be embedded here
                          </p>
                          <p className="mt-2 text-muted-foreground text-sm">
                            (30 second introduction video)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="group absolute inset-0 flex items-center justify-center bg-black/50 transition-colors hover:bg-black/60"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 transition-colors group-hover:bg-primary">
                          <Play
                            className="ml-1 h-10 w-10 text-primary-foreground"
                            fill="currentColor"
                          />
                        </div>
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Book Time Section */}
                <motion.div
                  animate="visible"
                  className="rounded-lg border p-6"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h2 className="font-semibold text-xl">Book Time With Me</h2>
                  </div>
                  <p className="mb-4 text-muted-foreground text-sm">
                    Schedule a 30-minute call to discuss opportunities or
                    collaboration.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <DatePicker
                        label="Select a date"
                        onChange={setSelectedDate}
                        placeholder="Select a date"
                        value={selectedDate}
                      />
                    </div>
                    {selectedDate && (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="space-y-2"
                        initial={{ height: 0, opacity: 0 }}
                      >
                        <label className="mb-2 block font-medium text-sm">
                          Available times
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {[
                            "9:00 AM",
                            "10:00 AM",
                            "11:00 AM",
                            "2:00 PM",
                            "3:00 PM",
                            "4:00 PM",
                          ].map((time) => (
                            <Button
                              className="w-full"
                              key={time}
                              onClick={() => {
                                setSelectedTime(time);
                                setIsBookingDialogOpen(true);
                              }}
                              variant="outline"
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
                  animate="visible"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <h2 className="mb-4 flex items-center gap-2 font-semibold text-xl">
                    <Briefcase className="h-5 w-5" />
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-2 pl-4">
                      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Senior Software Engineer
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Tech Company Inc.
                          </p>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          2020 - Present
                        </span>
                      </div>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Lead development of scalable web applications using
                        React and Node.js. Mentored junior developers and
                        improved code quality standards.
                      </p>
                    </div>
                    <div className="border-l-2 pl-4">
                      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold">Software Engineer</h3>
                          <p className="text-muted-foreground text-sm">
                            Startup Co.
                          </p>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          2018 - 2020
                        </span>
                      </div>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Built and maintained customer-facing features.
                        Collaborated with design team to implement responsive UI
                        components.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Projects Section with React Flow Wireframe */}
                <motion.div
                  animate="visible"
                  className="rounded-lg border p-6"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Code className="h-6 w-6 text-primary" />
                    <h2 className="font-semibold text-xl">Projects</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold">
                        Integration Architecture - n8n Workflow
                      </h3>
                      <p className="mb-4 text-muted-foreground text-sm">
                        Designed and implemented a complex integration system
                        connecting multiple APIs using n8n. This wireframe shows
                        the workflow architecture.
                      </p>
                      <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted/30 p-4">
                        <div className="text-center">
                          <Code className="mx-auto mb-3 h-12 w-12 text-primary/50" />
                          <p className="mb-2 text-muted-foreground text-sm">
                            React Flow wireframe would be embedded here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Interactive diagram showing API connections and data
                            flow
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">
                        E-Commerce Platform
                      </h3>
                      <p className="mb-2 text-muted-foreground text-sm">
                        Built a full-stack e-commerce solution with React,
                        Node.js, and PostgreSQL.
                      </p>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <a href="#" rel="noopener noreferrer" target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <a href="#" rel="noopener noreferrer" target="_blank">
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
                  animate="visible"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <h2 className="mb-4 flex items-center gap-2 font-semibold text-xl">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </h2>
                  <div className="border-l-2 pl-4">
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Bachelor of Science in Computer Science
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          University of Technology
                        </p>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        2014 - 2018
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  animate="visible"
                  initial="hidden"
                  variants={fadeInUp}
                >
                  <h2 className="mb-4 font-semibold text-xl">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Node.js",
                      "PostgreSQL",
                      "Docker",
                      "AWS",
                      "n8n",
                      "Git",
                      "CI/CD",
                    ].map((skill) => (
                      <span
                        className="rounded-md bg-secondary px-3 py-1 text-sm"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Dialog onOpenChange={setIsBookingDialogOpen} open={isBookingDialogOpen}>
        <DialogContent className="border-white/10 bg-[#141c27] text-[#f3efe6]">
          <DialogHeader>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle>Booking Confirmed</DialogTitle>
            </div>
            <DialogDescription>
              {selectedDate && selectedTime && (
                <div className="mt-4 space-y-2">
                  <p className="text-base">
                    Your meeting has been scheduled for:
                  </p>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="font-semibold text-lg">
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        weekday: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-muted-foreground">at {selectedTime}</p>
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">
                    A calendar invitation will be sent to your email address.
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90"
              onClick={() => setIsBookingDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
