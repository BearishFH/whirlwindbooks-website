import Link from "next/link"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getBook } from "@/lib/catalog"
import { contentForBook, coverUrl, localisedTitle } from "@/lib/catalog-types"
import { fetchBookText, splitIntoChapters, freePreview } from "@/lib/reader"
import { hasActiveSubscription } from "@/lib/entitlement"
import { createClient } from "@/lib/supabase/server"
import { FREE_BOOK_COOKIE } from "@/lib/free-book"
import { Reader } from "@/components/app/reader"
import type { Book } from "@/lib/catalog-types"

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

  // One-free-story lock: a non-subscribed visitor who already opened a different
  // book gets the subscribe wall here — not a second free Chapter 1. This is
  // what keeps free readers committing to one story instead of grazing.
  const claimed = (await cookies()).get(FREE_BOOK_COOKIE)?.value
  if (!subscribed && claimed && claimed !== book.id) {
    const firstBook = await getBook(claimed)
    return <LockedToOtherWall thisBook={book} firstBook={firstBook} />
  }

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

// Shown when a non-subscribed reader — who already started their one free
// mystery — tries to open a different book. Sells THIS book, offers the one-tap
// path to subscribe, and keeps a door open back to the story they're mid-way
// through, so a locked click still has somewhere warm to go.
function LockedToOtherWall({ thisBook, firstBook }: { thisBook: Book; firstBook: Book | null }) {
  const cover = coverUrl(thisBook)
  const title = localisedTitle(thisBook)
  const firstTitle = firstBook ? localisedTitle(firstBook) : null

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060508] px-5 py-16">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30 blur-[10px]"
        />
      ) : (
        <div className="ww-noir-bg absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060508]/80 via-[#060508]/90 to-[#060508]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            className="mb-7 h-[210px] w-[140px] flex-none rounded-xl border border-white/10 object-cover shadow-[0_30px_80px_rgba(0,0,0,.7)]"
          />
        ) : null}

        <span className="ww-eyebrow mb-3">Members only</span>
        <h1 className="ww-display text-3xl font-medium leading-tight text-[#f5ead4] md:text-4xl">
          Unlock {title}
        </h1>
        <p className="mt-4 max-w-sm font-serif text-[15.5px] leading-relaxed text-[#d9cbb5]">
          {firstTitle
            ? `Your free mystery is ${firstTitle}. Subscribe to open ${title} — and every other Whirlwind mystery, to read or listen, on the web and the iOS app.`
            : `Subscribe to open ${title} — and every other Whirlwind mystery, to read or listen, on the web and the iOS app.`}
        </p>

        <Link
          href="/subscribe"
          className="ww-btn ww-btn-gold !min-h-[54px] mt-8 w-full !px-8 text-[15px]"
        >
          Subscribe &amp; read {title}
        </Link>

        {firstBook ? (
          <Link
            href={`/read/${firstBook.id}`}
            className="mt-4 font-sans text-[14px] text-[#a99c8b] underline decoration-[#a99c8b]/40 underline-offset-4 transition-colors hover:text-[#f5ead4]"
          >
            ← Keep reading {firstTitle}
          </Link>
        ) : (
          <Link
            href="/browse"
            className="mt-4 font-sans text-[14px] text-[#a99c8b] underline underline-offset-4 hover:text-[#f5ead4]"
          >
            ← Back to your library
          </Link>
        )}

        <p className="mt-6 font-sans text-[12px] text-[#6f665a]">
          Cancel anytime · Read or listen · New mysteries every week
        </p>
      </div>
    </div>
  )
}
