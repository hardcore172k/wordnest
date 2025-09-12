'use client'

import { useState, createContext, useContext } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const SupabaseContext = createContext()

export function SupabaseProvider({ children, initialSession }) {
  const [supabase] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <SupabaseContext.Provider value={{ supabase }}>
        {children}
      </SupabaseContext.Provider>
    </SessionContextProvider>
  )
}

// Easy hook for accessing supabase client in client components
export const useSupabase = () => useContext(SupabaseContext)
