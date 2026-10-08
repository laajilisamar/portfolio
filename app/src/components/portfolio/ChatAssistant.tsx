import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import {
  CV_LINKS,
  DESIGNS,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PROFILE,
  PROJECTS,
  SKILLS,
  SOCIAL_LINKS,
} from "@/data/portfolio";

type Message = { role: "user" | "assistant"; content: string };

/** Set VITE_CHAT_ENDPOINT=/api/chat in .env to use the real AI. Without it, the local answers below are used. */
const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT as string | undefined;

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm Samar's assistant. Ask me about her skills, projects, experience or how to contact her.",
};
const SUGGESTIONS = ["Who is Samar?", "Skills", "Projects", "Experience", "Contact"];

/* ---------- Local answers (built from your data, no API needed) ---------- */

const has = (text: string, words: string[]) => words.some((word) => text.includes(word));

const localAnswer = (question: string): string => {
  const q = question.toLowerCase();

  if (/\b(hi|hello|hey|salut|bonjour|salam|ahla|marhba)\b/.test(q) && q.length < 25) {
    return "Hello! Ask me about Samar's skills, projects, experience, education or contact details.";
  }
  if (has(q, ["cv", "resume", "résumé", "download", "télécharg"])) {
    return `You can download Samar's CV with the buttons at the top of the page: ${CV_LINKS.map((cv) => cv.label).join(" or ")}.`;
  }
  if (has(q, ["contact", "email", "e-mail", "mail", "phone", "téléphone", "telephone", "reach", "joindre", "nomra"])) {
    return `Email: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nAddress: ${PROFILE.address}\nYou can also use the contact form at the bottom of the page.`;
  }
  if (has(q, ["skill", "compétence", "competence", "tech", "stack", "framework", "language", "react", "python", "laravel", "tools", "outil"])) {
    if (has(q, ["speak", "parle", "arabic", "french", "english", "arabe", "français", "anglais"])) {
      return `Samar's languages: ${LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", ")}.`;
    }
    return SKILLS.map((group) => `${group.title}: ${group.items.join(", ")}`).join("\n");
  }
  if (has(q, ["speak", "parle", "arabic", "french", "english", "arabe", "français", "anglais", "langue"])) {
    return `Samar's languages: ${LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", ")}.`;
  }
  if (has(q, ["design", "figma", "behance", "mockup", "maquette"]) || /\b(ui|ux)\b/.test(q)) {
    const behance = SOCIAL_LINKS.find((link) => link.label === "Behance")?.href;
    return `Samar designs interfaces with Figma. Her design work: ${DESIGNS.map((d) => d.title).join(", ")}.${behance ? `\nMore on Behance: ${behance}` : ""}`;
  }
  if (has(q, ["project", "projet", "iqraa", "vibracom", "build", "built", "portfolio work", "réalis"])) {
    return PROJECTS.map((p) => `• ${p.name}: ${p.label} (${p.technologies.join(", ")})`).join("\n");
  }
  if (has(q, ["experience", "expérience", "internship", "stage", "job", "work", "travail", "teach", "enseign"])) {
    return EXPERIENCE.slice(0, 4).map((e) => `• ${e.date}: ${e.role}, ${e.company}`).join("\n");
  }
  if (has(q, ["education", "étude", "etude", "formation", "master", "licence", "degree", "diplôme", "diplome", "university", "school"])) {
    return EDUCATION.map((e) => `• ${e.year}: ${e.degree} (${e.school})`).join("\n");
  }
  if (has(q, ["where", "où", "ou habite", "location", "live", "sousse", "tunisia", "tunisie", "ville", "city"])) {
    return `Samar is based in ${PROFILE.city}.`;
  }
  if (has(q, ["who", "qui", "about", "samar", "présente", "presente", "introduce"])) {
    return `${PROFILE.name} is an information systems developer and software engineering master's student based in ${PROFILE.city}. She's passionate about web and mobile development and UI/UX design.`;
  }
  return "I can tell you about Samar's skills, projects, design work, experience, education, languages or how to contact her. What would you like to know?";
};

const askAi = async (messages: Message[]): Promise<string> => {
  const response = await fetch(ENDPOINT as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("AI request failed");
  const data = (await response.json()) as { reply?: string };
  if (!data.reply) throw new Error("Empty reply");
  return data.reply;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- Component ---------- */

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const content = text.trim().slice(0, 500);
    if (!content || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    let reply: string;
    try {
      if (ENDPOINT) {
        reply = await askAi(next);
      } else {
        await wait(600);
        reply = localAnswer(content);
      }
    } catch {
      reply = localAnswer(content); // AI unavailable: fall back to local answers
    }

    setMessages((current) => [...current, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Samar's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                <Bot className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">Samar's assistant</p>
                <p className="text-xs opacity-80">Ask me anything about Samar</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-primary-foreground/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-foreground"
                    }`}
                  >
                    {message.content}
                  </p>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-2 w-2 rounded-full bg-primary"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={500}
                placeholder="Type your question..."
                aria-label="Your question"
                className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close chat" : "Open chat with Samar's assistant"}
          aria-expanded={open}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatAssistant;