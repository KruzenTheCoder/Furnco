-- Fix foreign key on orders to reference profiles instead of auth.users
-- This allows Supabase (PostgREST) to automatically join orders with profiles
alter table public.orders drop constraint if exists orders_user_id_fkey;

alter table public.orders 
  add constraint orders_user_id_fkey 
  foreign key (user_id) references public.profiles(id) on delete set null;

-- Add email column to profiles to support the Admin UI queries
alter table public.profiles add column if not exists email text;

-- (Optional) Update the schema file for future reference
-- You don't need to run this comment, it just notes that 001_schema.sql should be updated
