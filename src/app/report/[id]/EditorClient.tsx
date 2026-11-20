"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReportView from "@/components/ReportView";
import type { Report, ReportRow } from "@/types/report";

type SaveState = "idle" | "saving" | "saved" | "error";
type Mode = "form" | "json";

const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
const TOKENS = ["navy", "navyLight", "gold", "goldLight", "slate", "terracotta", "sage"];
const THEME_OPTS = [
  { value: "P", label: "P — Beringela" },
  { value: "A", label: "A — Grafite & Aço" },
  { value: "B", label: "B — Ardósia & Âmbar" },
  { value: "C", label: "C — Petróleo" },
];

// Resumo do esquema — copiado para o chat do Claude pedir um JSON de relatório.
const CLAUDE_PROMPT = [
  "Preciso que geres um ficheiro JSON para o meu relatório interativo (motor Miradouro). Devolve APENAS JSON válido, sem comentários.",
  "",
  "Estrutura de topo:",
  '{ "meta": { "theme":"P|A|B|C", "period", "brand", "title", "intro", "footer", "readingNotes" }, "tabs": [ { "label":"Nome da aba", "blocks": [ ...blocos ] } ] }',
  "- tabs é uma lista. 1 aba esconde a navegação; várias geram a barra lateral.",
  "- Em qualquer texto, **duplo asterisco** põe a expressão a negrito.",
  "- Cores: um nome (navy, navyLight, gold, goldLight, slate, terracotta, sage) ou um hex (\"#5A31C9\").",
  "- Formatos de número (yFormat/format/valueFormat): percent, percent1, eur, eurM, eur2M, kEur, eur2, eur1, eur3, eurPlain, number.",
  "",
  "Blocos (cada um é um objeto com \"type\"):",
  '• kpis:      { "type":"kpis", "items":[ { "eyebrow","value","sub","accent","hero","delta","deltaDir","footnote" } ] }',
  '• card:      { "type":"card", "eyebrow","title","subtitle", "blocks":[ ... ] }',
  '• row:       { "type":"row", "blocks":[ ... ] }',
  '• barChart:  { "type":"barChart", "data":[...], "xKey":"lb", "height":300, "series":[ { "key","name","color","colorKey","stackId" } ], "yFormat","yDomain":[0,100], "referenceLine":{"y":100,"label":"objetivo"}, "barLabelFormat","tooltip":{"valueFormat","extraKey"}, "legend":true, "legendItems":[{"color","label"}], "variants":[ { "label", ...campos } ] }',
  '• areaChart: igual ao barChart, série única (séries temporais).',
  '• table:     { "type":"table", "rowToneKey":"_tone", "columns":[ { "key","label","align","format","bold","muted","tone" } ], "rows":[...] }',
  '• note:      { "type":"note", "tone":"good|warn|gold|neutral", "text":"..." }',
  '• banner:    { "type":"banner", "tone":"gold", "text":"..." }',
  '• synthesis: { "type":"synthesis", "title":"Síntese", "items":[ { "lead","text" } ] }',
  '• callout:   { "type":"callout", "title","text" }',
  '• funnel:    { "type":"funnel", "steps":[ { "label","value","sub","color" } ] }',
  '• progress:  { "type":"progress", "items":[ { "label","valueLabel","pct","color" } ] }',
  '• heading / text / spacer.',
  "",
  "Os dados são: [COLA AQUI OS TEUS DADOS]. Preenche o JSON com base neles.",
].join("\n");

