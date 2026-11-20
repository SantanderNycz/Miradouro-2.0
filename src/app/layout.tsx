import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miradouro",
  description: "Estúdio de relatórios — a vista completa da campanha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
