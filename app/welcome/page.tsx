export default function WelcomePage() {
  return (
    <main className="ww-noir-bg grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-lg">
        <span className="ww-eyebrow justify-center">You&rsquo;re in</span>
        <h1 className="ww-display mt-4 text-[clamp(40px,7vw,72px)] font-medium leading-[.95] text-[#f5ead4]">
          Welcome to Whirlwind.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-[#d9cbb5]">
          Your subscription is active — the whole library is unlocked. Open the
          app on your phone with the same account and pick up exactly where the
          first chapter left off.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://apps.apple.com/app/whirlwind"
            className="inline-flex min-h-[54px] items-center rounded-full bg-gradient-to-br from-[#f1d9a4] to-[#c48d49] px-7 font-bold text-[#24170c]"
          >
            Get the app
          </a>
          <a
            href="/"
            className="inline-flex min-h-[54px] items-center rounded-full border border-[rgba(245,234,212,.18)] bg-white/[.04] px-7 font-bold text-[#f5ead4]"
          >
            Back to stories
          </a>
        </div>
        <p className="mt-6 text-[12px] text-[#8f8474]">
          A receipt is on its way to your email. Manage your subscription anytime
          from your account.
        </p>
      </div>
    </main>
  )
}
