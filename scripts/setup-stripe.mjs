// Creates the Whirlwind Premium product + monthly/annual prices in Stripe.
// Idempotent — safe to run more than once (it reuses prices by lookup_key).
//
// RUN IT YOURSELF (your key never leaves your machine):
//   STRIPE_SECRET_KEY=sk_test_xxx node scripts/setup-stripe.mjs
//
// Use a TEST key (sk_test_...) while building. Copy the printed price IDs into
// .env.local as STRIPE_PRICE_MONTHLY / STRIPE_PRICE_ANNUAL.

import Stripe from "stripe"

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error("✗ Set STRIPE_SECRET_KEY first:  STRIPE_SECRET_KEY=sk_test_xxx node scripts/setup-stripe.mjs")
  process.exit(1)
}
if (key.startsWith("sk_live")) {
  console.warn("⚠  You are using a LIVE key — this creates REAL products in your live account.")
  console.warn("   Prefer a test key (sk_test_...) while building.\n")
}

const stripe = new Stripe(key)
const CURRENCY = "gbp"

// find-or-create the product
async function getProduct() {
  const existing = await stripe.products.search({ query: `metadata['app']:'whirlwind' AND active:'true'` })
  if (existing.data[0]) return existing.data[0]
  return stripe.products.create({
    name: "Whirlwind Premium",
    description: "Unlock the entire collection of mysteries — read or listen, new titles every week.",
    metadata: { app: "whirlwind" },
  })
}

// find-or-create a price by lookup_key
async function getPrice({ lookupKey, product, amount, interval }) {
  const found = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 })
  if (found.data[0]) return found.data[0]
  return stripe.prices.create({
    product,
    currency: CURRENCY,
    unit_amount: amount,
    recurring: { interval },
    lookup_key: lookupKey,
    metadata: { app: "whirlwind" },
  })
}

const product = await getProduct()
const monthly = await getPrice({ lookupKey: "ww_monthly", product: product.id, amount: 999, interval: "month" })
const annual = await getPrice({ lookupKey: "ww_annual", product: product.id, amount: 5999, interval: "year" })

console.log("\n✓ Stripe set up. Add these to .env.local:\n")
console.log(`STRIPE_PRICE_MONTHLY=${monthly.id}   # £9.99 / month`)
console.log(`STRIPE_PRICE_ANNUAL=${annual.id}     # £59.99 / year (3-day free trial applied at checkout)`)
console.log(`\nProduct: ${product.id}  (${product.name})`)
