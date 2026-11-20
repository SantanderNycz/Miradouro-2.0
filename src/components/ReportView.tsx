"use client";
import ReportApp from "@/report/engine";
import type { Report } from "@/types/report";

export default function ReportView({ data }: { data: Report }) {
  return <ReportApp data={data} />;
}
