import { ArrowLeft, ArrowRight, Globe, RotateCw } from "lucide-react";
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const FILES = [
  {
    content: `import { Dashboard } from "./pages/Dashboard"

export function App() {
  return <Dashboard />
}`,
    language: "TypeScript React",
    tab: "App.tsx",
  },
  {
    content: `export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-52 border-r border-white/10 p-5">
        <p className="font-semibold">Acme CRM</p>
        <nav className="mt-6 space-y-2 text-sm text-white/60">
          <p className="text-white">Dashboard</p>
          <p>Contacts</p>
          <p>Deals</p>
          <p>Reports</p>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">
              Sales overview
            </p>
            <h1 className="mt-2 text-3xl font-light">Pipeline</h1>
          </div>
          <button className="rounded-md bg-[#f3efe6] px-4 py-2 text-sm font-medium text-[#0c1219]">
            New deal
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            ["Open deals", "24"],
            ["Pipeline value", "$186k"],
            ["New leads", "12"],
            ["Win rate", "38%"],
          ].map(([label, value]) => (
            <article key={label} className="rounded-lg border border-white/10 p-4">
              <p className="text-xs text-white/55">{label}</p>
              <p className="mt-2 text-2xl font-light">{value}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-white/10">
          <div className="border-b border-white/10 px-4 py-3 text-sm text-white/70">
            Recent activity
          </div>
          <ul className="divide-y divide-white/10 text-sm">
            <li className="px-4 py-3">Nova Labs moved to Proposal</li>
            <li className="px-4 py-3">Call logged with Bright Dental</li>
            <li className="px-4 py-3">Quote sent to Harbor Freight Co.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}`,
    language: "TypeScript React",
    tab: "Dashboard.tsx",
  },
  {
    content: `import type { RouteObject } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"

export const routes: RouteObject[] = [
  { path: "/", Component: Dashboard },
  { path: "/contacts", lazy: () => import("./pages/Contacts") },
]`,
    language: "TypeScript",
    tab: "route.ts",
  },
] as const;

function getLastFile<T>(files: readonly T[]): T {
  const last = files.at(-1);
  if (!last) {
    throw new Error("Demo files must not be empty");
  }
  return last;
}

const LAST_FILE = getLastFile(FILES);

type ExplorerNode =
  | { type: "folder"; name: string; indent: number }
  | {
      type: "file";
      name: string;
      fileIndex: number;
      indent: number;
      fullPath: string;
    };

const EXPLORER_TREE: ExplorerNode[] = [
  { indent: 0, name: "src/", type: "folder" },
  {
    fileIndex: 0,
    fullPath: "src/App.tsx",
    indent: 1,
    name: "App.tsx",
    type: "file",
  },
  { indent: 1, name: "pages/", type: "folder" },
  {
    fileIndex: 1,
    fullPath: "src/pages/Dashboard.tsx",
    indent: 2,
    name: "Dashboard.tsx",
    type: "file",
  },
  {
    fileIndex: 2,
    fullPath: "src/route.ts",
    indent: 1,
    name: "route.ts",
    type: "file",
  },
];

const START_DELAY_MS = 150;
const FILE_COMPLETE_PAUSE_MS = 350;
const BROWSER_OPEN_MS = 900;
const BROWSER_SCROLL_MS = 500;
const PREVIEW_SETTLE_MS = 450;
const LOOP_PAUSE_MS = 1200;
const CURSOR_MOVE_MS = 520;
const CURSOR_CLICK_MS = 160;
const BROWSER_TAB_LABEL = "Acme CRM";
const PROJECT_NAME = "acme-crm";

type CrmNavId = "dashboard" | "contacts" | "deals" | "reports";

interface CursorState {
  clicking: boolean;
  visible: boolean;
  x: number;
  y: number;
}

type Phase =
  | "idle"
  | "typing"
  | "file-complete"
  | "cursor-moving"
  | "cursor-click"
  | "browser-opening"
  | "browser-scroll"
  | "done";

