import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/**
 * Twilio inbound SMS webhook. Configure this URL as the "A message comes in"
 * webhook on your Twilio phone number (Messaging Configuration).
 * Logs the reply against the user's most recent un-replied check-in.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const from = form.get("From")?.toString();
  const body = form.get("Body")?.toString();

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;

  if (!from || !body) {
    return new NextResponse(twiml, { headers: { "content-type": "text/xml" } });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.log("[sms/inbound] Supabase not configured — reply received:", { from, body });
    return new NextResponse(twiml, { headers: { "content-type": "text/xml" } });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("phone", from)
    .maybeSingle();

  if (user) {
    const { data: lastCheckin } = await supabase
      .from("checkins")
      .select("id")
      .eq("user_id", user.id)
      .is("reply_text", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastCheckin) {
      await supabase
        .from("checkins")
        .update({ reply_text: body, replied_at: new Date().toISOString() })
        .eq("id", lastCheckin.id);
    }
  }

  return new NextResponse(twiml, { headers: { "content-type": "text/xml" } });
}
