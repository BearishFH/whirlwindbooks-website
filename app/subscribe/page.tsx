import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { hasActiveSubscription } from "@/lib/entitlement"
import { getAllBooks } from "@/lib/catalog"
import { coverUrl } from "@/lib/catalog-types"
import { AppNav } from "@/components/app/app-nav"
import { SubscribePlans } from "@/components/app/subscribe-plans"
import { CoverMarquee } from "@/components/app/cover-marquee"

export const metadata = { title: "Whirlwind Unlimited — every mystery, unlocked" }
export const dynamic = "force-dynamic"

// Local covers ship in /public and always resolve — a guaranteed backdrop even
// if the live catalogue is slow or empty.
const LOCAL_COVERS = [
  "archivist-of-algiers",
  "aztec-gold-blood-red",
  "blood-and-pearls",
  "blood-diamonds-silk-scarves",
  "death-by-golden-honey-spirals",
  "fire-spice",
  "the-cyprus-agenda",
  "the-olive-oil-drowning",
  "the-pearl-diver-s-secret",
  "the-shortbread-confession",
].map((s) => `/covers/${s}.jpg`)

function splitRows<T>(items: T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => [])
  items.forEach((it, i) => out[i % rows].push(it))
  return out
}

export default async function SubscribePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // A purchase must attach to a REAL account (email/Apple/Google), not an
  // anonymous guest — otherwise it can't follow the reader to the iOS app.
  if (!user || user.is_anonymous) {
    redirect("/login?redirect=/subscribe")
  }

  const subscribed = await hasActiveSubscription(user.id, supabase)

  // Build the cover wall from the real catalogue, padded with local covers so
  // every row is full and seamless.
  const books = await getAllBooks(60).catch(() => [])
  const live = books.map(coverUrl).filter((u): u is string => !!u)
  const pool = [...live, ...LOCAL_COVERS]
  const covers = pool.length >= 18 ? pool : [...pool, ...pool, ...pool].slice(0, 21)
  const rows = splitRows(covers, 3)

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user.email} />

      {/* ─── Hero: the cover wall + the offer ─── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <CoverMarquee rows={rows} />
        {/* Legibility scrims: darken + vignette + fade to page below */}
        <div className="absolute inset-0 bg-[#060508]/78" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,5,8,.35)_0%,rgba(6,5,8,.9)_72%,#060508_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#060508]" />

        <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pb-24 pt-28 text-center md:pt-32">
          {subscribed ? (
            <SubscribedPanel />
          ) : (
            <>
              <p className="ww-eyebrow mb-4">Whirlwind Unlimited</p>
              <h1 className="ww-display text-[42px] font-medium leading-[1.05] text-[#f7ecd6] md:text-6xl">
                Every mystery,
                <br />
                <span className="text-[#f0d59b]">unlocked.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-serif text-[17px] leading-relaxed text-[#d9cbb5] md:text-[19px]">
                The full library to read or listen — a new snackable mystery every week. One
                membership covers the web and the iOS app. Cancel anytime.
              </p>

              <div className="mt-10 w-full">
                <SubscribePlans appUserId={user.id} />
              </div>

              <p className="mt-6 font-sans text-[12px] text-[#7c7060]">
                Chapter one of every book is always free · No ads, ever
              </p>
            </>
          )}
        </main>
      </section>

      {!subscribed ? (
        <>
          {/* ─── Why it's worth it ─── */}
          <section className="relative z-10 mx-auto max-w-5xl px-5 pb-4 pt-6 md:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <Feature
                title="Read or listen"
                body="Every story in polished prose and rich narration. Switch between them without losing your place."
              />
              <Feature
                title="New mysteries weekly"
                body="Fresh whodunits, thrillers and noir land every week. Your next obsession is always waiting."
              />
              <Feature
                title="One membership, everywhere"
                body="Buy once on the web and it unlocks the iPhone app too — your library and progress follow you."
              />
            </div>
          </section>

          {/* ─── Close ─── */}
          <section className="mx-auto max-w-2xl px-5 pb-24 pt-14 text-center">
            <hr className="ww-rule mx-auto mb-10 max-w-xs" />
            <h2 className="ww-display text-2xl text-[#f5ead4] md:text-3xl">
              Start reading in under a minute
            </h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-[15px] leading-relaxed text-[#a99c8b]">
              Secure checkout handled by Paddle — taxes included, cancel whenever you like.
            </p>
            <p className="mx-auto mt-8 max-w-md font-sans text-[12px] leading-relaxed text-[#6f665a]">
              By subscribing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#a99c8b]">
                Terms
              </Link>
              ,{" "}
              <Link href="/privacy" className="underline hover:text-[#a99c8b]">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/refund" className="underline hover:text-[#a99c8b]">
                Refund Policy
              </Link>
              . Subscriptions renew automatically until cancelled.
            </p>
          </section>
        </>
      ) : null}
    </div>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-left backdrop-blur-sm">
      <div className="mb-3 h-8 w-8 rounded-full border border-[rgba(210,163,95,.4)] bg-[rgba(210,163,95,.1)]" />
      <h3 className="ww-display text-lg text-[#f5ead4]">{title}</h3>
      <p className="mt-2 font-serif text-[15px] leading-relaxed text-[#a99c8b]">{body}</p>
    </div>
  )
}

function SubscribedPanel() {
  return (
    <div className="rounded-3xl border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.06)] px-8 py-12 backdrop-blur-md">
      <p className="ww-eyebrow mb-4 justify-center">Whirlwind Unlimited</p>
      <h1 className="ww-display text-4xl font-medium text-[#f7ecd6] md:text-5xl">You&apos;re all set</h1>
      <p className="mx-auto mt-4 max-w-md font-serif text-[17px] leading-relaxed text-[#d9cbb5]">
        Your membership is active — every mystery, on the web and in the app, is unlocked.
      </p>
      <Link href="/browse" className="ww-btn ww-btn-gold mt-8 !min-h-[54px] !px-9 text-[15px]">
        Start reading
      </Link>
    </div>
  )
}
