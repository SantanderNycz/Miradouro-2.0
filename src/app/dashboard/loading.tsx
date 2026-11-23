// Skeleton do dashboard (espelha o layout real) enquanto os relatórios carregam.
export default function DashboardLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ui-bg)" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", background: "var(--ui-header-bg)" }}>
        <div className="mir-skel" style={{ width: 120, height: 18, opacity: 0.4 }} />
        <div className="mir-skel" style={{ marginLeft: "auto", width: 150, height: 18, opacity: 0.4 }} />
      </header>
      <main style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div className="mir-skel" style={{ width: 160, height: 28 }} />
          <div className="mir-skel" style={{ width: 150, height: 40, borderRadius: 999 }} />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--ui-surface)", border: "1px solid var(--ui-border)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ flex: 1 }}>
                <div className="mir-skel" style={{ width: "42%", height: 15, marginBottom: 8 }} />
                <div className="mir-skel" style={{ width: "26%", height: 11 }} />
              </div>
              <div className="mir-skel" style={{ width: 64, height: 34, borderRadius: 9 }} />
              <div className="mir-skel" style={{ width: 64, height: 34, borderRadius: 9 }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
