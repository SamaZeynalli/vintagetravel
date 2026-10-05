-- Vintage Travel — sifariş sorğuları üçün cədvəl.
--
-- Bu faylı Supabase panelində SQL Editor-a yapışdırıb bir dəfə işə salın:
--   Supabase → layihəniz → SQL Editor → New query → Run

create table if not exists public.inquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),

  name        text not null,
  phone       text not null,
  email       text,
  tour        text,
  message     text,

  -- Sorğunun emal vəziyyəti: yeni → əlaqə saxlanıldı → bağlandı
  status      text not null default 'new'
);

-- Yeni sorğuları tez tapmaq üçün
create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

-- Row Level Security aktivdir və HEÇ BİR public siyasət yoxdur.
-- Yəni anon açarla bu cədvələ nə yazmaq, nə də oxumaq olmur.
-- Yalnız serverdəki service_role açarı (api/inquiry.js) RLS-i keçir.
alter table public.inquiries enable row level security;
