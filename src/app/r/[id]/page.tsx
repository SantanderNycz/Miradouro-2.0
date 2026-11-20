import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import ReportView from "@/components/ReportView";
import type { Report } from "@/types/report";

// Vista pública — só funciona se o relatório estiver marcado como público (RLS).
export default async function PublicReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!supabaseConfigured()) notFound();
  const supabase = await createClient();
  const { data } = await supabase.from("reports").select("data, is_public").eq("id", id).single();
  if (!data || !data.is_public) notFound();
  return <ReportView data={data.data as Report} />;
}
