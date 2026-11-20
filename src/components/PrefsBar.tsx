"use client";
import { usePrefs } from "@/lib/prefs";
import { LOCALES } from "@/lib/i18n";

// Switches de tema (claro/escuro) e idioma. `variant` ajusta as cores ao fundo.
export default function PrefsBar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { theme, toggleTheme, lang, setLang, t } = usePrefs();
  const onDark = variant === "dark";

  const btn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
    border: onDark ? "1px solid rgba(255,255,255,.22)" : "1px solid var(--ui-border)",
    background: "transparent", color: onDark ? "#fff" : "var(--ui-text)",
    borderRadius: 8, padding: "6px 10px", fontSize: 12.5, fontWeight: 600,
    fontFamily: "Poppins, sans-serif",
  };
  const sel: React.CSSProperties = {
    ...btn, paddingRight: 6, appearance: "none",
    background: onDark ? "transparent" : "var(--ui-input-bg)",
  };

  return (
    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <button onClick={toggleTheme} style={btn} title={theme === "dark" ? t("pref_theme_light") : t("pref_theme_dark")} aria-label={theme === "dark" ? t("pref_theme_light") : t("pref_theme_dark")}>
        {theme === "dark" ? "☀" : "☾"} <span style={{ opacity: 0.85 }}>{theme === "dark" ? t("pref_theme_light") : t("pref_theme_dark")}</span>
      </button>
      <select value={lang} onChange={(e) => setLang(e.target.value as any)} style={sel} title={t("pref_language")} aria-label={t("pref_language")}>
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} style={{ color: "#241A38" }}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
