import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.log("[waitlist] Supabase not configured yet — signup received:", { email, phone });
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("waitlist").insert({ email, phone: phone || null });

  if (error && error.code !== "23505") {
    // 23505 = unique_violation (already on the waitlist) — treat as success
    console.error("[waitlist] insert failed:", error.message);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
