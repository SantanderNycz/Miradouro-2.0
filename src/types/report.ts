// Tipos do relatório (esquema de blocos). Mantém o mesmo formato do estúdio/JSON.
export type ColorToken =
  | "navy" | "navyLight" | "gold" | "goldLight" | "slate" | "terracotta" | "sage" | string;

export interface Kpi {
  eyebrow?: string; value?: string; sub?: string; accent?: ColorToken;
  hero?: boolean; dot?: ColorToken; delta?: string; deltaDir?: "up" | "down";
  spark?: number[]; footnote?: string | null;
}
export interface Series {
  key: string; name?: string; color?: ColorToken; colorKey?: string;
  stackId?: string; opacity?: number;
}
export type Block =
  | { type: "kpis"; items: Kpi[] }
  | { type: "card"; eyebrow?: string; title?: string; subtitle?: string; blocks: Block[] }
  | { type: "row"; blocks: Block[] }
  | ({ type: "barChart" } & ChartSpec)
  | ({ type: "areaChart" } & ChartSpec)
  | { type: "note"; tone?: "good" | "warn" | "gold" | "neutral"; text: string }
  | { type: "banner"; tone?: string; text: string }
  | { type: "synthesis"; title?: string; items: { lead: string; text: string }[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "funnel"; steps: { label: string; value: string; sub?: string; color?: ColorToken }[] }
  | { type: "progress"; items: { label: string; valueLabel: string; pct: number; color?: ColorToken }[] }
  | { type: "table"; columns: TableColumn[]; rows: any[]; rowToneKey?: string }
  | { type: "heading"; eyebrow?: string; title?: string; subtitle?: string }
  | { type: "text"; text: string }
  | { type: "spacer"; size?: number };

export interface ChartSpec {
  subtitle?: string; height?: number; data: any[]; xKey?: string;
  series?: Series[]; yFormat?: string; yDomain?: [number, number | "auto"]; yWidth?: number;
  referenceLine?: { y: number; label?: string }; barLabelFormat?: string; barLabelStyle?: any;
  tooltip?: { valueFormat?: string; extraKey?: string }; legend?: boolean;
  legendItems?: { color: ColorToken; label: string }[]; variants?: any[]; barGap?: string;
}
export interface TableColumn {
  key: string; label: string; align?: "left" | "right";
  format?: string; bold?: boolean; muted?: boolean; tone?: "navy" | "atingido";
}
export interface ReportMeta {
  theme?: "P" | "A" | "B" | "C"; period?: string; brand?: string; title?: string;
  intro?: string; footer?: string; readingNotes?: string;
}
export interface Report {
  meta: ReportMeta;
  tabs?: { label: string; blocks: Block[] }[];
  blocks?: Block[];
}

// Linha da tabela `reports`
export interface ReportRow {
  id: string; owner_id: string; title: string; data: Report;
  is_public: boolean; created_at: string; updated_at: string;
}
