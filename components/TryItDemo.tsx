"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const TEMPLATES = [
  (t: string) => `Hey — how's ${t} going? Anything you got stuck on today?`,
  (t: string) => `Quick one: did you get any time in on ${t} today, or is it getting pushed?`,
  (t: string) => `Thinking about ${t} — where'd you leave off last time?`,
  (t: string) => `Checking in on ${t}. Small win or no progress today, either is fine — what happened?`,
];

export function TryItDemo() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const track = input.trim();
    if (!track) return;
    setLoading(true);
    setMessage(null);
    window.setTimeout(() => {
      const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      setMessage(template(track));
      setLoading(false);
    }, 700);
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Try the idea right now
          </h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Type something you&apos;re juggling — see the kind of check-in you&apos;d actually get.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={handleGenerate}
            className="mt-7 flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 pl-5 sm:flex-row"
          >
            <label htmlFor="demo-track" className="sr-only">
              What are you working on?
            </label>
            <input
              id="demo-track"
              type="text"
              placeholder="e.g. my chemistry lab report"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={60}
              className="h-12 flex-1 border-none bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted-foreground)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-12 shrink-0 cursor-pointer rounded-xl bg-[var(--color-primary)] px-6 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "…" : "Generate"}
            </button>
          </form>
        </Reveal>
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 flex items-start gap-2.5 rounded-2xl rounded-tl-sm bg-[var(--color-muted)] px-4 py-3.5 text-left"
            >
              <Icons.message className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-primary)]" />
              <span className="text-sm leading-snug text-[var(--color-foreground)]">
                {message}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
          A sample of the style — your real check-ins reference what you actually told it, not a template.
        </p>
      </div>
    </section>
  );
}
