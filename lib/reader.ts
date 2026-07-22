// Reader helpers. Book bodies are plain-text (UTF-8) files stored in Supabase
// Storage, referenced by book_contents.content_url — exactly what the iOS app
// downloads (see BookPreferenceViewModal.downloadText). We fetch that text
// server-side (keeps signed URLs off the client and sidesteps CORS) and split
// it into chapters on "Chapter N" markers.

export type Chapter = {
  index: number
  heading: string
  paragraphs: string[]
}

/** Download the raw book text. Returns "" on any failure (never throws). */
export async function fetchBookText(url: string): Promise<string> {
  try {
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) return ""
    return await res.text()
  } catch {
    return ""
  }
}

const CHAPTER_RE = /^\s*(chapter\s+[\divxlc]+|prologue|epilogue)\b.*$/i

/**
 * Split plain book text into chapters. Recognises lines that begin with
 * "Chapter N" (also Prologue / Epilogue). If no markers are present the whole
 * text becomes a single chapter so the reader never comes up empty.
 */
export function splitIntoChapters(text: string): Chapter[] {
  const normalised = text.replace(/\r\n/g, "\n").trim()
  if (!normalised) return []

  const lines = normalised.split("\n")
  const chapters: Chapter[] = []
  let current: { heading: string; body: string[] } | null = null

  for (const line of lines) {
    if (CHAPTER_RE.test(line) && line.trim().length < 60) {
      if (current) chapters.push(finalise(current, chapters.length))
      current = { heading: line.trim(), body: [] }
    } else {
      if (!current) current = { heading: "", body: [] }
      current.body.push(line)
    }
  }
  if (current) chapters.push(finalise(current, chapters.length))

  return chapters.filter((c) => c.paragraphs.length > 0 || c.heading)
}

function finalise(c: { heading: string; body: string[] }, index: number): Chapter {
  const paragraphs = c.body
    .join("\n")
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)

  return {
    index,
    heading: c.heading || (index === 0 ? "Chapter One" : `Chapter ${index + 1}`),
    paragraphs,
  }
}

/**
 * The FREE preview for a non-subscribed reader — mirrors the iOS app's
 * `freeFirstChapter`. Prefer the `paid_starting_text` marker (everything before
 * it is free); otherwise fall back to the first chapter; and if the text has no
 * chapter markers at all, cap to the first few paragraphs so the paid body is
 * never served. Full chapters are only ever returned to a subscribed user.
 */
export function freePreview(rawText: string, paidStartingText: string | null): Chapter[] {
  const marker = paidStartingText?.trim()
  if (marker) {
    const idx = rawText.indexOf(marker)
    if (idx > 0) return splitIntoChapters(rawText.slice(0, idx))
  }
  const chapters = splitIntoChapters(rawText)
  if (chapters.length > 1) return chapters.slice(0, 1)
  // Single chapter (no markers): hard-cap so we never leak the full body.
  const only = chapters[0]
  if (!only) return []
  return [{ ...only, paragraphs: only.paragraphs.slice(0, 8) }]
}
