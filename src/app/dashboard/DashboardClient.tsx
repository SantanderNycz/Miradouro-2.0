"use client";
import Link from "next/link";
import logo from "@/assets/logo-transp.png";
import { usePrefs } from "@/lib/prefs";
import { intlLocale } from "@/lib/i18n";
import PrefsBar from "@/components/PrefsBar";
import { signOut } from "../login/actions";
import { createReport, deleteReport } from "./actions";

type Row = { id: string; title: string; updated_at: string; is_public: boolean };

export default function DashboardClient({ rows, email }: { rows: Row[]; email: string }) {
  const { t, lang } = usePrefs();

  const linkBtn: React.CSSProperties = {
    textDecoration: "none", fontSize: 12.5, fontWeight: 600, padding: "8px 13px",
    borderRadius: 9, border: "1px solid var(--ui-border)", color: "var(--ui-text)", display: "inline-block",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ui-bg)" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", background: "var(--ui-header-bg)", color: "#fff", flexWrap: "wrap" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="Miradouro" style={{ height: 28, width: "auto", display: "block" }} />
        <span style={{ fontFamily: "Lora, serif", fontSize: 16 }}>{t("my_reports")}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <PrefsBar variant="dark" />
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)" }}>{email}</span>
          <form action={signOut}>
            <button style={{ border: "1px solid rgba(255,255,255,.22)", background: "transparent", color: "#fff", borderRadius: 8, padding: "7px 13px", fontSize: 12.5, cursor: "pointer" }}>{t("logout")}</button>
          </form>
        </div>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ fontFamily: "Lora, serif", fontSize: 24, margin: 0, color: "var(--ui-text)" }}>{t("reports")}</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/compare" style={{ textDecoration: "none", border: "1px solid var(--ui-border)", background: "var(--ui-surface)", color: "var(--ui-text)", fontWeight: 600, fontSize: 13, padding: "9px 15px", borderRadius: 999 }}>⇆ {t("compare")}</Link>
            <form action={createReport}>
              <button style={{ border: "none", background: "var(--ui-accent)", color: "#fff", fontWeight: 600, fontSize: 13, padding: "10px 16px", borderRadius: 999, cursor: "pointer" }}>{t("new_report")}</button>
            </form>
          </div>
        </div>

        {rows.length === 0 && (
          <div style={{ background: "var(--ui-surface)", border: "1px solid var(--ui-border)", borderRadius: 16, padding: 40, textAlign: "center", color: "var(--ui-muted)" }}>
            {t("empty_reports")}
          </div>
        )}

        <div style={{ display: "grid", gap: 12 }}>
          {rows.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--ui-surface)", border: "1px solid var(--ui-border)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "var(--ui-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--ui-muted)", marginTop: 3 }}>
                  {t("updated")} {new Date(r.updated_at).toLocaleString(intlLocale[lang])} {r.is_public ? `· ${t("public_tag")}` : ""}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                {r.is_public && <Link href={`/r/${r.id}`} style={linkBtn}>{t("view")}</Link>}
                <Link href={`/report/${r.id}`} style={{ ...linkBtn, background: "var(--ui-accent)", color: "#fff", border: "none" }}>{t("edit")}</Link>
                <form action={deleteReport.bind(null, r.id)}>
                  <button style={{ ...linkBtn, border: "1px solid var(--ui-danger)", color: "var(--ui-danger)", background: "transparent", cursor: "pointer" }}>{t("del")}</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
