import Script from "next/script"
import { headers } from "next/headers"

/**
 * Meta (Facebook) Pixel base loader. Renders only when NEXT_PUBLIC_META_PIXEL_ID
 * is set, so the site ships tracking-free until you add your Pixel/dataset ID.
 * The inline init script gets the per-request CSP nonce (same mechanism as the
 * JSON-LD), and it loads fbevents.js — allowed by `strict-dynamic`. Custom funnel
 * events are fired from the client via `trackMeta()` (lib/meta-pixel.ts), which
 * also mirrors them to the server Conversions API for match quality.
 */
export async function MetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!id) return null
  const nonce = (await headers()).get("x-nonce") ?? undefined

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive" nonce={nonce}>
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent','revoke');fbq('init','${id}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
