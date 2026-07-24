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

// A markdown Table-of-Contents line: a list item whose whole content is a link,
// e.g. "- [Chapter 2: Blood and Power](#chapter-2-blood-and-power)". These must
// be removed BEFORE anything else: they render as raw syntax, and — critically —
// a "Chapter 2" paid-marker `indexOf` would match the TOC link instead of the
// real chapter, cutting the free preview off inside the table of contents.
const TOC_LINE_RE = /^\s*[-*]\s*\[[^\]]+\]\([^)]*\)\s*$/

/** Strip the markdown TOC block so it never pollutes the reader or the marker search. */
export function stripToc(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => !TOC_LINE_RE.test(line))
    .join("\n")
}

/**
 * Split plain book text into chapters. Recognises lines that begin with
 * "Chapter N" (also Prologue / Epilogue). If no markers are present the whole
 * text becomes a single chapter so the reader never comes up empty.
 */
export function splitIntoChapters(text: string): Chapter[] {
  const normalised = stripToc(text).trim()
  if (!normalised) return []

  const lines = normalised.split("\n")
  const chapters: Chapter[] = []
  let current: { heading: string; body: string[] } | null = null

  for (const rawLine of lines) {
    // Strip Markdown so the reader never shows raw syntax (#, ##, ---, **, `).
    if (/^\s*([-*_]\s*){3,}$/.test(rawLine)) continue // horizontal rule
    const line = rawLine
      .replace(/^\s*#{1,6}\s+/, "") // heading hashes -> plain text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // markdown links -> just the text
      .replace(/\*\*|__/g, "") // bold
      .replace(/`/g, "") // inline code ticks

    if (CHAPTER_RE.test(line) && line.trim().length < 60) {
      if (current) chapters.push(finalise(current, chapters.length))
      current = { heading: line.trim(), body: [] }
    } else {
      if (!current) current = { heading: "", body: [] }
      current.body.push(line)
    }
  }
  if (current) chapters.push(finalise(current, chapters.length))

  // Drop a tiny leading front-matter block (e.g. just the book title before the
  // first real chapter) so the reader opens on Chapter One, not a title page.
  while (
    chapters.length > 1 &&
    chapters[0].paragraphs.join(" ").trim().length < 200
  ) {
    chapters.shift()
  }

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
  // Work on TOC-stripped text so neither the display nor the marker search is
  // polluted by table-of-contents links.
  const clean = stripToc(rawText)
  const chapters = splitIntoChapters(clean)
  if (chapters.length === 0) return []

  // When the book has real chapter breaks, the free unit is the FIRST chapter —
  // full — matching the iOS app's freeFirstChapter. This is deliberately robust
  // to a mis-set paid marker (the reason Cyprus was cutting off in its TOC): we
  // wall at the start of Chapter 2, not wherever a fragile string match lands.
  if (chapters.length >= 2) return [chapters[0]]

  // No chapter markers at all: never serve the whole (paid) body. Cut at the
  // paid marker if it's sane, else a char cap, on a paragraph boundary.
  const marker = paidStartingText?.trim()
  const CAP = 14000
  let bound = CAP
  if (marker) {
    const idx = clean.indexOf(marker)
    if (idx > 400) bound = Math.min(idx, CAP)
  }
  if (clean.length <= bound) return chapters
  let cut = clean.lastIndexOf("\n\n", bound)
  if (cut < bound * 0.5) cut = bound
  return splitIntoChapters(clean.slice(0, cut))
}
