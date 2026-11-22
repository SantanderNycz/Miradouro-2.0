"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReportView from "@/components/ReportView";
import PrefsBar from "@/components/PrefsBar";
import { usePrefs } from "@/lib/prefs";
import type { Report } from "@/types/report";

type Item = { id: string; title: string };
type Layout = "side" | "stack";

export default function CompareClient({ reports }: { reports: Item[] }) {
  const { t } = usePrefs();
  const supabase = useState(() => createClient())[0];
  const [idA, setIdA] = useState("");
  const [idB, setIdB] = useState("");
  const [dataA, setDataA] = useState<Report | null>(null);
  const [dataB, setDataB] = useState<Report | null>(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [layout, setLayout] = useState<Layout>("side");

  const load = useCallback(
    async (id: string, setData: (r: Report | null) => void, setLoading: (b: boolean) => void) => {
      if (!id) { setData(null); return; }
      setLoading(true);
      const { data } = await supabase.from("reports").select("data").eq("id", id).single();
      setData((data?.data as Report) || null);
      setLoading(false);
    },
    [supabase]
  );

  useEffect(() => { load(idA, setDataA, setLoadingA); }, [idA, load]);
  useEffect(() => { load(idB, setDataB, setLoadingB); }, [idB, load]);

  const selStyle: React.CSSProperties = {
    border: "1px solid var(--ui-border)", borderRadius: 8, padding: "8px 10px", fontSize: 13,
    fontFamily: "Poppins, sans-serif", background: "var(--ui-input-bg)", color: "var(--ui-text)",
    flex: "1 1 150px", minWidth: 0,
  };

  function Pane({ data, loading }: { data: Report | null; loading: boolean }) {
    return (
      <div className="mir-compare-pane" style={{ flex: layout === "side" ? "1 1 0" : "1 1 100%", minWidth: 0, minHeight: layout === "side" ? 0 : 480, overflow: "auto", background: "var(--ui-surface)", borderRadius: 12, border: "1px solid var(--ui-border)" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ui-muted)", fontSize: 13 }}>{t("loading")}</div>
        ) : data ? (
          <ReportView data={data} />
        ) : (
          <div style={{ padding: 40, textAlign: "center", color: "var(--ui-muted)", fontSize: 13 }}>{t("compare_pick")}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--ui-bg)" }}>
      <style>{"@media (max-width: 760px){ .mir-compare-panes{ flex-direction: column !important; overflow: auto !important; } .mir-compare-pane{ flex: none !important; min-height: 70vh !important; } }"}</style>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", background: "var(--ui-header-bg)", color: "#fff", flexWrap: "wrap" }}>
        <Link href="/dashboard" style={{ color: "var(--ui-accent-soft)", textDecoration: "none", fontSize: 12.5, fontWeight: 600 }}>← {t("back_reports")}</Link>
        <span style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 15 }}>{t("compare_title")}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,.1)", borderRadius: 999, padding: 3 }}>
            {(["side", "stack"] as Layout[]).map((l) => (
              <button key={l} onClick={() => setLayout(l)} style={{ border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: "Poppins, sans-serif", background: layout === l ? "#fff" : "transparent", color: layout === l ? "var(--ui-header-bg)" : "rgba(255,255,255,.8)" }}>
                {l === "side" ? t("compare_layout_side") : t("compare_layout_stack")}
              </button>
            ))}
          </div>
          <PrefsBar variant="dark" />
        </div>
      </header>

      <div style={{ display: "flex", gap: 12, padding: "12px 18px", flexWrap: "wrap", alignItems: "center", borderBottom: "1px solid var(--ui-border)" }}>
        <select value={idA} onChange={(e) => setIdA(e.target.value)} style={selStyle}>
          <option value="">{t("compare_pick")}</option>
          {reports.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>
        <span style={{ color: "var(--ui-muted)", fontWeight: 700 }}>vs</span>
        <select value={idB} onChange={(e) => setIdB(e.target.value)} style={selStyle}>
          <option value="">{t("compare_pick")}</option>
          {reports.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>
        {!dataA && !dataB && <span style={{ color: "var(--ui-muted)", fontSize: 12.5 }}>{t("compare_hint")}</span>}
      </div>

      <div className="mir-compare-panes" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: layout === "side" ? "row" : "column", gap: 12, padding: 12, overflow: layout === "side" ? "hidden" : "auto" }}>
        <Pane data={dataA} loading={loadingA} />
        <Pane data={dataB} loading={loadingB} />
      </div>
    </div>
  );
}
