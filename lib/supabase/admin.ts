import "server-only"
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-only service-role Supabase client. Bypasses RLS, so the catalogue and
 * book content can be read on the server WITHOUT handing every visitor an
 * authenticated session and WITHOUT exposing content URLs to the public REST
 * API. Use ONLY in Server Components / Route Handlers / Server Actions, only for
 * data the visitor is allowed to see (published catalogue) — never for another
 * user's private rows.
 *
 * The key is a SECRET: it lives only in server env (`SUPABASE_SERVICE_ROLE_KEY`,
 * NEVER `NEXT_PUBLIC_*`). `import "server-only"` makes the build fail if this
 * module is ever pulled into a client bundle. Returns null when the key isn't
 * configured, so callers gracefully fall back to the user-scoped RLS client.
 */
let cached: SupabaseClient | null | undefined

export function adminClient(): SupabaseClient | null {
  if (cached !== undefined) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    cached = null
    return null
  }
  cached = createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}
