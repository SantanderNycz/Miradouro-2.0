import type { Metadata } from "next";
import "./globals.css";
import { PrefsProvider } from "@/lib/prefs";

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
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  );
}
