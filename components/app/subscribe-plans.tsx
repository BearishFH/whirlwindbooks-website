"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { trackMeta } from "@/lib/meta-pixel"

// RevenueCat Web SDK checkout, PAY-FIRST. The visitor can buy as a guest: we
// give them a silent anonymous session so RevenueCat has a stable app user id,
// they pay (Stripe via RevenueCat Managed Payments handles card + email + VAT),
// and ONLY AFTER payment do we ask them to create an account (Google/Apple or
// email) — which links to the same id, so the entitlement carries over. No
// pre-payment account wall. Entitlement lands on RevenueCat, which the
// server-side hasActiveSubscription() reads, so reading unlocks on web AND app.

type Plan = {
  id: string
  title: string
  price: string
  period: string
  micros: number
  index: number
}

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
        const pkgs = offerings.current?.availablePackages ?? []

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
      // Paid! Now (and only now) ask them to create an account — no pre-pay wall.
      setPurchased(true)
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

  // Paid → account creation (post-payment, so the sub follows them everywhere).
  if (purchased) {
    return (
      <PostPurchase
        supabase={supabase}
        onSkip={() => {
          router.push("/browse?subscribed=1")
          router.refresh()
        }}
      />
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
        Secure checkout · No account needed to start · Cancel anytime · Unlocks the iOS app too
      </p>
    </div>
  )
}

/* Post-payment account creation. The purchase is already done and reading works
   on this session; this just links a real login so it follows them everywhere. */
function PostPurchase({
  supabase,
  onSkip,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
  onSkip: () => void
}) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function oauth(provider: "google" | "apple") {
    setErr(null)
    try {
      const { error } = await supabase.auth.linkIdentity({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback?redirect=/browse` },
      })
      if (error) throw error
      // success → browser redirects to the provider
    } catch {
      setErr("Couldn't connect that account. Try email instead, or start reading and set it up later.")
    }
  }

  async function saveEmail(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setBusy(true)
    setErr(null)
    const { error } = await supabase.auth.updateUser({ email })
    setBusy(false)
    if (error) setErr("Couldn't save that email — try another, or start reading and set it up later.")
    else setSent(true)
  }

  return (
    <div className="rounded-3xl border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.06)] p-7 text-center backdrop-blur-md md:p-9">
      <p className="ww-eyebrow mb-3 justify-center">Payment complete</p>
      <h2 className="ww-display text-3xl font-medium text-[#f7ecd6] md:text-4xl">You&apos;re subscribed 🎉</h2>

      {sent ? (
        <>
          <p className="mx-auto mt-4 max-w-md font-serif text-[16px] leading-relaxed text-[#d9cbb5]">
            Check your email to confirm your account — then you can sign in on any device.
            You can start reading right now.
          </p>
          <button type="button" onClick={onSkip} className="ww-btn ww-btn-gold mt-7 !min-h-[52px] !px-9 text-[15px]">
            Start reading →
          </button>
        </>
      ) : (
        <>
          <p className="mx-auto mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-[#d9cbb5]">
            Create your account so your subscription follows you to every device and the iOS app.
          </p>

          <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5">
            <button type="button" onClick={() => oauth("google")} className="ww-btn ww-btn-ghost !min-h-[48px] w-full">
              Continue with Google
            </button>
            <button type="button" onClick={() => oauth("apple")} className="ww-btn ww-btn-ghost !min-h-[48px] w-full">
              Continue with Apple
            </button>

            <div className="my-1 flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#6f665a]">
              <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={saveEmail} className="flex flex-col gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 font-sans text-sm text-[#f5ead4] placeholder:text-[#6f665a] focus:border-[rgba(210,163,95,.6)] focus:outline-none"
              />
              <button type="submit" disabled={busy} className="ww-btn ww-btn-gold !min-h-[48px] w-full disabled:opacity-60">
                {busy ? "Saving…" : "Create account with email"}
              </button>
            </form>
          </div>

          {err ? <p className="mt-3 font-sans text-xs text-[#c98b6b]">{err}</p> : null}

          <button type="button" onClick={onSkip} className="mt-5 font-sans text-[13px] text-[#a99c8b] underline underline-offset-4 hover:text-[#f5ead4]">
            Start reading — I&apos;ll set this up later
          </button>
        </>
      )}
    </div>
  )
}
