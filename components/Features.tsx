import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const features = [
  {
    icon: Icons.target,
    title: "Gen Z-calibrated panels",
    body: "Most founders guess how young audiences react. Our teen and student personas are tuned by people who actually are the demographic — not a 45-year-old's impression of one.",
  },
  {
    icon: Icons.chat,
    title: "Objection mining",
    body: "Every persona explains why they'd walk away. Objections get clustered and ranked by frequency, so you fix the thing that loses the most people first.",
  },
  {
    icon: Icons.trend,
    title: "Price curve",
    body: "Each persona names the price they'd tolerate. You get a willingness-to-pay curve instead of guessing between $9 and $19 in the dark.",
  },
  {
    icon: Icons.share,
    title: "Shareable reports",
    body: "Every simulation becomes a public link you can drop in a pitch, a tweet, or a group chat. Your research doubles as your marketing.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          What you get
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A focus group that costs less than a coffee.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-colors duration-200 hover:border-[var(--color-ring)]">
              <f.icon className="h-7 w-7 text-[var(--color-primary)]" weight="duotone" />
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {f.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