function BrowserTabLabel({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1 ${className ?? ""}`}
    >
      <Globe
        aria-hidden
        className="size-2.5 shrink-0 text-[#f3efe6]/55 sm:size-3"
      />
      <span className="truncate">{BROWSER_TAB_LABEL}</span>
    </span>
  );
}

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "function",
  "const",
  "return",
  "type",
  "false",
  "true",
]);

const TOKEN_SPLIT_RE = /(\s+|[{}()[\].,;=<>"'`/]|"[^"]*"|'[^']*'|`[^`]*`)/g;
const QUOTED_TOKEN_RE = /^['"`]/;
const TSX_TAG_RE = /^<\/?[A-Za-z]/;
const CAPITALIZED_TOKEN_RE = /^[A-Z]/;

const EXPLORER_INDENT_CLASSES: Record<number, string> = {
  0: "",
  1: "pl-2",
  2: "pl-4",
};

function highlightCode(code: string, isTsx: boolean) {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    const tokens = line.split(TOKEN_SPLIT_RE).filter(Boolean);

    return (
      <div className="flex gap-2.5" key={`line:${lineIndex}:${line}`}>
        <span className="w-4 shrink-0 select-none text-right text-[#f3efe6]/25 tabular-nums">
          {lineIndex + 1}
        </span>
        <span className="min-w-0 whitespace-pre-wrap break-all">
          {tokens.map((token, tokenIndex) => {
            if (QUOTED_TOKEN_RE.test(token)) {
              return (
                <span
                  className="text-[#c3e88d]"
                  key={`${lineIndex}:${tokenIndex}:${token}`}
                >
                  {token}
                </span>
              );
            }
            if (KEYWORDS.has(token)) {
              return (
                <span
                  className="text-[#c792ea]"
                  key={`${lineIndex}:${tokenIndex}:${token}`}
                >
                  {token}
                </span>
              );
            }
            if (isTsx && TSX_TAG_RE.test(token)) {
              return (
                <span
                  className="text-[#82aaff]"
                  key={`${lineIndex}:${tokenIndex}:${token}`}
                >
                  {token}
                </span>
              );
            }
            if (CAPITALIZED_TOKEN_RE.test(token)) {
              return (
                <span
                  className="text-[#ffcb6b]"
                  key={`${lineIndex}:${tokenIndex}:${token}`}
                >
                  {token}
                </span>
              );
            }
            if (token.startsWith("className")) {
              return (
                <span
                  className="text-[#82aaff]"
                  key={`${lineIndex}:${tokenIndex}:${token}`}
                >
                  {token}
                </span>
              );
            }
            return (
              <span
                className="text-[#f3efe6]/82"
                key={`${lineIndex}:${tokenIndex}:${token}`}
              >
                {token}
              </span>
            );
          })}
        </span>
      </div>
    );
  });
}

