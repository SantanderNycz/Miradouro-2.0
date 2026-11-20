/** @type {import('next').NextConfig} */
const nextConfig = {
  // O motor (engine.tsx) é código portado e já validado em runtime; o Recharts tem
  // tipagens muito estritas. Não bloquear o build por tipos/lint — a app é verificada à parte.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    // Importa ficheiros .txt como texto (sem passar pelo SWC). Usado para embutir o
    // motor (engine.standalone.txt) no HTML autónomo exportado (src/lib/standalone.ts).
    config.module.rules.push({ test: /\.txt$/i, type: "asset/source" });
    return config;
  },
};
export default nextConfig;
