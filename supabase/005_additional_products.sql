-- Additional Seed Data: Super Sale Flyer Products
-- Run this in your Supabase SQL Editor

insert into public.products (
  name, 
  slug, 
  description, 
  price, 
  stock, 
  category_id, 
  image_url, 
  is_active, 
  is_new, 
  is_take2
) values
  (
    'Defy Stove DSS694X', 
    'defy-stove-dss694x', 
    'From "SUPER SALE" stove flyer. Brand: Defy.', 
    4599.00, 
    10, 
    '44444444-4444-4444-4444-444444444444', -- Appliances category
    'https://via.placeholder.com/800x800?text=Defy+Stove+DSS694X', 
    true, 
    true, 
    false
  ),
  (
    'Hisense H20-MOBS14 Microwave', 
    'hisense-h20-mobs14-microwave', 
    'Black microwave flyer. Brand: Hisense.', 
    749.00, 
    15, 
    '44444444-4444-4444-4444-444444444444', -- Appliances category
    'https://via.placeholder.com/800x800?text=Hisense+Microwave', 
    true, 
    true, 
    false
  ),
  (
    'Defy DMO390 Microwave 30lt', 
    'defy-dmo390-microwave-30lt', 
    '30L microwave flyer. Brand: Defy.', 
    1299.00, 
    12, 
    '44444444-4444-4444-4444-444444444444', -- Appliances category
    'https://via.placeholder.com/800x800?text=Defy+30L+Microwave', 
    true, 
    true, 
    false
  ),
  (
    'Hisense H425BIT Fridge', 
    'hisense-h425bit-fridge', 
    'Bottom freezer fridge flyer. Brand: Hisense.', 
    5999.00, 
    5, 
    '44444444-4444-4444-4444-444444444444', -- Appliances category
    'https://via.placeholder.com/800x800?text=Hisense+H425BIT+Fridge', 
    true, 
    true, 
    false
  ),
  (
    'Storage Box 85lt', 
    'storage-box-85lt', 
    'Black storage box flyer.', 
    99.00, 
    50, 
    '33333333-3333-3333-3333-333333333333', -- Lounge category (or any relevant category)
    'https://via.placeholder.com/800x800?text=Storage+Box+85lt', 
    true, 
    true, 
    false
  ),
  (
    'Midea MM20 White Microwave 20lt', 
    'midea-mm20-white-microwave-20lt', 
    'White Midea microwave flyer. Brand: Midea.', 
    699.00, 
    20, 
    '44444444-4444-4444-4444-444444444444', -- Appliances category
    'https://via.placeholder.com/800x800?text=Midea+MM20+Microwave', 
    true, 
    true, 
    false
  )
on conflict (slug) do update set 
  name = excluded.name, 
  description = excluded.description, 
  price = excluded.price, 
  stock = excluded.stock,
  image_url = excluded.image_url;
