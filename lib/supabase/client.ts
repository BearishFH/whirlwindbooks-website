import { createBrowserClient } from "@supabase/ssr"

/**
 * Browser-side Supabase client. Uses the public anon key (safe to expose — it is
 * the same key the iOS app ships). Auth session is stored in cookies so server
 * components can read it too.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
