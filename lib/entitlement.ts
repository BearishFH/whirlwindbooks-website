// Cross-platform entitlement check.
//
// RevenueCat is the single source of truth, keyed to the Supabase user id (the
// iOS app calls `Purchases.logIn(supabaseUserId)`). Checking it here means a
// subscription bought on EITHER platform — Apple in the app, or Stripe on the
// web (once Stripe is connected inside RevenueCat) — unlocks reading everywhere.
//
// The RevenueCat REST key is a SECRET: it lives only in server env
// (`REVENUECAT_SECRET_KEY`), is used only in this server module, and is never
// sent to the browser. If it isn't configured we fall back to the Supabase
// `subscriptions` table, and if neither is available we deny (secure by
// default) — a signed-in user only ever gets the free preview until entitlement
// is proven.

import type { SupabaseClient } from "@supabase/supabase-js"

const RC_SECRET = process.env.REVENUECAT_SECRET_KEY

/** True iff the user has a currently-active subscription on any platform. */
export async function hasActiveSubscription(
  userId: string,
  supabase?: SupabaseClient,
): Promise<boolean> {
  if (!userId) return false

  // 1) RevenueCat REST — the real cross-platform truth (Apple + Stripe).
  if (RC_SECRET) {
    try {
      const res = await fetch(
        `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`,
        {
          headers: { Authorization: `Bearer ${RC_SECRET}` },
          cache: "no-store",
        },
      )
      if (res.ok) {
        const data = await res.json()
        const entitlements = data?.subscriber?.entitlements ?? {}
        const now = Date.now()
        for (const key of Object.keys(entitlements)) {
          const exp = entitlements[key]?.expires_date
          // null expiry = non-expiring entitlement; otherwise must be future.
          if (exp === null || (typeof exp === "string" && Date.parse(exp) > now)) {
            return true
          }
        }
        return false
      }
      // Non-OK (e.g. 404 unknown subscriber) → fall through to the table.
    } catch {
      // Network error → fall through to the table, then secure-default deny.
    }
  }

  // 2) Fallback: the shared Supabase `subscriptions` table (kept in sync by the
  //    RevenueCat webhook). RLS lets a user read only their own rows.
  if (supabase) {
    try {
      const { data } = await supabase
        .from("subscriptions")
        .select("expires_at, expires_date, is_active, status")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
      const row = data?.[0] as Record<string, unknown> | undefined
      if (row) {
        const now = Date.now()
        const exp = (row.expires_at ?? row.expires_date) as string | null | undefined
        const active =
          row.is_active === true ||
          row.status === "active" ||
          (typeof exp === "string" && Date.parse(exp) > now)
        if (active) return true
      }
    } catch {
      // ignore → secure-default deny
    }
  }

  // 3) Secure by default.
  return false
}
