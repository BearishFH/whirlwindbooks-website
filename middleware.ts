import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const SUPABASE = "https://zpmqhpuhjqbomrpuuoye.supabase.co"
const SUPABASE_WS = "wss://zpmqhpuhjqbomrpuuoye.supabase.co"
const REVENUECAT = "https://*.revenuecat.com https://*.rev.cat"
const PADDLE = "https://*.paddle.com https://*.paddlecdn.com"

// Per-request nonce lets us drop 'unsafe-inline' from script-src: only Next's
// own scripts (which get this nonce) and scripts they load ('strict-dynamic')
// run. 'unsafe-eval' is kept because the Paddle/RevenueCat checkout SDK needs
// it. Styles keep 'unsafe-inline' (framework-injected, low risk).
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' ${PADDLE} https:`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${SUPABASE} ${PADDLE}`,
    `media-src 'self' blob: ${SUPABASE}`,
    `connect-src 'self' ${SUPABASE} ${SUPABASE_WS} ${REVENUECAT} ${PADDLE}`,
    `frame-src 'self' ${REVENUECAT} ${PADDLE}`,
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
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
