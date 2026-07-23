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

create index if not exists idx_tracks_user on tracks(user_id);
create index if not exists idx_checkins_user on checkins(user_id);
create index if not exists idx_checkins_track on checkins(track_id);

-- Row Level Security: users can only ever see/modify their own data.
-- The check-in cron job bypasses all of this via the service-role key
-- (lib/supabase.ts), which is intentional — it needs to read across users.
alter table users enable row level security;
alter table tracks enable row level security;
alter table checkins enable row level security;

drop policy if exists "Users can view own profile" on users;
create policy "Users can view own profile" on users
  for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on users;
create policy "Users can update own profile" on users
  for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on users;
create policy "Users can insert own profile" on users
  for insert with check (auth.uid() = id);

drop policy if exists "Users can view own tracks" on tracks;
create policy "Users can view own tracks" on tracks
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own tracks" on tracks;
create policy "Users can insert own tracks" on tracks
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own tracks" on tracks;
create policy "Users can update own tracks" on tracks
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own tracks" on tracks;
create policy "Users can delete own tracks" on tracks
  for delete using (auth.uid() = user_id);

drop policy if exists "Users can view own checkins" on checkins;
create policy "Users can view own checkins" on checkins
  for select using (auth.uid() = user_id);
