import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppNav } from "@/components/app/app-nav"

export const metadata = { title: "Account — Whirlwind" }
export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login?redirect=/account")

  const provider = user.app_metadata?.provider ?? "account"
  const name =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    null
  const joined = user.created_at ? new Date(user.created_at).toLocaleDateString() : null

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user.email} />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-28 md:px-8">
        <h1 className="ww-display mb-8 text-3xl font-medium text-[#f5ead4] md:text-4xl">Account</h1>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.12)] font-sans text-2xl font-bold uppercase text-[#f0d59b]">
              {(name?.[0] ?? user.email?.[0] ?? "W").toUpperCase()}
            </div>
            <div className="min-w-0">
              {name ? <p className="ww-display text-xl text-[#f5ead4]">{name}</p> : null}
              <p className="truncate font-sans text-sm text-[#a99c8b]">{user.email}</p>
              <p className="mt-0.5 font-sans text-xs uppercase tracking-wide text-[#6f665a]">
                via {provider}
                {joined ? ` · joined ${joined}` : ""}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
            <Row label="Reading">
              <Link href="/library" className="text-[#f0d59b] hover:underline">
                My Library
              </Link>
            </Row>
            <Row label="Subscription">
              <span className="text-[#a99c8b]">Managed in the Whirlwind iOS app</span>
            </Row>
            <Row label="Terms & Privacy">
              <span className="flex gap-3">
                <Link href="/terms" className="text-[#f0d59b] hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="text-[#f0d59b] hover:underline">
                  Privacy
                </Link>
              </span>
            </Row>
          </div>

          <form action="/auth/signout" method="post" className="mt-8 border-t border-white/10 pt-6">
            <button type="submit" className="ww-btn ww-btn-ghost !min-h-[48px]">
              Sign out
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 font-sans text-sm">
      <span className="text-[#8a7d6c]">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  )
}
