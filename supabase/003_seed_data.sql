  -- Seed Data for Furnco Application
  -- Run this AFTER 001_schema.sql and 002_rls.sql

  -- Clear existing data to avoid foreign key conflicts
  delete from order_items;
  delete from orders;
  delete from products;
  delete from categories;
  delete from promo_banners;
  delete from addresses;
  delete from site_content;

  -- Insert categories (use ON CONFLICT to handle existing data)
  insert into categories (id, name, slug) values
    ('11111111-1111-1111-1111-111111111111', 'Bedroom', 'bedroom'),
    ('22222222-2222-2222-2222-222222222222', 'Kitchen', 'kitchen'),
    ('33333333-3333-3333-3333-333333333333', 'Lounge', 'lounge'),
    ('44444444-4444-4444-4444-444444444444', 'Appliances', 'appliances'),
    ('55555555-5555-5555-5555-555555555555', 'Office', 'office'),
    ('66666666-6666-6666-6666-666666666666', 'Dining', 'dining')
  on conflict (slug) do update set name = excluded.name;

  -- Insert products
  insert into products (id, name, slug, description, price, stock, category_id, image_url, is_active, is_new, is_take2) values
    ('a1111111-1111-1111-1111-111111111111', 'Comfort King Bed', 'comfort-king-bed', 'Premium king size bed with orthopedic mattress support', 8999.00, 15, '11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', true, true, false),
    ('a2222222-2222-2222-2222-222222222222', 'Oak Wardrobe', 'oak-wardrobe', 'Spacious solid oak wardrobe with mirrors', 5999.00, 8, '11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800', true, true, false),
    ('a3333333-3333-3333-3333-333333333333', 'Nightstand Duo', 'nightstand-duo', 'Pair of matching bedside tables', 1499.00, 25, '11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800', true, false, true),
    ('b1111111-1111-1111-1111-111111111111', 'Modern Kitchen Suite', 'modern-kitchen-suite', 'Complete kitchen with cabinets and countertops', 25999.00, 3, '22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', true, false, true),
    ('b2222222-2222-2222-2222-222222222222', 'Gas Stove Pro', 'gas-stove-pro', '5-burner gas stove with oven', 4599.00, 12, '22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', true, true, false),
    ('b3333333-3333-3333-3333-333333333333', 'Fridge Max', 'fridge-max', 'Double door frost-free refrigerator 500L', 8999.00, 7, '44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800', true, false, true),
    ('c1111111-1111-1111-1111-111111111111', 'L-Shape Sofa', 'l-shape-sofa', 'Luxurious L-shaped fabric sofa', 12999.00, 5, '33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', true, true, false),
    ('c2222222-2222-2222-2222-222222222222', 'TV Stand Elite', 'tv-stand-elite', 'Modern TV stand with storage', 2999.00, 18, '33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800', true, false, true),
    ('c3333333-3333-3333-3333-333333333333', 'Coffee Table Set', 'coffee-table-set', 'Glass top coffee table with 2 side tables', 2499.00, 14, '33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800', true, true, false),
    ('d1111111-1111-1111-1111-111111111111', 'Washing Machine Smart', 'washing-machine-smart', '8kg front load washing machine', 6499.00, 9, '44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800', true, true, false),
    ('d2222222-2222-2222-2222-222222222222', 'Microwave Deluxe', 'microwave-deluxe', '30L digital microwave oven', 1899.00, 22, '44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800', true, false, true),
    ('d3333333-3333-3333-3333-333333333333', 'Air Conditioner', 'air-conditioner', '12000 BTU split AC unit', 7999.00, 6, '44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1631545308337-44a08faa2b33?w=800', true, true, false),
    ('e1111111-1111-1111-1111-111111111111', 'Executive Desk', 'executive-desk', 'Large wooden executive desk', 4999.00, 11, '55555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', true, true, false),
    ('e2222222-2222-2222-2222-222222222222', 'Office Chair Pro', 'office-chair-pro', 'Ergonomic office chair with lumbar support', 2499.00, 20, '55555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800', true, false, true),
    ('f1111111-1111-1111-1111-111111111111', 'Dining Table 6-Seater', 'dining-table-6-seater', 'Solid wood dining table for 6', 6999.00, 7, '66666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', true, true, false),
    ('f2222222-2222-2222-2222-222222222222', 'Dining Chair Set', 'dining-chair-set', 'Set of 6 upholstered dining chairs', 3999.00, 13, '66666666-6666-6666-6666-666666666666', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800', true, false, true)
  on conflict (slug) do update set name = excluded.name, price = excluded.price, stock = excluded.stock;

  -- Insert promo banner
  insert into promo_banners (id, title, subtitle, link, is_active, starts_at, ends_at) values
    ('bbbbbbbb-1111-1111-1111-111111111111', 'UP TO 50% OFF!', 'Year End Sale - Shop Now!', '/deals', true, '2026-01-01', '2026-12-31')
  on conflict (id) do update set title = excluded.title, is_active = excluded.is_active;

  -- Insert sample orders (without user_id since we don't have auth.users yet)
  insert into orders (id, status, total, created_at) values
    ('00000001-0001-0001-0001-000000000001', 'pending', 12999.00, '2026-04-25T10:30:00Z'),
    ('00000002-0002-0002-0002-000000000002', 'paid', 8999.00, '2026-04-26T14:15:00Z'),
    ('00000003-0003-0003-0003-000000000003', 'shipped', 4599.00, '2026-04-27T09:00:00Z'),
    ('00000004-0004-0004-0004-000000000004', 'delivered', 2499.00, '2026-04-20T16:45:00Z');

  -- Insert order items
  insert into order_items (order_id, product_id, quantity, price_at_purchase) values
    ('00000001-0001-0001-0001-000000000001', 'c1111111-1111-1111-1111-111111111111', 1, 12999.00),
    ('00000002-0002-0002-0002-000000000002', 'a1111111-1111-1111-1111-111111111111', 1, 8999.00),
    ('00000003-0003-0003-0003-000000000003', 'b2222222-2222-2222-2222-222222222222', 1, 4599.00),
    ('00000004-0004-0004-0004-000000000004', 'c3333333-3333-3333-3333-333333333333', 1, 2499.00);

  -- Insert addresses (skip if auth.users doesn't exist or use NULL user_id if table allows)
  -- We will comment this out since addresses requires a valid auth.users.id
  -- insert into addresses (user_id, full_name, line1, line2, city, province, postal_code, phone, is_default) values
  --   ('00000000-0000-0000-0000-000000000000', 'John Smith', '123 Furniture Street', 'Suburb: Sandton', 'Johannesburg', 'Gauteng', '2001', '+27 11 123 4567', true),
  --   ('00000000-0000-0000-0000-000000000001', 'Jane Doe', '456 Home Avenue', 'Unit 12', 'Cape Town', 'Western Cape', '8001', '+27 21 987 6543', true);

  -- Insert site content
  insert into site_content (section, content) values
    ('hero', '{"headline": "Transform Your Space", "subheadline": "Discover premium furniture and appliances", "cta": "Shop Now"}'),
    ('footer', '{"about": "Furnco - Your premium furniture destination", "contact": "+27 11 123 4567", "email": "info@furnco.co.za"}');
