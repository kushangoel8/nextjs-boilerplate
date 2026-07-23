"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { HundredMark } from "@/components/icons";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const supabase = createSupabaseBrowserClient();

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }
      if (data.user) {
        const { error: profileError } = await supabase
          .from("users")
          .insert({ id: data.user.id, phone: phone.trim() });
        if (profileError) {
          setStatus("error");
          setErrorMessage(profileError.message);
          return;
        }
      }
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl font-semibold">
          <HundredMark className="h-6 w-6 text-[var(--color-primary)]" />
          Hundred
        </Link>
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm">
          <div className="mb-6 flex rounded-xl bg-[var(--color-muted)] p-1">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-semibold transition-colors ${
                mode === "signup"
                  ? "bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)]"
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-semibold transition-colors ${
                mode === "signin"
                  ? "bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-sm"
                  : "text-[var(--color-muted-foreground)]"
              }`}
            >
              Sign in
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
              />
            </div>
            {mode === "signup" && (
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+1 555 123 4567"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none ring-[var(--color-ring)] focus:ring-2"
                />
                <p className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">
                  This is where your check-ins will be sent.
                </p>
              </div>
            )}

            {status === "error" && (
              <p role="alert" className="text-sm text-[var(--color-destructive)]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 h-12 cursor-pointer rounded-xl bg-[var(--color-primary)] text-sm font-semibold text-[var(--color-on-primary)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
