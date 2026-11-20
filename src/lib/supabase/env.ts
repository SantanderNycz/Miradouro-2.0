// Verifica se o Supabase está configurado (variáveis de ambiente presentes).
// Permite que a app degrade com elegância antes de ligar o Supabase,
// em vez de rebentar com um 500 ao criar o cliente.
export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

export const supabaseConfigured = () => supabaseEnv() !== null;
