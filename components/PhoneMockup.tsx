"use client";

import { motion } from "framer-motion";
import { Icons } from "./icons";

const messages = [
  {
    delay: 0.2,
    text: "Hey — did you get past the stuck part in ch. 12? 📝",
    icon: Icons.novel,
  },
  {
    delay: 0.9,
    text: "Nice. Also — MUN prep today, or pushing to tomorrow?",
    icon: Icons.mun,
  },
  {
    delay: 1.6,
    text: "Voice note from Sidetrack — 0:14",
    icon: Icons.waveform,
    isVoice: true,
  },
];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] select-none">
      <div className="relative rounded-[2.5rem] border-[6px] border-[var(--color-foreground)]/90 bg-[var(--color-foreground)]/90 p-2 shadow-2xl shadow-[var(--color-primary)]/20">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
        <div className="flex h-[560px] flex-col gap-3 overflow-hidden rounded-[2rem] bg-[var(--color-surface)] px-4 pb-6 pt-10">
          <div className="mb-2 text-center text-xs font-medium text-[var(--color-muted-foreground)]">
            Sidetrack
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3">
            {messages.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: m.delay, duration: 0.4, ease: "easeOut" }}
                  className="flex max-w-[85%] items-start gap-2 self-start rounded-2xl rounded-bl-sm bg-[var(--color-muted)] px-3.5 py-2.5"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-[13px] leading-snug text-[var(--color-foreground)]">
                    {m.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-[var(--color-accent)]/20 blur-2xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute -bottom-8 -left-8 -z-10 h-48 w-48 rounded-full bg-[var(--color-primary)]/20 blur-2xl"
      />
    </div>
  );
}
