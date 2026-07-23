/** @type {import('next').NextConfig} */

const SUPABASE = "https://zpmqhpuhjqbomrpuuoye.supabase.co"
const SUPABASE_WS = "wss://zpmqhpuhjqbomrpuuoye.supabase.co"

// RevenueCat Web SDK + Paddle-hosted checkout. The SDK talks to
// *.revenuecat.com / *.rev.cat; the checkout renders in an iframe served from
// pay.rev.cat which embeds Paddle (*.paddle.com / *.paddlecdn.com).
const REVENUECAT = "https://*.revenuecat.com https://*.rev.cat"
const PADDLE = "https://*.paddle.com https://*.paddlecdn.com"

// Helmet-equivalent security headers. CSP is scoped so the app still works:
// self for code/markup, Supabase for data/images/audio, RevenueCat+Paddle for
// checkout, and clickjacking is blocked outright with frame-ancestors 'none'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${PADDLE}`,
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
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
]

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
