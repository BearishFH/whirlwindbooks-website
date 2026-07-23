import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { hasActiveSubscription } from "@/lib/entitlement"
import { AppNav } from "@/components/app/app-nav"
import { SubscribePlans } from "@/components/app/subscribe-plans"

export const metadata = { title: "Subscribe — Whirlwind" }
export const dynamic = "force-dynamic"

export default async function SubscribePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // A purchase must attach to a REAL account (email/Apple/Google), not an
  // anonymous guest — otherwise it can't follow the reader to the iOS app or
  // survive a new device. Send guests to sign in first, then straight back here.
  if (!user || user.is_anonymous) {
    redirect("/login?redirect=/subscribe")
  }

  const subscribed = await hasActiveSubscription(user.id, supabase)

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user.email} />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-28 md:px-8">
        {subscribed ? (
          <div className="text-center">
            <h1 className="ww-display mb-4 text-3xl font-medium text-[#f5ead4] md:text-4xl">
              You&apos;re all set
            </h1>
            <p className="mx-auto mb-8 max-w-md font-serif text-[16px] leading-relaxed text-[#d9cbb5]">
              Your subscription is active — every mystery, on the web and in the app, is unlocked.
            </p>
            <Link href="/browse" className="ww-btn ww-btn-gold !min-h-[52px] !px-8">
              Start reading
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="ww-eyebrow mb-3">Whirlwind Unlimited</p>
              <h1 className="ww-display text-3xl font-medium text-[#f5ead4] md:text-4xl">
                Every mystery, unlocked
              </h1>
              <p className="mx-auto mt-4 max-w-md font-serif text-[16px] leading-relaxed text-[#d9cbb5]">
                Read or listen to the full library — new snackable mysteries every week. One
                subscription covers the web and the iOS app.
              </p>
            </div>

            <SubscribePlans appUserId={user.id} />

            <p className="mx-auto mt-8 max-w-md text-center font-sans text-[12px] leading-relaxed text-[#6f665a]">
              By subscribing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#a99c8b]">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#a99c8b]">
                Privacy Policy
              </Link>
              . Subscriptions renew automatically until cancelled.
            </p>
          </>
        )}
      </main>
    </div>
  )
}
