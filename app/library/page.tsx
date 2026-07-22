import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getMyBooks } from "@/lib/catalog"
import type { Book } from "@/lib/catalog-types"
import { AppNav } from "@/components/app/app-nav"
import { BookCard } from "@/components/app/book-card"

export const metadata = { title: "My Library — Whirlwind" }
export const dynamic = "force-dynamic"

export default async function LibraryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const rows = await getMyBooks()
  const books = rows.map((r) => r.book_id).filter((b): b is Book => !!b && !!b.id)

  const inProgress = books.filter((_, i) => !rows[i]?.completed_at)
  const finished = books.filter((_, i) => !!rows[i]?.completed_at)

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user?.email} />

      <main className="mx-auto max-w-[1600px] px-5 pb-24 pt-28 md:px-8">
        <h1 className="ww-display mb-8 text-3xl font-medium text-[#f5ead4] md:text-4xl">
          My Library
        </h1>

        {books.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <p className="ww-display text-xl text-[#f5ead4]">Your shelf is empty</p>
            <p className="mx-auto mt-2 max-w-sm font-sans text-sm leading-relaxed text-[#a99c8b]">
              Books you open and save from the app will collect here. Start with something
              from the catalogue.
            </p>
            <Link href="/browse" className="ww-btn ww-btn-gold mt-6 !min-h-[46px]">
              Browse mysteries
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {inProgress.length > 0 ? (
              <section>
                <h2 className="ww-display mb-4 text-lg text-[#d9cbb5]">Continue reading</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {inProgress.map((b) => (
                    <BookCard key={b.id} book={b} width="w-full" />
                  ))}
                </div>
              </section>
            ) : null}

            {finished.length > 0 ? (
              <section>
                <h2 className="ww-display mb-4 text-lg text-[#d9cbb5]">Finished</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {finished.map((b) => (
                    <BookCard key={b.id} book={b} width="w-full" />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </main>
    </div>
  )
}
