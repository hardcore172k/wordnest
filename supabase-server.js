import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Create a server Supabase client (used in server components & layout)
export const createServerSupabaseClient = () => {
  return createServerComponentClient({ cookies })
}
