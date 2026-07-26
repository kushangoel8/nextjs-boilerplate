import { NextRequest, NextResponse } from "next/server";
import { runSimulation } from "@/lib/simulate";
import { getSupabase } from "@/lib/supabase";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: { idea?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const idea = body.idea?.trim();
  if (!idea || idea.length < 8) {
    return NextResponse.json(
      { error: "Describe your idea in a sentence or two (at least 8 characters)." },
      { status: 400 },
    );
  }
  if (idea.length > 600) {
    return NextResponse.json(
      { error: "Keep it under 600 characters — a sentence or two is plenty." },
      { status: 400 },
    );
  }

  const report = await runSimulation(idea);

  // Best-effort persistence: log the run if Supabase is configured. Never let a
  // storage hiccup break the user's result.
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("reports").insert({
        idea: report.idea,
        try_percent: report.tryPercent,
        powered_by: report.poweredBy,
        report,
      });
    } catch (err) {
      console.error("[simulate] failed to persist report:", err);
    }
  }

  return NextResponse.json({ report });
}
