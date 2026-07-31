import { useEffect, useId, useState, type FormEvent } from "react"
import { MessageCircle, Send, X, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SITE_CONFIG } from "@/config/constants"
import { cn } from "@/lib/utils"

const TOPICS = [
  "General",
  "Chrome extension",
  "n8n node",
  "Website build",
  "AI assistant",
] as const

type Topic = (typeof TOPICS)[number]
type Status = "idle" | "submitting" | "success" | "error"

const webhookUrl = SITE_CONFIG.chatWebhookUrl || undefined

export function ContactChat() {
  const formId = useId()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [topic, setTopic] = useState<Topic>("General")
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const onOpenChat = () => {
      if (status === "success") {
        setName("")
        setEmail("")
        setMessage("")
        setTopic("General")
        setHoneypot("")
        setStatus("idle")
        setFeedback("")
      }
      setOpen(true)
    }
    window.addEventListener("unstackedapps:open-chat", onOpenChat)
    return () => window.removeEventListener("unstackedapps:open-chat", onOpenChat)
  }, [status])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const resetForm = () => {
    setName("")
    setEmail("")
    setMessage("")
    setTopic("General")
    setHoneypot("")
    setStatus("idle")
    setFeedback("")
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!webhookUrl) {
      setStatus("error")
      setFeedback("Chat is not configured yet. Please email contact@unstackedapps.com.")
      return
    }

    if (name.trim().length < 2 || !email.includes("@") || message.trim().length < 5) {
      setStatus("error")
      setFeedback("Please provide a name, valid email, and a short message.")
      return
    }

    setStatus("submitting")
    setFeedback("")

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          topic,
          pageUrl: window.location.href,
          website: honeypot,
        }),
      })

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        message?: string
      }

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Unable to send your message right now.")
      }

      setStatus("success")
      setFeedback(data.message || "Thanks — your message was sent.")
      setName("")
      setEmail("")
      setMessage("")
      setTopic("General")
      setHoneypot("")
    } catch (error) {
      setStatus("error")
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      )
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
          className="w-[min(100vw-2rem,22rem)] overflow-hidden rounded-xl border border-border/40 bg-background/95 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-3 border-b border-border/30 px-4 py-3">
            <div>
              <h2 id={`${formId}-title`} className="text-base font-semibold tracking-tight">
                Message {SITE_CONFIG.author.name.split(" ")[0]}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Leave a message — I’ll get an instant alert in Google Chat.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => {
                setOpen(false)
                if (status === "success") resetForm()
              }}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-start gap-3 px-4 py-6">
              <CheckCircle2 className="h-6 w-6 text-foreground/80" />
              <p className="text-sm text-muted-foreground">{feedback}</p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  resetForm()
                  setOpen(false)
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 px-4 py-4">
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      topic === item
                        ? "border-foreground/30 bg-secondary text-foreground"
                        : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`${formId}-name`}>Name</Label>
                <Input
                  id={`${formId}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`${formId}-email`}>Email</Label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`${formId}-message`}>Message</Label>
                <Textarea
                  id={`${formId}-message`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  disabled={status === "submitting"}
                  placeholder="What can I help with?"
                  className="resize-none"
                />
              </div>

              {/* Honeypot — leave empty */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <Label htmlFor={`${formId}-website`}>Website</Label>
                <Input
                  id={`${formId}-website`}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {feedback && status === "error" && (
                <p className="text-sm text-destructive">{feedback}</p>
              )}

              <Button type="submit" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      )}

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-12 w-12 rounded-full border-border/40 bg-background/95 shadow-md backdrop-blur-md"
        onClick={() => {
          if (open && status === "success") resetForm()
          setOpen((value) => !value)
        }}
        aria-expanded={open}
        aria-label={open ? "Close message panel" : "Open message panel"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </div>
  )
}
