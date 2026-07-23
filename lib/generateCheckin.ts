export type TrackContext = {
  label: string;
  description?: string | null;
  lastMessage?: string | null;
  lastReply?: string | null;
};

const SYSTEM_PROMPT = `You write extremely short, warm, specific check-in texts.

Rules:
- One or two sentences max. This is a text message, not an email.
- Reference the track's label/description directly.
- If lastReply is given, reference it specifically.
- Sound like a thoughtful friend, not a corporate app.
- End with a light, easy-to-answer question when possible.
- Never invent facts about the user's progress — only reference what's given.`;

/**
 * Generates a short, personalized check-in message for a single track.
 * Requires ANTHROPIC_API_KEY to be set.
 */
export async function generateCheckinMessage(track: TrackContext): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set — cannot generate check-in messages.");
  }

  const userPrompt = [
    `Track: ${track.label}`,
    track.description ? `Description: ${track.description}` : null,
    track.lastMessage ? `Last check-in sent: "${track.lastMessage}"` : null,
    track.lastReply ? `Their last reply: "${track.lastReply}"` : "They haven't replied before.",
    "Write today's check-in text now.",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text?.trim();
  if (!text) throw new Error("Anthropic API returned no message text.");
  return text;
}
