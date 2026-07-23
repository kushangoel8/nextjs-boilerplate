import Link from "next/link";
import { PathIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <PathIcon className="h-10 w-10 text-[var(--color-primary)]" />
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          You wandered off track.
        </h1>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          This page doesn&apos;t exist — but that&apos;s exactly the kind of thing Sidetrack would check in on.
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
