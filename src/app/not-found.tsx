"use client";
import Link from "next/link";
import logo from "@/assets/logo-transp.png";
import { usePrefs } from "@/lib/prefs";

export default function NotFound() {
  const { t } = usePrefs();
  return (
    <div style={{ minHeight: "100vh", background: "var(--ui-login-bg)", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div style={{ maxWidth: 440 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="Miradouro" style={{ height: 46, width: "auto", marginBottom: 22 }} />
        <div style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 72, color: "#fff", lineHeight: 1, letterSpacing: "-.02em" }}>404</div>
        <h1 style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 24, color: "#fff", margin: "14px 0 10px" }}>{t("nf_title")}</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.6, margin: "0 0 24px" }}>{t("nf_text")}</p>
        <Link href="/" style={{ display: "inline-block", textDecoration: "none", background: "var(--ui-accent)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "12px 22px", borderRadius: 12 }}>{t("nf_home")}</Link>
      </div>
    </div>
  );
}
