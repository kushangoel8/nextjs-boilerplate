"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Icons } from "./icons";

const IDEA =
  "A subscription box for houseplant parents that ships one rare plant every month.";

type Verdict = "pos" | "neutral" | "neg";

const VERDICT_COLOR: Record<Verdict, string> = {
  pos: "var(--color-positive)",
  neutral: "var(--color-warn)",
  neg: "var(--color-negative)",
};

const PERSONAS: {
  name: string;
  trait: string;
  hue: number;
  verdict: Verdict;
  chip?: string;
}[] = [
  { name: "Priya", trait: "Plant collector", hue: 265, verdict: "pos", chip: "would pay" },
  { name: "Dale", trait: "Skeptic dad", hue: 20, verdict: "neg", chip: "shipping?" },
  { name: "Yuki", trait: "Studio renter", hue: 190, verdict: "pos" },
  { name: "Marco", trait: "Budget-first", hue: 140, verdict: "neutral", chip: "too pricey" },
  { name: "Amara", trait: "Gift shopper", hue: 320, verdict: "pos", chip: "gifting it" },
  { name: "Tom", trait: "Kills cacti", hue: 45, verdict: "neg" },
  { name: "Lena", trait: "Aesthetic feed", hue: 280, verdict: "pos" },
  { name: "Ravi", trait: "Deal hunter", hue: 160, verdict: "neutral" },
  { name: "Sofia", trait: "New homeowner", hue: 210, verdict: "pos", chip: "curious" },
  { name: "Chen", trait: "Balcony gardener", hue: 110, verdict: "pos" },
  { name: "Nadia", trait: "Allergy-aware", hue: 350, verdict: "neutral" },
  { name: "Oskar", trait: "Minimalist", hue: 230, verdict: "neg", chip: "clutter" },
  { name: "Isla", trait: "Rare-plant nerd", hue: 90, verdict: "pos", chip: "obsessed" },
  { name: "Jorge", trait: "Impulse buyer", hue: 30, verdict: "pos" },
  { name: "Mei", trait: "Reads fine print", hue: 300, verdict: "neutral" },
  { name: "Anya", trait: "Cold winters", hue: 200, verdict: "neg", chip: "will freeze" },
  { name: "Kofi", trait: "Plant TikToker", hue: 130, verdict: "pos" },
  { name: "Elif", trait: "Small flat", hue: 250, verdict: "neutral" },
  { name: "Ben", trait: "Subscribed to 6 boxes", hue: 60, verdict: "pos" },
  { name: "Hana", trait: "Cancels fast", hue: 340, verdict: "neutral", chip: "churn risk" },
  { name: "Piotr", trait: "DIY propagator", hue: 170, verdict: "neg" },
  { name: "Zoe", trait: "Office jungle", hue: 285, verdict: "pos" },
  { name: "Ari", trait: "Pet-safe only", hue: 15, verdict: "neutral", chip: "cat rules" },
  { name: "June", trait: "Loyal if wowed", hue: 220, verdict: "pos" },
];

const BARS = [
  { label: "Loves the rarity hook", value: 73, color: "var(--color-positive)" },
  { label: "Worried plants die in shipping", value: 57, color: "var(--color-negative)" },
  { label: "Would pay $12+/month", value: 41, color: "var(--color-cyan)" },
];

const STEPS = ["The idea", "The panel", "The data", "The verdict"];

function Scene({
  p,
  range,
  children,
  className = "",
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  children: ReactNode;
  className?: string;
}) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, [range[0], range[1]], [40, 0]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function TypedIdea({ p }: { p: MotionValue<number> }) {
  const chars = useTransform(p, [0.03, 0.15], [0, IDEA.length]);
  const [n, setN] = useState(0);
  useMotionValueEvent(chars, "change", (v) =>
    setN(Math.max(0, Math.min(IDEA.length, Math.round(v)))),
  );
  return (
    <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-left shadow-2xl shadow-black/40">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
        Your idea
      </p>
      <p className="min-h-16 font-display text-xl leading-snug sm:text-2xl">
        {IDEA.slice(0, n)}
        <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-[var(--color-primary)] align-middle" />
      </p>
    </div>
  );
}

function PersonaCard({
  p,
  index,
  persona,
}: {
  p: MotionValue<number>;
  index: number;
  persona: (typeof PERSONAS)[number];
}) {
  const start = 0.24 + index * 0.005;
  const opacity = useTransform(p, [start, start + 0.045], [0, 1]);
  const scale = useTransform(p, [start, start + 0.045], [0.6, 1]);
  const reactStart = 0.4 + index * 0.004;
  const reaction = useTransform(p, [reactStart, reactStart + 0.05], [0, 1]);
  const color = VERDICT_COLOR[persona.verdict];

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-2.5 text-center"
    >
      <motion.div
        aria-hidden
        style={{ opacity: reaction, boxShadow: `inset 0 0 0 1.5px ${color}` }}
        className="pointer-events-none absolute inset-0 rounded-xl"
      />
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{
          background: `linear-gradient(135deg, hsl(${persona.hue} 70% 55%), hsl(${persona.hue + 40} 70% 45%))`,
        }}
      >
        {persona.name[0]}
      </div>
      <p className="text-[11px] font-semibold leading-tight">{persona.name}</p>
      <p className="hidden text-[9px] leading-tight text-[var(--color-muted-foreground)] sm:block">
        {persona.trait}
      </p>
      {persona.chip && (
        <motion.span
          style={{ opacity: reaction, color }}
          className="absolute -top-2 right-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 py-0.5 text-[8px] font-bold"
        >
          {persona.chip}
        </motion.span>
      )}
    </motion.div>
  );
}

