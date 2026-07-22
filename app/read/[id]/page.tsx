import { notFound } from "next/navigation"
import { getBook } from "@/lib/catalog"
import { contentForBook, localisedTitle } from "@/lib/catalog-types"
import { fetchBookText, splitIntoChapters, freePreview } from "@/lib/reader"
import { hasActiveSubscription } from "@/lib/entitlement"
import { createClient } from "@/lib/supabase/server"
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

  // Entitlement gate — mirrors the iOS app. RevenueCat (keyed to the Supabase
  // user id) is the cross-platform source of truth, so an Apple OR Stripe
  // subscription unlocks the full book; everyone else gets the free preview,
  // and audio (paid) is withheld. Secure by default: unproven = preview only.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const subscribed = user ? await hasActiveSubscription(user.id, supabase) : false

  const rawText = content?.content_url ? await fetchBookText(content.content_url) : ""
  const chapters = subscribed
    ? splitIntoChapters(rawText)
    : freePreview(rawText, content?.paid_starting_text ?? null)
  const audioSrc = subscribed ? content?.audio_url ?? null : null

  return (
    <Reader
      bookId={book.id}
      title={title}
      author={book.author?.name ?? null}
      chapters={chapters}
      audioSrc={audioSrc}
      startInListen={mode === "listen"}
      hadContentUrl={!!content?.content_url}
      locked={!subscribed}
    />
  )
}
