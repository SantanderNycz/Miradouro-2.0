-- Miradouro — esquema inicial
-- Executa no Supabase: SQL Editor → cola e corre.

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Relatório sem título',
  data jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reports_owner_idx on public.reports (owner_id, updated_at desc);

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists reports_touch on public.reports;
create trigger reports_touch before update on public.reports
  for each row execute function public.touch_updated_at();

-- Permissões ao nível da tabela (GRANT). O RLS filtra *linhas*, mas os roles
-- anon/authenticated também precisam de privilégios na tabela, senão dá
-- "42501 permission denied for table reports".
grant usage on schema public to anon, authenticated;
grant select on public.reports to anon;                                  -- vista pública (is_public)
grant select, insert, update, delete on public.reports to authenticated; -- dono autenticado

-- Row Level Security: cada utilizador só vê/edita os seus relatórios;
-- relatórios marcados is_public podem ser lidos por qualquer pessoa.
alter table public.reports enable row level security;

drop policy if exists "owner reads own" on public.reports;
create policy "owner reads own" on public.reports
  for select using (auth.uid() = owner_id);

drop policy if exists "public reads public" on public.reports;
create policy "public reads public" on public.reports
  for select using (is_public = true);

drop policy if exists "owner inserts" on public.reports;
create policy "owner inserts" on public.reports
  for insert with check (auth.uid() = owner_id);

drop policy if exists "owner updates own" on public.reports;
create policy "owner updates own" on public.reports
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "owner deletes own" on public.reports;
create policy "owner deletes own" on public.reports
  for delete using (auth.uid() = owner_id);
