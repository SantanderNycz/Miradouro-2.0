"use client";
import Link from "next/link";
import logo from "@/assets/logo-transp.png";
import ReportView from "@/components/ReportView";
import PrefsBar from "@/components/PrefsBar";
import { usePrefs } from "@/lib/prefs";
import { defaultReport } from "@/report/defaultReport";

const MAXW = 1120;

export default function Landing() {
  const { t } = usePrefs();

  const ctaPrimary: React.CSSProperties = {
    display: "inline-block", textDecoration: "none", background: "var(--ui-accent)", color: "#fff",
    fontWeight: 600, fontSize: 14.5, padding: "13px 22px", borderRadius: 12, boxShadow: "var(--ui-shadow)",
  };
  const feat: { t: string; d: string }[] = [
    { t: t("feat_editor_t"), d: t("feat_editor_d") },
    { t: t("feat_preview_t"), d: t("feat_preview_d") },
    { t: t("feat_autosave_t"), d: t("feat_autosave_d") },
    { t: t("feat_share_t"), d: t("feat_share_d") },
    { t: t("feat_i18n_t"), d: t("feat_i18n_d") },
    { t: t("feat_theme_t"), d: t("feat_theme_d") },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ui-bg)", color: "var(--ui-text)" }}>
      <style>{landingCss}</style>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "color-mix(in srgb, var(--ui-bg) 88%, transparent)", borderBottom: "1px solid var(--ui-border)", backdropFilter: "saturate(1.1)" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="Miradouro" style={{ height: 26, width: "auto", display: "block", filter: "var(--logo-filter, none)" }} />
            <span style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 19, letterSpacing: ".02em" }}>Miradouro</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <PrefsBar variant="light" />
            <Link href="/login" style={{ ...ctaPrimary, padding: "9px 16px", fontSize: 13.5 }}>{t("nav_signin")}</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "clamp(40px, 7vw, 86px) 20px 40px" }}>
        <div className="mir-hero">
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ui-accent)", fontWeight: 700, marginBottom: 16 }}>
              {t("hero_eyebrow")}
            </div>
            <h1 style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-.01em", margin: "0 0 18px", maxWidth: 560 }}>
              {t("hero_title")}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ui-muted)", maxWidth: 520, margin: "0 0 26px" }}>
              {t("hero_sub")}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <Link href="/login" style={ctaPrimary}>{t("hero_cta")}</Link>
              <span style={{ fontSize: 13, color: "var(--ui-muted)" }}>{t("hero_cta_sub")}</span>
            </div>
          </div>

          {/* Pré-visualização real — "janela" com o motor a renderizar o relatório-semente */}
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--ui-border)", boxShadow: "var(--ui-shadow)", background: "var(--ui-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--ui-border)", background: "var(--ui-panel)" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E24A2E" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E9B949" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#12A594" }} />
                <span style={{ marginLeft: 10, fontSize: 11.5, color: "var(--ui-muted)", fontFamily: "ui-monospace, Menlo, Consolas, monospace" }}>miradouro.app/r/…</span>
              </div>
              <div className="mir-preview-clip">
                <div className="mir-preview-scale">
                  <ReportView data={defaultReport as any} />
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ui-muted)", marginTop: 10, textAlign: "center" }}>{t("preview_caption")}</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "40px 20px 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: "clamp(24px, 3.4vw, 34px)", margin: "0 0 28px", letterSpacing: "-.01em" }}>
          {t("features_title")}
        </h2>
        <div className="mir-features">
          {feat.map((f, i) => (
            <div key={i} style={{ background: "var(--ui-surface)", border: "1px solid var(--ui-border)", borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ width: 28, height: 4, borderRadius: 4, background: "var(--ui-accent)", marginBottom: 14 }} />
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 7 }}>{f.t}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ui-muted)" }}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "36px 20px 64px" }}>
        <div style={{ background: "var(--ui-header-bg)", borderRadius: 18, padding: "clamp(28px, 5vw, 44px)", color: "#fff", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.15 }}>{t("hero_title")}</div>
          </div>
          <Link href="/login" style={{ ...ctaPrimary, background: "#fff", color: "var(--ui-header-bg)" }}>{t("hero_cta")}</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--ui-border)" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "22px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt="Miradouro" style={{ height: 20, width: "auto", display: "block" }} />
          <span style={{ fontSize: 13, color: "var(--ui-muted)" }}>Miradouro — {t("footer_tagline")}</span>
          <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ui-muted)" }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

const landingCss = `
.mir-hero { display: flex; gap: clamp(28px, 5vw, 56px); align-items: center; }
.mir-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
/* pré-visualização: recorta e escala o relatório para caber na janela */
.mir-preview-clip { height: 430px; overflow: hidden; position: relative; }
.mir-preview-scale { transform: scale(0.64); transform-origin: top left; width: 156.25%; }
.mir-hero > div, .mir-features > div { animation: mir-rise .5s ease both; }
@keyframes mir-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (max-width: 900px) {
  .mir-hero { flex-direction: column; align-items: stretch; }
  .mir-features { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .mir-features { grid-template-columns: 1fr; }
  .mir-preview-clip { height: 360px; }
}
@media (prefers-reduced-motion: reduce) {
  .mir-hero > div, .mir-features > div { animation: none; }
}
`;
