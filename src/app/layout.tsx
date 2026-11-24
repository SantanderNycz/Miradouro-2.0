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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miradouro.vercel.app";
const DESCRIPTION =
  "Estúdio para criar relatórios de campanha interativos — KPIs, gráficos, tabelas e síntese — com pré-visualização ao vivo, gravação automática e partilha por link público.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Miradouro — estúdio de relatórios de campanha",
    template: "%s · Miradouro",
  },
  description: DESCRIPTION,
  applicationName: "Miradouro",
  openGraph: {
    type: "website",
    siteName: "Miradouro",
    title: "Miradouro — estúdio de relatórios de campanha",
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Miradouro — estúdio de relatórios de campanha",
    description: DESCRIPTION,
  },
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
