"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Try again.");
    }
  }

  return (
    <section id="signup" className="px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Get early access
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
            We&apos;re onboarding a small first group. Leave your email (and
            number, if you want early texts) and we&apos;ll reach out.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          {status === "success" ? (
            <div
              role="status"
              className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8"
            >
              <p className="font-display text-lg font-semibold text-[var(--color-primary)]">
                You&apos;re on the list.
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                We&apos;ll be in touch before we open things up.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:flex-row sm:p-2 sm:pl-5"
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="h-12 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm text-[var(--color-foreground)] outline-none ring-[var(--color-ring)] focus:ring-2 sm:border-none sm:bg-transparent sm:ring-0"
              />
              <label htmlFor="phone" className="sr-only">
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="h-12 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm text-[var(--color-foreground)] outline-none ring-[var(--color-ring)] focus:ring-2 sm:border-none sm:bg-transparent sm:ring-0"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 shrink-0 cursor-pointer rounded-xl bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Join waitlist"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p role="alert" className="mt-3 text-sm text-[var(--color-destructive)]">
              {errorMessage}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
