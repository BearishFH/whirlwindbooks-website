"use client"

import { useState } from "react"
import { startCheckout } from "@/lib/checkout"

export default function PricingSection() {
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null)

  const go = async (plan: "monthly" | "annual") => {
    setLoading(plan)
    await startCheckout(plan)
    setLoading(null)
  }

  return (
    <section id="get" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <span className="ww-eyebrow justify-center">Your next obsession is one chapter away</span>
        <h2 className="ww-display mx-auto mt-4 max-w-2xl text-[clamp(38px,5vw,64px)] font-medium leading-[1] text-[#f5ead4]">
          Unlock every mystery.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[#a99c8b]">
          Hundreds of original mysteries, fresh titles every week — read or listen.
          Chapter one is always free; this unlocks the rest.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
        {/* Annual */}
        <div className="relative rounded-3xl border border-[#d2a35f]/50 bg-[#d2a35f]/[.06] p-8">
          <span className="absolute -top-3 left-8 rounded-full bg-[#d2a35f] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#24170c]">
            3 days free · best value
          </span>
          <h3 className="ww-display text-[26px] text-[#f5ead4]">Annual</h3>
          <p className="mt-1 text-[#a99c8b]">3 days free, then billed yearly</p>
          <div className="mt-4 flex items-end gap-1">
            <span className="ww-display text-[44px] text-[#f5ead4]">£59.99</span>
            <span className="mb-2 text-[#a99c8b]">/year</span>
          </div>
          <p className="mt-1 text-[13px] text-[#8f8474]">Just £5 a month, billed annually.</p>
          <button
            onClick={() => go("annual")}
            disabled={loading !== null}
            className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-gradient-to-br from-[#f1d9a4] to-[#c48d49] px-6 font-bold text-[#24170c] transition hover:brightness-105 disabled:opacity-60"
          >
            {loading === "annual" ? "Opening checkout…" : "Start 3-day free trial"}
          </button>
        </div>

        {/* Monthly */}
        <div className="rounded-3xl border border-white/10 bg-white/[.03] p-8">
          <h3 className="ww-display text-[26px] text-[#f5ead4]">Monthly</h3>
          <p className="mt-1 text-[#a99c8b]">Flexible, cancel anytime</p>
          <div className="mt-4 flex items-end gap-1">
            <span className="ww-display text-[44px] text-[#f5ead4]">£9.99</span>
            <span className="mb-2 text-[#a99c8b]">/month</span>
          </div>
          <p className="mt-1 text-[13px] text-[#8f8474]">No trial · cancel whenever you like.</p>
          <button
            onClick={() => go("monthly")}
            disabled={loading !== null}
            className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-[rgba(245,234,212,.18)] bg-white/[.04] px-6 font-bold text-[#f5ead4] transition hover:bg-white/[.08] disabled:opacity-60"
          >
            {loading === "monthly" ? "Opening checkout…" : "Subscribe monthly"}
          </button>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-[12px] text-[#8f8474]">
        Secure checkout by Stripe. Auto-renews until cancelled — manage or cancel anytime.
      </p>
    </section>
  )
}
