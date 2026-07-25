import { NextResponse, type NextRequest } from "next/server"

// Meta Conversions API (server-side) endpoint. The browser calls this via
// trackMeta() with the SAME event_id it sent to the Pixel, so Meta dedups the
// two copies. Adds server-side signal (IP, UA, fbp/fbc cookies) that the browser
// Pixel can't, improving match quality — Meta recommends running both.
//
// Inert until META_CAPI_ACCESS_TOKEN (secret) + a pixel id are configured. This
// route never returns catalogue/user data — it only forwards tracking events.

export const runtime = "nodejs"

function readCookie(name: string, jar: string): string | undefined {
  const hit = jar.match(new RegExp(`(?:^|; )${name}=([^;]+)`))
  return hit ? decodeURIComponent(hit[1]) : undefined
}

export async function POST(req: NextRequest) {
  const PIXEL = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID
  const TOKEN = process.env.META_CAPI_ACCESS_TOKEN
  // Nothing configured → succeed silently so the client never errors.
  if (!PIXEL || !TOKEN) return NextResponse.json({ ok: true, skipped: true })

  let payload: { event?: string; params?: Record<string, unknown>; eventId?: string; custom?: boolean; url?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  if (!payload?.event) return NextResponse.json({ ok: false }, { status: 400 })

  const jar = req.headers.get("cookie") ?? ""
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || undefined
  const ua = req.headers.get("user-agent") ?? undefined

  const body = {
    data: [
      {
        event_name: payload.event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        action_source: "website",
        event_source_url: payload.url,
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          fbp: readCookie("_fbp", jar),
          fbc: readCookie("_fbc", jar),
        },
        custom_data: payload.params ?? {},
      },
    ],
  }

  try {
    await fetch(`https://graph.facebook.com/v21.0/${PIXEL}/events?access_token=${encodeURIComponent(TOKEN)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    })
  } catch {
    // Don't let a Meta hiccup surface to the visitor.
  }
  return NextResponse.json({ ok: true })
}
