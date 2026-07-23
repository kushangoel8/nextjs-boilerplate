import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const steps = [
  {
    icon: Icons.list,
    title: "Tell it what you're juggling",
    body: "Add your tracks — a class, a novel, a research project, MUN, whatever's actually on your plate. Not generic goals — the real, named things.",
  },
  {
    icon: Icons.waveform,
    title: "Get a check-in that references it",
    body: "A short text and voice note, sent so it actually reaches you — asking about the specific thing you told it about, not a canned reminder.",
  },
  {
    icon: Icons.sync,
    title: "Reply, and it remembers",
    body: "Text back a word or two. Next check-in picks up exactly where you left off — 'did you get past that stuck chapter?' — so it feels like it's paying attention.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
            Three minutes to set up. No app to check obsessively.
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                    <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>
                  <span className="absolute right-6 top-6 font-display text-3xl font-semibold text-[var(--color-border)]">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
