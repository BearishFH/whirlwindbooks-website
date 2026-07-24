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
        {/* Legibility scrims: light overall wash so covers stay vivid, a vignette
            that darkens behind the headline and at the edges, plus a fade into
            the page below. */}
        <div className="absolute inset-0 bg-[#060508]/40" />
        {/* Tall central spotlight: darker behind the offer column, covers stay
            vivid on the flanks, dark vignette at the edges. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_92%_at_50%_46%,rgba(6,5,8,.82)_0%,rgba(6,5,8,.78)_28%,rgba(6,5,8,.15)_66%,rgba(6,5,8,.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#060508]" />

        <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pb-24 pt-28 text-center md:pt-32">
          {subscribed ? (
            <SubscribedPanel />
          ) : (
            <>
              <p className="ww-eyebrow mb-4">Whirlwind Unlimited</p>
              <h1 className="ww-display text-[42px] font-medium leading-[1.05] text-[#f7ecd6] [text-shadow:0_2px_40px_rgba(0,0,0,.95)] md:text-6xl">
                Every mystery,
                <br />
                <span className="text-[#f0d59b]">unlocked.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl font-serif text-[17px] leading-relaxed text-[#d9cbb5] [text-shadow:0_1px_24px_rgba(0,0,0,.95)] md:text-[19px]">
                The full library to read or listen — lots of new mysteries every week, in 12
                languages. One membership covers the web and the iOS app. Cancel anytime.
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
                icon={
                  <>
                    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5v-12Z" />
                    <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5v-12Z" />
                  </>
                }
                title="Read or listen"
                body="Every story in polished prose and rich narration. Switch between them without losing your place."
              />
              <Feature
                icon={
                  <>
                    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                    <rect x="3" y="13" width="4" height="7" rx="1.5" />
                    <rect x="17" y="13" width="4" height="7" rx="1.5" />
                  </>
                }
                title="New mysteries weekly"
                body="Fresh whodunits, thrillers and noir land every week. Your next obsession is always waiting."
              />
              <Feature
                icon={
                  <>
                    <rect x="3" y="5" width="13" height="10" rx="1.5" />
                    <rect x="16" y="9" width="5" height="10" rx="1.5" />
                    <path d="M7 19h6" />
                  </>
                }
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
              Secure checkout handled by Stripe — taxes handled at checkout, cancel whenever you like.
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

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-left backdrop-blur-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(210,163,95,.4)] bg-[rgba(210,163,95,.1)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="#f0d59b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </div>
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
