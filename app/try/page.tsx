import Link from "next/link";
import type { Metadata } from "next";
import { HundredMark } from "@/components/icons";
import { RunPanel } from "@/components/try/RunPanel";

export const metadata: Metadata = {
  title: "Run a panel — Hundred",
  description:
    "Type your idea and watch a panel of 100 synthetic personas react in real time — sentiment, objections, price curve, and a verdict.",
};

export default function TryPage() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col px-6 py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #7c3aed 0%, #6366f144 55%, transparent 100%)" }}
      />
      <header className="relative z-10 mx-auto mb-10 flex w-full max-w-3xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <HundredMark className="h-6 w-6 text-[var(--color-primary)]" />
          Hundred
        </Link>
        <Link
          href="/#waitlist"
          className="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
        >
          Join the waitlist
        </Link>
      </header>

      <div className="relative z-10 mx-auto mb-8 w-full max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Run your idea past a hundred people.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted-foreground)]">
          Type anything — a product, a pitch, a feature. The panel reacts in
          real time, then hands you the verdict.
        </p>
      </div>

      <div className="relative z-10 pb-20">
        <RunPanel />
      </div>
    </main>
  );
}
