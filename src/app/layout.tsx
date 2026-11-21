import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PrefsProvider } from "@/lib/prefs";

// Fonte local para TÍTULOS (display) — Josefin Sans (variable, gama 100–700).
// Corpo/UI continuam em Poppins.
const josefin = localFont({
  src: "../fonts/JosefinSans-VariableFont_wght.ttf",
  variable: "--font-display",
  weight: "100 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miradouro",
  description: "Estúdio de relatórios — a vista completa da campanha.",
};

// Aplica o tema/idioma guardados antes da pintura, para não haver flash de tema claro.
const noFlash = `(function(){try{
  var t=localStorage.getItem('miradouro-theme'); if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}
  var l=localStorage.getItem('miradouro-lang'); if(l){document.documentElement.setAttribute('lang',l);}
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={josefin.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