/* ---------- primitivos de formulário ---------- */
const sLabel: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, color: "#8B8698", marginBottom: 4, letterSpacing: ".02em" };
const sInput: React.CSSProperties = { width: "100%", border: "1px solid #ECEAF2", borderRadius: 8, padding: "8px 10px", fontSize: 13, fontFamily: "Poppins, sans-serif", color: "#2B2440", background: "#fff" };
const chip: React.CSSProperties = { border: "1px solid #ECEAF2", background: "#fff", borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#5A31C9" };

function Field({ label, value, onChange, area, type = "text", step }: any) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={sLabel}>{label}</label>
      {area ? (
        <textarea value={value ?? ""} rows={typeof area === "number" ? area : 3} onChange={(e) => onChange(e.target.value)} style={{ ...sInput, resize: "vertical", lineHeight: 1.5 }} />
      ) : (
        <input type={type} step={step} value={value ?? ""} onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)} style={sInput} />
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: any) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={sLabel}>{label}</label>
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ ...sInput, cursor: "pointer" }}>
        {options.map((o: any) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

function TokenField({ label, value, onChange }: any) {
  return <SelectField label={label} value={value} onChange={onChange} options={[{ value: "", label: "— (padrão)" }, ...TOKENS.map((t) => ({ value: t, label: t }))]} />;
}

function Section({ title, eyebrow, children, open }: any) {
  return (
    <details open={open} style={{ border: "1px solid #ECEAF2", borderRadius: 12, marginBottom: 12, background: "#fff", overflow: "hidden" }}>
      <summary style={{ cursor: "pointer", listStyle: "none", padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13.5, color: "#241A38", background: "#faf9fd" }}>
        <span>{title}</span>
        {eyebrow && <span style={{ marginLeft: "auto", fontSize: 10.5, color: "#8B8698", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>{eyebrow}</span>}
      </summary>
      <div style={{ padding: "14px" }}>{children}</div>
    </details>
  );
}

function ItemCard({ children, onRemove }: any) {
  return (
    <div style={{ border: "1px dashed #E3DEF0", borderRadius: 10, padding: 12, marginBottom: 10, position: "relative", background: "#fcfbfe" }}>
      {onRemove && <button onClick={onRemove} title="Remover" style={{ position: "absolute", top: 8, right: 8, border: "none", background: "transparent", color: "#C0533B", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>}
      {children}
    </div>
  );
}

function AddBtn({ onClick, children }: any) {
  return <button onClick={onClick} style={{ ...chip, borderStyle: "dashed", width: "100%", padding: "8px" }}>{children}</button>;
}

/* ---------- formulários por tipo de bloco ---------- */
function BlockForm({ block, onChange }: { block: any; onChange: (b: any) => void }) {
  const t = block?.type;
  const upd = (patch: any) => onChange(Object.assign({}, block, patch));
  const updList = (key: string, list: any[]) => onChange(Object.assign({}, block, { [key]: list }));

  if (t === "card" || t === "row") {
    const kids = block.blocks || [];
    return (
      <div>
        {t === "card" && (
          <div style={{ marginBottom: 10 }}>
            <Field label="Eyebrow" value={block.eyebrow} onChange={(v: any) => upd({ eyebrow: v })} />
            <Field label="Título do cartão" value={block.title} onChange={(v: any) => upd({ title: v })} />
            <Field label="Subtítulo" value={block.subtitle} onChange={(v: any) => upd({ subtitle: v })} area />
          </div>
        )}
        <div style={{ borderLeft: "2px solid #ECEAF2", paddingLeft: 12 }}>
          {kids.map((b: any, i: number) => (
            <Section key={i} title={blockTitle(b)} eyebrow={b.type} open={false}>
              <BlockForm block={b} onChange={(nb) => updList("blocks", kids.map((x: any, j: number) => (j === i ? nb : x)))} />
            </Section>
          ))}
          {kids.length === 0 && <div style={{ fontSize: 12, color: "#8B8698" }}>Sem blocos. Adiciona em modo JSON.</div>}
        </div>
      </div>
    );
  }

  if (t === "kpis") {
    const items = block.items || [];
    return (
      <div>
        {items.map((k: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label="Eyebrow" value={k.eyebrow} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, eyebrow: v } : x)))} />
            <Field label="Valor" value={k.value} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, value: v } : x)))} />
            <Field label="Sub" value={k.sub} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, sub: v } : x)))} area={2} />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}><TokenField label="Acento" value={k.accent} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, accent: v } : x)))} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#8B8698", marginTop: 20 }}>
                <input type="checkbox" checked={!!k.hero} onChange={(e) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, hero: e.target.checked } : x)))} /> Destaque (escuro)
              </label>
            </div>
            <Field label="Rodapé (footnote)" value={k.footnote} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, footnote: v } : x)))} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { eyebrow: "Novo", value: "0", sub: "", accent: "navyLight" }])}>+ Adicionar KPI</AddBtn>
      </div>
    );
  }

  if (t === "note" || t === "banner") {
    return (
      <div>
        <SelectField label="Tom" value={block.tone} onChange={(v: any) => upd({ tone: v })} options={["neutral", "good", "warn", "gold"]} />
        <Field label="Texto (**negrito**)" value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />
      </div>
    );
  }
  if (t === "callout") {
    return (
      <div>
        <Field label="Título" value={block.title} onChange={(v: any) => upd({ title: v })} />
        <Field label="Texto" value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />
      </div>
    );
  }
  if (t === "text") return <Field label="Parágrafo (**negrito**)" value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />;
  if (t === "heading") {
    return (
      <div>
        <Field label="Eyebrow" value={block.eyebrow} onChange={(v: any) => upd({ eyebrow: v })} />
        <Field label="Título" value={block.title} onChange={(v: any) => upd({ title: v })} />
        <Field label="Subtítulo" value={block.subtitle} onChange={(v: any) => upd({ subtitle: v })} area={2} />
      </div>
    );
  }
  if (t === "synthesis") {
    const items = block.items || [];
    return (
      <div>
        <Field label="Título" value={block.title} onChange={(v: any) => upd({ title: v })} />
        {items.map((s: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label="Lead (negrito)" value={s.lead} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, lead: v } : x)))} />
            <Field label="Texto" value={s.text} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, text: v } : x)))} area={2} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { lead: "Ponto.", text: "" }])}>+ Adicionar ponto</AddBtn>
      </div>
    );
  }
  if (t === "funnel") {
    const steps = block.steps || [];
    return (
      <div>
        {steps.map((s: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("steps", steps.filter((_: any, j: number) => j !== i))}>
            <Field label="Rótulo" value={s.label} onChange={(v: any) => updList("steps", steps.map((x: any, j: number) => (j === i ? { ...x, label: v } : x)))} />
            <Field label="Valor" value={s.value} onChange={(v: any) => updList("steps", steps.map((x: any, j: number) => (j === i ? { ...x, value: v } : x)))} />
            <Field label="Sub" value={s.sub} onChange={(v: any) => updList("steps", steps.map((x: any, j: number) => (j === i ? { ...x, sub: v } : x)))} />
            <TokenField label="Cor" value={s.color} onChange={(v: any) => updList("steps", steps.map((x: any, j: number) => (j === i ? { ...x, color: v } : x)))} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("steps", [...steps, { label: "Etapa", value: "0", sub: "", color: "navy" }])}>+ Adicionar etapa</AddBtn>
      </div>
    );
  }
  if (t === "progress") {
    const items = block.items || [];
    return (
      <div>
        {items.map((p: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label="Rótulo" value={p.label} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, label: v } : x)))} />
            <Field label="Valor (texto)" value={p.valueLabel} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, valueLabel: v } : x)))} />
            <Field label="Percentagem" type="number" value={p.pct} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, pct: v } : x)))} />
            <TokenField label="Cor" value={p.color} onChange={(v: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, color: v } : x)))} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { label: "Item", valueLabel: "0%", pct: 0, color: "navyLight" }])}>+ Adicionar barra</AddBtn>
      </div>
    );
  }
  if (t === "table") {
    const cols = block.columns || [];
    const rows = block.rows || [];
    const setRows = (r: any[]) => updList("rows", r);
    return (
      <div>
        <div style={{ overflowX: "auto", border: "1px solid #ECEAF2", borderRadius: 8 }}>
          <table style={{ borderCollapse: "collapse", fontSize: 12, width: "100%" }}>
            <thead><tr>{cols.map((c: any) => <th key={c.key} style={{ padding: "6px 8px", textAlign: "left", color: "#8B8698", fontWeight: 600, borderBottom: "1px solid #ECEAF2", whiteSpace: "nowrap" }}>{c.label}</th>)}<th /></tr></thead>
            <tbody>
              {rows.map((r: any, ri: number) => (
                <tr key={ri}>
                  {cols.map((c: any) => (
                    <td key={c.key} style={{ padding: "3px 4px", borderBottom: "1px solid #F3F1F8" }}>
                      <input
                        value={r[c.key] ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const num = c.format && c.format !== "number" ? Number(raw) : raw;
                          const val = c.format && raw !== "" && !isNaN(Number(raw)) ? Number(raw) : raw;
                          setRows(rows.map((x: any, j: number) => (j === ri ? { ...x, [c.key]: c.format ? val : raw } : x)));
                        }}
                        style={{ border: "1px solid #ECEAF2", borderRadius: 6, padding: "5px 7px", fontSize: 12, width: 110, fontFamily: "Poppins, sans-serif" }}
                      />
                    </td>
                  ))}
                  <td><button onClick={() => setRows(rows.filter((_: any, j: number) => j !== ri))} style={{ border: "none", background: "transparent", color: "#C0533B", cursor: "pointer", fontSize: 15 }}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8 }}>
          <AddBtn onClick={() => setRows([...rows, Object.fromEntries(cols.map((c: any) => [c.key, ""]))])}>+ Adicionar linha</AddBtn>
        </div>
        <div style={{ fontSize: 11, color: "#8B8698", marginTop: 6 }}>Colunas e formatos editam-se no modo JSON.</div>
      </div>
    );
  }

  // Gráficos e outros: resumo + indicação para editar em JSON.
  return (
    <div style={{ fontSize: 12.5, color: "#8B8698", background: "#faf9fd", border: "1px dashed #E3DEF0", borderRadius: 8, padding: "10px 12px" }}>
      <b style={{ color: "#5A31C9" }}>{blockTitle(block)}</b> — este tipo de bloco edita-se no <b>modo JSON</b> (gráficos e configurações avançadas).
    </div>
  );
}

