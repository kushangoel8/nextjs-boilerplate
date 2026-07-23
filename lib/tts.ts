/**
 * Generates a short voice note from text using OpenAI's TTS API and returns
 * the raw MP3 bytes. Swap the model/voice below for a cheaper/faster tier if
 * needed — see the cost comparison from the product's feasibility research
 * (budget TTS tiers run ~$0.01-0.04 per 1,000 characters).
 *
 * Requires OPENAI_API_KEY to be set.
 */
export async function generateVoiceNote(text: string): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set — cannot generate voice notes.");
  }

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
      response_format: "mp3",
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI TTS error (${res.status}): ${await res.text()}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Uploads a generated voice note to Supabase Storage and returns a public URL.
 * Requires a public "voice-notes" bucket to exist in the Supabase project.
 */
export async function uploadVoiceNote(
  audio: Buffer,
  path: string,
): Promise<string> {
  const { getSupabase } = await import("@/lib/supabase");
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Supabase is not configured — cannot upload voice notes.");
  }

  const { error } = await supabase.storage
    .from("voice-notes")
    .upload(path, audio, { contentType: "audio/mpeg", upsert: true });

  if (error) throw new Error(`Supabase storage upload failed: ${error.message}`);

  const { data } = supabase.storage.from("voice-notes").getPublicUrl(path);
  return data.publicUrl;
}
