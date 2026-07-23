import { Reveal } from "./Reveal";

const stats = [
  {
    stat: "98%",
    label: "of text messages get opened — most within minutes, not buried in a notification pile.",
  },
  {
    stat: "50,000+",
    label: "people already pay monthly for focus and check-in apps in this category.",
  },
  {
    stat: "1920s",
    label: "when the Zeigarnik effect was first documented — this isn't a trend, it's how attention works.",
  },
];

export function Proof() {
  return (
    <section className="border-y border-[var(--color-border)]/60 bg-[var(--color-surface)] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Built on a real mechanism, not a gimmick
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.stat} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl font-semibold text-[var(--color-primary)]">
                {s.stat}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
