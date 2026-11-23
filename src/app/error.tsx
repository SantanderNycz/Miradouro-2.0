"use client";
import { useEffect } from "react";
import logo from "@/assets/logo-transp.png";
import { usePrefs } from "@/lib/prefs";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = usePrefs();
  useEffect(() => {
    // Registo em consola para diagnóstico (sem expor detalhes técnicos ao utilizador).
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ui-login-bg)", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div style={{ maxWidth: 440 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="Miradouro" style={{ height: 46, width: "auto", marginBottom: 22 }} />
        <h1 style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 26, color: "#fff", margin: "0 0 10px" }}>{t("err_title")}</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.6, margin: "0 0 24px" }}>{t("err_text")}</p>
        <button onClick={() => reset()} style={{ border: "none", cursor: "pointer", background: "var(--ui-accent)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px 22px", borderRadius: 12 }}>{t("err_retry")}</button>
      </div>
    </div>
  );
}
