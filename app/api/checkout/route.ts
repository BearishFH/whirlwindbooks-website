import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

// POST { plan: "monthly" | "annual" }  ->  { url }
// The browser redirects to Stripe Checkout. Prices come from env (set them after
// running scripts/setup-stripe.mjs).
export async function POST(req: Request) {
  try {
    const { plan } = (await req.json()) as { plan?: "monthly" | "annual" }

    const price =
      plan === "annual" ? process.env.STRIPE_PRICE_ANNUAL : process.env.STRIPE_PRICE_MONTHLY
    if (!price) {
      return NextResponse.json(
        { error: "Price not configured. Run scripts/setup-stripe.mjs and set STRIPE_PRICE_* in .env.local." },
        { status: 500 },
      )
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      // 3-day free trial on the annual plan, matching the app.
      subscription_data: plan === "annual" ? { trial_period_days: 3 } : undefined,
      allow_promotion_codes: true,
      success_url: `${site}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/?checkout=cancelled`,
      metadata: { app: "whirlwind", plan: plan ?? "monthly" },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("[checkout]", err?.message)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
