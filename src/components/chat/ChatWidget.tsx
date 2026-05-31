"use client";

import { MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Link } from "@/lib/i18n/navigation";

type Role = "user" | "assistant";
type ChatMessage = { id: string; role: Role; content: string };

/**
 * The chat renders plain text (no markdown parser), so strip the common
 * markdown the model may still emit — bold/italic markers, headings and link
 * syntax — so visitors never see raw `**` or `[text](url)`.
 */
function toPlainText(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
}

let idCounter = 0;
function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `m${idCounter}`;
}

export function ChatWidget() {
  const t = useTranslations("chat");
  const contact = useTranslations("contact.info");
  const locale = useLocale();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const lineUrl = contact("line.url");
  const suggestions = (t.raw("suggestions") as string[]) ?? [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  // Abort any in-flight request on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    setError(null);
    setInput("");

    const userMsg: ChatMessage = { id: newId(), role: "user", content };
    const assistantMsg: ChatMessage = {
      id: newId(),
      role: "assistant",
      content: "",
    };
    const history = [...messages, userMsg].map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history, locale }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((cur) =>
          cur.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: acc } : m,
          ),
        );
      }
      acc += decoder.decode();
      const finalText = acc.trim();
      if (!finalText) throw new Error("empty");

      setMessages((cur) =>
        cur.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: finalText } : m,
        ),
      );
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        // User aborted — keep whatever streamed so far.
      } else {
        setError(t("error"));
        setMessages((cur) =>
          cur.filter(
            (m) => !(m.id === assistantMsg.id && !m.content.trim()),
          ),
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  function resetConversation() {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setStreaming(false);
    inputRef.current?.focus();
  }

  const hasConversation = messages.length > 0;

  const panel = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="chat-panel"
          id="chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label={t("title")}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[140] flex max-h-[82vh] flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_24px_70px_-20px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:h-[600px] sm:max-h-[78vh] sm:w-[400px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-foreground px-5 py-4 text-background">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-accent)]">
                <Sparkles className="h-4 w-4 text-white" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold tracking-tight">{t("title")}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("online")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasConversation ? (
                <button
                  type="button"
                  onClick={resetConversation}
                  aria-label={t("reset")}
                  title={t("reset")}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex-1 space-y-4 overflow-y-auto bg-[color:var(--color-background)] px-4 py-5"
          >
            {/* Welcome + suggestions */}
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[color:var(--color-border)] bg-white px-4 py-3 text-[13.5px] leading-relaxed text-foreground">
                {t("welcome")}
              </div>
            </div>

            {!hasConversation ? (
              <div className="space-y-2">
                <p className="px-1 text-[11px] font-semibold tracking-[0.14em] text-[color:var(--color-muted)] uppercase">
                  {t("suggestionsLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-[color:var(--color-border)] bg-white px-3 py-1.5 text-left text-[12.5px] text-foreground transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[88%] rounded-2xl rounded-tr-sm bg-[color:var(--color-accent)] px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap text-white"
                      : "max-w-[88%] rounded-2xl rounded-tl-sm border border-[color:var(--color-border)] bg-white px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap text-foreground"
                  }
                >
                  {(m.role === "assistant"
                    ? toPlainText(m.content)
                    : m.content) || (
                    <span className="inline-flex gap-1" aria-label={t("typing")}>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[color:var(--color-muted)] [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[color:var(--color-muted)] [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[color:var(--color-muted)]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {error ? (
              <p className="px-1 text-center text-[12px] text-[color:var(--color-accent)]">
                {error}
              </p>
            ) : null}
          </div>

          {/* Lead-capture CTAs */}
          <div className="flex items-center gap-2 border-t border-[color:var(--color-border)] bg-white px-4 pt-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-[color:var(--color-accent)] px-3 py-2 text-center text-[12.5px] font-semibold text-white transition-colors hover:bg-[#bb000d]"
            >
              {t("ctaConsult")}
            </Link>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-[color:var(--color-border)] px-3 py-2 text-center text-[12.5px] font-semibold text-foreground transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              {t("ctaLine")}
            </a>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="bg-white px-4 pt-2 pb-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 focus-within:border-[color:var(--color-accent)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={2000}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                className="max-h-28 flex-1 resize-none bg-transparent text-[13.5px] leading-relaxed text-foreground outline-none placeholder:text-[color:var(--color-muted)]"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label={t("send")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#0f0f0f] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 text-center text-[10.5px] leading-snug text-[color:var(--color-muted)]">
              {t("disclaimer")}
            </p>
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  const launcher = (
    <AnimatePresence>
      {!open ? (
        <motion.button
          key="chat-launcher"
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("launcher")}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-5 bottom-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white shadow-[0_14px_36px_-8px_rgba(215,0,15,0.6)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(
    <>
      {launcher}
      {panel}
    </>,
    document.body,
  );
}
