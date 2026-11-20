"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReportView from "@/components/ReportView";
import type { Report, ReportRow } from "@/types/report";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function EditorClient({ row }: { row: ReportRow }) {
  const supabase = useMemo(() => createClient(), []);
  const [text, setText] = useState(() => JSON.stringify(row.data, null, 2));
  const [preview, setPreview] = useState<Report>(row.data);
  const [jsonError, setJsonError] = useState("");
  const [save, setSave] = useState<SaveState>("idle");
  const [isPublic, setIsPublic] = useState(row.is_public);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(
    async (data: Report) => {
      setSave("saving");
      const { error } = await supabase
        .from("reports")
        .update({ data, title: data.meta?.title || "Relatório sem título" })
        .eq("id", row.id);
      setSave(error ? "error" : "saved");
    },
    [supabase, row.id]
  );

  // valida + pré-visualiza + autosave (debounce)
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      let parsed: Report;
      try {
        parsed = JSON.parse(text);
        setJsonError("");
      } catch (e: any) {
        setJsonError(e.message);
        return;
      }
      setPreview(parsed);
      persist(parsed);
    }, 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, persist]);

  async function togglePublic() {
    const next = !isPublic;
    setIsPublic(next);
    await supabase.from("reports").update({ is_public: next }).eq("id", row.id);
  }

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/r/${row.id}` : "";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", background: "#241A38", color: "#fff", flexWrap: "wrap" }}>
        <Link href="/dashboard" style={{ color: "#B9A7EE", textDecoration: "none", fontSize: 12.5, fontWeight: 600 }}>← Relatórios</Link>
        <span style={{ fontFamily: "Lora, serif", fontSize: 15 }}>{preview.meta?.title || "Relatório"}</span>
        <span style={{ fontSize: 11.5, marginLeft: 8, color: save === "error" ? "#E7A886" : "#B9A7EE" }}>
          {save === "saving" ? "a guardar…" : save === "saved" ? "guardado ✓" : save === "error" ? "erro ao guardar" : ""}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ fontSize: 12.5, display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={isPublic} onChange={togglePublic} /> Público
          </label>
          {isPublic && (
            <a href={publicUrl} target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: 12.5, border: "1px solid rgba(255,255,255,.22)", borderRadius: 8, padding: "7px 12px", textDecoration: "none" }}>
              Abrir link público ↗
            </a>
          )}
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ width: "42%", minWidth: 360, maxWidth: 620, display: "flex", flexDirection: "column", borderRight: "1px solid #ECEAF2", background: "#faf9fd" }}>
          <div style={{ padding: "10px 14px", fontSize: 11.5, color: jsonError ? "#C0533B" : "#2FA66B" }}>
            {jsonError ? "⚠ JSON inválido: " + jsonError : "✓ JSON válido — guardado automaticamente"}
          </div>
          <textarea
            value={text}
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", resize: "none", padding: "0 14px 14px", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12, lineHeight: 1.5, color: "#2B2440", background: "transparent" }}
          />
        </div>
        <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
          <ReportView data={preview} />
        </div>
      </div>
    </div>
  );
}
