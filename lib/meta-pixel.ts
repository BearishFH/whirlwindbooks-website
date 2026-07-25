// Client-side Meta event helper. Fires the browser Pixel AND echoes the same
// event to our server Conversions API route with a SHARED event_id, so Meta
// deduplicates the browser + server copy. No-ops safely until the Pixel is
// configured (NEXT_PUBLIC_META_PIXEL_ID set → window.fbq present).

type Params = Record<string, unknown>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function trackMeta(event: string, params: Params = {}, custom = false) {
  if (typeof window === "undefined") return
  const eventId =
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.round(Math.random() * 1e9)}`

  // 1) Browser Pixel. The reader's StartReadingCh1 can fire before the pixel
  //    script has defined fbq, so retry briefly rather than drop the event. The
  //    event is held by consent-mode until the visitor accepts.
  let tries = 0
  const fire = () => {
    if (typeof window.fbq === "function") {
      try {
        window.fbq(custom ? "trackCustom" : "track", event, params, { eventID: eventId })
      } catch {
        /* ignore */
      }
    } else if (tries++ < 20) {
      setTimeout(fire, 150)
    }
  }
  fire()

  // Respect cookie consent: the browser Pixel is held by consent-mode until the
  // visitor accepts, and we must not send the server-side copy either without it.
  let consent: string | null = null
  try {
    consent = localStorage.getItem("ww-consent")
  } catch {
    /* ignore */
  }
  if (consent !== "granted") return

  // 2) Server Conversions API echo (dedup via the shared eventId). keepalive so
  //    it still sends if the click navigates away immediately.
  try {
    fetch("/api/meta-event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, params, eventId, custom, url: window.location.href }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* ignore */
  }
}
