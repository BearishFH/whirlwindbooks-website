"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Provider } from "@supabase/supabase-js"

export function LoginButtons({ redirectTo }: { redirectTo?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function signIn(provider: Provider) {
    setLoading(provider)
    setMessage(null)
    const supabase = createClient()

    const callback = new URL("/auth/callback", window.location.origin)
    if (redirectTo && redirectTo.startsWith("/")) {
      callback.searchParams.set("redirect", redirectTo)
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callback.toString(),
      },
    })

    if (error) {
      setLoading(null)
      setMessage(
        `${provider === "apple" ? "Apple" : "Google"} sign-in isn't available right now. ${error.message}`,
      )
    }
    // On success the browser is redirected away by Supabase.
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => signIn("apple")}
        disabled={loading !== null}
        className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-[#f5ead4] px-6 font-sans text-[15px] font-bold text-[#141210] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.05 12.53c-.02-2.03 1.66-3 1.73-3.05-0.94-1.38-2.41-1.57-2.93-1.59-1.25-.13-2.44.73-3.07.73-.63 0-1.61-.71-2.65-.69-1.36.02-2.62.79-3.32 2.01-1.42 2.46-.36 6.1 1.02 8.1.67.97 1.47 2.06 2.52 2.02 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.99 2.44-1.97.77-1.13 1.09-2.22 1.11-2.28-.02-.01-2.13-.82-2.15-3.24zM15.01 6.5c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.56-.85 2.48.9.07 1.83-.46 2.39-1.14z" />
        </svg>
        {loading === "apple" ? "Opening Apple…" : "Sign in with Apple"}
      </button>

      <button
        type="button"
        onClick={() => signIn("google")}
        disabled={loading !== null}
        className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full border border-[rgba(245,234,212,0.18)] bg-[rgba(255,255,255,0.04)] px-6 font-sans text-[15px] font-bold text-[#f5ead4] transition-transform hover:-translate-y-0.5 hover:border-[rgba(245,234,212,0.34)] disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.76z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.28a12 12 0 0 0 0 10.76l3.99-3.11z" />
          <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.96 11.96 0 0 0 12 0 12 12 0 0 0 1.28 6.62l3.99 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
        </svg>
        {loading === "google" ? "Opening Google…" : "Continue with Google"}
      </button>

      {message ? (
        <p className="mt-2 font-sans text-xs leading-relaxed text-[#c98d6d]">{message}</p>
      ) : null}
    </div>
  )
}
