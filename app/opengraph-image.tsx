import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Whirlwind — Original Mystery & Thriller Novels"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Branded share card used for Open Graph + Twitter across the site.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 35%, #1a1512 0%, #0a0909 60%, #060606 100%)",
          color: "#f5ead4",
          fontFamily: "Georgia, serif",
          padding: "0 90px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#d2a35f",
            marginBottom: 26,
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          Whirlwind
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.05, color: "#f7ecd6", fontWeight: 500 }}>
          Original mysteries,
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.05, color: "#f0d59b", fontWeight: 500 }}>
          only here.
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "#c9bcaa",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Hundreds of exclusive whodunits to read or listen · Chapter one free
        </div>
        <div
          style={{
            marginTop: 40,
            width: 140,
            height: 3,
            background: "linear-gradient(90deg, transparent, #d2a35f, transparent)",
          }}
        />
      </div>
    ),
    { ...size },
  )
}
