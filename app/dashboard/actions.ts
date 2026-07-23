"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function addTrack(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const label = String(formData.get("label") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!label) return;

  await supabase.from("tracks").insert({
    user_id: user.id,
    label,
    description: description || null,
  });

  revalidatePath("/dashboard");
}

export async function toggleTrack(trackId: string, active: boolean) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("tracks").update({ active }).eq("id", trackId);
  revalidatePath("/dashboard");
}

export async function deleteTrack(trackId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("tracks").delete().eq("id", trackId);
  revalidatePath("/dashboard");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/login");
}
