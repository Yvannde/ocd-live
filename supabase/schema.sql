-- =====================================================================
-- OCD Live — schéma Supabase (Postgres)
-- À exécuter dans l'éditeur SQL de Supabase.
-- =====================================================================
create extension if not exists pgcrypto;
create extension if not exists btree_gist;

-- Types
create type booking_mode as enum ('onsite', 'remote');
create type booking_status as enum ('draft', 'pending', 'confirmed', 'completed', 'cancelled', 'expired', 'no_show');
create type payment_status as enum ('unpaid', 'deposit_paid', 'paid', 'refunded');
create type slot_kind as enum ('booking', 'block');
create type candidate_status as enum ('new', 'to_contact', 'shortlisted', 'rejected');

-- Mise à jour automatique de updated_at
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- Réglages (clé / valeur)
create table settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Packages
create table packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  duration_minutes int not null check (duration_minutes > 0),
  sessions_count int not null default 1 check (sessions_count > 0),
  price_xof int not null check (price_xof >= 0),
  modes booking_mode[] not null default '{onsite,remote}',
  features jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger packages_updated before update on packages for each row execute function set_updated_at();

-- Vendeurs (clients)
create table vendors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  full_name text not null,
  business_name text not null,
  category text not null,
  description text,
  offer text,
  phone text not null,
  email text,
  address text,
  city text,
  country text,
  socials jsonb not null default '{}'::jsonb,
  photos text[] not null default '{}',
  consent_showcase boolean not null default false,
  showcase_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger vendors_updated before update on vendors for each row execute function set_updated_at();

-- Codes promo
create table promo_codes (
  code text primary key,
  percent_off int not null check (percent_off between 1 and 100),
  is_active boolean not null default true,
  max_uses int,
  used_count int not null default 0,
  expires_at timestamptz
);

-- Référence lisible : OCD-2026-0001
create sequence booking_ref_seq;
create or replace function next_booking_reference() returns text language sql as $$
  select 'OCD-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('booking_ref_seq')::text, 4, '0')
$$;

-- Réservations
create table bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default next_booking_reference(),
  vendor_id uuid references vendors(id),
  package_id uuid not null references packages(id),
  mode booking_mode not null,
  status booking_status not null default 'draft',
  payment_status payment_status not null default 'unpaid',
  price_xof int not null check (price_xof >= 0),        -- prix copié au moment de la réservation
  deposit_xof int not null check (deposit_xof >= 0),
  paid_xof int not null default 0,
  promo_code text references promo_codes(code),
  client_timezone text not null default 'Africa/Lome',
  expires_at timestamptz,                               -- fin de la retenue (statut pending)
  payment_reference text unique,
  assigned_assistant text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger bookings_updated before update on bookings for each row execute function set_updated_at();
create index bookings_status_idx on bookings(status);
create index bookings_vendor_idx on bookings(vendor_id);

-- Créneaux (réservations et blocages)
-- ends_at inclut la marge de 15 minutes après le live.
create table booking_slots (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  kind slot_kind not null default 'booking',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  active boolean not null default true,
  reason text,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at),
  check ((kind = 'booking' and booking_id is not null) or kind = 'block'),
  constraint booking_slots_no_overlap
    exclude using gist (tstzrange(starts_at, ends_at, '[)') with &&) where (active)
);
create index booking_slots_start_idx on booking_slots(starts_at);

-- Candidatures (assistante)
create table candidates (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  city text not null,
  message text,
  pitch_path text,                                      -- fichier audio ou vidéo dans le bucket privé
  status candidate_status not null default 'new',
  created_at timestamptz not null default now()
);

-- Journal des notifications
create table notifications_log (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete set null,
  event text not null,
  channel text not null,
  status text not null,
  error text,
  created_at timestamptz not null default now()
);

-- Journal des actions admin
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  entity text not null,
  entity_id uuid,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

-- Libère les retenues expirées (appelée par la tâche planifiée)
create or replace function expire_pending_holds() returns int language plpgsql as $$
declare ids uuid[];
begin
  select array_agg(id) into ids from bookings where status = 'pending' and expires_at < now();
  if ids is null then return 0; end if;
  update bookings set status = 'expired' where id = any(ids);
  update booking_slots set active = false where booking_id = any(ids);
  return array_length(ids, 1);
end $$;

-- Sécurité : aucune politique publique, tout passe par le serveur (clé service_role)
alter table settings enable row level security;
alter table packages enable row level security;
alter table vendors enable row level security;
alter table promo_codes enable row level security;
alter table bookings enable row level security;
alter table booking_slots enable row level security;
alter table candidates enable row level security;
alter table notifications_log enable row level security;
alter table audit_log enable row level security;

-- Vues publiques (aucune donnée de contact)
create view public_packages as
  select id, slug, name, tagline, duration_minutes, sessions_count, price_xof, modes, features, is_featured, sort_order
  from packages where is_active order by sort_order;

create view public_programme as
  select bs.starts_at, b.mode, v.business_name, v.category, v.slug
  from booking_slots bs
  join bookings b on b.id = bs.booking_id
  join vendors v on v.id = b.vendor_id
  where bs.active and bs.kind = 'booking' and b.status = 'confirmed'
    and v.showcase_public and bs.starts_at > now()
  order by bs.starts_at;

grant select on public_packages, public_programme to anon, authenticated;
