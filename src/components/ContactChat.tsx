import { CheckCircle2, Loader2, MessageCircle, Send, X } from "lucide-react";
import { type FormEvent, useEffect, useId, useState } from "react";
import { brandClasses } from "@/config/brand";
import { SITE_CONFIG } from "@/config/constants";
import { cn } from "@/lib/utils";

const TOPICS = [
  "General",
  "Chrome extension",
  "n8n node",
  "Website build",
  "AI assistant",
] as const;

type Topic = (typeof TOPICS)[number];
type Status = "idle" | "submitting" | "success" | "error";

const webhookUrl = SITE_CONFIG.chatWebhookUrl || undefined;

const fieldClass =
  "border-input/80 bg-card/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring";

export function ContactChat() {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<Topic>("General");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const onOpenChat = () => {
      if (status === "success") {
        setName("");
        setEmail("");
        setMessage("");
        setTopic("General");
        setHoneypot("");
        setStatus("idle");
        setFeedback("");
      }
      setOpen(true);
    };
    window.addEventListener("unstackedapps:open-chat", onOpenChat);
    return () =>
      window.removeEventListener("unstackedapps:open-chat", onOpenChat);
  }, [status]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTopic("General");
    setHoneypot("");
    setStatus("idle");
    setFeedback("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!webhookUrl) {
      setStatus("error");
      setFeedback(
        "Chat is not configured yet. Please email contact@unstackedapps.com."
      );
      return;
    }

    if (
      name.trim().length < 2 ||
      !email.includes("@") ||
      message.trim().length < 5
    ) {
      setStatus("error");
      setFeedback("Please provide a name, valid email, and a short message.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch(webhookUrl, {
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          name: name.trim(),
          pageUrl: window.location.href,
          topic,
          website: honeypot,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || data.ok === false) {
        throw new Error(
          data.message || "Unable to send your message right now."
        );
      }

      setStatus("success");
      setFeedback(data.message || "Thanks — your message was sent.");
      setName("");
      setEmail("");
      setMessage("");
      setTopic("General");
      setHoneypot("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now."
      );
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div
          aria-labelledby={`${formId}-title`}
          aria-modal="true"
          className="w-[min(100vw-2rem,22rem)] overflow-hidden rounded-xl border border-white/10 bg-[#141c27]/95 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-md"
          role="dialog"
        >
          <div className="border-white/15 border-b bg-[#0c1219]/60 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={`font-medium text-[10px] uppercase tracking-[0.16em] ${brandClasses.eyebrow}`}
                  style={{
                    fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                  }}
                >
                  Site chat
                </p>
                <h2
                  className="mt-1 font-medium text-[#f3efe6] text-base tracking-tight"
                  id={`${formId}-title`}
                  style={{
                    fontFamily: "var(--font-raleway, 'Raleway', sans-serif)",
                  }}
                >
                  Message {SITE_CONFIG.author.name.split(" ")[0]}
                </h2>
                <p className="mt-1 text-[#f3efe6]/60 text-sm">
                  Instant Google Chat alert — usually a quick reply.
                </p>
              </div>
              <button
                aria-label="Close chat"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[#f3efe6]/70 transition-colors hover:bg-white/5 hover:text-[#f3efe6]"
                onClick={() => {
                  setOpen(false);
                  if (status === "success") {
                    resetForm();
                  }
                }}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-start gap-3 px-4 py-6">
              <CheckCircle2 className={`size-6 ${brandClasses.iconAccent}`} />
              <p className="text-[#f3efe6]/70 text-sm">{feedback}</p>
              <button
                className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2 text-[#f3efe6] text-sm transition-colors hover:bg-white/10"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                type="button"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              className="relative flex flex-col gap-3 px-4 py-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((item) => (
                  <button
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs transition-colors",
                      topic === item
                        ? "border-white/25 bg-white/10 text-[#f3efe6]"
                        : "border-white/10 bg-white/[0.03] text-[#f3efe6]/55 hover:border-white/20 hover:text-[#f3efe6]"
                    )}
                    key={item}
                    onClick={() => setTopic(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label
                  className="font-medium text-[#f3efe6]/80 text-xs"
                  htmlFor={`${formId}-name`}
                >
                  Name
                </label>
                <input
                  autoComplete="name"
                  className={cn(
                    "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2",
                    fieldClass
                  )}
                  disabled={status === "submitting"}
                  id={`${formId}-name`}
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="font-medium text-[#f3efe6]/80 text-xs"
                  htmlFor={`${formId}-email`}
                >
                  Email
                </label>
                <input
                  autoComplete="email"
                  className={cn(
                    "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2",
                    fieldClass
                  )}
                  disabled={status === "submitting"}
                  id={`${formId}-email`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="font-medium text-[#f3efe6]/80 text-xs"
                  htmlFor={`${formId}-message`}
                >
                  Message
                </label>
                <textarea
                  className={cn(
                    "flex min-h-[80px] w-full resize-none rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2",
                    fieldClass
                  )}
                  disabled={status === "submitting"}
                  id={`${formId}-message`}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What can I help with?"
                  required
                  rows={4}
                  value={message}
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute -left-[9999px] opacity-0"
              >
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  autoComplete="off"
                  id={`${formId}-website`}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  value={honeypot}
                />
              </div>

              {feedback && status === "error" ? (
                <p className="text-[#f87171] text-sm">{feedback}</p>
              ) : null}

              <button
                className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm ${brandClasses.ctaPrimary} disabled:opacity-60`}
                disabled={status === "submitting"}
                type="submit"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 size-4" />
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      ) : null}

      <button
        aria-expanded={open}
        aria-label={open ? "Close message panel" : "Open message panel"}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border shadow-[0_12px_40px_-12px_rgba(243,239,230,0.2)] backdrop-blur-md transition-[transform,box-shadow,background-color]",
          open
            ? "border-white/15 bg-[#141c27]/95 text-[#f3efe6]"
            : "border-white/25 bg-[#141c27]/90 text-[#f3efe6] hover:scale-[1.03] hover:border-white/40"
        )}
        onClick={() => {
          if (open && status === "success") {
            resetForm();
          }
          setOpen((value) => !value);
        }}
        type="button"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </div>
  );
}
