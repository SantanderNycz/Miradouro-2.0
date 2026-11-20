import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import DashboardClient from "./DashboardClient";
import type { ReportRow } from "@/types/report";

export default async function Dashboard() {
  if (!supabaseConfigured()) redirect("/login");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data: reports } = await supabase
    .from("reports")
    .select("id, title, updated_at, is_public")
    .order("updated_at", { ascending: false });

  const rows = (reports || []) as Pick<ReportRow, "id" | "title" | "updated_at" | "is_public">[];

  return <DashboardClient rows={rows} email={auth.user.email || ""} />;
}
