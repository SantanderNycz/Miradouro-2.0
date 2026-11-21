// Gera um HTML autónomo (self-contained) do relatório, para guardar e apresentar
// externamente sem servidor. Embute o motor (engine.standalone.txt — espelho do
// engine.tsx da app) e transpila-o no browser do visitante via Babel standalone, pelo
// que o HTML exportado é visualmente idêntico à pré-visualização da app.
import ENGINE_SRC from "@/report/engine.standalone.txt";
import type { Report } from "@/types/report";

export function buildStandaloneHtml(report: Report): string {
  const S = "<scr" + "ipt", E = "</scr" + "ipt>";
  // Scripts de CDN com Subresource Integrity (SRI): se o ficheiro servido não bater
  // certo com o hash, o browser recusa-o — protege os relatórios exportados de um CDN
  // comprometido. crossorigin="anonymous" é obrigatório para o SRI em cross-origin.
  const cdn = [
    S + ' crossorigin="anonymous" integrity="sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z" src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js">' + E,
    S + ' crossorigin="anonymous" integrity="sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js">' + E,
    S + ' crossorigin="anonymous" integrity="sha384-/AfDwVDXNopzPvhxMPQ11y1OCpR6mVkWx47qzSwIiquvxkcMkZddEzDNtIOtfCpk" src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js">' + E,
    S + ' crossorigin="anonymous" integrity="sha384-SI4nuZ/KQSVbfqEgBsQkT+A/93E5FZykOt+oFEDxiHgKbx7C3Y9rUPDjTofCLTEM" src="https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js">' + E,
    S + ' crossorigin="anonymous" integrity="sha384-x/ilTFv/u/eu6YSmkFDZl5V5Mm/pkxxcVv2cVJOrr1J0rvILhMvRBCy6yA75wYBj" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js">' + E,
  ].join("\n  ");

  const dataJson = JSON.stringify(report).replace(/</g, "\\u003c");
  const app =
    S + ' type="text/babel" data-presets="react">\n' +
    String(ENGINE_SRC) + "\n" +
    "var DATA = " + dataJson + ";\n" +
    "var root = ReactDOM.createRoot(document.getElementById('root'));\n" +
    "root.render(React.createElement(window.ReportApp, { data: DATA }));\n" +
    "var b = document.getElementById('boot'); if (b) { b.style.opacity = '0'; setTimeout(function(){ b.remove(); }, 300); }\n  " + E;

  const title = (report && report.meta && report.meta.title) ? report.meta.title : "Relatório";
  return [
    "<!DOCTYPE html>", '<html lang="pt-PT">', "<head>",
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    "  <title>" + escapeHtml(title) + "</title>",
    '  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
    '  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap" rel="stylesheet" />',
    "  <style>",
    "    * { box-sizing: border-box; } html, body { margin: 0; padding: 0; }",
    "    body { font-family: Poppins, system-ui, sans-serif; background: #241A38; -webkit-font-smoothing: antialiased; }",
    "    #root { min-height: 100vh; }",
    "    #boot { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 14px; background: #241A38; color: #B9A7EE; font-size: 13.5px; transition: opacity .3s ease; }",
    "    #boot .spin { width: 26px; height: 26px; border-radius: 50%; border: 2.5px solid rgba(255,255,255,.15); border-top-color: #B9A7EE; animation: spin .8s linear infinite; }",
    "    @keyframes spin { to { transform: rotate(360deg); } }",
    "  </style>", "</head>", "<body>",
    '  <div id="boot"><div class="spin"></div><div>A carregar o relatório…</div></div>',
    '  <div id="root"></div>',
    "  " + cdn, "  " + app, "</body>", "</html>", "",
  ].join("\n");
}

function escapeHtml(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function slugify(s: string): string {
  return (s || "relatorio").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "relatorio";
}

export function downloadStandalone(report: Report) {
  const html = buildStandaloneHtml(report);
  const name = slugify(report?.meta?.title || "relatorio") + ".html";
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}
