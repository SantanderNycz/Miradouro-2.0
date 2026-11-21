"use client";
import { useState } from "react";
import { signIn, signUp } from "./actions";
import { usePrefs } from "@/lib/prefs";
import PrefsBar from "@/components/PrefsBar";

const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const { t } = usePrefs();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState<{ error?: string; ok?: boolean }>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg({});
    const fd = new FormData(e.currentTarget);
    const res = mode === "in" ? await signIn(null, fd) : await signUp(null, fd);
    setLoading(false);
    if (res) setMsg(res as any);
    if (mode === "up" && res && (res as any).ok) setMode("in");
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--ui-login-bg)", padding: 24, position: "relative" }}>
      <div style={{ position: "absolute", top: 18, right: 18 }}>
        <PrefsBar variant="dark" />
      </div>
      <div style={{ width: "100%", maxWidth: 380, background: "var(--ui-surface)", borderRadius: 20, padding: "30px 28px", boxShadow: "0 30px 70px -30px rgba(0,0,0,.5)" }}>
        <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ui-accent)", fontWeight: 600 }}>Miradouro</div>
        <h1 style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 26, margin: "6px 0 18px", color: "var(--ui-text)" }}>
          {mode === "in" ? t("login_in") : t("login_up")}
        </h1>
        {!configured && (
          <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(192,83,59,.1)", border: "1px solid rgba(192,83,59,.35)", borderRadius: 10, fontSize: 12, color: "var(--ui-danger)", lineHeight: 1.55 }}>
            {t("not_configured")}
          </div>
        )}
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input name="email" type="email" required placeholder={t("email")} style={inp} />
          <input name="password" type="password" required minLength={6} placeholder={t("password")} style={inp} />
          <button type="submit" disabled={loading || !configured}
            style={{ marginTop: 4, border: "none", cursor: configured ? "pointer" : "not-allowed", background: configured ? "var(--ui-accent)" : "var(--ui-accent-soft)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px", borderRadius: 10 }}>
            {loading ? t("processing") : mode === "in" ? t("btn_enter") : t("btn_register")}
          </button>
        </form>
        {msg.error && <div style={{ marginTop: 12, color: "var(--ui-danger)", fontSize: 12.5 }}>{msg.error}</div>}
        {msg.ok && <div style={{ marginTop: 12, color: "var(--ui-good)", fontSize: 12.5 }}>{t("signup_done")}</div>}
        <div style={{ marginTop: 16, fontSize: 12.5, color: "var(--ui-muted)" }}>
          {mode === "in" ? t("no_account") : t("have_account")}
          <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg({}); }}
            style={{ border: "none", background: "none", color: "var(--ui-accent)", cursor: "pointer", fontWeight: 600, fontSize: 12.5 }}>
            {mode === "in" ? t("login_up") : t("login_in")}
          </button>
        </div>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = {
  border: "1px solid var(--ui-border)", borderRadius: 10, padding: "11px 13px",
  fontSize: 14, fontFamily: "Poppins, sans-serif", background: "var(--ui-input-bg)", color: "var(--ui-text)",
};
