-- 1. Profiles (extends Supabase auth.users) 
create table profiles ( 
  id uuid references auth.users on delete cascade primary key, 
  full_name text, 
  email text,
  avatar_url text, 
  role text check (role in ('admin','customer')) default 'customer', 
  created_at timestamptz default now() 
); 

-- 2. Categories 
create table categories ( 
  id uuid primary key default gen_random_uuid(), 
  name text not null, 
  slug text unique not null, 
  created_at timestamptz default now() 
); 

-- 3. Products 
create table products ( 
  id uuid primary key default gen_random_uuid(), 
  name text not null, 
  slug text unique not null, 
  description text, 
  price numeric(10,2) not null check (price >= 0), 
  stock integer not null default 0, 
  category_id uuid references categories(id) on delete set null, 
  image_url text, -- stored in Supabase Storage 
  is_active boolean default true, 
  is_new boolean default false,
  is_take2 boolean default false,
  created_at timestamptz default now(), 
  updated_at timestamptz default now() 
); 

-- 4. Orders 
create table orders ( 
  id uuid primary key default gen_random_uuid(), 
  user_id uuid references profiles(id) on delete set null, 
  status text check (status in ('pending','paid','shipped','delivered','cancelled')) default 'pending', 
  total numeric(10,2) not null, 
  created_at timestamptz default now(), 
  updated_at timestamptz default now() 
); 

-- 5. Order Items 
create table order_items ( 
  id uuid primary key default gen_random_uuid(), 
  order_id uuid references orders(id) on delete cascade, 
  product_id uuid references products(id) on delete set null, 
  quantity integer not null check (quantity > 0), 
  price_at_purchase numeric(10,2) not null 
); 

-- 6. Stripe Customer mapping (optional, for subscriptions) 
create table customers ( 
  id serial primary key, 
  user_id uuid references auth.users(id) on delete cascade unique, 
  stripe_customer_id text unique 
); 

-- 7. Payments (one-time) 
create table payments ( 
  id serial primary key, 
  user_id uuid references auth.users(id) on delete cascade, 
  stripe_checkout_id text unique, 
  amount integer not null, -- cents 
  currency text default 'zar', 
  status text, 
  created_at timestamptz default now() 
); 

-- 8. TikTok cache (optional, to avoid hitting rate limits)
create table tiktok_cache (
  handle text primary key,
  profile jsonb,
  videos jsonb,
  fetched_at timestamptz default now()
);

-- 9. Promo Banners
create table promo_banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  link text,
  is_active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. Addresses
create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  province text not null,
  postal_code text not null,
  phone text,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- 11. Site Content (for configurable homepage content)
create table site_content (
  id uuid primary key default gen_random_uuid(),
  section text unique not null,
  content jsonb not null,
  updated_at timestamptz default now()
);

-- 12. Product Images
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  is_primary boolean default false,
  alt_text text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Seed initial data
insert into categories (name, slug) values
  ('Bedroom', 'bedroom'),
  ('Kitchen', 'kitchen'),
  ('Lounge', 'lounge'),
  ('Appliances', 'appliances');

insert into promo_banners (title, subtitle, is_active, starts_at, ends_at) values
  ('UP TO 50% OFF!', 'Starts 15 Jan until 15 Feb 2026', true, '2026-01-15', '2026-02-15');

insert into site_content (section, content) values
  ('hero', '{"headline": "Transform Your Space", "subheadline": "Discover premium furniture and appliances", "cta": "Shop Now"}');