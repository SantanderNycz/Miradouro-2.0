"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ReportView from "@/components/ReportView";
import PrefsBar from "@/components/PrefsBar";
import { usePrefs } from "@/lib/prefs";
import { downloadStandalone } from "@/lib/standalone";
import type { Report, ReportRow } from "@/types/report";

type SaveState = "idle" | "saving" | "saved" | "error";
type Mode = "form" | "json";

const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
const TOKENS = ["navy", "navyLight", "gold", "goldLight", "slate", "terracotta", "sage"];
const THEME_OPTS = [
  { value: "P", label: "P — Beringela" },
  { value: "A", label: "A — Mixpanel Eggplant" },
  { value: "B", label: "B — Mixpanel Indigo" },
  { value: "C", label: "C — Mixpanel Grape" },
];

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

/* ---------- primitivos ---------- */
const sLabel: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, color: "var(--ui-muted)", marginBottom: 4, letterSpacing: ".02em" };
const sInput: React.CSSProperties = { width: "100%", border: "1px solid var(--ui-border)", borderRadius: 8, padding: "8px 10px", fontSize: 13, fontFamily: "Poppins, sans-serif", color: "var(--ui-text)", background: "var(--ui-input-bg)" };
const chip: React.CSSProperties = { border: "1px solid var(--ui-border)", background: "var(--ui-input-bg)", borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "var(--ui-accent)" };

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
  const { t } = usePrefs();
  return <SelectField label={label} value={value} onChange={onChange} options={[{ value: "", label: t("theme_default") }, ...TOKENS.map((tk) => ({ value: tk, label: tk }))]} />;
}

function Section({ title, eyebrow, children, open }: any) {
  return (
    <details open={open} style={{ border: "1px solid var(--ui-border)", borderRadius: 12, marginBottom: 12, background: "var(--ui-surface)", overflow: "hidden" }}>
      <summary style={{ cursor: "pointer", listStyle: "none", padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13.5, color: "var(--ui-text)", background: "var(--ui-panel)" }}>
        <span>{title}</span>
        {eyebrow && <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--ui-muted)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>{eyebrow}</span>}
      </summary>
      <div style={{ padding: "14px" }}>{children}</div>
    </details>
  );
}

