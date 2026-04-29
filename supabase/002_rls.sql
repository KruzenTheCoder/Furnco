-- Create a security definer function to check if the user is an admin
-- This avoids infinite recursion when checking policies on the profiles table
create or replace function public.is_admin()
returns boolean as $$
  select exists(
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- Enable RLS on all tables 
alter table profiles enable row level security; 
alter table categories enable row level security; 
alter table products enable row level security; 
alter table orders enable row level security; 
alter table order_items enable row level security; 

-- Profiles: users can read their own; admins can read all 
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" 
  on profiles for select 
  using ( auth.uid() = id ); 

drop policy if exists "Admins can view all profiles" on profiles;
create policy "Admins can view all profiles" 
  on profiles for select 
  using ( public.is_admin() ); 

-- Products: public read, admin write 
drop policy if exists "Public can view active products" on products;
create policy "Public can view active products" 
  on products for select 
  using ( is_active = true ); 

drop policy if exists "Admins can manage products" on products;
create policy "Admins can manage products" 
  on products for all 
  using ( public.is_admin() ) 
  with check ( public.is_admin() ); 

-- Orders: users can see own orders; admins see all 
drop policy if exists "Users can view own orders" on orders;
create policy "Users can view own orders" 
  on orders for select 
  using ( auth.uid() = user_id ); 

drop policy if exists "Admins can view all orders" on orders;
create policy "Admins can view all orders" 
  on orders for select 
  using ( public.is_admin() ); 

-- Order items follow order RLS via foreign key (no extra policy needed)

-- Promo Banners: public read, admin write
alter table promo_banners enable row level security;

drop policy if exists "Public can view active promo banners" on promo_banners;
create policy "Public can view active promo banners"
  on promo_banners for select
  using ( is_active = true );

drop policy if exists "Admins can manage promo banners" on promo_banners;
create policy "Admins can manage promo banners"
  on promo_banners for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- Addresses: users can only access their own
alter table addresses enable row level security;

drop policy if exists "Users can view own addresses" on addresses;
create policy "Users can view own addresses"
  on addresses for select
  using ( auth.uid() = user_id );

drop policy if exists "Users can manage own addresses" on addresses;
create policy "Users can manage own addresses"
  on addresses for all
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- Site Content: public read, admin write
alter table site_content enable row level security;

drop policy if exists "Public can view site content" on site_content;
create policy "Public can view site content"
  on site_content for select
  using ( true );

drop policy if exists "Admins can manage site content" on site_content;
create policy "Admins can manage site content"
  on site_content for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- Product Images: follow product RLS
alter table product_images enable row level security;

drop policy if exists "Public can view product images for active products" on product_images;
create policy "Public can view product images for active products"
  on product_images for select
  using (
    exists (
      select 1 from products
      where products.id = product_images.product_id
      and products.is_active = true
    )
  );

drop policy if exists "Admins can manage product images" on product_images;
create policy "Admins can manage product images"
  on product_images for all
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- Categories: public read, admin write
alter table categories enable row level security;

drop policy if exists "Public can view categories" on categories;
create policy "Public can view categories"
  on categories for select
  using ( true );

drop policy if exists "Admins can manage categories" on categories;
create policy "Admins can manage categories"
  on categories for all
  using ( public.is_admin() )
  with check ( public.is_admin() );
