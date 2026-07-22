import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { LoginButtons } from "./login-buttons"

export const metadata = {
  title: "Sign in — Whirlwind",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>
}) {
  const { redirect: redirectTo, error } = await searchParams

  // Already signed in with a REAL account? Straight into the app. Anonymous
  // (guest) sessions must still be able to reach this page so a returning /
  // subscribed reader can sign into their actual account and get their content.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user && !user.is_anonymous) {
    redirect(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/browse")
  }

  return (
    <div className="ww-noir-bg relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div aria-hidden className="ww-grain" />

      <Link
        href="/"
        className="absolute left-5 top-5 flex items-center gap-2 font-sans text-sm text-[#a99c8b] transition-colors hover:text-[#f0d59b] md:left-8 md:top-8"
      >
        <span aria-hidden>←</span> Back
      </Link>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/whirlwind-logo.png"
            alt="Whirlwind"
            width={64}
            height={64}
            className="mb-6 h-16 w-16"
            priority
          />
          <p className="ww-eyebrow mb-4">The Reading Room</p>
          <h1 className="ww-display text-4xl font-medium text-[#f5ead4] md:text-5xl">
            Step inside
          </h1>
          <p className="mt-4 max-w-sm font-sans text-[15px] leading-relaxed text-[#a99c8b]">
            Sign in to read and listen to every Whirlwind mystery in your browser.
            Your library and progress follow you everywhere.
          </p>
        </div>

        {error ? (
          <p className="mb-5 rounded-lg border border-[#8d3e2b]/50 bg-[#8d3e2b]/15 px-4 py-3 font-sans text-sm text-[#f0d59b]">
            Something went wrong signing you in. Please try again.
          </p>
        ) : null}

        <LoginButtons redirectTo={redirectTo} />

        <p className="mt-8 font-sans text-xs leading-relaxed text-[#6f665a]">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-[#a99c8b]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-[#a99c8b]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
