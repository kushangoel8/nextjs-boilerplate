import { Reveal } from "./Reveal";
import { Icons } from "./icons";

const features = [
  "Unlimited tracks",
  "Daily text + voice-note check-ins",
  "Text back to update — it remembers next time",
  "Cancel anytime",
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-lg">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
            One plan. No tiers to compare.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold">$4.99</span>
              <span className="text-[var(--color-muted-foreground)]">/month</span>
            </div>
            <ul className="mt-7 flex flex-col gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Icons.check className="h-4.5 w-4.5 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-[var(--color-foreground)]">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#signup"
              className="mt-8 block cursor-pointer rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-center text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get early access
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