function DemoCursor({ cursor }: { cursor: CursorState }) {
  if (!cursor.visible) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-30 transition-[left,top,transform] duration-500 ease-out"
      style={{
        left: cursor.x,
        top: cursor.y,
        transform: `translate(-2px, -2px) scale(${cursor.clicking ? 0.82 : 1})`,
      }}
    >
      <svg
        className="size-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M5.5 3.5L18 11.5L12.5 13L10.5 19.5L5.5 3.5Z"
          fill="#f3efe6"
          stroke="#0c1219"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
      {cursor.clicking ? (
        <span className="absolute top-2 left-2 size-4 animate-ping rounded-full bg-[#f3efe6]/25" />
      ) : null}
    </div>
  );
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function CrmPreview({
  scrollProgress,
  activeNav,
  contactsNavRef,
}: {
  scrollProgress: number;
  activeNav: CrmNavId;
  contactsNavRef?: RefObject<HTMLParagraphElement | null>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contactsSectionRef = useRef<HTMLElement>(null);
  const [contactsScrollPx, setContactsScrollPx] = useState(0);
  const stats = [
    { label: "Open deals", value: "24" },
    { label: "Pipeline", value: "$186k" },
    { label: "New leads", value: "12" },
    { label: "Win rate", value: "38%" },
  ];

  const activity = [
    { action: "moved to Proposal", company: "Nova Labs", time: "2m ago" },
    { action: "call logged", company: "Bright Dental", time: "18m ago" },
    { action: "quote sent", company: "Harbor Freight Co.", time: "1h ago" },
    { action: "meeting scheduled", company: "Summit Health", time: "3h ago" },
  ];

  const deals = [
    { name: "Nova Labs", owner: "CM", stage: "Proposal", value: "$42k" },
    { name: "Bright Dental", owner: "CM", stage: "Discovery", value: "$18k" },
    {
      name: "Harbor Freight Co.",
      owner: "AL",
      stage: "Negotiation",
      value: "$67k",
    },
    { name: "Summit Health", owner: "CM", stage: "Qualified", value: "$29k" },
  ];

  const contacts = [
    { company: "Nova Labs", name: "Jordan Lee", status: "Hot" },
    { company: "Bright Dental", name: "Morgan Patel", status: "Warm" },
    { company: "Harbor Freight Co.", name: "Alex Rivera", status: "Hot" },
    { company: "Summit Health", name: "Sam Chen", status: "New" },
  ];

  const navItems: { id: CrmNavId; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "contacts", label: "Contacts" },
    { id: "deals", label: "Deals" },
    { id: "reports", label: "Reports" },
  ];

  useLayoutEffect(() => {
    const content = contentRef.current;
    const contactsSection = contactsSectionRef.current;
    if (!(content && contactsSection)) {
      return;
    }

    const measure = () => {
      setContactsScrollPx(contactsSection.offsetTop);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  const scrollY = scrollProgress * contactsScrollPx;

  return (
    <div className="flex h-full bg-slate-950 text-white">
      <aside className="flex h-full w-[4.75rem] shrink-0 flex-col border-[0.5px] border-white/[0.07] border-r bg-[#0c1219] py-4 sm:w-[5.5rem]">
        <p className="px-3 font-semibold text-[9px] sm:text-[10px]">Acme</p>
        <nav className="mt-4 space-y-2 px-3 text-[8px] sm:text-[9px]">
          {navItems.map((item) => (
            <p
              className={cn(
                "whitespace-nowrap transition-colors",
                activeNav === item.id ? "text-white" : "text-white/55"
              )}
              key={item.id}
              ref={item.id === "contacts" ? contactsNavRef : undefined}
            >
              {item.label}
            </p>
          ))}
        </nav>
      </aside>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="will-change-transform"
          ref={contentRef}
          style={{ transform: `translateY(-${scrollY}px)` }}
        >
          <div className="p-3 sm:p-5">
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[7px] text-white/55 uppercase tracking-[0.18em] sm:text-[8px]">
                  Sales overview
                </p>
                <h1 className="mt-1 font-light text-lg sm:text-xl">Pipeline</h1>
              </div>
              <button
                className="shrink-0 rounded-md bg-[#f3efe6] px-2.5 py-1 font-medium text-[#0c1219] text-[8px] sm:px-3 sm:py-1.5 sm:text-[9px]"
                type="button"
              >
                New deal
              </button>
            </header>

            <section className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {stats.map((stat) => (
                <article
                  className="rounded-md border-[0.5px] border-white/[0.07] bg-white/[0.02] p-2.5 sm:p-3"
                  key={stat.label}
                >
                  <p className="text-[7px] text-white/55 sm:text-[8px]">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-light text-base sm:text-lg">
                    {stat.value}
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-4 overflow-hidden rounded-md border-[0.5px] border-white/[0.07]">
              <div className="border-[0.5px] border-white/[0.07] border-b px-3 py-2 text-[8px] text-white/65 sm:text-[9px]">
                Recent activity
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {activity.map((item) => (
                  <li
                    className="flex items-center justify-between gap-2 px-3 py-2"
                    key={item.company}
                  >
                    <p className="min-w-0 truncate text-[8px] sm:text-[9px]">
                      <span className="font-medium text-white">
                        {item.company}
                      </span>{" "}
                      <span className="text-white/60">{item.action}</span>
                    </p>
                    <span className="shrink-0 text-[7px] text-white/40 sm:text-[8px]">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-4 overflow-hidden rounded-md border-[0.5px] border-white/[0.07]">
              <div className="border-[0.5px] border-white/[0.07] border-b px-3 py-2 text-[8px] text-white/65 sm:text-[9px]">
                Active deals
              </div>
              <div className="divide-y divide-white/[0.06]">
                {deals.map((deal) => (
                  <div
                    className="grid grid-cols-[1.2fr_0.8fr_0.6fr_0.4fr] gap-2 px-3 py-2 text-[7px] sm:text-[8px]"
                    key={deal.name}
                  >
                    <span className="truncate font-medium">{deal.name}</span>
                    <span className="text-white/60">{deal.stage}</span>
                    <span>{deal.value}</span>
                    <span className="text-white/40">{deal.owner}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section
            className="border-[0.5px] border-white/[0.07] border-t bg-white/[0.02] px-3 py-5 sm:px-5"
            ref={contactsSectionRef}
          >
            <h2 className="font-light text-base sm:text-lg">Contacts</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {contacts.map((contact) => (
                <article
                  className="rounded-md border-[0.5px] border-white/[0.07] p-3"
                  key={contact.name}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-[9px] sm:text-[10px]">
                      {contact.name}
                    </h3>
                    <span className="rounded border-[0.5px] border-white/10 px-1.5 py-0.5 text-[7px] text-white/55 sm:text-[8px]">
                      {contact.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[8px] text-white/60 sm:text-[9px]">
                    {contact.company}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function getCenterRelativeTo(el: HTMLElement, container: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - containerRect.left + elRect.width / 2,
    y: elRect.top - containerRect.top + elRect.height / 2,
  };
}

export function HeroMacEditorDemo({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const [cycle, setCycle] = useState(0);
  const handleLoop = useCallback(() => {
    setCycle((n) => n + 1);
  }, []);

  return (
    <HeroMacEditorDemoPlayback
      key={reducedMotion ? "static" : `cycle-${cycle}`}
      onLoop={handleLoop}
      reducedMotion={reducedMotion}
    />
  );
}

function HeroMacEditorDemoPlayback({
  onLoop,
  reducedMotion,
}: {
  onLoop: () => void;
  reducedMotion: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(
    reducedMotion ? "browser-scroll" : "idle"
  );
  const [fileIndex, setFileIndex] = useState(
    reducedMotion ? FILES.length - 1 : 0
  );
  const [charCount, setCharCount] = useState(
    reducedMotion ? LAST_FILE.content.length : 0
  );
  const [scrollProgress, setScrollProgress] = useState(reducedMotion ? 1 : 0);
  const [crmNavActive, setCrmNavActive] = useState<CrmNavId>("dashboard");
  const [cursor, setCursor] = useState<CursorState>({
    clicking: false,
    visible: false,
    x: 0,
    y: 0,
  });
  const [cursorTarget, setCursorTarget] = useState<
    "tab" | "explorer" | "preview" | null
  >(null);
  const [pendingFileIndex, setPendingFileIndex] = useState<number | null>(null);

  const editorScrollRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const demoSurfaceRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const explorerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const crmNavContactsRef = useRef<HTMLParagraphElement>(null);
  const contactsClickDoneRef = useRef(false);
  const scrollRafRef = useRef(0);
  const scrollCursorTriggeredRef = useRef(false);

  const currentFile = FILES[fileIndex];
  const visibleCode = useMemo(
    () => currentFile.content.slice(0, charCount),
    [charCount, currentFile.content]
  );
  const showBrowser =
    phase === "browser-opening" ||
    phase === "browser-scroll" ||
    phase === "done";
  const showCaret =
    !reducedMotion &&
    phase === "typing" &&
    charCount < currentFile.content.length;
  const previewReady =
    fileIndex === FILES.length - 1 && charCount >= LAST_FILE.content.length;

  const moveCursorTo = useCallback((el: HTMLElement | null) => {
    const surface = demoSurfaceRef.current;
    if (!(surface && el)) {
      return;
    }
    const point = getCenterRelativeTo(el, surface);
    setCursor((prev) => ({
      ...prev,
      clicking: false,
      visible: true,
      x: point.x,
      y: point.y,
    }));
  }, []);

  useEffect(() => {
    const editor = editorScrollRef.current;
    if (editor) {
      editor.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || phase !== "typing") {
      return;
    }

    const container = editorScrollRef.current;
    const caret = caretRef.current;
    if (!(container && caret)) {
      return;
    }

    const padding = 12;
    const caretRect = caret.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const caretTop = caretRect.top - containerRect.top;
    const caretBottom = caretRect.bottom - containerRect.top;

    if (caretBottom > container.clientHeight - padding) {
      container.scrollTop += caretBottom - container.clientHeight + padding;
    } else if (caretTop < padding) {
      container.scrollTop += caretTop - padding;
    }
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("browser-scroll");
      setFileIndex(FILES.length - 1);
      setCharCount(LAST_FILE.content.length);
      setScrollProgress(1);
      setCrmNavActive("contacts");
      return;
    }

    setPhase("idle");
    setFileIndex(0);
    setCharCount(0);
    setScrollProgress(0);
    setCrmNavActive("dashboard");
    setCursor({ clicking: false, visible: false, x: 0, y: 0 });
    setCursorTarget(null);
    setPendingFileIndex(null);
    contactsClickDoneRef.current = false;
    scrollCursorTriggeredRef.current = false;

    const id = window.setTimeout(() => setPhase("typing"), START_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "typing") {
      return;
    }

    if (charCount >= currentFile.content.length) {
      const id = window.setTimeout(
        () => setPhase("file-complete"),
        FILE_COMPLETE_PAUSE_MS
      );
      return () => window.clearTimeout(id);
    }

    const delay =
      1 +
      (charCount % 10 === 0 ? 3 : 0) +
      (currentFile.content[charCount] === "\n" ? 10 : 0);
    const id = window.setTimeout(() => setCharCount((n) => n + 1), delay);
    return () => window.clearTimeout(id);
  }, [phase, charCount, currentFile.content, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "file-complete") {
      return;
    }

    if (fileIndex < FILES.length - 1) {
      const nextIndex = fileIndex + 1;
      setPendingFileIndex(nextIndex);
      setCursorTarget("tab");
      setPhase("cursor-moving");
      return;
    }

    setCursorTarget("preview");
    setPhase("cursor-moving");
  }, [fileIndex, phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "cursor-moving") {
      return;
    }

    const timeouts: number[] = [];

    timeouts.push(
      window.setTimeout(() => {
        if (cursorTarget === "preview") {
          moveCursorTo(previewButtonRef.current);
        } else if (cursorTarget === "tab" && pendingFileIndex !== null) {
          moveCursorTo(tabRefs.current[pendingFileIndex]);
        } else if (cursorTarget === "explorer" && pendingFileIndex !== null) {
          moveCursorTo(explorerRefs.current[pendingFileIndex]);
        }

        timeouts.push(
          window.setTimeout(() => setPhase("cursor-click"), CURSOR_MOVE_MS)
        );
      }, 80)
    );

    return () => {
      for (const timeoutId of timeouts) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [cursorTarget, moveCursorTo, pendingFileIndex, phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "cursor-click") {
      return;
    }

    setCursor((prev) => ({ ...prev, clicking: true }));

    const id = window.setTimeout(() => {
      setCursor((prev) => ({ ...prev, clicking: false }));

      if (cursorTarget === "preview") {
        setCursorTarget(null);
        setPhase("browser-opening");
        return;
      }

      if (cursorTarget === "tab" && pendingFileIndex !== null) {
        setFileIndex(pendingFileIndex);
        setCharCount(0);
        setCursorTarget("explorer");
        setPhase("cursor-moving");
        return;
      }

      if (cursorTarget === "explorer" && pendingFileIndex !== null) {
        setPendingFileIndex(null);
        setCursorTarget(null);
        setPhase("typing");
      }
    }, CURSOR_CLICK_MS);

    return () => window.clearTimeout(id);
  }, [cursorTarget, pendingFileIndex, phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "browser-opening") {
      return;
    }

    const id = window.setTimeout(() => {
      setCursor((prev) => ({ ...prev, visible: false }));
      contactsClickDoneRef.current = false;
      scrollCursorTriggeredRef.current = false;
      setScrollProgress(0);
      setPhase("browser-scroll");
    }, BROWSER_OPEN_MS);

    return () => window.clearTimeout(id);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "browser-scroll") {
      return;
    }

    setScrollProgress(0);

    let scrollStart = 0;
    const clickTimeouts: number[] = [];
    let doneTimeout = 0;

    const animate = (now: number) => {
      if (!contactsClickDoneRef.current) {
        setScrollProgress(0);
        scrollRafRef.current = window.requestAnimationFrame(animate);
        return;
      }

      if (scrollStart === 0) {
        scrollStart = now;
      }

      const rawProgress = Math.min(1, (now - scrollStart) / BROWSER_SCROLL_MS);
      setScrollProgress(easeOutCubic(rawProgress));

      if (rawProgress < 1) {
        scrollRafRef.current = window.requestAnimationFrame(animate);
      } else {
        doneTimeout = window.setTimeout(() => setPhase("done"), 250);
      }
    };

    scrollRafRef.current = window.requestAnimationFrame(animate);

    if (!scrollCursorTriggeredRef.current) {
      scrollCursorTriggeredRef.current = true;

      clickTimeouts.push(
        window.setTimeout(() => {
          moveCursorTo(crmNavContactsRef.current);
          setCursor((prev) => ({ ...prev, visible: true }));

          clickTimeouts.push(
            window.setTimeout(() => {
              setCursor((prev) => ({ ...prev, clicking: true }));

              clickTimeouts.push(
                window.setTimeout(() => {
                  setCrmNavActive("contacts");
                  contactsClickDoneRef.current = true;
                  setCursor((prev) => ({
                    ...prev,
                    clicking: false,
                    visible: false,
                  }));
                }, CURSOR_CLICK_MS)
              );
            }, CURSOR_MOVE_MS)
          );
        }, PREVIEW_SETTLE_MS)
      );
    }

    return () => {
      window.cancelAnimationFrame(scrollRafRef.current);
      window.clearTimeout(doneTimeout);
      for (const id of clickTimeouts) {
        window.clearTimeout(id);
      }
    };
  }, [moveCursorTo, phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "done") {
      return;
    }

    const id = window.setTimeout(onLoop, LOOP_PAUSE_MS);
    return () => window.clearTimeout(id);
  }, [onLoop, phase, reducedMotion]);

  const titleLabel = showBrowser ? (
    <BrowserTabLabel />
  ) : (
    `${currentFile.tab} — ${PROJECT_NAME}`
  );
  const statusLabel = showBrowser ? "Simple Browser" : currentFile.language;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-3 border-white/10 border-b bg-[#0c1219]/70 px-3 py-1.5 sm:px-4 sm:py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
          <div className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
          <div className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          {typeof titleLabel === "string" ? (
            <span className="font-mono text-[#f3efe6]/45 text-[9px] sm:text-[10px]">
              {titleLabel}
            </span>
          ) : (
            <span className="inline-flex justify-center font-mono text-[#f3efe6]/45 text-[9px] sm:text-[10px]">
              {titleLabel}
            </span>
          )}
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 overflow-hidden"
        ref={demoSurfaceRef}
      >
        <DemoCursor cursor={cursor} />

        <div className="hidden w-[6rem] shrink-0 overflow-x-auto border-white/10 border-r bg-[#0c1219]/45 p-1 sm:block md:w-[6.75rem] md:p-1.5">
          <p className="mb-1 font-mono text-[#f3efe6]/35 text-[7px] uppercase tracking-[0.12em] sm:text-[8px]">
            Explorer
          </p>
          <div className="space-y-0.5 font-mono text-[8px] sm:text-[9px]">
            {EXPLORER_TREE.map((node) => {
              const indentClass =
                EXPLORER_INDENT_CLASSES[node.indent] ?? "pl-4";

              if (node.type === "folder") {
                return (
                  <p
                    className={`whitespace-nowrap text-[#f3efe6]/55 ${indentClass}`}
                    key={node.name}
                  >
                    {node.name}
                  </p>
                );
              }

              const isActive = !showBrowser && node.fileIndex === fileIndex;
              const isPending =
                pendingFileIndex === node.fileIndex &&
                phase.startsWith("cursor");
              return (
                <button
                  className={cn(
                    "block w-full whitespace-nowrap text-left transition-colors",
                    indentClass,
                    isActive || isPending
                      ? "text-[#f3efe6]"
                      : "text-[#f3efe6]/45",
                    isPending && "bg-white/5"
                  )}
                  key={node.fullPath}
                  ref={(el) => {
                    explorerRefs.current[node.fileIndex] = el;
                  }}
                  tabIndex={-1}
                  title={node.fullPath}
                  type="button"
                >
                  {node.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-stretch border-white/10 border-b bg-[#101820]/80">
            <div className="flex min-w-0 flex-1 overflow-x-auto">
              {FILES.map((file, index) => {
                const isActive = !showBrowser && index === fileIndex;
                const isPending =
                  pendingFileIndex === index && phase.startsWith("cursor");
                return (
                  <button
                    className={cn(
                      "shrink-0 border-white/10 border-r px-2.5 py-1.5 font-mono text-[9px] transition-colors sm:px-3 sm:py-1.5 sm:text-[10px]",
                      isActive || isPending
                        ? "bg-[#141c27] text-[#f3efe6]"
                        : "text-[#f3efe6]/40",
                      isPending && "ring-1 ring-white/15 ring-inset"
                    )}
                    key={file.tab}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    tabIndex={-1}
                    type="button"
                  >
                    {file.tab}
                  </button>
                );
              })}
              {showBrowser ? (
                <div className="max-w-[9rem] shrink-0 truncate border-white/10 border-r bg-[#141c27] px-2.5 py-1.5 font-mono text-[#f3efe6] text-[9px] sm:max-w-[11rem] sm:px-3 sm:py-1.5 sm:text-[10px]">
                  <BrowserTabLabel />
                </div>
              ) : null}
            </div>

            {showBrowser ? null : (
              <button
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 border-white/10 border-l px-2.5 py-1.5 font-mono text-[8px] transition-colors sm:px-3 sm:text-[9px]",
                  previewReady
                    ? "bg-[#141c27] text-[#f3efe6] ring-1 ring-white/10 ring-inset"
                    : "text-[#f3efe6]/35",
                  cursorTarget === "preview" &&
                    phase.startsWith("cursor") &&
                    "ring-white/25"
                )}
                ref={previewButtonRef}
                tabIndex={-1}
                type="button"
              >
                <Globe className="size-2.5 shrink-0" />
                Preview
              </button>
            )}
          </div>

          {showBrowser ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0c1219]/55">
              <div className="flex shrink-0 items-center gap-1.5 border-white/10 border-b px-2 py-1.5 sm:px-3">
                <ArrowLeft className="size-3 text-[#f3efe6]/30" />
                <ArrowRight className="size-3 text-[#f3efe6]/30" />
                <RotateCw className="size-3 text-[#f3efe6]/30" />
                <div className="min-w-0 flex-1 rounded bg-[#141c27] px-2 py-1 font-mono text-[#f3efe6]/55 text-[8px] sm:text-[9px]">
                  http://localhost:5173
                </div>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <CrmPreview
                  activeNav={crmNavActive}
                  contactsNavRef={crmNavContactsRef}
                  scrollProgress={scrollProgress}
                />
              </div>
            </div>
          ) : (
            <div
              className="min-h-0 flex-1 overflow-y-auto bg-[#0c1219]/55 px-2.5 py-2 sm:px-3 sm:py-2.5"
              ref={editorScrollRef}
            >
              <div className="font-mono text-[9px] leading-[1.45] sm:text-[10px]">
                {highlightCode(
                  visibleCode,
                  currentFile.language.includes("React")
                )}
                <span className="inline" ref={caretRef}>
                  {showCaret ? (
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-pulse bg-[#f3efe6]/90"
                    />
                  ) : null}
                </span>
              </div>
            </div>
          )}

          <div className="flex shrink-0 items-center justify-between border-white/10 border-t bg-[#0c1219]/70 px-2.5 py-1 font-mono text-[#f3efe6]/35 text-[8px] sm:px-3 sm:text-[9px]">
            <span>{statusLabel}</span>
            <span>
              {showBrowser
                ? `Scroll ${Math.round(scrollProgress * 100)}%`
                : `Ln ${visibleCode.split("\n").length}, Col ${visibleCode.length}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