function blockTitle(b: any) {
  const names: Record<string, string> = {
    kpis: "KPIs", card: "Cartão", row: "Linha (lado a lado)", barChart: "Gráfico de barras", areaChart: "Gráfico de área",
    table: "Tabela", note: "Nota", banner: "Banner", synthesis: "Síntese", callout: "Callout", funnel: "Funil",
    progress: "Progresso", heading: "Cabeçalho", text: "Texto", spacer: "Espaço",
  };
  return names[b?.type] || b?.type || "Bloco";
}

/* ---------- editor principal ---------- */
export default function EditorClient({ row }: { row: ReportRow }) {
  const supabase = useState(() => createClient())[0];
  const [obj, setObj] = useState<Report>(row.data);
  const [text, setText] = useState(() => JSON.stringify(row.data, null, 2));
  const [mode, setMode] = useState<Mode>("form");
  const [jsonError, setJsonError] = useState("");
  const [save, setSave] = useState<SaveState>("idle");
  const [isPublic, setIsPublic] = useState(row.is_public);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const first = useRef(true);

  const persist = useCallback(
    async (data: Report) => {
      setSave("saving");
      const { error } = await supabase.from("reports").update({ data, title: data.meta?.title || "Relatório sem título" }).eq("id", row.id);
      setSave(error ? "error" : "saved");
    },
    [supabase, row.id]
  );

  // autosave sempre que o objeto muda (formulário ou JSON válido)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => persist(obj), 600);
    return () => clearTimeout(t);
  }, [obj, persist]);

  // modo JSON: validar texto -> objeto
  useEffect(() => {
    if (mode !== "json") return;
    const t = setTimeout(() => {
      try { const p = JSON.parse(text); setJsonError(""); setObj(p); }
      catch (e: any) { setJsonError(e.message); }
    }, 500);
    return () => clearTimeout(t);
  }, [text, mode]);

  // edição por formulário -> atualiza objeto + espelha no texto
  const commit = useCallback((next: Report) => {
    setObj(next);
    setText(JSON.stringify(next, null, 2));
  }, []);

  async function togglePublic() {
    const next = !isPublic;
    setIsPublic(next);
    await supabase.from("reports").update({ is_public: next }).eq("id", row.id);
  }

  function switchMode(m: Mode) {
    if (m === mode) return;
    if (m === "form") { try { setObj(JSON.parse(text)); setJsonError(""); } catch {} }
    else { setText(JSON.stringify(obj, null, 2)); }
    setMode(m);
  }

  async function copyPrompt() {
    try { await navigator.clipboard.writeText(CLAUDE_PROMPT); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  }

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/r/${row.id}` : "";

  // normaliza abas (suporta report com .blocks em vez de .tabs)
  const tabs = obj.tabs && obj.tabs.length ? obj.tabs : [{ label: "", blocks: (obj as any).blocks || [] }];
  const ti = Math.min(activeTab, tabs.length - 1);
  const setTabs = (next: any[]) => commit(Object.assign({}, obj, { tabs: next, blocks: undefined }));
  const setMeta = (key: string, val: any) => commit(Object.assign({}, obj, { meta: Object.assign({}, obj.meta, { [key]: val }) }));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", background: "#241A38", color: "#fff", flexWrap: "wrap" }}>
        <Link href="/dashboard" style={{ color: "#B9A7EE", textDecoration: "none", fontSize: 12.5, fontWeight: 600 }}>← Relatórios</Link>
        <button onClick={() => setCollapsed((c) => !c)} title={collapsed ? "Mostrar editor" : "Recolher editor (foco no relatório)"}
          style={{ border: "1px solid rgba(255,255,255,.22)", background: "transparent", color: "#fff", borderRadius: 8, padding: "6px 11px", fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>
          {collapsed ? "⟩ Editar" : "⟨ Recolher"}
        </button>
        <span style={{ fontFamily: "Lora, serif", fontSize: 15 }}>{obj.meta?.title || "Relatório"}</span>
        <span style={{ fontSize: 11.5, marginLeft: 8, color: save === "error" ? "#E7A886" : "#B9A7EE" }}>
          {save === "saving" ? "a guardar…" : save === "saved" ? "guardado ✓" : save === "error" ? "erro ao guardar" : ""}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ fontSize: 12.5, display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={isPublic} onChange={togglePublic} /> Público
          </label>
          {isPublic && <a href={publicUrl} target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: 12.5, border: "1px solid rgba(255,255,255,.22)", borderRadius: 8, padding: "7px 12px", textDecoration: "none" }}>Abrir link público ↗</a>}
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {!collapsed && (
          <div style={{ width: "44%", minWidth: 380, maxWidth: 640, display: "flex", flexDirection: "column", borderRight: "1px solid #ECEAF2", background: "#faf9fd" }}>
            {/* barra de modo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #ECEAF2", flexWrap: "wrap" }}>
              <div style={{ display: "inline-flex", background: "#ECEAF2", borderRadius: 999, padding: 3 }}>
                {(["form", "json"] as Mode[]).map((m) => (
                  <button key={m} onClick={() => switchMode(m)} style={{ border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, fontFamily: "Poppins, sans-serif", background: mode === m ? "#241A38" : "transparent", color: mode === m ? "#fff" : "#8B8698" }}>
                    {m === "form" ? "Formulário" : "JSON"}
                  </button>
                ))}
              </div>
              <button onClick={copyPrompt} style={{ ...chip, marginLeft: "auto" }}>{copied ? "copiado ✓" : "Instruções p/ Claude"}</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {mode === "json" ? (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ padding: "10px 14px 0", fontSize: 11.5, color: jsonError ? "#C0533B" : "#2FA66B" }}>
                    {jsonError ? "⚠ JSON inválido: " + jsonError : "✓ JSON válido — guardado automaticamente"}
                  </div>
                  <textarea value={text} spellCheck={false} onChange={(e) => setText(e.target.value)}
                    style={{ flex: 1, minHeight: 300, border: "none", outline: "none", resize: "none", padding: "10px 14px", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12, lineHeight: 1.5, color: "#2B2440", background: "transparent" }} />
                </div>
              ) : (
                <div style={{ padding: 14 }}>
                  <Section title="Cabeçalho" eyebrow="meta" open>
                    <SelectField label="Tema" value={obj.meta?.theme || "P"} onChange={(v: any) => setMeta("theme", v)} options={THEME_OPTS} />
                    <Field label="Período" value={obj.meta?.period} onChange={(v: any) => setMeta("period", v)} />
                    <Field label="Marca / cliente (eyebrow)" value={obj.meta?.brand} onChange={(v: any) => setMeta("brand", v)} />
                    <Field label="Título" value={obj.meta?.title} onChange={(v: any) => setMeta("title", v)} />
                    <Field label="Intro" value={obj.meta?.intro} onChange={(v: any) => setMeta("intro", v)} area={3} />
                    <Field label="Rodapé (sidebar)" value={obj.meta?.footer} onChange={(v: any) => setMeta("footer", v)} area={2} />
                    <Field label="Notas de leitura" value={obj.meta?.readingNotes} onChange={(v: any) => setMeta("readingNotes", v)} area={4} />
                  </Section>

                  {/* menu superior = abas */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0 10px" }}>
                    {tabs.map((tb: any, i: number) => (
                      <button key={i} onClick={() => setActiveTab(i)} style={{ border: "1px solid #ECEAF2", cursor: "pointer", padding: "7px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, fontFamily: "Poppins, sans-serif", background: i === ti ? "#5A31C9" : "#fff", color: i === ti ? "#fff" : "#241A38" }}>
                        {tb.label || `Aba ${i + 1}`}
                      </button>
                    ))}
                  </div>

                  <Section title={`Aba: ${tabs[ti].label || `Aba ${ti + 1}`}`} eyebrow={`${(tabs[ti].blocks || []).length} blocos`} open>
                    <Field label="Nome da aba" value={tabs[ti].label} onChange={(v: any) => setTabs(tabs.map((x: any, j: number) => (j === ti ? { ...x, label: v } : x)))} />
                    <div style={{ marginTop: 6 }}>
                      {(tabs[ti].blocks || []).map((b: any, bi: number) => (
                        <Section key={bi} title={blockTitle(b)} eyebrow={b.type} open={false}>
                          <BlockForm block={b} onChange={(nb) => setTabs(tabs.map((x: any, j: number) => (j === ti ? { ...x, blocks: x.blocks.map((y: any, k: number) => (k === bi ? nb : y)) } : x)))} />
                        </Section>
                      ))}
                      {(tabs[ti].blocks || []).length === 0 && <div style={{ fontSize: 12, color: "#8B8698" }}>Esta aba não tem blocos.</div>}
                    </div>
                  </Section>
                  <div style={{ fontSize: 11, color: "#8B8698", marginTop: 4 }}>Para adicionar/remover abas ou blocos novos, usa o modo JSON (ou pede ao Claude com o botão acima).</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", background: "#fff", position: "relative" }}>
          {collapsed && (
            <button onClick={() => setCollapsed(false)} title="Mostrar editor"
              style={{ position: "absolute", top: 14, left: 14, zIndex: 10, border: "1px solid #ECEAF2", background: "#fff", color: "#5A31C9", borderRadius: 9, padding: "8px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(20,16,40,.12)" }}>
              ⟩ Editar
            </button>
          )}
          <ReportView data={obj} />
        </div>
      </div>
    </div>
  );
}
