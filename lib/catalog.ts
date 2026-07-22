import { createClient } from "@/lib/supabase/server"
import type { AppSection, Book } from "@/lib/catalog-types"

// Mirrors SupabaseManager.bookSelectQuery() in the iOS app.
const BOOK_SELECT = `
  id,
  title,
  description,
  genre,
  is_vaulted,
  is_published,
  released_at,
  expires_at,
  created_at,
  author(*),
  series(*),
  tags,
  chapter_count,
  word_count,
  book_covers(*),
  book_contents(*)
`

/**
 * Home shelves. Mirrors SupabaseManager.fetchSections(.home): app_sections rows
 * (placement = 'home'), each carrying its ordered list of books through the
 * app_section_books join table.
 */
export async function getHomeSections(): Promise<AppSection[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("app_sections")
    .select(
      `
      id,
      title,
      placement,
      app_section_books(
        section_id,
        book_id(${BOOK_SELECT}),
        created_at
      ),
      priority,
      created_at
      `,
    )
    .eq("placement", "home")
    .order("priority")

  if (error) {
    console.error("[catalog] getHomeSections", error.message)
    return []
  }
  return (data as unknown as AppSection[]) ?? []
}

/** All published books, newest first — used for the "Every mystery" grid. */
export async function getAllBooks(limit = 100): Promise<Book[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("books")
    .select(BOOK_SELECT)
    .eq("is_published", true)
    .order("released_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[catalog] getAllBooks", error.message)
    return []
  }
  return (data as unknown as Book[]) ?? []
}

/** Single book by id. Mirrors SupabaseManager.fetchBook. */
export async function getBook(bookId: string): Promise<Book | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("books")
    .select(BOOK_SELECT)
    .eq("id", bookId)
    .limit(1)

  if (error) {
    console.error("[catalog] getBook", error.message)
    return null
  }
  return ((data as unknown as Book[]) ?? [])[0] ?? null
}

export type MyBookRow = {
  id: string
  offset: number | null
  audio_offset: number | null
  completed_at: string | null
  created_at: string
  book_id: Book | null
}

/**
 * The signed-in user's saved / in-progress books. Mirrors
 * SupabaseManager.myBooks (user_books joined to books). RLS restricts rows to
 * the current user.
 */
export async function getMyBooks(): Promise<MyBookRow[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("user_books")
    .select(
      `
      id,
      user_id,
      offset,
      audio_offset,
      completed_at,
      created_at,
      book_id(${BOOK_SELECT})
      `,
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("[catalog] getMyBooks", error.message)
    return []
  }
  return (data as unknown as MyBookRow[]) ?? []
}

/** Same-genre recommendations (excludes the current book). */
export async function getSimilarBooks(book: Book, limit = 12): Promise<Book[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("books")
    .select(BOOK_SELECT)
    .eq("genre", book.genre)
    .eq("is_published", true)
    .limit(limit + 1)

  if (error) {
    console.error("[catalog] getSimilarBooks", error.message)
    return []
  }
  return ((data as unknown as Book[]) ?? []).filter((b) => b.id !== book.id).slice(0, limit)
}
