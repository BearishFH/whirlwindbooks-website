import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Refreshes the Supabase auth session on every request and keeps the auth
 * cookies in sync between the browser and the server. Also guards the app
 * routes: unauthenticated users hitting an app route are sent to /login.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Do not run code between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // App routes that need SOME authenticated session for Supabase RLS to return
  // the catalogue. Reading the catalogue only requires the `authenticated` role,
  // which an anonymous session satisfies.
  const appPrefixes = ["/browse", "/book", "/read", "/account", "/library", "/start"]
  const isAppRoute = appPrefixes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  )

  if (!user && isAppRoute) {
    // No login wall — mirror the iOS app: give the visitor a silent anonymous
    // account so they can browse and read the free first chapter immediately.
    // Redirect to the same URL so the new session cookies apply before render.
    const { error } = await supabase.auth.signInAnonymously()
    const url = request.nextUrl.clone()
    if (error) {
      // Only if anon sign-in genuinely fails do we fall back to the sign-in page.
      url.pathname = "/login"
      url.searchParams.set("redirect", pathname)
    }
    const redirect = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((c) => redirect.cookies.set(c))
    return redirect
  }

  return supabaseResponse
}
