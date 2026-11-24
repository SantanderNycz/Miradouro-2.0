import { ImageResponse } from "next/og";

export const alt = "Miradouro — estúdio de relatórios de campanha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem OG: marca à esquerda + mock de um relatório à direita (eggplant Mixpanel).
export default function OG() {
  const kpiTile = (bg: string, border: string) => ({
    display: "flex", flexDirection: "column" as const, gap: 10,
    background: bg, border: `1px solid ${border}`, borderRadius: 18, padding: "20px 22px", flex: 1,
  });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#15003F", color: "#fff", padding: 64, fontFamily: "sans-serif" }}>
        {/* Marca */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#C9BBFF", fontWeight: 700 }}>
            Estúdio de relatórios de campanha
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, marginTop: 18, letterSpacing: -2 }}>Miradouro</div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,.72)", marginTop: 20, lineHeight: 1.35, maxWidth: 480 }}>
            Relatórios interativos com KPIs, gráficos e síntese — pré-visualização ao vivo e partilha pública.
          </div>
        </div>

        {/* Mock de relatório */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 440, background: "#FFFFFF", borderRadius: 24, padding: 26 }}>
          <div style={{ display: "flex", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#6041CF", fontWeight: 700 }}>
            The Houses Portugal
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#1F2023" }}>Hot Days Summer</div>
          <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
            <div style={{ ...kpiTile("#15003F", "#15003F") }}>
              <div style={{ display: "flex", fontSize: 13, color: "rgba(255,255,255,.6)", letterSpacing: 1 }}>OBJETIVO</div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#fff" }}>108%</div>
            </div>
            <div style={{ ...kpiTile("#FFFFFF", "#EAE6F5") }}>
              <div style={{ display: "flex", fontSize: 13, color: "#797979", letterSpacing: 1 }}>VISITAS</div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#12A594" }}>10,66€</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120, marginTop: 10 }}>
            {[52, 78, 40, 96, 64, 110].map((h, i) => (
              <div key={i} style={{ display: "flex", flex: 1, height: h, borderRadius: 8, background: i === 5 ? "#7856FF" : "#C9BBFF" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
