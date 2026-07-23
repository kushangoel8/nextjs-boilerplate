import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { generateCheckinMessage } from "@/lib/generateCheckin";
import { generateVoiceNote, uploadVoiceNote } from "@/lib/tts";
import { sendSms } from "@/lib/sms";

export const maxDuration = 60;

/**
 * Triggered on a schedule (see vercel.json) to send due check-ins.
 * Protected by CRON_SECRET so it can't be hit by randoms.
 *
 * Current-hour matching is simplistic (compares checkin_time's hour to the
 * current UTC hour) — swap in a proper per-user timezone conversion before
 * relying on this for real users across timezones.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const currentHour = new Date().getUTCHours();

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, phone, checkin_time");

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const dueUsers = (users ?? []).filter((u) => {
    const hour = Number(String(u.checkin_time).split(":")[0]);
    return hour === currentHour;
  });

  const results: { userId: string; status: "sent" | "skipped" | "error"; detail?: string }[] = [];

  for (const user of dueUsers) {
    try {
      const { data: tracks } = await supabase
        .from("tracks")
        .select("id, label, description")
        .eq("user_id", user.id)
        .eq("active", true);

      if (!tracks || tracks.length === 0) {
        results.push({ userId: user.id, status: "skipped", detail: "No active tracks." });
        continue;
      }

      // Rotate: pick the track with the oldest (or no) last check-in.
      const { data: lastCheckins } = await supabase
        .from("checkins")
        .select("track_id, message_text, reply_text, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      const lastByTrack = new Map<string, { message_text: string; reply_text: string | null }>();
      for (const c of lastCheckins ?? []) {
        if (c.track_id && !lastByTrack.has(c.track_id)) {
          lastByTrack.set(c.track_id, { message_text: c.message_text, reply_text: c.reply_text });
        }
      }

      const track =
        tracks.find((t) => !lastByTrack.has(t.id)) ??
        tracks[Math.floor(Math.random() * tracks.length)];

      const last = lastByTrack.get(track.id);

      const messageText = await generateCheckinMessage({
        label: track.label,
        description: track.description,
        lastMessage: last?.message_text ?? null,
        lastReply: last?.reply_text ?? null,
      });

      let audioUrl: string | null = null;
      try {
        const audio = await generateVoiceNote(messageText);
        audioUrl = await uploadVoiceNote(audio, `${user.id}/${Date.now()}.mp3`);
      } catch (ttsError) {
        // Voice note is a nice-to-have; don't block the text if TTS/storage isn't set up yet.
        console.error("[checkins] TTS/upload failed, sending text only:", ttsError);
      }

      const smsBody = audioUrl ? `${messageText}\n\n🎙️ ${audioUrl}` : messageText;
      await sendSms(user.phone, smsBody);

      await supabase.from("checkins").insert({
        user_id: user.id,
        track_id: track.id,
        message_text: messageText,
        audio_url: audioUrl,
        sent_at: new Date().toISOString(),
      });

      results.push({ userId: user.id, status: "sent" });
    } catch (err) {
      console.error("[checkins] failed for user", user.id, err);
      results.push({ userId: user.id, status: "error", detail: (err as Error).message });
    }
  }

  return NextResponse.json({ processed: dueUsers.length, results });
}
