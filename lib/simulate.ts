// The core Hundred engine: take an idea, run it past a panel of personas, and
// aggregate their reactions into a report. Works with zero configuration via a
// deterministic local engine; upgrades to an LLM-powered panel when
// ANTHROPIC_API_KEY is set. Same output shape either way.

export type Verdict = "pos" | "neutral" | "neg";

export type PersonaReaction = {
  name: string;
  trait: string;
  hue: number;
  verdict: Verdict;
  quote: string;
  wouldPay: number; // max monthly price this persona tolerates, in USD
};

export type ReportBar = { label: string; value: number; color: string };
export type Objection = { text: string; count: number };
export type PricePoint = { price: number; pct: number };

export type Report = {
  idea: string;
  panelSize: number;
  tryPercent: number;
  sentiment: { pos: number; neutral: number; neg: number };
  bars: ReportBar[];
  objections: Objection[];
  quotes: { text: string; who: string; verdict: Verdict }[];
  priceCurve: PricePoint[];
  verdict: string;
  poweredBy: "llm" | "local";
};

const PANEL_SIZE = 100;

const PERSONA_SEEDS: { name: string; trait: string; hue: number }[] = [
  { name: "Priya", trait: "Early adopter", hue: 265 },
  { name: "Dale", trait: "Skeptical dad", hue: 20 },
  { name: "Yuki", trait: "Design-led", hue: 190 },
  { name: "Marco", trait: "Budget-first", hue: 140 },
  { name: "Amara", trait: "Gift shopper", hue: 320 },
  { name: "Tom", trait: "Late majority", hue: 45 },
  { name: "Lena", trait: "Aesthetic feed", hue: 280 },
  { name: "Ravi", trait: "Deal hunter", hue: 160 },
  { name: "Sofia", trait: "New to the space", hue: 210 },
  { name: "Chen", trait: "Power user", hue: 110 },
  { name: "Nadia", trait: "Risk-averse", hue: 350 },
  { name: "Oskar", trait: "Minimalist", hue: 230 },
  { name: "Isla", trait: "Enthusiast", hue: 90 },
  { name: "Jorge", trait: "Impulse buyer", hue: 30 },
  { name: "Mei", trait: "Reads fine print", hue: 300 },
  { name: "Anya", trait: "Practical", hue: 200 },
  { name: "Kofi", trait: "Trendsetter", hue: 130 },
  { name: "Elif", trait: "Space-conscious", hue: 250 },
  { name: "Ben", trait: "Subscribes to everything", hue: 60 },
  { name: "Hana", trait: "Churns fast", hue: 340 },
  { name: "Piotr", trait: "DIY type", hue: 170 },
  { name: "Zoe", trait: "Team buyer", hue: 285 },
  { name: "Ari", trait: "Values-driven", hue: 15 },
  { name: "June", trait: "Loyal if wowed", hue: 220 },
];

// --- deterministic PRNG so the same idea always yields the same report ---
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pull a rough "subject" noun out of the idea to make objections feel specific.
function subjectOf(idea: string): string {
  const stop = new Set([
    "a", "an", "the", "for", "that", "with", "your", "this", "app", "and", "to",
    "of", "in", "on", "one", "every", "people", "who", "them", "it", "is",
  ]);
  const words = idea
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stop.has(w));
  return words.sort((a, b) => b.length - a.length)[0] ?? "product";
}

const POSITIVE_BARS = [
  "Loves the core hook",
  "Finds it genuinely novel",
  "Says it solves a real pain",
  "Would recommend to a friend",
];
const NEGATIVE_BARS = [
  "Unsure it's worth the price",
  "Worried about trust/quality",
  "Not sure when they'd use it",
  "Thinks a free tool already does this",
];

function objectionPool(subject: string): string[] {
  return [
    `Not convinced ${subject} is worth a monthly fee`,
    `Worried the quality won't be consistent`,
    `Already gets this from a free alternative`,
    `Unclear how it's different from what exists`,
    `Would need to see reviews before trusting it`,
    `The onboarding sounds like too much effort`,
    `Not sure it fits their budget right now`,
  ];
}

