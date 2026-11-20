import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export default async function Home() {
  // Sem Supabase configurado, encaminha para o login (que mostra o aviso de setup).
  if (!supabaseConfigured()) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  redirect(data.user ? "/dashboard" : "/login");
}
