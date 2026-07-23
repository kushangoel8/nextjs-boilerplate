import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (Server Components, Server Actions, Route
 * Handlers) that reads/writes the user's session from cookies — this is
 * how a logged-in user's requests are authenticated on the server, subject
 * to Row Level Security. Returns null if Supabase env vars aren't set yet.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component without a way to set cookies —
          // safe to ignore if middleware is refreshing sessions.
        }
      },
    },
  });
}
