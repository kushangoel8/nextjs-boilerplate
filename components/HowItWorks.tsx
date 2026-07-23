import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const steps = [
  {
    icon: Icons.spark,
    title: "Describe it",
    body: "Paste your pitch, your ad copy, or a link to your landing page. Thirty seconds of typing.",
  },
  {
    icon: Icons.brain,
    title: "The panel runs",
    body: "100 distinct personas read it in parallel — each with an age, a country, a budget, and a temperament — and react honestly.",
  },
  {
    icon: Icons.chart,
    title: "Read the verdict",
    body: "Sentiment, ranked objections, price curve, pull-quotes, and one clear recommendation. Share it with a link.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          How it works
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Idea in. Verdict out. Three minutes.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="relative h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
              <span className="absolute right-6 top-6 font-display text-4xl font-bold text-[var(--color-muted)]">
                {i + 1}
              </span>
              <s.icon className="h-7 w-7 text-[var(--color-primary)]" weight="duotone" />
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
