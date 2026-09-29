-- Supabase SQL Editor: ejecutar este archivo una sola vez.
-- El navegador conserva un identificador aleatorio por perfil de navegador.
-- La restricción UNIQUE impide más de un voto por proyecto e identificador.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.project_rating_votes (
  id uuid primary key default extensions.gen_random_uuid(),
  project_id text not null,
  device_id uuid not null,
  rating smallint not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  constraint project_rating_votes_one_per_device unique (project_id, device_id)
);

create table if not exists public.rating_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.project_rating_settings (
  setting_key text primary key check (setting_key = 'ratings_enabled'),
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);
insert into public.project_rating_settings (setting_key, enabled)
values ('ratings_enabled', true)
on conflict (setting_key) do nothing;

alter table public.project_rating_votes enable row level security;
alter table public.rating_admins enable row level security;
alter table public.project_rating_settings enable row level security;
revoke all on public.project_rating_votes from anon, authenticated;
revoke all on public.rating_admins from anon, authenticated;
revoke all on public.project_rating_settings from anon, authenticated;

create or replace function public.get_project_rating(p_project_id text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'total', count(*)::integer,
    'average', coalesce(round(avg(rating)::numeric, 1), 0),
    'enabled', (select enabled from public.project_rating_settings where setting_key = 'ratings_enabled')
  )
  from public.project_rating_votes
  where project_id = p_project_id;
$$;

create or replace function public.get_project_ratings_enabled()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select enabled from public.project_rating_settings where setting_key = 'ratings_enabled'
  ), true);
$$;

create or replace function public.has_device_voted(p_project_id text, p_device_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.project_rating_votes
    where project_id = p_project_id and device_id = p_device_id
  );
$$;

create or replace function public.submit_project_rating(
  p_project_id text,
  p_device_id uuid,
  p_rating smallint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
  inserted_count integer;
begin
  if not coalesce((select enabled from public.project_rating_settings where setting_key = 'ratings_enabled'), true) then
    raise exception 'Las calificaciones están desactivadas';
  end if;
  if p_project_id not in (
    'proyecto-por-publicar-2026',
    'proyecto-publicado-2026-2', 'proyecto-publicado-2026-3',
    'proyecto-publicado-2026-4', 'proyecto-publicado-2026-5',
    'proyecto-publicado-2026-6', 'proyecto-publicado-2026-7',
    'proyecto-publicado-2026-8', 'proyecto-publicado-2026-9'
  ) then
    raise exception 'Proyecto no válido';
  end if;
  if p_rating < 1 or p_rating > 5 then
    raise exception 'La calificación debe estar entre 1 y 5';
  end if;

  insert into public.project_rating_votes (project_id, device_id, rating)
  values (p_project_id, p_device_id, p_rating)
  on conflict (project_id, device_id) do nothing;
  get diagnostics inserted_count = row_count;

  select jsonb_build_object(
    'total', count(*)::integer,
    'average', coalesce(round(avg(rating)::numeric, 1), 0),
    'already_voted', inserted_count = 0
  ) into result
  from public.project_rating_votes
  where project_id = p_project_id;
  return result;
end;
$$;

create or replace function public.is_rating_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.rating_admins where user_id = (select auth.uid())
  );
$$;

create or replace function public.get_all_project_rating_stats()
returns table (project_id text, total_votes bigint, average_rating numeric)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_rating_admin() then
    raise exception 'No autorizado';
  end if;
  return query
    with project_list(project_id) as (values
      ('proyecto-por-publicar-2026'), ('proyecto-publicado-2026-2'),
      ('proyecto-publicado-2026-3'), ('proyecto-publicado-2026-4'),
      ('proyecto-publicado-2026-5'), ('proyecto-publicado-2026-6'),
      ('proyecto-publicado-2026-7'), ('proyecto-publicado-2026-8'),
      ('proyecto-publicado-2026-9')
    )
    select p.project_id, count(v.id), round(coalesce(avg(v.rating), 0)::numeric, 1)
    from project_list p left join public.project_rating_votes v using (project_id)
    group by p.project_id;
end;
$$;

drop function if exists public.reset_all_project_ratings();
create function public.reset_all_project_ratings()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  deleted_count integer;
begin
  if not public.is_rating_admin() then
    raise exception 'No autorizado';
  end if;
  delete from public.project_rating_votes
  where true;
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

create or replace function public.set_project_ratings_enabled(p_enabled boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_rating_admin() then
    raise exception 'No autorizado';
  end if;
  update public.project_rating_settings
  set enabled = p_enabled, updated_at = now()
  where setting_key = 'ratings_enabled';
  return p_enabled;
end;
$$;

revoke all on function public.get_project_rating(text) from public;
revoke all on function public.get_project_ratings_enabled() from public;
revoke all on function public.has_device_voted(text, uuid) from public;
revoke all on function public.submit_project_rating(text, uuid, smallint) from public;
revoke all on function public.is_rating_admin() from public;
revoke all on function public.get_all_project_rating_stats() from public;
revoke all on function public.reset_all_project_ratings() from public;
revoke all on function public.set_project_ratings_enabled(boolean) from public;
grant execute on function public.get_project_rating(text) to anon, authenticated;
grant execute on function public.get_project_ratings_enabled() to anon, authenticated;
grant execute on function public.has_device_voted(text, uuid) to anon, authenticated;
grant execute on function public.submit_project_rating(text, uuid, smallint) to anon, authenticated;
grant execute on function public.is_rating_admin() to authenticated;
grant execute on function public.get_all_project_rating_stats() to authenticated;
grant execute on function public.reset_all_project_ratings() to authenticated;
grant execute on function public.set_project_ratings_enabled(boolean) to authenticated;

-- Crear la cuenta en Authentication > Users y luego agregar su UUID:
-- insert into public.rating_admins (user_id) values ('UUID_DEL_USUARIO_ADMIN');
