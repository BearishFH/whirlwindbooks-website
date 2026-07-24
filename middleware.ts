import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { FREE_BOOK_COOKIE } from "@/lib/free-book"

const SUPABASE = "https://zpmqhpuhjqbomrpuuoye.supabase.co"
const SUPABASE_WS = "wss://zpmqhpuhjqbomrpuuoye.supabase.co"
const REVENUECAT = "https://*.revenuecat.com https://*.rev.cat"
// RevenueCat Web Billing settles through Stripe (Managed Payments), so the
// hosted checkout embeds Stripe.js and its 3-D Secure / fraud endpoints.
const STRIPE = "https://*.stripe.com https://*.stripe.network"

// Per-request nonce lets us drop 'unsafe-inline' from script-src: only Next's
// own scripts (which get this nonce) and scripts they load ('strict-dynamic')
// run. 'unsafe-eval' is kept because the Stripe/RevenueCat checkout SDK needs
// it. Styles keep 'unsafe-inline' (framework-injected, low risk).
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' ${STRIPE} https:`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${SUPABASE} ${STRIPE}`,
    `media-src 'self' blob: ${SUPABASE}`,
    `connect-src 'self' ${SUPABASE} ${SUPABASE_WS} ${REVENUECAT} ${STRIPE}`,
    `frame-src 'self' ${REVENUECAT} ${STRIPE}`,
    "worker-src 'self' blob:",
    "font-src 'self' data:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ")
}

export async function middleware(request: NextRequest) {
  // 16-byte random nonce (hex). crypto is available in the Edge runtime.
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  const nonce = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  const csp = buildCsp(nonce)

  // Next.js reads the nonce from the CSP on the REQUEST headers and stamps it
  // onto the scripts it renders — so forward the modified request headers.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("content-security-policy", csp)

  const response = await updateSession(request, requestHeaders)
  response.headers.set("content-security-policy", csp)

  // One-free-story funnel: the FIRST book a visitor actually opens in the reader
  // is claimed here. The read page walls any *other* book for non-subscribers,
  // so free readers commit to one story + its cliffhanger instead of grazing
  // every Chapter 1. Set once, never overwritten; subscribers are never walled.
  const readMatch = request.nextUrl.pathname.match(/^\/read\/([^/]+)/)
  if (readMatch && !request.cookies.get(FREE_BOOK_COOKIE)) {
    response.cookies.set(FREE_BOOK_COOKIE, decodeURIComponent(readMatch[1]), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    })
  }
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
