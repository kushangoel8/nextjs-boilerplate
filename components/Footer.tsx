import { HundredMark } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="flex items-center gap-2 font-display text-sm font-semibold">
          <HundredMark className="h-5 w-5 text-[var(--color-primary)]" />
          Hundred
        </p>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          Synthetic research, honestly labeled. Talk to real humans before you
          bet the company.
        </p>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          © {new Date().getFullYear()} Hundred
        </p>
      </div>
    </footer>
  );
}
