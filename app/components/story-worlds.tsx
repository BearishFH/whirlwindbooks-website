import Reveal from "./reveal"

const WORLDS = [
  {
    art: "/lucien-new.png",
    artAlt: "Illustrated character artwork from the Whirlwind mystery series",
    kicker: "The cold side",
    title: "Heists, forgeries and very expensive secrets",
    body: "Villas above the sea, unmarked couriers, files that were never supposed to exist. Stories where everyone at the table is running a second agenda.",
    quote:
      "There are only twelve bottles like it in the world. Tonight, I'm stealing the one that could topple governments.",
    source: "The Cyprus Agenda",
    position: "object-[50%_18%]",
  },
  {
    art: "/thea-new.png",
    artAlt: "Illustrated character artwork from the Whirlwind mystery series",
    kicker: "The warm side",
    title: "Murder with the kettle still on",
    body: "Kitchens, weddings, family houses with seventy years of history in the walls. The danger sits at the table and compliments the pastries.",
    quote:
      "The diplomat was going to die in exactly seventeen minutes, and Theodora Papadakis was humming while she arranged the final tray of pastries.",
    source: "Death by Golden Honey Spirals",
    position: "object-[50%_15%]",
  },
]

export default function StoryWorlds() {
  return (
    <section id="story-worlds" className="ww-section scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="ww-eyebrow">Two kinds of trouble</span>
          <h2 className="ww-display mt-4 text-[clamp(32px,7.5vw,60px)] font-medium leading-[1.02] text-[#f5ead4]">
            Whichever way your taste in danger runs.
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-[1.65] text-[#a99c8b] md:text-[16px]">
            Whirlwind is original fiction — written for the app, not licensed from
            somewhere else. Every line below is the real opening of a real story.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {WORLDS.map((world, i) => (
            <Reveal
              key={world.source}
              delay={i * 130}
              className="group relative overflow-hidden rounded-3xl border border-[rgba(210,163,95,.2)] bg-[#0c0b0a]"
            >
              <div className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[400px]">
                <img
                  src={world.art}
                  alt={world.artAlt}
                  className={`h-full w-full object-cover ${world.position} brightness-[.78] transition-transform ease-out [transition-duration:900ms] group-hover:scale-[1.04]`}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,.25)_0%,transparent_35%,rgba(9,8,8,.96)_100%)]"
                />
                <span className="absolute left-5 top-5 rounded-full border border-[rgba(240,213,155,.35)] bg-black/45 px-3 py-1 font-sans text-[10.5px] font-bold uppercase tracking-[.16em] text-[#f0d59b] backdrop-blur-sm md:left-7 md:top-7">
                  {world.kicker}
                </span>
              </div>

              <div className="relative -mt-14 px-5 pb-8 md:-mt-16 md:px-7 md:pb-10">
                <h3 className="ww-display text-[24px] leading-tight text-[#f5ead4] md:text-[30px]">
                  {world.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.65] text-[#a99c8b] md:text-[16px]">
                  {world.body}
                </p>

                <blockquote className="mt-6 border-l-2 border-[#d2a35f] pl-4 md:pl-5">
                  <p className="text-[15.5px] italic leading-[1.7] text-[#d9cbb5] md:text-[16.5px]">
                    &ldquo;{world.quote}&rdquo;
                  </p>
                  <cite className="mt-2 block font-sans text-[11px] not-italic uppercase tracking-[.16em] text-[#8f8474]">
                    Opening line · {world.source}
                  </cite>
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
