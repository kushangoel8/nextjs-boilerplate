import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const free = ["1 full report", "100-persona panel", "Ranked objections", "Shareable link"];
const paid = [
  "Everything in the free report",
  "Custom panel demographics",
  "Price-sensitivity curve",
  "Compare two versions head-to-head",
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          Pricing
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Cheaper than being wrong.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h3 className="font-display text-lg font-semibold">First report</h3>
            <p className="mt-2 font-display text-4xl font-bold">Free</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {free.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-muted-foreground)]">
                  <Icons.seal className="h-4 w-4 shrink-0 text-[var(--color-positive)]" weight="fill" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--color-ring)] bg-[var(--color-surface-raised)] p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-2xl"
              style={{ background: "radial-gradient(closest-side, #7c3aed, transparent)" }}
            />
            <h3 className="font-display text-lg font-semibold">Per report</h3>
            <p className="mt-2 font-display text-4xl font-bold">
              $19
              <span className="ml-1 text-base font-medium text-[var(--color-muted-foreground)]">
                / report
              </span>
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {paid.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-muted-foreground)]">
                  <Icons.seal className="h-4 w-4 shrink-0 text-[var(--color-primary)]" weight="fill" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <p className="mt-6 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
          Synthetic panels are a first pass, not a substitute for talking to real
          people — they tell you what to fix before you spend real money finding out.
        </p>
      </Reveal>
    </section>
  );
}
