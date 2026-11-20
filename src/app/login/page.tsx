"use client";
import { useState } from "react";
import { signIn, signUp } from "./actions";

const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState<{ error?: string; ok?: string }>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg({});
    const fd = new FormData(e.currentTarget);
    const res = mode === "in" ? await signIn(null, fd) : await signUp(null, fd);
    setLoading(false);
    if (res) setMsg(res);
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#241A38", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", borderRadius: 20, padding: "30px 28px", boxShadow: "0 30px 70px -30px rgba(0,0,0,.5)" }}>
        <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#5A31C9", fontWeight: 600 }}>Miradouro</div>
        <h1 style={{ fontFamily: "Lora, serif", fontSize: 26, margin: "6px 0 18px", color: "#241A38" }}>
          {mode === "in" ? "Iniciar sessão" : "Criar conta"}
        </h1>
        {!configured && (
          <div style={{ marginBottom: 16, padding: "12px 14px", background: "rgba(192,83,59,.08)", border: "1px solid rgba(192,83,59,.3)", borderRadius: 10, fontSize: 12, color: "#8a3826", lineHeight: 1.55 }}>
            <b>Supabase ainda não configurado.</b> Cria <code>.env.local</code> com{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, corre a migração em <code>supabase/migrations/0001_init.sql</code> e reinicia o servidor.
          </div>
        )}
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input name="email" type="email" required placeholder="Email"
            style={inp} />
          <input name="password" type="password" required minLength={6} placeholder="Palavra-passe"
            style={inp} />
          <button type="submit" disabled={loading || !configured}
            style={{ marginTop: 4, border: "none", cursor: configured ? "pointer" : "not-allowed", background: configured ? "#5A31C9" : "#B9A7EE", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px", borderRadius: 10 }}>
            {loading ? "A processar…" : mode === "in" ? "Entrar" : "Registar"}
          </button>
        </form>
        {msg.error && <div style={{ marginTop: 12, color: "#C0533B", fontSize: 12.5 }}>{msg.error}</div>}
        {msg.ok && <div style={{ marginTop: 12, color: "#2FA66B", fontSize: 12.5 }}>{msg.ok}</div>}
        <div style={{ marginTop: 16, fontSize: 12.5, color: "#8B8698" }}>
          {mode === "in" ? "Ainda não tens conta? " : "Já tens conta? "}
          <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg({}); }}
            style={{ border: "none", background: "none", color: "#5A31C9", cursor: "pointer", fontWeight: 600, fontSize: 12.5 }}>
            {mode === "in" ? "Criar conta" : "Iniciar sessão"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = {
  border: "1px solid #ECEAF2", borderRadius: 10, padding: "11px 13px",
  fontSize: 14, fontFamily: "Poppins, sans-serif", background: "#fff", color: "#2B2440",
};
