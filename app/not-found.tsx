import Link from "next/link";
import { HundredMark } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <HundredMark className="h-10 w-10 text-[var(--color-primary)]" />
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          404 — the panel is 97% sure this page doesn&apos;t exist.
        </h1>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          The other 3% would pay $12/month for it anyway.
        </p>
      </div>
      <Link
        href="/"
        className="cursor-pointer rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
      >
        Back home
      </Link>
    </main>
  );
}
