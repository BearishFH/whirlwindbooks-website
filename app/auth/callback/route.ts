import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * OAuth (PKCE) redirect target. Supabase sends the browser here with a `code`
 * after Apple/Google sign-in; we exchange it for a session (stored in cookies)
 * and forward the user into the app.
 *
 * The exact URL — `<site>/auth/callback` — must be added to the Supabase Auth
 * "Redirect URLs" allow-list for each environment (localhost + production).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectParam = searchParams.get("redirect")
  const next = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/browse"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Respect the platform forwarded host in production (Netlify).
      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocal = process.env.NODE_ENV === "development"
      if (isLocal) return NextResponse.redirect(`${origin}${next}`)
      if (forwardedHost) return NextResponse.redirect(`https://${forwardedHost}${next}`)
      return NextResponse.redirect(`${origin}${next}`)
    }
    console.error("[auth/callback] exchange error", error.message)
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