function Counter({ p }: { p: MotionValue<number> }) {
  const value = useTransform(p, [0.58, 0.7], [0, 68]);
  const [n, setN] = useState(0);
  useMotionValueEvent(value, "change", (v) =>
    setN(Math.max(0, Math.min(68, Math.round(v)))),
  );
  return (
    <span className="font-display text-6xl font-bold text-[var(--color-positive)] sm:text-7xl">
      {n}
    </span>
  );
}

function StatBar({
  p,
  bar,
  index,
}: {
  p: MotionValue<number>;
  bar: (typeof BARS)[number];
  index: number;
}) {
  const start = 0.62 + index * 0.03;
  const scaleX = useTransform(p, [start, start + 0.1], [0, bar.value / 100]);
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
        <span className="text-[var(--color-muted-foreground)]">{bar.label}</span>
        <span className="font-semibold" style={{ color: bar.color }}>
          {bar.value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-muted)]">
        <motion.div
          style={{ scaleX, background: bar.color }}
          className="h-full w-full origin-left rounded-full"
        />
      </div>
    </div>
  );
}

function Quote({
  p,
  range,
  text,
  who,
  accent,
}: {
  p: MotionValue<number>;
  range: [number, number];
  text: string;
  who: string;
  accent: string;
}) {
  const opacity = useTransform(p, range, [0, 1]);
  const x = useTransform(p, range, [24, 0]);
  return (
    <motion.blockquote
      style={{ opacity, x, borderColor: accent }}
      className="rounded-xl border-l-2 bg-[var(--color-surface)] px-4 py-3 text-left text-sm"
    >
      <p className="leading-snug">&ldquo;{text}&rdquo;</p>
      <footer className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{who}</footer>
    </motion.blockquote>
  );
}

function ProgressRail({ p }: { p: MotionValue<number> }) {
  const scaleY = useTransform(p, [0, 1], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    setActive(v < 0.2 ? 0 : v < 0.55 ? 1 : v < 0.83 ? 2 : 3);
  });
  return (
    <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
      <div className="flex flex-col items-end gap-6">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
              active === i
                ? "text-[var(--color-foreground)]"
                : "text-[var(--color-muted-foreground)]/50"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="relative h-48 w-[3px] overflow-hidden rounded-full bg-[var(--color-muted)]">
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-cyan)]"
        />
      </div>
    </div>
  );
}

function StaticStory() {
  return (
    <section id="story" className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="font-display text-3xl font-bold">Watch a panel react</h2>
      <div className="mt-8 flex flex-col gap-10">
        <TypedIdeaStatic />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {PERSONAS.map((persona) => (
            <div
              key={persona.name}
              className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-2.5 text-center"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, hsl(${persona.hue} 70% 55%), hsl(${persona.hue + 40} 70% 45%))`,
                }}
              >
                {persona.name[0]}
              </div>
              <p className="text-[11px] font-semibold">{persona.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {BARS.map((bar) => (
            <div key={bar.label} className="w-full">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted-foreground)]">{bar.label}</span>
                <span className="font-semibold" style={{ color: bar.color }}>
                  {bar.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-muted)]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${bar.value}%`, background: bar.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypedIdeaStatic() {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
        Your idea
      </p>
      <p className="font-display text-xl leading-snug">{IDEA}</p>
    </div>
  );
}

export function SimulationStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) return <StaticStory />;

  return (
    <section ref={ref} id="story" className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden">
        <Scene p={scrollYProgress} range={[0, 0.005, 0.18, 0.24]}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Step 1 — Drop your idea in
          </p>
          <TypedIdea p={scrollYProgress} />
          <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
            Keep scrolling ↓
          </p>
        </Scene>

        <Scene p={scrollYProgress} range={[0.2, 0.26, 0.52, 0.58]}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Step 2 — 100 personas read it
          </p>
          <div className="grid w-full max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
            {PERSONAS.map((persona, i) => (
              <PersonaCard key={persona.name} p={scrollYProgress} index={i} persona={persona} />
            ))}
          </div>
          <p className="mt-5 text-xs text-[var(--color-muted-foreground)]">
            …plus 76 more behind the scenes
          </p>
        </Scene>

        <Scene p={scrollYProgress} range={[0.55, 0.61, 0.79, 0.85]}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Step 3 — Reactions become data
          </p>
          <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="flex items-end gap-3">
              <Counter p={scrollYProgress} />
              <p className="pb-2 text-sm leading-tight text-[var(--color-muted-foreground)]">
                of 100 would
                <br />
                try it
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {BARS.map((bar, i) => (
                <StatBar key={bar.label} p={scrollYProgress} bar={bar} index={i} />
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Quote
                p={scrollYProgress}
                range={[0.68, 0.74]}
                text="I'd gift this to my sister immediately."
                who="Priya, 24 · Bengaluru"
                accent="var(--color-positive)"
              />
              <Quote
                p={scrollYProgress}
                range={[0.71, 0.77]}
                text="Shipping a live plant to Minnesota in January? Good luck."
                who="Dale, 41 · Minneapolis"
                accent="var(--color-negative)"
              />
            </div>
          </div>
        </Scene>

        <Scene p={scrollYProgress} range={[0.83, 0.9, 1, 1]}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Step 4 — The verdict
          </p>
          <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-raised)] to-[var(--color-surface)] p-8 text-center shadow-2xl shadow-black/40">
            <Icons.seal className="mx-auto h-10 w-10 text-[var(--color-primary)]" weight="fill" />
            <p className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
              Promising — fix the shipping fear first.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              Every report ends with a verdict like this: what landed, what
              scared people off, and the one thing to change before launch.
            </p>
            <a
              href="#waitlist"
              className="mt-6 inline-block cursor-pointer rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Run this on your idea
            </a>
          </div>
        </Scene>

        <ProgressRail p={scrollYProgress} />
      </div>
    </section>
  );
}
