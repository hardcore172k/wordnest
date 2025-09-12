import './globals.css'
import { createServerSupabaseClient } from '../supabase-server'
import { SupabaseProvider } from './supabase-provider'
import AuthListener from './auth-listener'

export const metadata = {
  title: 'WordNest Blog',
  description: 'Professional Blog Platform',
}

export default async function RootLayout({ children }) {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 min-h-screen">
        <SupabaseProvider initialSession={session}>
          <AuthListener /> {/* client-side hook for redirects */}
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
