"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { trackMeta } from "@/lib/meta-pixel"

// RevenueCat Web SDK checkout, PAY-FIRST. The visitor can buy as a guest: we
// give them a silent anonymous session so RevenueCat has a stable app user id
// (== the Supabase auth UUID), they pay (Stripe via RevenueCat Managed Payments
// handles card + email + VAT), and ONLY AFTER payment do we REQUIRE them to
// connect Apple or Google.
//
// Why Apple/Google and nothing else: the iOS app signs in ONLY with Apple/Google
// (no email/password login exists there). RevenueCat's appUserId is the Supabase
// auth UUID on BOTH web and iOS, so linking the SAME Apple/Google identity to the
// guest's UUID means signing in with it on the phone returns that exact UUID —
// and the subscription is already attached to it. One account, buy once, works
// everywhere. An email-only account could never sign in on iOS, so we don't
// offer it. Entitlement lands on RevenueCat, which server-side
// hasActiveSubscription() reads, so reading unlocks on web AND app.

type Plan = {
  id: string
  title: string
  price: string
  period: string
  micros: number
  index: number
}

// Web Billing public key (Stripe provider → "strp_…"). Inlined at build time, so
// changing it in Netlify requires a rebuild of THIS module to take effect.
const RC_KEY = process.env.NEXT_PUBLIC_RC_WEB_BILLING_KEY

const BENEFITS = [
  "Every mystery in 12 languages",
  "Lots of new mysteries every week",
  "English audiobook editions",
  "Reads on the web and the iOS app",
]

export function SubscribePlans({ initialUserId }: { initialUserId: string | null }) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [plans, setPlans] = useState<Plan[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [purchased, setPurchased] = useState(false)

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
        // Guest checkout: ensure a session (create a silent anonymous one if
        // needed) so RevenueCat has a stable app user id to attach the purchase.
        let uid = initialUserId
        if (!uid) {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          uid = user?.id ?? null
          if (!uid) {
            const { data, error: aerr } = await supabase.auth.signInAnonymously()
            if (aerr) throw aerr
            uid = data.user?.id ?? null
          }
        }
        if (!uid) throw new Error("no-session")

        const { Purchases } = await import("@revenuecat/purchases-js")
        const purchases = Purchases.configure({ apiKey: RC_KEY, appUserId: uid })
        const offerings = await purchases.getOfferings()
        // Resolve the offering robustly: the project "current" pointer isn't
        // always set for the web (Stripe) app, so fall back to the named
        // "subscriptions" offering, then to any offering that actually has
        // purchasable web packages.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const all: Record<string, any> = offerings.all ?? {}
        const offering =
          (offerings.current && offerings.current.availablePackages.length > 0
            ? offerings.current
            : null) ??
          (all.subscriptions?.availablePackages?.length ? all.subscriptions : null) ??
          Object.values(all).find((o) => (o?.availablePackages?.length ?? 0) > 0) ??
          offerings.current ??
          null
        const pkgs = offering?.availablePackages ?? []

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
  }, [initialUserId, supabase])

  async function buy(plan: Plan) {
    if (!rcState) return
    setBuying(plan.id)
    setError(null)
    const value = plan.micros ? plan.micros / 1_000_000 : undefined
    trackMeta("InitiateCheckout", { value, currency: "GBP", content_ids: [plan.id], content_type: "product" })
    try {
      const pkg = rcState.packages[plan.index]
      await rcState.purchases.purchase({ rcPackage: pkg })
      trackMeta("Purchase", { value, currency: "GBP", content_ids: [plan.id], content_type: "product", num_items: 1 })
      // Paid! If they already signed in with a real (non-anonymous) account, the
      // sub is already on it — go straight to reading. Only guests need to
      // connect Apple/Google so the sub can follow them to iOS.
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user && !user.is_anonymous) {
        router.push("/browse?subscribed=1")
        router.refresh()
      } else {
        setPurchased(true)
      }
    } catch (e: unknown) {
      const code = (e as { errorCode?: number })?.errorCode
      if (code === 1) {
        // UserCancelledError — no charge, no fuss
      } else {
        setError("The purchase didn't go through. No charge was made — please try again.")
      }
      setBuying(null)
    }
  }

  // Pre-launch fallback: no key configured yet.
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

  // Paid → REQUIRED account connect (post-payment, so the sub follows them to iOS).
  if (purchased) {
    return <PostPurchase supabase={supabase} />
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
        Secure checkout · Pay first, connect your account after · Cancel anytime · Unlocks the iOS app too
      </p>
    </div>
  )
}

