"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { defaultReport } from "@/report/defaultReport";

export async function createReport() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");
  const { data, error } = await supabase
    .from("reports")
    .insert({ owner_id: auth.user.id, title: defaultReport.meta.title || "Novo relatório", data: defaultReport })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  redirect(`/report/${data.id}`);
}

export async function deleteReport(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reports").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}
