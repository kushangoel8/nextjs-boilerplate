"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]"
          >
            For people running more than one thing at once
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            The check-in that{" "}
            <span className="text-[var(--color-primary)]">actually gets through.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-muted-foreground)]"
          >
            Sidetrack sends short texts and voice notes about the specific
            things you&apos;re juggling — your novel, your research, your MUN
            prep — not another generic reminder you swipe away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#signup"
              className="cursor-pointer rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get early access
            </a>
            <a
              href="#how"
              className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-3.5 text-center text-sm font-semibold text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-primary)]"
            >
              See how it works
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
