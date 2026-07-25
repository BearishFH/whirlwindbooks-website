"use client"

import Link from "next/link"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import type { Chapter } from "@/lib/reader"
import { trackMeta } from "@/lib/meta-pixel"

/* ------------------------------------------------------------------ themes */
type ThemeId = "noir" | "dusk" | "slate" | "sepia" | "paper"
type Theme = {
  name: string
  bg: string
  text: string
  muted: string
  heading: string
  accent: string
  ui: string
}
const THEMES: Record<ThemeId, Theme> = {
  noir: { name: "Noir", bg: "#0b0a0a", text: "#e4dccb", muted: "#8a7d6c", heading: "#f0d59b", accent: "#d2a35f", ui: "rgba(120,110,95,.18)" },
  dusk: { name: "Dusk", bg: "#151018", text: "#e9ddd0", muted: "#9a8b86", heading: "#e6bd8e", accent: "#c98b6b", ui: "rgba(160,130,120,.2)" },
  slate: { name: "Slate", bg: "#0f151c", text: "#dce3ea", muted: "#8494a3", heading: "#a7c6e2", accent: "#7fa8cc", ui: "rgba(120,150,180,.18)" },
  sepia: { name: "Sepia", bg: "#efe6d6", text: "#322a20", muted: "#7a6f5d", heading: "#6a3f22", accent: "#8a5a2b", ui: "rgba(90,63,36,.2)" },
  paper: { name: "Paper", bg: "#faf9f6", text: "#20201e", muted: "#6b6b66", heading: "#8c271e", accent: "#8c271e", ui: "rgba(0,0,0,.1)" },
}

/* ------------------------------------------------------------------- fonts */
const FONTS = [
  { id: "spectral", name: "Spectral", css: "var(--read-spectral)" },
  { id: "crimson", name: "Crimson", css: "var(--read-crimson)" },
  { id: "cormorant", name: "Cormorant", css: "var(--read-cormorant)" },
  { id: "inria", name: "Inria", css: "var(--read-inria)" },
  { id: "sans", name: "Sans", css: "var(--read-sans)" },
  { id: "dyslexic", name: "Dyslexic", css: "var(--read-dyslexic)" },
] as const
type FontId = (typeof FONTS)[number]["id"]

const SPACINGS = [
  { id: "compact", name: "Compact", value: 1.5 },
  { id: "normal", name: "Normal", value: 1.75 },
  { id: "relaxed", name: "Relaxed", value: 2.0 },
] as const
type SpacingId = (typeof SPACINGS)[number]["id"]

const WIDTHS = [
  { id: "narrow", name: "Narrow", px: 560 },
  { id: "normal", name: "Normal", px: 680 },
  { id: "wide", name: "Wide", px: 820 },
] as const
type WidthId = (typeof WIDTHS)[number]["id"]

type Mode = "page" | "scroll"

type Prefs = {
  theme: ThemeId
  font: FontId
  fontSize: number
  spacing: SpacingId
  width: WidthId
  mode: Mode
}
const DEFAULT_PREFS: Prefs = {
  theme: "noir",
  font: "spectral",
  fontSize: 20,
  spacing: "normal",
  width: "normal",
  mode: "page",
}

