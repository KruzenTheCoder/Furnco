import { createClient } from '@supabase/supabase-js';

// Provide a valid URL placeholder to prevent the Supabase client from throwing
// "supabaseUrl is required" errors during Vercel's build-time module evaluation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceSupabase() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
  );
}