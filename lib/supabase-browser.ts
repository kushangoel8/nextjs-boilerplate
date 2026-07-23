import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client for user auth (sign up/in/out) and any
 * client-side queries that should run as the logged-in user (respecting
 * Row Level Security), as opposed to lib/supabase.ts's service-role client
 * used only in trusted server code (the check-in cron job).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
