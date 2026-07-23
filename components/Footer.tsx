import { PathIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-base font-semibold">
          <PathIcon className="h-5 w-5 text-[var(--color-primary)]" />
          Sidetrack
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          &copy; {new Date().getFullYear()} Sidetrack. Built for people running more than one thing at once.
        </p>
      </div>
    </footer>
  );
}
