"use client";

import { PathIcon } from "./icons";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <PathIcon className="h-6 w-6 text-[var(--color-primary)]" />
          Sidetrack
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--color-muted-foreground)] sm:flex">
          <a href="#how" className="transition-colors hover:text-[var(--color-foreground)]">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-[var(--color-foreground)]">
            Pricing
          </a>
          <a href="/login" className="transition-colors hover:text-[var(--color-foreground)]">
            Log in
          </a>
        </nav>
        <a
          href="#signup"
          className="cursor-pointer rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
