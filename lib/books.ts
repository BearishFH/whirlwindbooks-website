// Real titles and real opening lines from the Whirlwind catalogue.
// Nothing here is invented — every excerpt is the actual opening of that book.

export type Book = {
  slug: string
  title: string
  genre: string
  hook: string
  excerpt: string
}

export const BOOKS: Book[] = [
  {
    slug: "the-cyprus-agenda",
    title: "The Cyprus Agenda",
    genre: "Thriller · International intrigue",
    hook: "Twelve bottles. One could topple governments.",
    excerpt:
      "There are only twelve bottles like it in the world. Tonight, I'm stealing the one that could topple governments. The other eleven are accounted for — museums, vaults, a sultan's cellar no one has opened in thirty years. This one sits behind glass in a villa above the sea, guarded by men who have never once imagined it could leave.",
  },
  {
    slug: "death-by-golden-honey-spirals",
    title: "Death by Golden Honey Spirals",
    genre: "Cozy · Culinary mystery",
    hook: "The diplomat had seventeen minutes to live.",
    excerpt:
      "The diplomat was going to die in exactly seventeen minutes, and Theodora Papadakis was humming while she arranged the final tray of pastries. She did not know this yet, of course. She only knew that the honey had come out perfectly this morning, thin and gold and catching the light like something you'd swear was alive.",
  },
  {
    slug: "aztec-gold-blood-red",
    title: "Aztec Gold, Blood Red",
    genre: "Thriller · Heist",
    hook: "A poisoned dart. A poolside toast. A killer still smiling.",
    excerpt:
      "The blowgun dart hit Carlos Mendoza in the neck just as he raised his margarita in celebration, the feathered projectile piercing his sun-bronzed skin with a soft thock that was barely audible over the mariachi band playing poolside.",
  },
  {
    slug: "blood-diamonds-silk-scarves",
    title: "Blood Diamonds & Silk Scarves",
    genre: "Thriller · International",
    hook: "The courier arrived at the worst possible moment.",
    excerpt:
      "The courier arrived at the exact moment Amara Al-Rashid was selecting diamonds for the spring collection. He carried a single package, unmarked, and a note in handwriting she had spent ten years trying to forget.",
  },
  {
    slug: "blood-and-pearls",
    title: "Blood and Pearls",
    genre: "Thriller · Family revenge",
    hook: "The winch handle was still slick with blood.",
    excerpt:
      "The yacht winch handle was still slick with blood when Sofia Restrepo let it slip from her fingers into the crystalline waters of Lyford Cay. Seventy years of the family's secrets had led to this exact moment, and only she knew how many of them had drowned already.",
  },
  {
    slug: "fire-spice",
    title: "Fire & Spice",
    genre: "Romance · Mystery",
    hook: "A chef, a dead critic, and a past she buried.",
    excerpt:
      "The critic who could end her career was face-down in the cellar, and the only fingerprints on the bottle beside him were about to become the least of her problems.",
  },
  {
    slug: "the-pearl-diver-s-secret",
    title: "The Pearl Diver's Secret",
    genre: "Thriller · Coastal",
    hook: "A groom dies underwater at his own wedding.",
    excerpt:
      "He went under smiling, in front of two hundred guests, and came up as evidence. The bride hadn't screamed yet. She was still counting the seconds, the way she'd been taught to, waiting for a head that would never break the surface.",
  },
  {
    slug: "archivist-of-algiers",
    title: "Archivist of Algiers",
    genre: "Thriller · Espionage",
    hook: "One classified file. A mentor's warning, too late.",
    excerpt:
      "The document should not have existed, and the moment Yusuf understood what he was holding, his mentor's face went the colour of old paper. 'Put it back,' the old man whispered. 'Put it back and forget the drawer was ever unlocked.'",
  },
]

/**
 * Every cover we ship, used for the shelf marquee. The two titles without a
 * published opening-line preview appear as artwork only — we don't fabricate
 * excerpts for them.
 */
export const ALL_COVERS: { slug: string; title: string }[] = [
  ...BOOKS.map(({ slug, title }) => ({ slug, title })),
  { slug: "the-olive-oil-drowning", title: "The Olive Oil Drowning" },
  { slug: "the-shortbread-confession", title: "The Shortbread Confession" },
]