/* ================================================================= reader */
export function Reader({
  bookId,
  title,
  author,
  cover,
  chapters,
  audioSrc,
  startInListen,
  hadContentUrl,
  locked = false,
}: {
  bookId: string
  title: string
  author: string | null
  cover?: string | null
  chapters: Chapter[]
  audioSrc: string | null
  startInListen?: boolean
  hadContentUrl: boolean
  locked?: boolean
}) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)
  const [chapterIdx, setChapterIdx] = useState(0)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const pendingLastPage = useRef(false)

  const [toc, setToc] = useState(false)
  const [settings, setSettings] = useState(false)
  const [showAudio, setShowAudio] = useState(!!startInListen && !!audioSrc)

  const storageKey = `ww-reader-${bookId}`
  const prefsKey = "ww-reader-prefs"

  // restore
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(prefsKey) || "{}")
      setPrefs((cur) => ({ ...cur, ...p }))
      const prog = JSON.parse(localStorage.getItem(storageKey) || "{}")
      if (typeof prog.chapter === "number" && prog.chapter < chapters.length) setChapterIdx(prog.chapter)
      if (typeof prog.page === "number") setPage(Math.max(0, prog.page))
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(prefsKey, JSON.stringify(prefs))
    } catch {
      /* ignore */
    }
  }, [prefs])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ chapter: chapterIdx, page }))
    } catch {
      /* ignore */
    }
  }, [chapterIdx, page, storageKey])

  // Meta funnel signal: opening the reader = the visitor started reading Chapter 1
  // (this is the mid-funnel event the ad campaign optimises for). Once per book.
  useEffect(() => {
    trackMeta("ViewContent", { content_ids: [bookId], content_type: "product", content_name: title })
    trackMeta("StartReadingCh1", { content_ids: [bookId], content_name: title }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId])

  const t = THEMES[prefs.theme]
  const font = FONTS.find((f) => f.id === prefs.font) ?? FONTS[0]
  const spacing = SPACINGS.find((s) => s.id === prefs.spacing) ?? SPACINGS[1]
  const width = WIDTHS.find((w) => w.id === prefs.width) ?? WIDTHS[1]
  const chapter = chapters[chapterIdx]
  const empty = chapters.length === 0
  const paged = prefs.mode === "page"

  const set = useCallback(<K extends keyof Prefs>(k: K, v: Prefs[K]) => setPrefs((p) => ({ ...p, [k]: v })), [])

  const goChapter = useCallback(
    (i: number, toLastPage = false) => {
      const next = Math.max(0, Math.min(chapters.length - 1, i))
      pendingLastPage.current = toLastPage
      setChapterIdx(next)
      setPage(0)
      setToc(false)
      if (!paged) window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [chapters.length, paged],
  )

  // when a chapter's pages are measured, honour a pending "jump to last page"
  const onMeasure = useCallback((count: number) => {
    setPageCount(count)
    if (pendingLastPage.current) {
      pendingLastPage.current = false
      setPage(Math.max(0, count - 1))
    } else {
      setPage((p) => Math.min(p, Math.max(0, count - 1)))
    }
  }, [])

  const turnNext = useCallback(() => {
    if (paged && page < pageCount - 1) setPage((p) => p + 1)
    else if (chapterIdx < chapters.length - 1) goChapter(chapterIdx + 1)
  }, [paged, page, pageCount, chapterIdx, chapters.length, goChapter])

  const turnPrev = useCallback(() => {
    if (paged && page > 0) setPage((p) => p - 1)
    else if (chapterIdx > 0) goChapter(chapterIdx - 1, paged)
  }, [paged, page, chapterIdx, goChapter])

  // keyboard nav (paged)
  useEffect(() => {
    if (!paged) return
    function onKey(e: KeyboardEvent) {
      if (settings || toc) return
      if (e.key === "ArrowRight") { e.preventDefault(); turnNext() }
      else if (e.key === "ArrowLeft") { e.preventDefault(); turnPrev() }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [paged, settings, toc, turnNext, turnPrev])

  const overall = chapters.length
    ? Math.min(100, ((chapterIdx + (pageCount > 1 ? page / pageCount : 0)) / chapters.length) * 100)
    : 0

  const iconBtn = "flex h-9 w-9 items-center justify-center rounded-lg transition-colors"

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: t.bg, color: t.text }}>
      {/* ---------- top bar ---------- */}
      <header className="relative z-30 flex-none" style={{ borderBottom: `1px solid ${t.ui}` }}>
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2 px-3 py-2.5 md:px-5">
          <Link href={`/book/${bookId}`} className={iconBtn} style={{ color: t.muted }} aria-label="Back to book" title="Back">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-sans text-[13px] font-medium" style={{ color: t.text }}>{title}</p>
            {author ? <p className="truncate font-sans text-[11px]" style={{ color: t.muted }}>{author}</p> : null}
          </div>
          <button type="button" onClick={() => setSettings(true)} className={iconBtn} style={{ color: t.muted }} title="Display settings" aria-label="Display settings">
            <span className="font-serif text-[17px] leading-none">A<span className="text-[12px]">a</span></span>
          </button>
          <button type="button" onClick={() => setToc(true)} className={iconBtn} style={{ color: t.muted }} title="Chapters" aria-label="Chapters">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
          </button>
          {audioSrc ? (
            <button type="button" onClick={() => setShowAudio((v) => !v)} className={iconBtn} style={{ color: showAudio ? t.heading : t.muted }} title="Listen" aria-label="Listen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" /></svg>
            </button>
          ) : null}
        </div>
        <div className="h-[3px] w-full" style={{ background: t.ui }}>
          <div className="h-full transition-all duration-500" style={{ width: `${overall}%`, background: t.accent }} />
        </div>
      </header>

      {/* ---------- body ---------- */}
      {empty ? (
        <EmptyState t={t} audioSrc={audioSrc} hadContentUrl={hadContentUrl} bookId={bookId} onListen={() => setShowAudio(true)} />
      ) : paged ? (
        <PagedBody
          key={`p-${chapterIdx}-${font.id}-${prefs.fontSize}-${prefs.spacing}-${prefs.width}`}
          t={t} chapter={chapter} font={font.css} fontSize={prefs.fontSize} lineHeight={spacing.value}
          maxWidth={width.px} page={page} onMeasure={onMeasure} onNext={turnNext} onPrev={turnPrev}
          locked={locked} isLast={chapterIdx >= chapters.length - 1}
        />
      ) : (
        <ScrollBody
          t={t} chapter={chapter} font={font.css} fontSize={prefs.fontSize} lineHeight={spacing.value}
          maxWidth={width.px} chapterIdx={chapterIdx} total={chapters.length}
          onNext={turnNext} onPrev={turnPrev} locked={locked} isLast={chapterIdx >= chapters.length - 1}
        />
      )}

      {/* ---------- footer page indicator (paged) ---------- */}
      {paged && !empty ? (
        <footer className="pointer-events-none flex-none pb-3 pt-1 text-center">
          <span className="font-sans text-[11px] tabular-nums" style={{ color: t.muted }}>
            {chapter?.heading ? `${chapter.heading} · ` : ""}{page + 1} / {pageCount}
          </span>
        </footer>
      ) : null}

      {/* ---------- settings sheet ---------- */}
      {settings ? (
        <SettingsSheet t={t} prefs={prefs} set={set} onClose={() => setSettings(false)} />
      ) : null}

      {/* ---------- TOC ---------- */}
      {toc ? (
        <div className="fixed inset-0 z-50" onClick={() => setToc(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 flex h-full w-[320px] max-w-[85vw] flex-col shadow-2xl" style={{ background: t.bg }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <p className="ww-display text-lg" style={{ color: t.heading }}>Chapters</p>
              <button type="button" onClick={() => setToc(false)} className={iconBtn} style={{ color: t.muted }} aria-label="Close">✕</button>
            </div>
            <ul className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
              {chapters.map((c, i) => (
                <li key={i}>
                  <button type="button" onClick={() => goChapter(i)} className="w-full rounded-lg px-3 py-2.5 text-left font-sans text-sm transition-colors"
                    style={{ color: i === chapterIdx ? t.heading : t.text, background: i === chapterIdx ? t.ui : "transparent" }}>
                    {c.heading}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* ---------- audio ---------- */}
      {audioSrc && showAudio ? (
        <AudioPlayer src={audioSrc} title={title} author={author} cover={cover ?? null} t={t} onClose={() => setShowAudio(false)} />
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------- chapter render */
function ChapterContent({
  chapter, font, fontSize, lineHeight, t, locked, isLast,
}: {
  chapter: Chapter; font: string; fontSize: number; lineHeight: number; t: Theme; locked: boolean; isLast: boolean
}) {
  return (
    <>
      {chapter.heading ? (
        <h2 className="ww-display mb-7 text-2xl font-medium md:text-[28px]" style={{ color: t.heading, breakInside: "avoid" }}>
          {chapter.heading}
        </h2>
      ) : null}
      {chapter.paragraphs.map((p, i) => (
        <p key={i} className="mb-[1.1em]" style={{ color: t.text, fontSize: `${fontSize}px`, lineHeight, fontFamily: font, hyphens: "auto" }}>
          {p}
        </p>
      ))}
      {locked && isLast ? (
        <div className="mt-8 rounded-2xl border p-7 text-center" style={{ borderColor: `${t.accent}55`, background: `${t.accent}12`, breakInside: "avoid" }}>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.accent }}>Free preview</p>
          <p className="ww-display mt-2.5 text-2xl" style={{ color: t.text }}>Don&apos;t stop now.</p>
          <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed" style={{ color: t.muted }}>
            You&apos;ve read the free first chapter. Subscribe to unlock the whole book and the English audiobook — it works in the app and on the web.
          </p>
          <a href="/subscribe" className="mt-6 inline-block rounded-full px-7 py-3 font-sans text-sm font-semibold" style={{ background: t.accent, color: t.bg }}>
            Subscribe to keep reading
          </a>
        </div>
      ) : null}
    </>
  )
}

/* --------------------------------------------------------------- paged body */
function PagedBody({
  t, chapter, font, fontSize, lineHeight, maxWidth, page, onMeasure, onNext, onPrev, locked, isLast,
}: {
  t: Theme; chapter: Chapter; font: string; fontSize: number; lineHeight: number; maxWidth: number
  page: number; onMeasure: (n: number) => void; onNext: () => void; onPrev: () => void; locked: boolean; isLast: boolean
}) {
  const viewport = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [colW, setColW] = useState(0)
  const [gap, setGap] = useState(0)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const measure = useCallback(() => {
    const vp = viewport.current, c = content.current
    if (!vp || !c) return
    const w = c.clientWidth
    const g = Math.round(Math.min(72, Math.max(28, w * 0.09)))
    setColW(w)
    setGap(g)
    // let the browser lay out columns, then count
    requestAnimationFrame(() => {
      if (!content.current) return
      const total = content.current.scrollWidth
      const count = Math.max(1, Math.round((total + g) / (w + g)))
      onMeasure(count)
    })
  }, [onMeasure])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (viewport.current) ro.observe(viewport.current)
    // fonts can swap in after first paint → remeasure
    const tm = setTimeout(measure, 250)
    return () => { ro.disconnect(); clearTimeout(tm) }
  }, [measure, font, fontSize, lineHeight, maxWidth, chapter])

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* page-turn zones with clearly-visible arrows (large tap targets) */}
      <button type="button" aria-label="Previous page" onClick={onPrev} className="group absolute inset-y-0 left-0 z-10 flex w-[18%] items-center justify-start pl-1.5 md:pl-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full opacity-75 shadow-md transition-all group-hover:opacity-100 group-active:scale-90"
          style={{ background: `${t.bg}e6`, border: `1px solid ${t.ui}`, color: t.accent }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </span>
      </button>
      <button type="button" aria-label="Next page" onClick={onNext} className="group absolute inset-y-0 right-0 z-10 flex w-[18%] items-center justify-end pr-1.5 md:pr-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full opacity-75 shadow-md transition-all group-hover:opacity-100 group-active:scale-90"
          style={{ background: `${t.bg}e6`, border: `1px solid ${t.ui}`, color: t.accent }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </span>
      </button>

      <div
        ref={viewport}
        className="mx-auto h-full px-6 md:px-8"
        style={{ maxWidth: maxWidth + 96 }}
        onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
        onTouchEnd={(e) => {
          if (!touch.current) return
          const dx = e.changedTouches[0].clientX - touch.current.x
          const dy = e.changedTouches[0].clientY - touch.current.y
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) onNext(); else onPrev() }
          touch.current = null
        }}
      >
        <div className="h-full overflow-hidden">
          <div
            ref={content}
            style={{
              height: "100%",
              columnWidth: colW ? `${colW}px` : undefined,
              columnGap: `${gap}px`,
              columnFill: "auto",
              transform: colW ? `translateX(-${page * (colW + gap)}px)` : undefined,
              transition: "transform .38s cubic-bezier(.2,.7,.2,1)",
              willChange: "transform",
              paddingTop: 34,
              paddingBottom: 8,
            }}
          >
            <ChapterContent chapter={chapter} font={font} fontSize={fontSize} lineHeight={lineHeight} t={t} locked={locked} isLast={isLast} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- scroll body */
function ScrollBody({
  t, chapter, font, fontSize, lineHeight, maxWidth, chapterIdx, total, onNext, onPrev, locked, isLast,
}: {
  t: Theme; chapter: Chapter; font: string; fontSize: number; lineHeight: number; maxWidth: number
  chapterIdx: number; total: number; onNext: () => void; onPrev: () => void; locked: boolean; isLast: boolean
}) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto px-6 pb-32 pt-9 md:px-8" style={{ maxWidth }}>
        <ChapterContent chapter={chapter} font={font} fontSize={fontSize} lineHeight={lineHeight} t={t} locked={locked} isLast={isLast} />
        <div className="mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: t.ui }}>
          <button type="button" onClick={onPrev} disabled={chapterIdx === 0} className="font-sans text-sm transition-opacity disabled:opacity-30" style={{ color: t.muted }}>← Previous</button>
          <span className="font-sans text-xs tabular-nums" style={{ color: t.muted }}>{chapterIdx + 1} / {total}</span>
          <button type="button" onClick={onNext} disabled={isLast} className="font-sans text-sm transition-opacity disabled:opacity-30" style={{ color: t.muted }}>Next →</button>
        </div>
      </div>
    </main>
  )
}

/* --------------------------------------------------------------- empty state */
function EmptyState({ t, audioSrc, hadContentUrl, bookId, onListen }: { t: Theme; audioSrc: string | null; hadContentUrl: boolean; bookId: string; onListen: () => void }) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 text-center">
      <div>
        <p className="ww-display text-2xl" style={{ color: t.text }}>{audioSrc ? "This title is audio-only" : "Nothing to read here yet"}</p>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed" style={{ color: t.muted }}>
          {audioSrc ? "There's no text body for this book, but you can listen below." : hadContentUrl ? "We couldn't load the text for this book. Please try again later." : "This book doesn't have a readable text file attached yet."}
        </p>
        {audioSrc ? (
          <button type="button" onClick={onListen} className="ww-btn ww-btn-gold mt-6 !min-h-[46px]">🎧 Listen</button>
        ) : (
          <Link href={`/book/${bookId}`} className="ww-btn ww-btn-ghost mt-6 !min-h-[46px]">Back to book</Link>
        )}
      </div>
    </main>
  )
}

/* ------------------------------------------------------------ settings sheet */
function SettingsSheet({ t, prefs, set, onClose }: { t: Theme; prefs: Prefs; set: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void; onClose: () => void }) {
  const light = prefs.theme === "sepia" || prefs.theme === "paper"
  const chipBase = "rounded-full px-3.5 py-1.5 font-sans text-[13px] transition-colors"
  const chip = (active: boolean) => ({ background: active ? t.accent : t.ui, color: active ? t.bg : t.text })
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="py-3.5" style={{ borderTop: `1px solid ${t.ui}` }}>
      <p className="mb-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: t.muted }}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-t-3xl p-5 shadow-2xl sm:rounded-3xl"
        style={{ background: t.bg, border: `1px solid ${t.ui}`, boxShadow: light ? "0 -20px 60px rgba(0,0,0,.2)" : "0 -20px 60px rgba(0,0,0,.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-center justify-between">
          <p className="ww-display text-lg" style={{ color: t.heading }}>Display</p>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ color: t.muted }} aria-label="Done">✕</button>
        </div>

        <Row label="Theme">
          {(Object.keys(THEMES) as ThemeId[]).map((id) => (
            <button key={id} type="button" onClick={() => set("theme", id)} className="flex items-center gap-2 rounded-xl px-2.5 py-1.5" style={{ border: `1.5px solid ${prefs.theme === id ? t.accent : t.ui}` }}>
              <span className="h-5 w-5 rounded-full" style={{ background: THEMES[id].bg, border: `1px solid ${THEMES[id].ui}` }} />
              <span className="font-sans text-[12px]" style={{ color: t.text }}>{THEMES[id].name}</span>
            </button>
          ))}
        </Row>

        <Row label="Typeface">
          {FONTS.map((f) => (
            <button key={f.id} type="button" onClick={() => set("font", f.id)} className={chipBase} style={{ ...chip(prefs.font === f.id), fontFamily: f.css }}>
              {f.name}
            </button>
          ))}
        </Row>

        <Row label="Text size">
          <div className="flex w-full items-center gap-4">
            <button type="button" onClick={() => set("fontSize", Math.max(15, prefs.fontSize - 1))} className="flex h-10 w-12 items-center justify-center rounded-xl font-serif text-[15px]" style={{ background: t.ui, color: t.text }}>A−</button>
            <div className="flex-1 text-center font-sans text-[13px]" style={{ color: t.muted }}>{prefs.fontSize}px</div>
            <button type="button" onClick={() => set("fontSize", Math.min(28, prefs.fontSize + 1))} className="flex h-10 w-12 items-center justify-center rounded-xl font-serif text-[22px]" style={{ background: t.ui, color: t.text }}>A+</button>
          </div>
        </Row>

        <Row label="Line spacing">
          {SPACINGS.map((s) => (
            <button key={s.id} type="button" onClick={() => set("spacing", s.id)} className={chipBase} style={chip(prefs.spacing === s.id)}>{s.name}</button>
          ))}
        </Row>

        <Row label="Margins">
          {WIDTHS.map((w) => (
            <button key={w.id} type="button" onClick={() => set("width", w.id)} className={chipBase} style={chip(prefs.width === w.id)}>{w.name}</button>
          ))}
        </Row>

        <Row label="Reading mode">
          <button type="button" onClick={() => set("mode", "page")} className={chipBase} style={chip(prefs.mode === "page")}>Page turn</button>
          <button type="button" onClick={() => set("mode", "scroll")} className={chipBase} style={chip(prefs.mode === "scroll")}>Scroll</button>
        </Row>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- audio player */
function AudioPlayer({ src, title, author, cover, t, onClose }: { src: string; title: string; author: string | null; cover: string | null; t: Theme; onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState(1)
  const rates = useMemo(() => [1, 1.25, 1.5, 1.75, 2], [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) }
  }
  function skip(delta: number) {
    const a = audioRef.current
    if (!a) return
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + delta))
  }
  function cycleRate() {
    const next = rates[(rates.indexOf(rate) + 1) % rates.length]
    setRate(next)
    if (audioRef.current) audioRef.current.playbackRate = next
  }
  function fmt(s: number) {
    if (!s || Number.isNaN(s)) return "0:00"
    const m = Math.floor(s / 60), sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }
  const pct = duration ? (current / duration) * 100 : 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-40" style={{ borderTop: `1px solid ${t.ui}`, background: `${t.bg}f5`, backdropFilter: "blur(12px)" }}>
      <audio ref={audioRef} src={src} onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onEnded={() => setPlaying(false)} preload="metadata" />
      <div className="mx-auto w-full max-w-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="h-11 w-11 flex-none rounded-md object-cover" style={{ border: `1px solid ${t.ui}` }} />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-[13px] font-medium" style={{ color: t.text }}>{title}</p>
            <p className="truncate font-sans text-[11px]" style={{ color: t.muted }}>{author || "Whirlwind"}</p>
          </div>
          <button type="button" onClick={cycleRate} className="flex-none rounded-lg px-2.5 py-1 font-sans text-[12px] font-medium tabular-nums" style={{ background: t.ui, color: t.text }}>{rate}×</button>
          <button type="button" onClick={onClose} aria-label="Close player" className="flex-none rounded-lg px-2 py-1 font-sans text-sm" style={{ color: t.muted }}>✕</button>
        </div>

        <div className="mt-2.5 flex items-center gap-3">
          <span className="w-10 flex-none text-right font-sans text-[11px] tabular-nums" style={{ color: t.muted }}>{fmt(current)}</span>
          <div className="relative flex-1">
            <div className="h-1.5 w-full rounded-full" style={{ background: t.ui }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: t.accent }} />
            </div>
            <input type="range" min={0} max={duration || 0} value={current}
              onChange={(e) => { const v = Number(e.target.value); setCurrent(v); if (audioRef.current) audioRef.current.currentTime = v }}
              className="absolute inset-0 h-1.5 w-full cursor-pointer opacity-0" aria-label="Seek" />
          </div>
          <span className="w-10 flex-none font-sans text-[11px] tabular-nums" style={{ color: t.muted }}>{fmt(duration)}</span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-7">
          <button type="button" onClick={() => skip(-15)} className="flex items-center font-sans text-[11px]" style={{ color: t.muted }} aria-label="Back 15 seconds">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 8L7 12l4 4" /><path d="M7 12h6a4 4 0 1 1 0 8h-1" /></svg>
            <span className="ml-0.5">15</span>
          </button>
          <button type="button" onClick={toggle} className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: t.accent, color: t.bg }} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg> : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
          </button>
          <button type="button" onClick={() => skip(15)} className="flex items-center font-sans text-[11px]" style={{ color: t.muted }} aria-label="Forward 15 seconds">
            <span className="mr-0.5">15</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 8l4 4-4 4" /><path d="M17 12h-6a4 4 0 1 0 0 8h1" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
