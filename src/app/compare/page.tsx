import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import CompareClient from "./CompareClient";

export default async function ComparePage() {
  if (!supabaseConfigured()) redirect("/login");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");

  const { data: reports } = await supabase
    .from("reports")
    .select("id, title")
    .order("updated_at", { ascending: false });

  return <CompareClient reports={(reports || []) as { id: string; title: string }[]} />;
}
