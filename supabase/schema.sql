-- Run this in the Supabase SQL editor once a project is created.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
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
