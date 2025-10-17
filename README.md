# TradeGinger (React + Netlify + Supabase + Edge SEO bundle)

## Environment (Netlify Functions + Edge)
```
SUPABASE_URL=https://crepnlidfdoskighdhdt.supabase.co
SUPABASE_SERVICE_ROLE=YOUR_SERVICE_ROLE_KEY
SUPABASE_ANON_KEY=sb_publishable_-Pyl-st1O5MFTZlnS3AlDA_wXBz6v1s
SITE_URL=https://tradeginger.com
ADMIN_EMAILS=you@tradeginger.com,cofounder@tradeginger.com
RAZORPAY_KEY_ID=rzp_live_xxx
RESEND_API_KEY=re_xxx
EMAIL_FROM="TradeGinger <hello@tradeginger.com>"
```

## Supabase SQL — run all
```sql
create table if not exists public.listings (
  id text primary key,
  title text not null,
  price int not null default 0,
  category text not null default 'misc',
  images jsonb not null default '[]'::jsonb,
  location text,
  condition text,
  brand text,
  city text,
  state text,
  country text default 'IN',
  lat double precision,
  lng double precision,
  seller_id uuid not null,
  seller_email text,
  status text not null default 'pending',
  rejection_reason text,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists listings_created_at_idx on public.listings (created_at desc);
create index if not exists listings_price_idx on public.listings (price);
create index if not exists listings_cat_idx on public.listings (category);
create index if not exists listings_loc_idx on public.listings (location);
create index if not exists listings_brand_idx on public.listings (brand);
create index if not exists listings_lat_idx on public.listings (lat);
create index if not exists listings_lng_idx on public.listings (lng);

alter table public.listings enable row level security;

drop policy if exists read_public_approved on public.listings;
create policy read_public_approved on public.listings for select using (status='approved');

drop policy if exists read_own on public.listings;
create policy read_own on public.listings for select using (auth.uid() = seller_id);

drop policy if exists insert_own on public.listings;
create policy insert_own on public.listings for insert with check (auth.uid() = seller_id);

drop policy if exists update_own on public.listings;
create policy update_own on public.listings for update using (auth.uid() = seller_id);

drop policy if exists delete_own on public.listings;
create policy delete_own on public.listings for delete using (auth.uid() = seller_id);

create table if not exists public.edge_meta ( key text primary key, val text );
insert into public.edge_meta(key,val) values ('version','1') on conflict(key) do nothing;

create extension if not exists pg_trgm;
create index if not exists listings_title_trgm on public.listings using gin (title gin_trgm_ops);
create index if not exists listings_category_trgm on public.listings using gin (category gin_trgm_ops);
```
