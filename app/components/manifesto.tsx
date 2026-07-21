import Reveal from "./reveal"

export default function Manifesto() {
  return (
    <section id="manifesto" className="ww-noir-bg ww-section scroll-mt-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.06]"
        style={{ backgroundImage: "url('/dust-texture.png')", backgroundSize: "380px" }}
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <span className="ww-eyebrow justify-center">Why chapter one is free</span>

        <h2 className="ww-display mt-7 text-[clamp(28px,6.6vw,54px)] font-medium leading-[1.14] text-[#f5ead4]">
          We would rather be judged on a
          <span className="text-[#f0d59b]"> first chapter </span>
          than on a blurb.
        </h2>

        <hr className="ww-rule mx-auto my-9 w-40" />

        <p className="mx-auto max-w-xl text-[16px] leading-[1.75] text-[#a99c8b] md:text-[17px]">
          No account to create. No ads to sit through. Open the app, choose any
          story, and read the whole first chapter — then decide for yourself
          whether the second one is worth it.
        </p>
      </Reveal>
    </section>
  )
}