function ItemCard({ children, onRemove }: any) {
  return (
    <div style={{ border: "1px dashed var(--ui-border-dashed)", borderRadius: 10, padding: 12, marginBottom: 10, position: "relative", background: "var(--ui-card-subtle)" }}>
      {onRemove && <button onClick={onRemove} title="×" style={{ position: "absolute", top: 8, right: 8, border: "none", background: "transparent", color: "var(--ui-danger)", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>}
      {children}
    </div>
  );
}

function AddBtn({ onClick, children }: any) {
  return <button onClick={onClick} style={{ ...chip, borderStyle: "dashed", width: "100%", padding: "8px" }}>{children}</button>;
}

function blockTitle(b: any, t: (k: string) => string) {
  const key = "bt_" + (b?.type || "");
  const translated = t(key);
  return translated === key ? (b?.type || "Bloco") : translated;
}

/* ---------- formulários por tipo de bloco ---------- */
function BlockForm({ block, onChange }: { block: any; onChange: (b: any) => void }) {
  const { t } = usePrefs();
  const upd = (patch: any) => onChange(Object.assign({}, block, patch));
  const updList = (key: string, list: any[]) => onChange(Object.assign({}, block, { [key]: list }));
  const type = block?.type;

  if (type === "card" || type === "row") {
    const kids = block.blocks || [];
    return (
      <div>
        {type === "card" && (
          <div style={{ marginBottom: 10 }}>
            <Field label={t("b_eyebrow")} value={block.eyebrow} onChange={(v: any) => upd({ eyebrow: v })} />
            <Field label={t("b_card_title")} value={block.title} onChange={(v: any) => upd({ title: v })} />
            <Field label={t("b_subtitle")} value={block.subtitle} onChange={(v: any) => upd({ subtitle: v })} area />
          </div>
        )}
        <div style={{ borderLeft: "2px solid var(--ui-border)", paddingLeft: 12 }}>
          {kids.map((b: any, i: number) => (
            <Section key={i} title={blockTitle(b, t)} eyebrow={b.type} open={false}>
              <BlockForm block={b} onChange={(nb) => updList("blocks", kids.map((x: any, j: number) => (j === i ? nb : x)))} />
            </Section>
          ))}
          {kids.length === 0 && <div style={{ fontSize: 12, color: "var(--ui-muted)" }}>{t("nested_empty")}</div>}
        </div>
      </div>
    );
  }

  if (type === "kpis") {
    const items = block.items || [];
    const set = (i: number, patch: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)));
    return (
      <div>
        {items.map((k: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label={t("b_eyebrow")} value={k.eyebrow} onChange={(v: any) => set(i, { eyebrow: v })} />
            <Field label={t("b_value")} value={k.value} onChange={(v: any) => set(i, { value: v })} />
            <Field label={t("b_sub")} value={k.sub} onChange={(v: any) => set(i, { sub: v })} area={2} />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}><TokenField label={t("b_accent")} value={k.accent} onChange={(v: any) => set(i, { accent: v })} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ui-muted)", marginTop: 20 }}>
                <input type="checkbox" checked={!!k.hero} onChange={(e) => set(i, { hero: e.target.checked })} /> {t("b_hero")}
              </label>
            </div>
            <Field label={t("b_footnote")} value={k.footnote} onChange={(v: any) => set(i, { footnote: v })} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { eyebrow: "Novo", value: "0", sub: "", accent: "navyLight" }])}>{t("add_kpi")}</AddBtn>
      </div>
    );
  }

  if (type === "note" || type === "banner") {
    return (
      <div>
        <SelectField label={t("b_tone")} value={block.tone} onChange={(v: any) => upd({ tone: v })} options={["neutral", "good", "warn", "gold"]} />
        <Field label={t("b_text")} value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />
      </div>
    );
  }
  if (type === "callout") {
    return (
      <div>
        <Field label={t("b_title")} value={block.title} onChange={(v: any) => upd({ title: v })} />
        <Field label={t("b_text")} value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />
      </div>
    );
  }
  if (type === "text") return <Field label={t("b_paragraph")} value={block.text} onChange={(v: any) => upd({ text: v })} area={3} />;
  if (type === "heading") {
    return (
      <div>
        <Field label={t("b_eyebrow")} value={block.eyebrow} onChange={(v: any) => upd({ eyebrow: v })} />
        <Field label={t("b_title")} value={block.title} onChange={(v: any) => upd({ title: v })} />
        <Field label={t("b_subtitle")} value={block.subtitle} onChange={(v: any) => upd({ subtitle: v })} area={2} />
      </div>
    );
  }
  if (type === "synthesis") {
    const items = block.items || [];
    const set = (i: number, patch: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)));
    return (
      <div>
        <Field label={t("b_title")} value={block.title} onChange={(v: any) => upd({ title: v })} />
        {items.map((s: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label={t("b_lead")} value={s.lead} onChange={(v: any) => set(i, { lead: v })} />
            <Field label={t("b_text")} value={s.text} onChange={(v: any) => set(i, { text: v })} area={2} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { lead: "...", text: "" }])}>{t("add_point")}</AddBtn>
      </div>
    );
  }
  if (type === "funnel") {
    const steps = block.steps || [];
    const set = (i: number, patch: any) => updList("steps", steps.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)));
    return (
      <div>
        {steps.map((s: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("steps", steps.filter((_: any, j: number) => j !== i))}>
            <Field label={t("b_label")} value={s.label} onChange={(v: any) => set(i, { label: v })} />
            <Field label={t("b_value")} value={s.value} onChange={(v: any) => set(i, { value: v })} />
            <Field label={t("b_sub")} value={s.sub} onChange={(v: any) => set(i, { sub: v })} />
            <TokenField label={t("b_color")} value={s.color} onChange={(v: any) => set(i, { color: v })} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("steps", [...steps, { label: "...", value: "0", sub: "", color: "navy" }])}>{t("add_step")}</AddBtn>
      </div>
    );
  }
  if (type === "progress") {
    const items = block.items || [];
    const set = (i: number, patch: any) => updList("items", items.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)));
    return (
      <div>
        {items.map((p: any, i: number) => (
          <ItemCard key={i} onRemove={() => updList("items", items.filter((_: any, j: number) => j !== i))}>
            <Field label={t("b_label")} value={p.label} onChange={(v: any) => set(i, { label: v })} />
            <Field label={t("b_valuelabel")} value={p.valueLabel} onChange={(v: any) => set(i, { valueLabel: v })} />
            <Field label={t("b_pct")} type="number" value={p.pct} onChange={(v: any) => set(i, { pct: v })} />
            <TokenField label={t("b_color")} value={p.color} onChange={(v: any) => set(i, { color: v })} />
          </ItemCard>
        ))}
        <AddBtn onClick={() => updList("items", [...items, { label: "...", valueLabel: "0%", pct: 0, color: "navyLight" }])}>{t("add_bar")}</AddBtn>
      </div>
    );
  }
  if (type === "table") {
    const cols = block.columns || [];
    const rows = block.rows || [];
    const setRows = (r: any[]) => updList("rows", r);
    return (
      <div>
        <div style={{ overflowX: "auto", border: "1px solid var(--ui-border)", borderRadius: 8 }}>
          <table style={{ borderCollapse: "collapse", fontSize: 12, width: "100%" }}>
            <thead><tr>{cols.map((c: any) => <th key={c.key} style={{ padding: "6px 8px", textAlign: "left", color: "var(--ui-muted)", fontWeight: 600, borderBottom: "1px solid var(--ui-border)", whiteSpace: "nowrap" }}>{c.label}</th>)}<th /></tr></thead>
            <tbody>
              {rows.map((r: any, ri: number) => (
                <tr key={ri}>
                  {cols.map((c: any) => (
                    <td key={c.key} style={{ padding: "3px 4px", borderBottom: "1px solid var(--ui-border)" }}>
                      <input
                        value={r[c.key] ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const val = c.format && raw !== "" && !isNaN(Number(raw)) ? Number(raw) : raw;
                          setRows(rows.map((x: any, j: number) => (j === ri ? { ...x, [c.key]: c.format ? val : raw } : x)));
                        }}
                        style={{ border: "1px solid var(--ui-border)", borderRadius: 6, padding: "5px 7px", fontSize: 12, width: 110, fontFamily: "Poppins, sans-serif", background: "var(--ui-input-bg)", color: "var(--ui-text)" }}
                      />
                    </td>
                  ))}
                  <td><button onClick={() => setRows(rows.filter((_: any, j: number) => j !== ri))} style={{ border: "none", background: "transparent", color: "var(--ui-danger)", cursor: "pointer", fontSize: 15 }}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8 }}>
          <AddBtn onClick={() => setRows([...rows, Object.fromEntries(cols.map((c: any) => [c.key, ""]))])}>{t("add_row")}</AddBtn>
        </div>
        <div style={{ fontSize: 11, color: "var(--ui-muted)", marginTop: 6 }}>{t("cols_hint")}</div>
      </div>
    );
  }

  // gráficos e outros: resumo + indicação de JSON
  return (
    <div style={{ fontSize: 12.5, color: "var(--ui-muted)", background: "var(--ui-panel)", border: "1px dashed var(--ui-border-dashed)", borderRadius: 8, padding: "10px 12px" }}>
      <b style={{ color: "var(--ui-accent)" }}>{blockTitle(block, t)}</b> — {t("json_only")}
    </div>
  );
}