function positiveQuotePool(subject: string): string[] {
  return [
    `Honestly I'd try this today — the ${subject} angle is smart.`,
    `This is the first version of this idea that actually clicks for me.`,
    `I'd pay for this if it saves me the hassle I have now.`,
    `Sending this to a friend who needs exactly this.`,
  ];
}
function neutralQuotePool(): string[] {
  return [
    `Interesting, but I'd want a free trial before committing.`,
    `Depends on the price — under $10 and I'm in.`,
    `I get it, I'm just not sure it's for me specifically.`,
  ];
}
function negativeQuotePool(subject: string): string[] {
  return [
    `I don't see why I'd switch from what I already use.`,
    `Feels like a nice-to-have, not something I'd pay for.`,
    `The ${subject} idea is cute but the price would stop me.`,
  ];
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

/**
 * Local, zero-cost simulation. Deterministic per idea, but varied and
 * plausible — good enough to demo the product live before any LLM key exists.
 */
export function simulateLocal(idea: string): Report {
  const rand = mulberry32(hashString(idea.trim().toLowerCase()));
  const subject = subjectOf(idea);

  // Base receptiveness skews with idea length/specificity a little.
  const base = 0.34 + rand() * 0.36; // 0.34–0.70

  let pos = 0;
  let neg = 0;
  const reactions: PersonaReaction[] = [];
  const priceBuckets = [5, 9, 12, 19, 29, 49];
  const priceCounts = new Array(priceBuckets.length).fill(0);

  for (let i = 0; i < PANEL_SIZE; i++) {
    const r = rand();
    let verdict: Verdict;
    if (r < base - 0.12) verdict = "pos";
    else if (r < base + 0.16) verdict = "neutral";
    else verdict = "neg";
    if (verdict === "pos") pos++;
    if (verdict === "neg") neg++;

    // willingness to pay
    const wpIdx =
      verdict === "pos"
        ? 2 + Math.floor(rand() * 4)
        : verdict === "neutral"
          ? Math.floor(rand() * 3)
          : Math.floor(rand() * 2);
    priceCounts[Math.min(wpIdx, priceBuckets.length - 1)]++;

    if (i < PERSONA_SEEDS.length) {
      const seed = PERSONA_SEEDS[i];
      const quote =
        verdict === "pos"
          ? pick(positiveQuotePool(subject), rand)
          : verdict === "neutral"
            ? pick(neutralQuotePool(), rand)
            : pick(negativeQuotePool(subject), rand);
      reactions.push({ ...seed, verdict, quote, wouldPay: priceBuckets[wpIdx] });
    }
  }

  const neutral = PANEL_SIZE - pos - neg;
  const tryPercent = Math.round(pos + neutral * 0.45);

  const bars: ReportBar[] = [
    { label: pick(POSITIVE_BARS, rand), value: Math.round(45 + rand() * 40), color: "var(--color-positive)" },
    { label: pick(NEGATIVE_BARS, rand), value: Math.round(35 + rand() * 35), color: "var(--color-negative)" },
    { label: `Would pay $12+/month`, value: Math.round(25 + rand() * 35), color: "var(--color-cyan)" },
  ];

  const pool = objectionPool(subject);
  const objections: Objection[] = [];
  const used = new Set<number>();
  for (let k = 0; k < 4; k++) {
    let idx = Math.floor(rand() * pool.length);
    while (used.has(idx)) idx = (idx + 1) % pool.length;
    used.add(idx);
    objections.push({ text: pool[idx], count: Math.round(8 + rand() * 34) });
  }
  objections.sort((a, b) => b.count - a.count);

  const quotes: { text: string; who: string; verdict: Verdict }[] = [];
  const seenQuotes = new Set<string>();
  for (const rx of reactions) {
    if (quotes.length >= 4) break;
    if (seenQuotes.has(rx.quote)) continue;
    seenQuotes.add(rx.quote);
    quotes.push({ text: rx.quote, who: `${rx.name} · ${rx.trait}`, verdict: rx.verdict });
  }

  const priceCurve: PricePoint[] = priceBuckets.map((price, i) => ({
    price,
    pct: Math.round((priceCounts[i] / PANEL_SIZE) * 100),
  }));

  const verdict = buildVerdict(tryPercent, subject, objections[0]?.text ?? "");

  return {
    idea,
    panelSize: PANEL_SIZE,
    tryPercent,
    sentiment: { pos, neutral, neg },
    bars,
    objections,
    quotes,
    priceCurve,
    verdict,
    poweredBy: "local",
  };
}

function buildVerdict(tryPercent: number, subject: string, topObjection: string): string {
  const fix = topObjection
    ? topObjection.charAt(0).toLowerCase() + topObjection.slice(1)
    : "the top objection";
  if (tryPercent >= 62) {
    return `Strong signal — ${tryPercent}% would try it. Your biggest risk isn't demand, it's that ${fix}. Nail that message and this is worth building.`;
  }
  if (tryPercent >= 45) {
    return `Promising but not a slam dunk — ${tryPercent}% would try it. The panel keeps coming back to one worry: ${fix}. Fix that before you spend a dollar.`;
  }
  return `Lukewarm — only ${tryPercent}% would try it. The idea isn't landing yet, mostly because ${fix}. Sharpen the hook or the audience before building.`;
}

/**
 * LLM-powered panel. Returns null if no key is set, so the caller falls back
 * to the local engine. Asks the model for the aggregate report directly.
 */
export async function simulateWithLLM(idea: string): Promise<Report | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const system = `You are a synthetic market-research panel of 100 diverse people (varied ages, countries, incomes, temperaments). Given a product idea, react as that whole panel and return ONLY a JSON object with this exact shape:
{
  "tryPercent": <int 0-100>,
  "sentiment": {"pos": <int>, "neutral": <int>, "neg": <int>},  // must sum to 100
  "bars": [{"label": <string>, "value": <int 0-100>}, ...3 items],
  "objections": [{"text": <string>, "count": <int>}, ...4 items, sorted desc by count],
  "quotes": [{"text": <string>, "who": <string like "Name · trait">, "verdict": "pos"|"neutral"|"neg"}, ...4 items],
  "priceCurve": [{"price": <int>, "pct": <int>}, ...for prices 5,9,12,19,29,49],
  "verdict": <one honest 1-2 sentence recommendation>
}
Be realistic and critical, not a cheerleader. No markdown, no prose outside the JSON.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1400,
        system,
        messages: [{ role: "user", content: `Product idea: ${idea}` }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text: string = data?.content?.[0]?.text ?? "";
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) return null;
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    const barColors = ["var(--color-positive)", "var(--color-negative)", "var(--color-cyan)"];
    return {
      idea,
      panelSize: PANEL_SIZE,
      tryPercent: clampInt(parsed.tryPercent, 0, 100),
      sentiment: {
        pos: clampInt(parsed.sentiment?.pos, 0, 100),
        neutral: clampInt(parsed.sentiment?.neutral, 0, 100),
        neg: clampInt(parsed.sentiment?.neg, 0, 100),
      },
      bars: (parsed.bars ?? []).slice(0, 3).map((b: { label: string; value: number }, i: number) => ({
        label: String(b.label),
        value: clampInt(b.value, 0, 100),
        color: barColors[i] ?? "var(--color-primary)",
      })),
      objections: (parsed.objections ?? []).slice(0, 4).map((o: { text: string; count: number }) => ({
        text: String(o.text),
        count: clampInt(o.count, 0, 100),
      })),
      quotes: (parsed.quotes ?? []).slice(0, 4).map((q: { text: string; who: string; verdict: Verdict }) => ({
        text: String(q.text),
        who: String(q.who),
        verdict: (["pos", "neutral", "neg"].includes(q.verdict) ? q.verdict : "neutral") as Verdict,
      })),
      priceCurve: (parsed.priceCurve ?? []).map((p: { price: number; pct: number }) => ({
        price: clampInt(p.price, 0, 999),
        pct: clampInt(p.pct, 0, 100),
      })),
      verdict: String(parsed.verdict ?? ""),
      poweredBy: "llm",
    };
  } catch {
    return null;
  }
}

function clampInt(v: unknown, min: number, max: number): number {
  const n = Math.round(Number(v));
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export async function runSimulation(idea: string): Promise<Report> {
  return (await simulateWithLLM(idea)) ?? simulateLocal(idea);
}

export { PERSONA_SEEDS };
