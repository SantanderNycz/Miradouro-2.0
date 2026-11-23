// Skeleton do editor (espelha o layout real: cabeçalho escuro + painel de edição + pré-visualização).
export default function ReportLoading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--ui-bg)" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", background: "var(--ui-header-bg)" }}>
        <div className="mir-skel" style={{ width: 90, height: 16, opacity: 0.4 }} />
        <div className="mir-skel" style={{ width: 80, height: 28, borderRadius: 8, opacity: 0.4 }} />
        <div className="mir-skel" style={{ width: 200, height: 16, opacity: 0.4 }} />
        <div className="mir-skel" style={{ marginLeft: "auto", width: 180, height: 28, borderRadius: 8, opacity: 0.4 }} />
      </header>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ width: "44%", minWidth: 320, display: "flex", flexDirection: "column", gap: 14, borderRight: "1px solid var(--ui-border)", background: "var(--ui-panel)", padding: 16 }}>
          <div className="mir-skel" style={{ width: "100%", height: 40, borderRadius: 999 }} />
          <div className="mir-skel" style={{ width: "100%", height: 170, borderRadius: 12 }} />
          <div className="mir-skel" style={{ width: "100%", height: 120, borderRadius: 12 }} />
          <div className="mir-skel" style={{ width: "100%", height: 120, borderRadius: 12 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, background: "var(--ui-surface)", padding: 26 }}>
          <div className="mir-skel" style={{ width: "100%", height: "100%", minHeight: 300, borderRadius: 16 }} />
        </div>
      </div>
    </div>
  );
}
