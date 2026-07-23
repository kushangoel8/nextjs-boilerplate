"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const DOTS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  top: 8 + ((i * 53) % 84),
  size: 6 + ((i * 13) % 10),
  hue: 240 + ((i * 29) % 90),
  duration: 6 + ((i * 7) % 6),
  delay: (i % 10) * 0.35,
}));

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 640], [1, 0]);
  const contentY = useTransform(scrollY, [0, 640], [0, -60]);

  return (
    <section id="top" className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #7c3aed 0%, #6366f144 55%, transparent 100%)",
        }}
      />
      {!reduce &&
        DOTS.map((d, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: `hsl(${d.hue} 85% 70% / 0.35)`,
              boxShadow: `0 0 ${d.size * 2}px hsl(${d.hue} 85% 70% / 0.4)`,
            }}
            animate={{ y: [0, -16, 0] }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-3xl pt-24 pb-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]"
        >
          Synthetic audience research
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Your first hundred users
          <br />
          <span className="bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">
            don&apos;t exist.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted-foreground)]"
        >
          Hundred spins up a panel of 100 AI personas — different ages, countries,
          and attitudes — and runs your idea past every one of them. Ranked
          objections, sentiment, and a price curve, in minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#waitlist"
            className="cursor-pointer rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            Join the waitlist
          </a>
          <a
            href="#story"
            className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-ring)]"
          >
            Watch a panel react ↓
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]"
        >
          100 personas · 3 minutes · first report free
        </motion.p>
      </motion.div>

      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-muted-foreground)]"
      >
        ↓
      </motion.div>
    </section>
  );
}
