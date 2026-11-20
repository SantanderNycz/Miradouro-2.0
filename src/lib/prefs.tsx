"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, Locale, translator } from "./i18n";

type Theme = "light" | "dark";
type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (k: string) => string;
};

const PrefsContext = createContext<Ctx | null>(null);
const LS_THEME = "miradouro-theme";
const LS_LANG = "miradouro-lang";

function readTheme(): Theme {
  try { const v = localStorage.getItem(LS_THEME); if (v === "dark" || v === "light") return v; } catch {}
  return "light";
}
function readLang(): Locale {
  try { const v = localStorage.getItem(LS_LANG) as Locale | null; if (v) return v; } catch {}
  return DEFAULT_LOCALE;
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  // hidrata a partir do localStorage (evita mismatch de SSR)
  useEffect(() => { setThemeState(readTheme()); setLangState(readLang()); }, []);

  // aplica o tema ao <html> para as CSS variables
  useEffect(() => {
    try { document.documentElement.setAttribute("data-theme", theme); } catch {}
    try { localStorage.setItem(LS_THEME, theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { document.documentElement.setAttribute("lang", lang); } catch {}
    try { localStorage.setItem(LS_LANG, lang); } catch {}
  }, [lang]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const setLang = (l: Locale) => setLangState(l);
  const t = translator(lang);

  return (
    <PrefsContext.Provider value={{ theme, setTheme, toggleTheme, lang, setLang, t }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs(): Ctx {
  const c = useContext(PrefsContext);
  if (!c) throw new Error("usePrefs tem de estar dentro de <PrefsProvider>");
  return c;
}
