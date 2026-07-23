"use client";

import { HundredMark } from "./icons";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]/50 bg-[var(--color-background)]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <HundredMark className="h-6 w-6 text-[var(--color-primary)]" />
          Hundred
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--color-muted-foreground)] sm:flex">
          <a href="#story" className="transition-colors hover:text-[var(--color-foreground)]">
            Watch a panel
          </a>
          <a href="#features" className="transition-colors hover:text-[var(--color-foreground)]">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-[var(--color-foreground)]">
            Pricing
          </a>
        </nav>
        <a
          href="#waitlist"
          className="cursor-pointer rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
