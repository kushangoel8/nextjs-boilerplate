-- Run this in the Supabase SQL editor once a project is created.
-- Safe to re-run: every statement is idempotent (if not exists / or replace).

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  phone text,
  created_at timestamptz not null default now()
);

-- One row per signed-up user, keyed by their Supabase Auth user id.
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text not null unique,
  name text,
  timezone text not null default 'UTC',
  checkin_time time not null default '18:00',
  created_at timestamptz not null default now()
);

create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  label text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  track_id uuid references tracks(id) on delete set null,
  message_text text not null,
  audio_url text,
  sent_at timestamptz,
  reply_text text,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

-- One row per simulation run from /api/simulate. Written by the service-role
-- client (server-side only), so no RLS policy is needed for inserts. Add a
-- select policy if you later expose a "your past reports" view to users.
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  idea text not null,
  try_percent int,
  powered_by text,
  report jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_tracks_user on tracks(user_id);
create index if not exists idx_checkins_user on checkins(user_id);
create index if not exists idx_checkins_track on checkins(track_id);
create index if not exists idx_reports_created on reports(created_at desc);

-- Row Level Security: users can only ever see/modify their own data.
-- The check-in cron job bypasses all of this via the service-role key
-- (lib/supabase.ts), which is intentional â€” it needs to read across users.
alter table users enable row level security;
alter table tracks enable row level security;
alter table checkins enable row level security;

drop policy if exists "Users can view own profile" on users;
create policy "Users can view own profile" on users
  for select using (auth.uid() = id);

l›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆ\]HİÛˆ›Ùš[HˆÛˆ\Ù\œÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆ\]HİÛˆ›Ùš[HˆÛˆ\Ù\œÂˆ›Üˆ\]H\Ú[™È
]]ZY

HHY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆ[œÙ\İÛˆ›Ùš[HˆÛˆ\Ù\œÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆ[œÙ\İÛˆ›Ùš[HˆÛˆ\Ù\œÂˆ›Üˆ[œÙ\Ú]ÚXÚÈ
]]ZY

HHY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆšY]ÈİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆšY]ÈİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÂˆ›ÜˆÙ[Xİ\Ú[™È
]]ZY

HH\Ù\—ÚY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆ[œÙ\İÛˆ˜XÚÜÈˆÛˆ˜XÚÜÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆ[œÙ\İÛˆ˜XÚÜÈˆÛˆ˜XÚÜÂˆ›Üˆ[œÙ\Ú]ÚXÚÈ
]]ZY

HH\Ù\—ÚY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆ\]HİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆ\]HİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÂˆ›Üˆ\]H\Ú[™È
]]ZY

HH\Ù\—ÚY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆ[]HİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆ[]HİÛˆ˜XÚÜÈˆÛˆ˜XÚÜÂˆ›Üˆ[]H\Ú[™È
]]ZY

HH\Ù\—ÚY
NÂ‚™›ÜÛXŞHYˆ^\İÈ•\Ù\œÈØ[ˆšY]ÈİÛˆÚXÚÚ[œÈˆÛˆÚXÚÚ[œÎÂ˜Ü™X]HÛXŞH•\Ù\œÈØ[ˆšY]ÈİÛˆÚXÚÚ[œÈˆÛˆÚXÚÚ[œÂˆ›ÜˆÙ[Xİ\Ú[™È
]]ZY

HH\Ù\—ÚY
NÂ