/* ---------- editor principal ---------- */
export default function EditorClient({ row }: { row: ReportRow }) {
  const { t } = usePrefs();
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

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const tm = setTimeout(() => persist(obj), 600);
    return () => clearTimeout(tm);
  }, [obj, persist]);

  useEffect(() => {
    if (mode !== "json") return;
    const tm = setTimeout(() => {
      try { const p = JSON.parse(text); setJsonError(""); setObj(p); }
      catch (e: any) { setJsonError(e.message); }
    }, 500);
    return () => clearTimeout(tm);
  }, [text, mode]);

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

  const tabs = obj.tabs && obj.tabs.length ? obj.tabs : [{ label: "", blocks: (obj as any).blocks || [] }];
  const ti = Math.min(activeTab, tabs.length - 1);
  const setTabs = (next: any[]) => commit(Object.assign({}, obj, { tabs: next, blocks: undefined }));
  const setMeta = (key: string, val: any) => commit(Object.assign({}, obj, { meta: Object.assign({}, obj.meta, { [key]: val }) }));

  const headerBtn: React.CSSProperties = { border: "1px solid rgba(255,255,255,.22)", background: "transparent", color: "#fff", borderRadius: 8, padding: "6px 11px", fontSize: 12.5, cursor: "pointer", fontWeight: 600 };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--ui-bg)" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", background: "var(--ui-header-bg)", color: "#fff", flexWrap: "wrap" }}>
        <Link href="/dashboard" style={{ color: "var(--ui-accent-soft)", textDecoration: "none", fontSize: 12.5, fontWeight: 600 }}>← {t("back_reports")}</Link>
        <button onClick={() => setCollapsed((c) => !c)} title={collapsed ? t("expand") : t("collapse")} style={headerBtn}>
          {collapsed ? `⟩ ${t("expand")}` : `⟨ ${t("collapse")}`}
        </button>
        <span style={{ fontFamily: "var(--font-display), Lora, serif", fontSize: 15 }}>{obj.meta?.title || "Relatório"}</span>
        <span style={{ fontSize: 11.5, marginLeft: 8, color: save === "error" ? "#E7A886" : "var(--ui-accent-soft)" }}>
          {save === "saving" ? t("saving") : save === "saved" ? t("saved") : save === "error" ? t("save_error") : ""}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <PrefsBar variant="dark" />
          <button onClick={() => downloadStandalone(obj)} style={{ ...headerBtn }}>⬇ {t("download_html")}</button>
          <label style={{ fontSize: 12.5, display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={isPublic} onChange={togglePublic} /> {t("public_toggle")}
          </label>
          {isPublic && <a href={`/r/${row.id}`} target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: 12.5, border: "1px solid rgba(255,255,255,.22)", borderRadius: 8, padding: "7px 12px", textDecoration: "none" }}>{t("open_public")}</a>}
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {!collapsed && (
          <div style={{ width: "44%", minWidth: 380, maxWidth: 640, display: "flex", flexDirection: "column", borderRight: "1px solid var(--ui-border)", background: "var(--ui-panel)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--ui-border)", flexWrap: "wrap" }}>
              <div style={{ display: "inline-flex", background: "var(--ui-border)", borderRadius: 999, padding: 3 }}>
                {(["form", "json"] as Mode[]).map((m) => (
                  <button key={m} onClick={() => switchMode(m)} style={{ border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, fontFamily: "Poppins, sans-serif", background: mode === m ? "var(--ui-header-bg)" : "transparent", color: mode === m ? "#fff" : "var(--ui-muted)" }}>
                    {m === "form" ? t("mode_form") : t("mode_json")}
                  </button>
                ))}
              </div>
              <button onClick={copyPrompt} style={{ ...chip, marginLeft: "auto" }}>{copied ? t("copied") : t("claude_btn")}</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {mode === "json" ? (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ padding: "10px 14px 0", fontSize: 11.5, color: jsonError ? "var(--ui-danger)" : "var(--ui-good)" }}>
                    {jsonError ? t("json_invalid") + jsonError : t("json_valid")}
                  </div>
                  <textarea value={text} spellCheck={false} onChange={(e) => setText(e.target.value)}
                    style={{ flex: 1, minHeight: 300, border: "none", outline: "none", resize: "none", padding: "10px 14px", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12, lineHeight: 1.5, color: "var(--ui-text)", background: "transparent" }} />
                </div>
              ) : (
                <div style={{ padding: 14 }}>
                  <Section title={t("sec_header")} eyebrow="meta" open>
                    <SelectField label={t("f_theme")} value={obj.meta?.theme || "P"} onChange={(v: any) => setMeta("theme", v)} options={THEME_OPTS} />
                    <Field label={t("f_period")} value={obj.meta?.period} onChange={(v: any) => setMeta("period", v)} />
                    <Field label={t("f_brand")} value={obj.meta?.brand} onChange={(v: any) => setMeta("brand", v)} />
                    <Field label={t("f_title")} value={obj.meta?.title} onChange={(v: any) => setMeta("title", v)} />
                    <Field label={t("f_intro")} value={obj.meta?.intro} onChange={(v: any) => setMeta("intro", v)} area={3} />
                    <Field label={t("f_footer")} value={obj.meta?.footer} onChange={(v: any) => setMeta("footer", v)} area={2} />
                    <Field label={t("f_notes")} value={obj.meta?.readingNotes} onChange={(v: any) => setMeta("readingNotes", v)} area={4} />
                  </Section>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0 10px" }}>
                    {tabs.map((tb: any, i: number) => (
                      <button key={i} onClick={() => setActiveTab(i)} style={{ border: "1px solid var(--ui-border)", cursor: "pointer", padding: "7px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, fontFamily: "Poppins, sans-serif", background: i === ti ? "var(--ui-accent)" : "var(--ui-surface)", color: i === ti ? "#fff" : "var(--ui-text)" }}>
                        {tb.label || `${t("tab_word")} ${i + 1}`}
                      </button>
                    ))}
                  </div>

                  <Section title={`${t("tab_word")}: ${tabs[ti].label || `${t("tab_word")} ${ti + 1}`}`} eyebrow={`${(tabs[ti].blocks || []).length} ${t("blocks_word")}`} open>
                    <Field label={t("tab_name")} value={tabs[ti].label} onChange={(v: any) => setTabs(tabs.map((x: any, j: number) => (j === ti ? { ...x, label: v } : x)))} />
                    <div style={{ marginTop: 6 }}>
                      {(tabs[ti].blocks || []).map((b: any, bi: number) => (
                        <Section key={bi} title={blockTitle(b, t)} eyebrow={b.type} open={false}>
                          <BlockForm block={b} onChange={(nb) => setTabs(tabs.map((x: any, j: number) => (j === ti ? { ...x, blocks: x.blocks.map((y: any, k: number) => (k === bi ? nb : y)) } : x)))} />
                        </Section>
                      ))}
                      {(tabs[ti].blocks || []).length === 0 && <div style={{ fontSize: 12, color: "var(--ui-muted)" }}>{t("no_blocks")}</div>}
                    </div>
                  </Section>
                  <div style={{ fontSize: 11, color: "var(--ui-muted)", marginTop: 4 }}>{t("add_remove_hint")}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", background: "var(--ui-surface)", position: "relative" }}>
          {collapsed && (
            <button onClick={() => setCollapsed(false)} title={t("expand")}
              style={{ position: "absolute", top: 14, left: 14, zIndex: 10, border: "1px solid var(--ui-border)", background: "var(--ui-surface)", color: "var(--ui-accent)", borderRadius: 9, padding: "8px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", boxShadow: "var(--ui-shadow)" }}>
              ⟩ {t("expand")}
            </button>
          )}
          <ReportView data={obj} />
        </div>
      </div>
    </div>
  );
}
