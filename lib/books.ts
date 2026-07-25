// Real titles and real opening lines from the Whirlwind catalogue.
// Nothing here is invented — every excerpt is the actual opening of that book.

export type Book = {
  slug: string
  id: string
  title: string
  genre: string
  hook: string
  excerpt: string
}

export const BOOKS: Book[] = [
  {
    slug: "the-cyprus-agenda",
    id: "e2ee5783-4c9c-48eb-a9be-251c597e8902",
    title: "The Cyprus Agenda",
    genre: "Thriller · International intrigue",
    hook: "Twelve bottles. One could topple governments.",
    excerpt:
      "There are only twelve bottles like it in the world. Tonight, I'm stealing the one that could topple governments. The other eleven are accounted for — museums, vaults, a sultan's cellar no one has opened in thirty years. This one sits behind glass in a villa above the sea, guarded by men who have never once imagined it could leave.",
  },
  {
    slug: "death-by-golden-honey-spirals",
    id: "f6bce0d6-4ac1-4d5a-ac4b-e242ec6dffd1",
    title: "Death by Golden Honey Spirals",
    genre: "Cozy · Culinary mystery",
    hook: "The diplomat had seventeen minutes to live.",
    excerpt:
      "The diplomat was going to die in exactly seventeen minutes, and Theodora Papadakis was humming while she arranged the final tray of pastries. She did not know this yet, of course. She only knew that the honey had come out perfectly this morning, thin and gold and catching the light like something you'd swear was alive.",
  },
  {
    slug: "aztec-gold-blood-red",
    id: "9a8d9c06-23f7-4f7c-9bdb-34d6e089c1e9",
    title: "Aztec Gold, Blood Red",
    genre: "Thriller · Heist",
    hook: "A poisoned dart. A poolside toast. A killer still smiling.",
    excerpt:
      "The blowgun dart hit Carlos Mendoza in the neck just as he raised his margarita in celebration, the feathered projectile piercing his sun-bronzed skin with a soft thock that was barely audible over the mariachi band playing poolside.",
  },
  {
    slug: "blood-diamonds-silk-scarves",
    id: "78624d1a-6628-4dd2-88a2-bac1ba8620d6",
    title: "Blood Diamonds & Silk Scarves",
    genre: "Thriller · International",
    hook: "The courier arrived at the worst possible moment.",
    excerpt:
      "The courier arrived at the exact moment Amara Al-Rashid was selecting diamonds for the spring collection. He carried a single package, unmarked, and a note in handwriting she had spent ten years trying to forget.",
  },
  {
    slug: "blood-and-pearls",
    id: "32d2f974-a936-4197-8b74-1a30d661372e",
    title: "Blood and Pearls",
    genre: "Thriller · Family revenge",
    hook: "The winch handle was still slick with blood.",
    excerpt:
      "The yacht winch handle was still slick with blood when Sofia Restrepo let it slip from her fingers into the crystalline waters of Lyford Cay. Seventy years of the family's secrets had led to this exact moment, and only she knew how many of them had drowned already.",
  },
  {
    slug: "fire-spice",
    id: "e910bd35-1540-49e2-b076-ccfb82c12a9c",
    title: "Fire & Spice",
    genre: "Romance · Mystery",
    hook: "A chef, a dead critic, and a past she buried.",
    excerpt:
      "The critic who could end her career was face-down in the cellar, and the only fingerprints on the bottle beside him were about to become the least of her problems.",
  },
  {
    slug: "the-pearl-diver-s-secret",
    id: "92f88dac-b709-4040-a6e6-689b9ee9677c",
    title: "The Pearl Diver's Secret",
    genre: "Thriller · Coastal",
    hook: "A groom dies underwater at his own wedding.",
    excerpt:
      "He went under smiling, in front of two hundred guests, and came up as evidence. The bride hadn't screamed yet. She was still counting the seconds, the way she'd been taught to, waiting for a head that would never break the surface.",
  },
  {
    slug: "archivist-of-algiers",
    id: "4b72fb45-7fd2-48ca-98cb-38a37f31ba34",
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
