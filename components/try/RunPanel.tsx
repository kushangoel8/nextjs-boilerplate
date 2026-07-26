"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import type { Report, Verdict } from "@/lib/simulate";
import { Icons } from "@/components/icons";

type Phase = "idle" | "running" | "done" | "error";

const VERDICT_COLOR: Record<Verdict, string> = {
  pos: "var(--color-positive)",
  neutral: "var(--color-warn)",
  neg: "var(--color-negative)",
};

const EXAMPLES = [
  "A subscription box that ships one rare houseplant every month.",
  "An AI that turns your voice memos into polished blog posts.",
  "A dating app that only lets you message people you've matched with IRL.",
];

// A 10x10 grid of dots representing the 100-person panel.
const GRID = Array.from({ length: 100 }, (_, i) => i);

export function RunPanel() {
  const reduce = useReducedMotion();
  const [idea, setIdea] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [litDots, setLitDots] = useState<Record<number, Verdict>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  async function run(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = idea.trim();
    if (trimmed.length < 8) {
      setError("Give me a sentence to work with.");
      setPhase("error");
      return;
    }
    setPhase("running");
    setError("");
    setReport(null);
    setLitDots({});

    // Kick off the request and the visual panel-fill in parallel. The animation
    // gives a floor of ~2.2s so it always feels like a real panel deliberating.
    const started = Date.now();
    const reqPromise = fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: trimmed }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
        return data.report as Report;
      });

    // Progressively light the grid while we wait.
    if (!reduce) {
      const order = [...GRID].sort(() => Math.random() - 0.5);
      order.forEach((dot, i) => {
        setTimeout(() => {
          const roll = Math.random();
          const v: Verdict = roll < 0.55 ? "pos" : roll < 0.8 ? "neutral" : "neg";
          setLitDots((prev) => ({ ...prev, [dot]: v }));
        }, (i / GRID.length) * 1800);
      });
    }

    try {
      const result = await reqPromise;
      const elapsed = Date.now() - started;
      const floor = reduce ? 0 : 2200;
      if (elapsed < floor) await new Promise((r) => setTimeout(r, floor - elapsed));
      setReport(result);
      setPhase("done");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (err) {
      setError((err as Error).message);
      setPhase("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Input card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl shadow-black/40 sm:p-8"
      >
        <form onSubmit={run}>
          <label htmlFor="idea" className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Your idea
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={phase === "running"}
            rows={3}
            maxLength={600}
            placeholder="Describe your product, pitch, or feature in a sentence or two…"
            className="mt-2 w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-base leading-relaxed outline-none ring-[var(--color-ring)] transition-shadow focus:ring-2 disabled:opacity-60"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                disabled={phase === "running"}
                onClick={() => setIdea(ex)}
                className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-xs text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-ring)] hover:text-[var(--color-foreground)] disabled:opacity-50"
              >
                {ex.length > 42 ? ex.slice(0, 42) + "…" : ex}
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-xs text-[var(--color-muted-foreground)]">
              {idea.length}/600
            </span>
            <button
              type="submit"
              disabled={phase === "running"}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10">
                {phase === "running" ? "Running the panel…" : "Run the panel →"}
              </span>
              {!reduce && (
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
              )}
            </button>
          </div>
        </form>

        {phase === "error" && (
          <p role="alert" className="mt-3 text-sm text-[var(--color-destructive)]">
            {error}
          </p>
        )}
      </motion.div>

      {/* Live panel grid */}
      <AnimatePresence>
        {phase === "running" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 flex flex-col items-center">
              <p className="mb-5 text-sm text-[var(--color-muted-foreground)]">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]" />{" "}
                100 personas are reading your idea…
              </p>
              <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                {GRID.map((i) => {
                  const v = litDots[i];
                  return (
                    <motion.span
                      key={i}
                      initial={false}
                      animate={{
                        scale: v ? 1 : 0.5,
                        backgroundColor: v ? VERDICT_COLOR[v] : "var(--color-muted)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="h-4 w-4 rounded-[4px] sm:h-5 sm:w-5"
                      style={{ boxShadow: v ? `0 0 8px ${VERDICT_COLOR[v]}66` : "none" }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {phase === "done" && report && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <ReportView report={report} reduce={!!reduce} />
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setPhase("idle");
                  setReport(null);
                  setIdea("");
                }}
                className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-ring)]"
              >
                Run another idea
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReportView({ report, reduce }: { report: Report; reduce: boolean }) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl shadow-black/40 sm:p-8">
      {/* headline number */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-end gap-3">
          <CountUp value={report.tryPercent} reduce={reduce} />
          <p className="pb-2 text-sm leading-tight text-[var(--color-muted-foreground)]">
            of 100 would
            <br />
            try it
          </p>
        </div>
        <SentimentSplit report={report} reduce={reduce} />
      </div>

      {/* bars */}
      <div className="mt-8 flex flex-col gap-4">
        {report.bars.map((bar, i) => (
          <Bar key={bar.label} label={bar.label} value={bar.value} color={bar.color} delay={i * 0.1} reduce={reduce} />
        ))}
      </div>

      {/* objections */}
      <div className="mt-8">
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Top objections
        </h3>
        <ul className="mt-3 flex flex-col gap-2">
          {report.objections.map((o, i) => (
            <motion.li
              key={o.text}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm"
            >
              <span>{o.text}</span>
              <span className="shrink-0 rounded-full bg-[var(--color-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-muted-foreground)]">
                {o.count} of 100
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* price curve */}
      <div className="mt-8">
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Willingness to pay
        </h3>
        <div className="mt-4 flex items-end justify-between gap-2 sm:gap-3">
          {report.priceCurve.map((p, i) => {
            const max = Math.max(...report.priceCurve.map((x) => x.pct), 1);
            return (
              <div key={p.price} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={reduce ? false : { height: 0 }}
                  animate={{ height: `${(p.pct / max) * 96 + 4}px` }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-t-md bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-cyan)]"
                />
                <span className="text-[11px] font-semibold">${p.price}</span>
                <span className="text-[10px] text-[var(--color-muted-foreground)]">{p.pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* quotes */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {report.quotes.map((q, i) => (
          <motion.blockquote
            key={q.text + i}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="rounded-xl border-l-2 bg-[var(--color-background)] px-4 py-3 text-sm"
            style={{ borderColor: VERDICT_COLOR[q.verdict] }}
          >
            <p className="leading-snug">&ldquo;{q.text}&rdquo;</p>
            <footer className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{q.who}</footer>
          </motion.blockquote>
        ))}
      </div>

      {/* verdict */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-2xl border border-[var(--color-ring)] bg-gradient-to-b from-[var(--color-surface-raised)] to-[var(--color-surface)] p-6"
      >
        <div className="flex items-start gap-3">
          <Icons.seal className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-primary)]" weight="fill" />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
              The verdict
            </p>
            <p className="mt-1.5 text-base leading-relaxed">{report.verdict}</p>
          </div>
        </div>
      </motion.div>

      <p className="mt-4 text-center text-[11px] text-[var(--color-muted-foreground)]">
        {report.poweredBy === "llm"
          ? "Panel generated by a live AI model."
          : "Demo panel — connect an AI key for a live model-generated panel. Synthetic results are a first pass, not a substitute for talking to real people."}
      </p>
    </div>
  );
}

function CountUp({ value, reduce }: { value: number; reduce: boolean }) {
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  const color =
    value >= 62 ? "var(--color-positive)" : value >= 45 ? "var(--color-warn)" : "var(--color-negative)";
  return (
    <span className="font-display text-6xl font-bold leading-none sm:text-7xl" style={{ color }}>
      {n}
    </span>
  );
}

function SentimentSplit({ report, reduce }: { report: Report; reduce: boolean }) {
  const { pos, neutral, neg } = report.sentiment;
  const segs = [
    { v: pos, c: "var(--color-positive)", label: "Yes" },
    { v: neutral, c: "var(--color-warn)", label: "Maybe" },
    { v: neg, c: "var(--color-negative)", label: "No" },
  ];
  return (
    <div className="w-full max-w-xs">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segs.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { width: 0 }}
            animate={{ width: `${s.v}%` }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            style={{ background: s.c }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-[var(--color-muted-foreground)]">
        {segs.map((s) => (
          <span key={s.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: s.c }} />
            {s.label} {s.v}
          </span>
        ))}
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  color,
  delay,
  reduce,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-[var(--color-muted-foreground)]">{label}</span>
        <span className="font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--color-muted)]">
        <motion.div
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
