import { createBrowserClient } from '@supabase/ssr'

require('dotenv').config({ path: '.env' });

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
