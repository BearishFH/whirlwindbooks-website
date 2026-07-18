import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"

// Stripe webhook. Point Stripe (Developers -> Webhooks) at /api/stripe-webhook
// and put the signing secret in STRIPE_WEBHOOK_SECRET.
//
// We verify the signature, then react to subscription lifecycle events. The
// entitlement grant (unlocking the account across web + iOS) is wired here —
// left as a clearly-marked hook because it depends on the web-auth handoff +
// RevenueCat Web Billing, which come next.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const sig = req.headers.get("stripe-signature")
  if (!secret || !sig) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await req.text() // raw body required for signature verification
    event = getStripe().webhooks.constructEvent(body, sig, secret)
  } catch (err: any) {
    console.error("[webhook] signature verification failed:", err?.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session
      console.log("[webhook] checkout complete", { customer: s.customer, email: s.customer_details?.email, plan: s.metadata?.plan })
      // TODO(entitlement): link this Stripe customer to the Whirlwind account
      // (email / anon-id passed in metadata) and grant Premium — via RevenueCat
      // Web Billing or a Supabase `subscriptions` row using SUPABASE_SERVICE_ROLE_KEY.
      break
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      console.log("[webhook] subscription", event.type, { id: sub.id, status: sub.status })
      // TODO(entitlement): sync active/cancelled status to the user's entitlement.
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
