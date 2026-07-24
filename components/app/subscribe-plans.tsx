"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// RevenueCat Web SDK checkout. This mirrors the iOS paywall: the visitor picks
// a plan, RevenueCat presents the hosted checkout (settled through Stripe via
// RevenueCat Managed Payments — Stripe handles global tax/VAT), and on success
// the entitlement is live on RevenueCat — which the server-side
// `hasActiveSubscription()` reads, so reading unlocks on web AND in the app.
//
// The same purchase() flow and the same public key work regardless of the
// underlying provider (Stripe here). The *public* Web Billing key is
// publishable, so it is safe to expose via NEXT_PUBLIC. The secret REST key
// stays server-only in `lib/entitlement.ts`.

type Plan = {
  id: string
  title: string
  price: string
  period: string
  // Raw price for computing the annual saving.
  micros: number
  // Opaque handle back to the RC package object, resolved at purchase time.
  index: number
}

const RC_KEY = process.env.NEXT_PUBLIC_RC_WEB_BILLING_KEY

// Value props shared by both plans — every membership unlocks all of this.
const BENEFITS = [
  "Every mystery in 12 languages",
  "Lots of new mysteries every week",
  "English audiobook editions",
  "Reads on the web and the iOS app",
]

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
            micros: product?.currentPrice?.amountMicros ?? 0,
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

  const monthly = plans.find((p) => p.period === "per month")
  const annual = plans.find((p) => p.period === "per year")
  const savePct =
    monthly && annual && monthly.micros > 0
      ? Math.round((1 - annual.micros / (monthly.micros * 12)) * 100)
      : 0

  return (
    <div className="space-y-4">
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const isAnnual = plan.period === "per year"
          return (
            <button
              key={plan.id}
              type="button"
              disabled={buying !== null}
              onClick={() => buy(plan)}
              className={`group relative flex h-full flex-col items-start rounded-2xl border p-6 text-left shadow-[0_24px_70px_rgba(0,0,0,.6)] backdrop-blur-xl transition-all disabled:opacity-60 ${
                isAnnual
                  ? "border-[rgba(210,163,95,.55)] bg-[#141009]/90 hover:bg-[#171208]/92"
                  : "border-white/15 bg-[#0b0a0d]/88 hover:border-white/30"
              }`}
            >
              {/* Fixed-height badge row keeps titles/prices aligned across cards */}
              <div className="mb-3 flex h-[26px] items-center">
                {isAnnual && savePct > 0 ? (
                  <span className="rounded-full bg-[#c0392b] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-[#f7e9d0]">
                    Best value · Save {savePct}%
                  </span>
                ) : isAnnual ? (
                  <span className="rounded-full bg-[#c0392b] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-[#f7e9d0]">
                    Best value
                  </span>
                ) : null}
              </div>

              <span className="ww-display text-xl text-[#f5ead4]">{plan.title}</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-sans text-3xl font-semibold text-[#f0d59b]">{plan.price}</span>
                <span className="font-sans text-[13px] text-[#8a7d6c]">/ {plan.period.replace("per ", "")}</span>
              </div>

              <ul className="mt-5 mb-6 space-y-2.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 font-sans text-[13.5px] leading-snug text-[#cbbfa9]">
                    <svg viewBox="0 0 20 20" className="mt-[2px] h-4 w-4 flex-none" fill="none" stroke="#d2a35f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 10.5 3.5 3.5L15 6.5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>

              <span className="mt-auto inline-flex w-full justify-center ww-btn ww-btn-gold !min-h-[48px] !px-6 text-[14px]">
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
