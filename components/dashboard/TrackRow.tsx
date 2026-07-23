"use client";

import { useTransition } from "react";
import { toggleTrack, deleteTrack } from "@/app/dashboard/actions";

type Track = {
  id: string;
  label: string;
  description: string | null;
  active: boolean;
};

export function TrackRow({ track }: { track: Track }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[var(--color-foreground)]">
          {track.label}
        </p>
        {track.description && (
          <p className="truncate text-xs text-[var(--color-muted-foreground)]">
            {track.description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => toggleTrack(track.id, !track.active))}
          className="cursor-pointer rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)] disabled:opacity-50"
        >
          {track.active ? "Active" : "Paused"}
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => deleteTrack(track.id))}
          className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--color-destructive)] transition-colors hover:bg-[var(--color-destructive)]/10 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
