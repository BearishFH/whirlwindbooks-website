import { notFound } from "next/navigation"
import { getBook } from "@/lib/catalog"
import { contentForBook, localisedTitle } from "@/lib/catalog-types"
import { fetchBookText, splitIntoChapters } from "@/lib/reader"
import { Reader } from "@/components/app/reader"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBook(id)
  return { title: book ? `Reading — ${localisedTitle(book)}` : "Whirlwind" }
}

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ mode?: string }>
}) {
  const { id } = await params
  const { mode } = await searchParams

  const book = await getBook(id)
  if (!book) notFound()

  const content = contentForBook(book)
  const title = localisedTitle(book)

  // TODO(subscription): the iOS app gates the paid body behind an active
  // RevenueCat subscription (book_contents.paid_starting_text marks where the
  // free preview ends). The web has no payment flow yet, so any signed-in user
  // gets the full text. Wire real entitlement checks here when web billing lands.
  const rawText = content?.content_url ? await fetchBookText(content.content_url) : ""
  const chapters = splitIntoChapters(rawText)
  const audioSrc = content?.audio_url ?? null

  return (
    <Reader
      bookId={book.id}
      title={title}
      author={book.author?.name ?? null}
      chapters={chapters}
      audioSrc={audioSrc}
      startInListen={mode === "listen"}
      hadContentUrl={!!content?.content_url}
    />
  )
}
