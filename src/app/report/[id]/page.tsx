import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import EditorClient from "./EditorClient";
import type { ReportRow } from "@/types/report";

export default async function ReportEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!supabaseConfigured()) redirect("/login");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data, error } = await supabase
    .from("reports")
    .select("id, owner_id, title, data, is_public, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error || !data) notFound();
  return <EditorClient row={data as ReportRow} />;
}
