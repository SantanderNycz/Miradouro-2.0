import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { signOut } from "../login/actions";
import { createReport, deleteReport } from "./actions";
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

  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", background: "#241A38", color: "#fff" }}>
        <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#B9A7EE", fontWeight: 700 }}>Miradouro</span>
        <span style={{ fontFamily: "Lora, serif", fontSize: 16 }}>Os meus relatórios</span>
        <span style={{ marginLeft: "auto", fontSize: 12.5, color: "rgba(255,255,255,.7)" }}>{auth.user.email}</span>
        <form action={signOut}>
          <button style={{ border: "1px solid rgba(255,255,255,.22)", background: "transparent", color: "#fff", borderRadius: 8, padding: "7px 13px", fontSize: 12.5, cursor: "pointer" }}>Sair</button>
        </form>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ fontFamily: "Lora, serif", fontSize: 24, margin: 0, color: "#241A38" }}>Relatórios</h1>
          <form action={createReport}>
            <button style={{ border: "none", background: "#5A31C9", color: "#fff", fontWeight: 600, fontSize: 13, padding: "10px 16px", borderRadius: 999, cursor: "pointer" }}>+ Novo relatório</button>
          </form>
        </div>

        {rows.length === 0 && (
          <div style={{ background: "#fff", border: "1px solid #ECEAF2", borderRadius: 16, padding: 40, textAlign: "center", color: "#8B8698" }}>
            Ainda não tens relatórios. Cria o primeiro.
          </div>
        )}

        <div style={{ display: "grid", gap: 12 }}>
          {rows.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #ECEAF2", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "#241A38", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: "#8B8698", marginTop: 3 }}>
                  Atualizado {new Date(r.updated_at).toLocaleString("pt-PT")} {r.is_public ? "· público" : ""}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                {r.is_public && <Link href={`/r/${r.id}`} style={linkBtn}>Ver</Link>}
                <Link href={`/report/${r.id}`} style={{ ...linkBtn, background: "#5A31C9", color: "#fff", border: "none" }}>Editar</Link>
                <form action={deleteReport.bind(null, r.id)}>
                  <button style={{ ...linkBtn, border: "1px solid #E7C3BB", color: "#C0533B", background: "transparent", cursor: "pointer" }}>Apagar</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  textDecoration: "none", fontSize: 12.5, fontWeight: 600, padding: "8px 13px",
  borderRadius: 9, border: "1px solid #ECEAF2", color: "#241A38", display: "inline-block",
};
