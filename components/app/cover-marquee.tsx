"use client"

// A slow, cinematic wall of book covers — the Netflix "poster wall" moment.
// Rows drift in alternating directions and loop seamlessly (each row is
// duplicated and translated -50%). Purely decorative: no pointer events, and
// it sits behind a heavy gradient so foreground text stays crisp.
export function CoverMarquee({ rows }: { rows: string[][] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <div className="flex h-full flex-col justify-center gap-3 md:gap-4">
        {rows.map((row, i) => (
          <div key={i} className="flex overflow-hidden">
            <div
              className="flex shrink-0 gap-3 md:gap-4"
              style={{
                animation: `${i % 2 ? "ww-marq-rtl" : "ww-marq-ltr"} ${58 + i * 11}s linear infinite`,
              }}
            >
              {[...row, ...row].map((src, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={j}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-[150px] w-[100px] flex-none rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,.55)] ring-1 ring-white/10 md:h-[210px] md:w-[140px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ww-marq-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ww-marq-rtl { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  )
}
