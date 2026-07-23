import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const tracks = [
  { label: "AP class", icon: Icons.exam },
  { label: "Novel", icon: Icons.novel },
  { label: "Research", icon: Icons.research },
  { label: "MUN prep", icon: Icons.mun },
  { label: "SAT prep", icon: Icons.list },
];

export function Problem() {
  return (
    <section className="border-t border-[var(--color-border)]/60 bg-[var(--color-surface)] px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            You&apos;re not unfocused. You&apos;re running five things at once.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted-foreground)]">
            Psychologists call it the <span className="font-medium text-[var(--color-foreground)]">Zeigarnik effect</span> —
            your brain keeps every unfinished commitment active until it&apos;s
            captured and given a plan. That&apos;s why the novel intrudes on your
            research, and the research intrudes on your exam prep.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <span
                  key={t.label}
                  className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)]"
                >
                  <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                  {t.label}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
