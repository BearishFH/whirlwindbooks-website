"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// RevenueCat Web SDK checkout. This mirrors the iOS paywall: the visitor picks
// a plan, RevenueCat presents the hosted checkout (Paddle Billing is the
// merchant of record — it handles global VAT), and on success the entitlement
// is live on RevenueCat — which the server-side `hasActiveSubscription()`
// reads, so reading unlocks on web AND in the app.
//
// The same purchase() flow and the same public key work regardless of the
// underlying provider (Paddle here). The *public* Web Billing key is
// publishable, so it is safe to expose via NEXT_PUBLIC. The secret REST key
// stays server-only in `lib/entitlement.ts`.

type Plan = {
  id: string
  title: string
  price: string
  period: string
  // Opaque handle back to the RC package object, resolved at purchase time.
  index: number
}

const RC_KEY = process.env.NEXT_PUBLIC_RC_WEB_BILLING_KEY

export function SubscribePlans({ appUserId }: { appUserId: string }) {
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Keep the live RC package objects around so a click can purchase the exact
  // one the customer saw, without re-fetching.
  const [rcState, setRcState] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    purchases: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    packages: any[]
  } | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!RC_KEY) {
        setLoading(false)
        return
      }
      try {
        // Dynamic import: purchases-js touches `window`, so it must only load
        // in the browser (never during SSR).
        const { Purchases } = await import("@revenuecat/purchases-js")
        const purchases = Purchases.configure({ apiKey: RC_KEY, appUserId })
        const offerings = await purchases.getOfferings()
        const current = offerings.current
        const pkgs = current?.availablePackages ?? []

        if (cancelled) return

        const mapped: Plan[] = pkgs.map((pkg, i) => {
          const product = pkg.webBillingProduct ?? pkg.rcBillingProduct
          const period =
            pkg.packageType === "annual" || product?.normalPeriodDuration === "P1Y"
              ? "per year"
              : pkg.packageType === "monthly" || product?.normalPeriodDuration === "P1M"
                ? "per month"
                : ""
          return {
            id: pkg.identifier,
            title: product?.title || (period === "per year" ? "Annual" : "Monthly"),
            price: product?.currentPrice?.formattedPrice ?? "",
            period,
            index: i,
          }
        })

        setRcState({ purchases, packages: pkgs })
        setPlans(mapped)
      } catch {
        if (!cancelled) setError("Couldn't load plans. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [appUserId])

  async function buy(plan: Plan) {
    if (!rcState) return
    setBuying(plan.id)
    setError(null)
    try {
      const pkg = rcState.packages[plan.index]
      await rcState.purchases.purchase({ rcPackage: pkg })
      // Entitlement is now live on RevenueCat. Re-render server components so
      // the gate re-evaluates and the reader unlocks.
      router.push("/browse?subscribed=1")
      router.refresh()
    } catch (e: unknown) {
      // User-cancelled is not an error worth shouting about.
      const code = (e as { errorCode?: number })?.errorCode
      if (code === 1) {
        // UserCancelledError
      } else {
        setError("The purchase didn't go through. No charge was made — please try again.")
      }
      setBuying(null)
    }
  }

  // Graceful pre-launch fallback: no key configured yet → point to the app,
  // exactly as before, so the live experience is never broken.
  if (!RC_KEY) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center md:p-8">
        <p className="font-serif text-[15px] text-[#d9cbb5]">
          Web checkout is rolling out. For now, subscribe in the Whirlwind iOS app — your
          subscription then unlocks everything here too.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="font-sans text-sm text-[#8a7d6c]">Loading plans…</p>
      </div>
    )
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center md:p-8">
        <p className="font-serif text-[15px] text-[#d9cbb5]">
          Plans aren&apos;t available right now. Please check back shortly.
        </p>
        {error ? <p className="mt-3 font-sans text-xs text-[#c98b6b]">{error}</p> : null}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const isAnnual = plan.period === "per year"
          return (
            <button
              key={plan.id}
              type="button"
              disabled={buying !== null}
              onClick={() => buy(plan)}
              className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all disabled:opacity-60 ${
                isAnnual
                  ? "border-[rgba(210,163,95,.55)] bg-[rgba(210,163,95,.08)]"
                  : "border-white/12 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              {isAnnual ? (
                <span className="mb-3 rounded-full bg-[#c0392b] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-[#f7e9d0]">
                  Best value
                </span>
              ) : null}
              <span className="ww-display text-xl text-[#f5ead4]">{plan.title}</span>
              <span className="mt-2 font-sans text-2xl font-semibold text-[#f0d59b]">
                {plan.price}
              </span>
              <span className="font-sans text-[13px] text-[#8a7d6c]">{plan.period}</span>
              <span className="mt-5 inline-flex ww-btn ww-btn-gold !min-h-[46px] !px-6 text-[14px]">
                {buying === plan.id ? "Opening checkout…" : "Subscribe"}
              </span>
            </button>
          )
        })}
      </div>
      {error ? (
        <p className="text-center font-sans text-xs text-[#c98b6b]">{error}</p>
      ) : null}
      <p className="text-center font-sans text-[12px] text-[#6f665a]">
        Secure checkout · Tax handled at checkout · Cancel anytime · Unlocks the iOS app too
      </p>
    </div>
  )
}
