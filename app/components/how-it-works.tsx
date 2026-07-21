import Reveal from "./reveal"

const STEPS = [
  {
    n: "01",
    title: "Choose a mystery",
    body: "Browse the shelf and pick the cover that won't let go. Heists, cozy kitchens, espionage, coastlines with something under the water.",
  },
  {
    n: "02",
    title: "Read chapter one free",
    body: "No account, no sign-up, no card. Open the app and the first chapter is simply there, waiting for you.",
  },
  {
    n: "03",
    title: "Keep going in the app",
    body: "Hooked? Carry on reading — or switch to the narration and listen. New mysteries land every week.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="ww-section">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="ww-eyebrow">Three steps, no friction</span>
          <h2 className="ww-display mt-4 text-[clamp(32px,7vw,58px)] font-medium leading-[1.02] text-[#f5ead4]">
            From curious to hooked in about a minute.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[rgba(210,163,95,.16)] md:mt-16 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 110}
              className="group relative bg-[#0c0b0a] p-7 transition-colors duration-500 hover:bg-[#110f0d] md:p-9"
            >
              <span
                aria-hidden="true"
                className="ww-display block text-[40px] leading-none text-[rgba(210,163,95,.42)] transition-colors duration-500 group-hover:text-[#d2a35f] md:text-[48px]"
              >
                {step.n}
              </span>
              <h3 className="ww-display mt-4 text-[23px] leading-tight text-[#f5ead4] md:text-[26px]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-[#a99c8b] md:text-[16px]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
