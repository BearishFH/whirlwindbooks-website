import Stripe from "stripe"

// The secret key is read ONLY from the environment — never hardcoded, never
// committed. Set STRIPE_SECRET_KEY in .env.local (test key) / your host's env.
//
// Lazy singleton: constructing Stripe with no key throws, so we build it on
// first use and surface a clean error instead of crashing the route at import.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set — add it to .env.local")
  _stripe = new Stripe(key, {
    apiVersion: "2024-06-20" as any,
    appInfo: { name: "Whirlwind Web" },
  })
  return _stripe
}
