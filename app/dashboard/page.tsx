import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { addTrack, signOut } from "./actions";
import { TrackRow } from "@/components/dashboard/TrackRow";
import { HundredMark, Icons } from "@/components/icons";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16 text-center">
        <p className="text-[var(--color-muted-foreground)]">
          Supabase isn&apos;t configured yet — the dashboard needs
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set.
        </p>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: tracks }, { data: checkins }] = await Promise.all([
    supabase
      .from("tracks")
      .select("id, label, description, active")
      .order("created_at", { ascending: false }),
    supabase
      .from("checkins")
      .select("id, message_text, reply_text, sent_at, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <HundredMark className="h-5 w-5 text-[var(--color-primary)]" />
          Hundred
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="cursor-pointer text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Sign out
          </button>
        </form>
      </div>

      <section className="mb-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Your tracks</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          These are the specific things Hundred will check in on.
        </p>

        <form
          action={addTrack}
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row"
        >
          <input
            name="label"
            type="text"
            required
            placeholder="Track name"
            maxLength={80}
            className="h-11 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3.5 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
          />
          <input
            name="description"
            type="text"
            placeholder="Optional detail"
            maxLength={160}
            className="h-11 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-3.5 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
          />
          <button
            type="submit"
            className="h-11 shrink-0 cursor-pointer rounded-xl bg-[var(--color-primary)] px-5 text-sm font-semibold text-[var(--color-on-primary)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Add track
          </button>
        </form>

        {tracks && tracks.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-2.5">
            {tracks.map((t) => (
              <TrackRow key={t.id} track={t} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
            No tracks yet.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold tracking-tight">Recent check-ins</h2>
        {checkins && checkins.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {checkins.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div className="flex items-start gap-2.5">
                  <Icons.chat className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--color-foreground)]">{c.message_text}</p>
                    {c.reply_text && (
                      <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)]">
                        You replied: &ldquo;{c.reply_text}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
            No check-ins yet.
          </p>
        )}
      </section>
    </main>
  );
}
