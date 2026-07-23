"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Chapter } from "@/lib/reader"

type Theme = "noir" | "sepia" | "light"

const THEMES: Record<Theme, { bg: string; text: string; muted: string; heading: string }> = {
  noir: { bg: "#0b0a0a", text: "#e4dccb", muted: "#8a7d6c", heading: "#f0d59b" },
  sepia: { bg: "#efe7d8", text: "#332a20", muted: "#7a6f5d", heading: "#5a3f24" },
  light: { bg: "#faf9f7", text: "#20201e", muted: "#6b6b66", heading: "#8c271e" },
}

export function Reader({
  bookId,
  title,
  author,
  chapters,
  audioSrc,
  startInListen,
  hadContentUrl,
  locked = false,
}: {
  bookId: string
  title: string
  author: string | null
  chapters: Chapter[]
  audioSrc: string | null
  startInListen?: boolean
  hadContentUrl: boolean
  locked?: boolean
}) {
  const [theme, setTheme] = useState<Theme>("noir")
  const [fontSize, setFontSize] = useState(19)
  const [chapterIdx, setChapterIdx] = useState(0)
  const [toc, setToc] = useState(false)
  const [showAudio, setShowAudio] = useState(!!startInListen && !!audioSrc)
  const scrollTop = useRef<HTMLDivElement>(null)

  const storageKey = `ww-reader-${bookId}`
  const prefsKey = "ww-reader-prefs"

  // Restore prefs + progress
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem(prefsKey) || "{}")
      if (prefs.theme) setTheme(prefs.theme)
      if (prefs.fontSize) setFontSize(prefs.fontSize)
      const prog = JSON.parse(localStorage.getItem(storageKey) || "{}")
      if (typeof prog.chapter === "number" && prog.chapter < chapters.length) {
        setChapterIdx(prog.chapter)
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist prefs
  useEffect(() => {
    try {
      localStorage.setItem(prefsKey, JSON.stringify({ theme, fontSize }))
    } catch {
      /* ignore */
    }
  }, [theme, fontSize])

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ chapter: chapterIdx }))
    } catch {
      /* ignore */
    }
  }, [chapterIdx, storageKey])

  const t = THEMES[theme]
  const chapter = chapters[chapterIdx]
  const progress = chapters.length ? ((chapterIdx + 1) / chapters.length) * 100 : 0

  function goTo(i: number) {
    const next = Math.max(0, Math.min(chapters.length - 1, i))
    setChapterIdx(next)
    setToc(false)
    scrollTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const empty = chapters.length === 0

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: t.bg }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: "rgba(120,110,95,.18)", background: `${t.bg}e6` }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href={`/book/${bookId}`}
            className="flex items-center gap-1.5 font-sans text-sm transition-opacity hover:opacity-70"
            style={{ color: t.muted }}
          >
            <span aria-hidden>←</span> <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-sans text-[13px]" style={{ color: t.text }}>
              {title}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setToc((v) => !v)}
              title="Chapters"
              className="flex h-8 w-8 items-center justify-center rounded-md text-sm transition-opacity hover:opacity-70"
              style={{ color: t.muted }}
            >
              ☰
            </button>
            {audioSrc ? (
              <button
                type="button"
                onClick={() => setShowAudio((v) => !v)}
                title="Listen"
                className="flex h-8 w-8 items-center justify-center rounded-md transition-opacity hover:opacity-70"
                style={{ color: showAudio ? t.heading : t.muted }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Controls */}
        <div
          className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 pb-2.5"
          style={{ color: t.muted }}
        >
          <div className="flex items-center gap-1">
            {(["noir", "sepia", "light"] as Theme[]).map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setTheme(th)}
                aria-label={`${th} theme`}
                className="h-5 w-5 rounded-full border transition-transform hover:scale-110"
                style={{
                  background: THEMES[th].bg,
                  borderColor: theme === th ? THEMES[th].heading : "rgba(120,110,95,.4)",
                  outline: theme === th ? `1px solid ${THEMES[th].heading}` : "none",
                  outlineOffset: 1,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 font-sans text-sm">
            <button type="button" onClick={() => setFontSize((s) => Math.max(15, s - 1))} className="hover:opacity-70">
              A−
            </button>
            <button type="button" onClick={() => setFontSize((s) => Math.min(26, s + 1))} className="hover:opacity-70">
              A+
            </button>
          </div>
        </div>

        {/* progress bar */}
        <div className="h-0.5 w-full" style={{ background: "rgba(120,110,95,.15)" }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: t.heading }} />
        </div>
      </header>

      {/* TOC drawer */}
      {toc ? (
        <div className="fixed inset-0 z-50" onClick={() => setToc(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] overflow-y-auto p-5 shadow-2xl"
            style={{ background: t.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="ww-display mb-4 text-lg" style={{ color: t.heading }}>
              Chapters
            </p>
            <ul className="space-y-1">
              {chapters.map((c, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="w-full rounded-md px-3 py-2 text-left font-sans text-sm transition-colors"
                    style={{
                      color: i === chapterIdx ? t.heading : t.text,
                      background: i === chapterIdx ? "rgba(210,163,95,.12)" : "transparent",
                    }}
                  >
                    {c.heading}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Body */}
      <main ref={scrollTop} className="mx-auto max-w-3xl px-5 pb-40 pt-10 md:px-6">
        {empty ? (
          <div className="pt-24 text-center">
            <p className="ww-display text-2xl" style={{ color: t.text }}>
              {audioSrc ? "This title is audio-only" : "Nothing to read here yet"}
            </p>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed" style={{ color: t.muted }}>
              {audioSrc
                ? "There's no text body for this book, but you can listen below."
                : hadContentUrl
                  ? "We couldn't load the text for this book. Please try again later."
                  : "This book doesn't have a readable text file attached yet."}
            </p>
            {audioSrc ? (
              <button
                type="button"
                onClick={() => setShowAudio(true)}
                className="ww-btn ww-btn-gold mt-6 !min-h-[46px]"
              >
                🎧 Listen
              </button>
            ) : (
              <Link href={`/book/${bookId}`} className="ww-btn ww-btn-ghost mt-6 !min-h-[46px]">
                Back to book
              </Link>
            )}
          </div>
        ) : (
          <article>
            {chapter.heading ? (
              <h2 className="ww-display mb-8 text-center text-2xl font-medium md:text-3xl" style={{ color: t.heading }}>
                {chapter.heading}
              </h2>
            ) : null}
            {chapter.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-6"
                style={{
                  color: t.text,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.75,
                  fontFamily: "var(--ww-serif)",
                }}
              >
                {p}
              </p>
            ))}

            {/* Free-preview wall — shown at the end of the free chapter for a
                non-subscribed reader. Subscribing on any platform unlocks it. */}
            {locked && chapterIdx >= chapters.length - 1 ? (
              <div
                className="mt-10 rounded-2xl border p-8 text-center"
                style={{ borderColor: "rgba(212,168,67,.35)", background: "rgba(212,168,67,.06)" }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: "#D4A843" }}>
                  Free preview
                </p>
                <p className="mt-3 font-serif text-2xl" style={{ color: t.text }}>
                  Don&apos;t stop now.
                </p>
                <p className="mx-auto mt-2 max-w-md font-sans text-sm" style={{ color: t.muted }}>
                  You&apos;ve read the free first chapter. Subscribe to unlock the whole book and the
                  English audiobook — your subscription works in the app and on the web.
                </p>
                <a
                  href="/subscribe"
                  className="mt-6 inline-block rounded-full px-7 py-3 font-sans text-sm font-semibold"
                  style={{ background: "#D4A843", color: "#0a0909" }}
                >
                  Subscribe to keep reading
                </a>
              </div>
            ) : null}

            {/* Chapter nav */}
            <div className="mt-12 flex items-center justify-between border-t pt-6" style={{ borderColor: "rgba(120,110,95,.2)" }}>
              <button
                type="button"
                onClick={() => goTo(chapterIdx - 1)}
                disabled={chapterIdx === 0}
                className="font-sans text-sm transition-opacity disabled:opacity-30"
                style={{ color: t.muted }}
              >
                ← Previous
              </button>
              <span className="font-sans text-xs" style={{ color: t.muted }}>
                {chapterIdx + 1} / {chapters.length}
              </span>
              <button
                type="button"
                onClick={() => goTo(chapterIdx + 1)}
                disabled={chapterIdx >= chapters.length - 1}
                className="font-sans text-sm transition-opacity disabled:opacity-30"
                style={{ color: t.muted }}
              >
                Next →
              </button>
            </div>
          </article>
        )}
      </main>

      {/* Audio player */}
      {audioSrc && showAudio ? (
        <AudioPlayer src={audioSrc} title={title} author={author} theme={t} onClose={() => setShowAudio(false)} />
      ) : null}
    </div>
  )
}

function AudioPlayer({
  src,
  title,
  author,
  theme,
  onClose,
}: {
  src: string
  title: string
  author: string | null
  theme: { bg: string; text: string; muted: string; heading: string }
  onClose: () => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState(1)

  const rates = useMemo(() => [1, 1.25, 1.5, 1.75, 2], [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
      setPlaying(true)
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  function cycleRate() {
    const idx = rates.indexOf(rate)
    const next = rates[(idx + 1) % rates.length]
    setRate(next)
    if (audioRef.current) audioRef.current.playbackRate = next
  }

  function fmt(s: number) {
    if (!s || Number.isNaN(s)) return "0:00"
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md"
      style={{ borderColor: "rgba(120,110,95,.2)", background: `${theme.bg}f2` }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        preload="metadata"
      />
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full"
          style={{ background: theme.heading, color: theme.bg }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-sans text-[13px]" style={{ color: theme.text }}>
              {title} {author ? <span style={{ color: theme.muted }}>· {author}</span> : null}
            </p>
            <span className="flex-none font-sans text-[11px] tabular-nums" style={{ color: theme.muted }}>
              {fmt(current)} / {fmt(duration)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={(e) => {
              const v = Number(e.target.value)
              setCurrent(v)
              if (audioRef.current) audioRef.current.currentTime = v
            }}
            className="mt-1.5 h-1 w-full cursor-pointer appearance-none rounded-full"
            style={{ accentColor: theme.heading, background: "rgba(120,110,95,.3)" }}
          />
        </div>

        <button
          type="button"
          onClick={cycleRate}
          className="flex-none rounded-md px-2 py-1 font-sans text-xs"
          style={{ color: theme.muted }}
        >
          {rate}×
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player"
          className="flex-none rounded-md px-2 py-1 font-sans text-sm hover:opacity-70"
          style={{ color: theme.muted }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
