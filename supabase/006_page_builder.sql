-- Page Builder: Stores sections for the homepage and other pages
create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'homepage',
  section_key text not null,
  title text,
  content jsonb,
  image_url text,
  link_url text,
  link_text text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (page, section_key)
);

-- Insert default homepage sections
insert into page_sections (page, section_key, title, content, image_url, link_url, link_text, sort_order, is_active) values
  ('homepage', 'promo_banner', 'Promotional Banner', '{"text": "UP TO 50% OFF! - Year End Sale"}', NULL, '/deals', 'Shop Now', 0, true),
  ('homepage', 'hero', 'Hero Section', '{"headline": "YEAR END", "subheadline": "PRE-BOOK NEW YEAR DEALS", "cta": "Sale"}', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop', '/deals', 'Shop Now', 1, true),
  ('homepage', 'featured_deals', 'Featured Deals', '{"title": "Featured Deals", "subtitle": "Limited time offers"}', NULL, '/deals', 'View All', 2, true),
  ('homepage', 'new_arrivals', 'New Arrivals', '{"title": "New Items", "subtitle": "Fresh additions to our catalog"}', NULL, '/new-arrivals', 'View All', 3, true),
  ('homepage', 'categories', 'Shop by Category', '{"title": "Shop by Category"}', NULL, '/store', NULL, 4, true),
  ('homepage', 'take2_combo', 'Take 2 Combo', '{"title": "Take 2 Combo", "subtitle": "Buy more, save more"}', NULL, '/deals', 'View Combos', 5, true),
  ('homepage', 'newsletter', 'Newsletter Signup', '{"title": "Stay Updated", "subtitle": "Get exclusive deals straight to your inbox"}', NULL, NULL, NULL, 6, false)
on conflict (page, section_key) do update set
  title = excluded.title,
  content = excluded.content,
  image_url = excluded.image_url,
  link_url = excluded.link_url,
  link_text = excluded.link_text,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

-- Enable RLS on page_sections
alter table page_sections enable row level security;

-- Everyone can view active page sections
drop policy if exists "Public can view active page sections" on page_sections;
create policy "Public can view active page sections"
  on page_sections for select
  using ( is_active = true );

-- Only admins can manage page sections
drop policy if exists "Admins can manage page sections" on page_sections;
create policy "Admins can manage page sections"
  on page_sections for all
  using ( public.is_admin() )
  with check ( public.is_admin() );
