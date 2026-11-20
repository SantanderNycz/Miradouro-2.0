# Miradouro — App (dashboard + logins)

Evolução do estúdio estático para uma aplicação com **autenticação, utilizadores e
dados guardados** (Next.js + Supabase). Reaproveita o **motor de blocos** do estúdio:
o relatório continua a ser um JSON (ver o esquema), agora guardado por utilizador
numa base de dados com Row-Level Security.

## O que já faz (Fase 0/1)

- **Login/registo** (Supabase Auth, email+palavra-passe).
- **Dashboard**: lista de relatórios do utilizador — criar, editar, apagar.
- **Editor**: edição do JSON com **pré-visualização em tempo real** e **autosave** para a BD.
- **Partilha**: alternar um relatório para **público** e abrir o link `/r/<id>`.
- **Motor de render** (temas A/B/C/Beringela, moldura, blocos) portado para `src/report/engine.tsx`.

> Próximas fases (não incluídas): editor por formulários (como no estúdio), papéis de
> equipa, histórico de versões, export PDF server-side.

## Pôr a correr

### 1. Criar projeto Supabase
1. Em [supabase.com](https://supabase.com) cria um projeto.
2. **SQL Editor** → cola e corre `supabase/migrations/0001_init.sql` (cria a tabela `reports` + RLS).
3. **Project Settings → API**: copia o *Project URL* e a *anon public key*.
4. (Opcional) **Authentication → Providers → Email**: desliga "Confirm email" para testes rápidos.

### 2. Variáveis de ambiente
```bash
cp .env.local.example .env.local
# preenche NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 3. Local
```bash
npm install
npm run dev     # http://localhost:3000
```

### 4. Deploy (Vercel)
1. Sobe este projeto para um repositório Git e importa-o na Vercel.
2. Em **Settings → Environment Variables**, adiciona as duas variáveis `NEXT_PUBLIC_SUPABASE_*`.
3. Deploy. Sem *build command* especial (Next.js é detetado automaticamente).

## Estrutura

```
src/
  report/engine.tsx        motor de render (blocos + temas) — reutilizado do estúdio
  report/defaultReport.ts  relatório de exemplo (semente de novos relatórios)
  types/report.ts          tipos do JSON do relatório
  components/ReportView.tsx wrapper client do motor
  lib/supabase/*           clientes Supabase (browser + server)
  middleware.ts            renovação de sessão
  app/
    login/                 página de login/registo + server actions
    dashboard/             lista de relatórios + ações (criar/apagar)
    report/[id]/           editor (JSON + preview + autosave)
    r/[id]/                vista pública (só se is_public)
supabase/migrations/0001_init.sql
```

## Notas

- O **esquema do JSON** é o mesmo do estúdio Miradouro (blocos: `kpis`, `card`, `row`,
  `barChart`, `areaChart`, `table`, `note`, `synthesis`, `callout`, `funnel`, `progress`, …).
  Podes continuar a gerar JSON com o Claude e colá-lo no editor.
- Segurança: a RLS garante que cada utilizador só acede aos seus relatórios; os públicos
  são legíveis por qualquer pessoa através de `/r/<id>`.
