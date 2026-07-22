// Types mirroring the Whirlwind Supabase catalogue, matching the iOS models in
// whirlwind/Model/Book.swift exactly (same table + column names).

export type Author = {
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string
}

export type Series = {
  id: string
  name: string
  description: string | null
  genre: string
  tags: string | null
  is_published: boolean
  is_vaulted: boolean
  published_at: string
  created_at: string
}

export type BookCover = {
  id: string
  book_id: string
  cover_url: string
  clues_count: number | null
}

export type BookContent = {
  id: string
  book_id: string
  language_id: string
  title: string | null
  description: string | null
  content_url: string | null
  audio_url: string | null
  paid_starting_text: string | null
}

export type Book = {
  id: string
  title: string
  description: string
  genre: string
  tags: string | null
  series: Series | null
  author: Author | null
  chapter_count: number | null
  word_count: number | null
  book_covers: BookCover[]
  book_contents: BookContent[]
  is_published: boolean
  is_vaulted: boolean
  clues_count?: number | null
  expires_at: string | null
  released_at: string
  created_at: string
}

export type AppSectionBook = {
  section_id: string
  book_id: Book
  created_at: string
}

export type AppSection = {
  id: string
  title: string
  placement: string
  app_section_books: AppSectionBook[]
  priority: number | null
  created_at: string
}

// ---- Presentation helpers -------------------------------------------------

/** Prefer the English text row, then any row, for a book's readable body. */
export function contentForBook(book: Book, languageId = "en"): BookContent | null {
  if (!book.book_contents?.length) return null
  return (
    book.book_contents.find((c) => c.language_id === languageId) ??
    book.book_contents.find((c) => c.language_id === "en") ??
    book.book_contents[0]
  )
}

export function coverUrl(book: Book): string | null {
  return book.book_covers?.[0]?.cover_url ?? null
}

export function localisedTitle(book: Book, languageId = "en"): string {
  return contentForBook(book, languageId)?.title || book.title
}

export function localisedDescription(book: Book, languageId = "en"): string {
  return contentForBook(book, languageId)?.description || book.description
}

export function hasAudio(book: Book): boolean {
  return book.book_contents?.some((c) => !!c.audio_url) ?? false
}

export function audioUrl(book: Book, languageId = "en"): string | null {
  const c = contentForBook(book, languageId)
  return c?.audio_url ?? book.book_contents?.find((x) => !!x.audio_url)?.audio_url ?? null
}

export function tagsArray(book: Book): string[] {
  if (!book.tags) return []
  return book.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

/** Human-friendly genre label from the genre id used across the catalogue. */
export function genreLabel(genreId: string): string {
  const map: Record<string, string> = {
    classic: "Classic",
    detective: "Detective",
    whodunit: "Whodunit",
    crime: "Crime",
    thrillers: "Thrillers",
    thriller: "Thriller",
    cozy: "Cozy",
    global: "Global",
    historical: "Historical",
    billionaires: "Billionaires",
    romance: "Romance",
  }
  if (map[genreId]) return map[genreId]
  return genreId ? genreId.charAt(0).toUpperCase() + genreId.slice(1) : "Mystery"
}
