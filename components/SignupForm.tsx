"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "done" | "error";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <section id="waitlist" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Put your idea in front of a hundred people.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-muted-foreground)]">
          Waitlist members get their first report free at launch — and first
          access to the Gen Z panel.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        {status === "done" ? (
          <p className="mx-auto mt-8 w-fit rounded-full border border-[var(--color-positive)]/40 bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-positive)]">
            You&apos;re on the list. First reports go out to the waitlist.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 shrink-0 cursor-pointer rounded-full bg-[var(--color-primary)] px-7 text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Join the waitlist"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-[var(--color-destructive)]">
            {message}
          </p>
        )}
      </Reveal>
    </section>
  );
}