/* Post-payment: REQUIRED account connect. The purchase is already on this
   session's Supabase UUID; connecting Apple/Google links a real identity to that
   SAME UUID, so signing in with it on iOS (which uses Apple/Google) returns the
   same UUID with the subscription already attached. We deliberately offer only
   Apple/Google and no skip — an email-only account can't sign in on iOS, and a
   never-connected guest sub can't follow them to their phone. */
function PostPurchase({
  supabase,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
}) {
  const [busy, setBusy] = useState<"google" | "apple" | null>(null)
  const [err, setErr] = useState<string | null>(null)
  // After a link fails because the identity already belongs to an existing
  // Whirlwind account (a returning user), switch the buttons to a full sign-in
  // with that account instead of trying to link again.
  const [signInMode, setSignInMode] = useState(false)

  const redirectTo = `${window.location.origin}/auth/callback?redirect=/browse`

  async function connect(provider: "google" | "apple") {
    setBusy(provider)
    setErr(null)

    if (signInMode) {
      // Returning user: sign in with their existing account. RevenueCat is set to
      // transfer the just-made purchase to the account they sign into.
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })
      if (error) {
        setBusy(null)
        setErr("Couldn't sign in with that account. Please try the other option.")
      }
      // success → browser redirects to the provider
      return
    }

    // New customer (the common case): link the identity to this UUID, keeping the
    // subscription exactly where it is.
    const { error } = await supabase.auth.linkIdentity({ provider, options: { redirectTo } })
    if (error) {
      setBusy(null)
      // Nearly always: this Apple/Google account is already registered with
      // Whirlwind. Offer to sign in with it instead — the sub will follow.
      setSignInMode(true)
      setErr("Looks like you already have a Whirlwind account with that. Tap again to sign in — your subscription will move to it.")
    }
    // success → browser redirects to the provider, then back to /browse
  }

  return (
    <div className="rounded-3xl border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.06)] p-7 text-center backdrop-blur-md md:p-9">
      <p className="ww-eyebrow mb-3 justify-center">Payment complete</p>
      <h2 className="ww-display text-3xl font-medium text-[#f7ecd6] md:text-4xl">You&apos;re subscribed 🎉</h2>

      <p className="mx-auto mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-[#d9cbb5]">
        One last step — connect your account so your subscription works on your iPhone
        and every device. This is how you&apos;ll sign in.
      </p>

      <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => connect("apple")}
          className="ww-btn ww-btn-gold !min-h-[50px] w-full disabled:opacity-60"
        >
          {busy === "apple" ? "Connecting…" : signInMode ? "Sign in with Apple" : "Continue with Apple"}
        </button>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => connect("google")}
          className="ww-btn ww-btn-ghost !min-h-[50px] w-full disabled:opacity-60"
        >
          {busy === "google" ? "Connecting…" : signInMode ? "Sign in with Google" : "Continue with Google"}
        </button>
      </div>

      {err ? <p className="mx-auto mt-4 max-w-sm font-sans text-xs leading-relaxed text-[#c98b6b]">{err}</p> : null}

      <p className="mx-auto mt-5 max-w-sm font-sans text-[11.5px] leading-relaxed text-[#6f665a]">
        Apple &amp; Google are the sign-in methods the iPhone app uses, so your membership
        unlocks there automatically.
      </p>
    </div>
  )
}
