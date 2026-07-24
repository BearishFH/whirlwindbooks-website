// The single free story a non-subscribed visitor is allowed to read. The first
// book they open in the reader is "claimed" into this cookie by middleware;
// the read page then walls any OTHER book until they subscribe. Keeps free
// readers hooked on ONE story + its cliffhanger instead of grazing every
// Chapter 1 (which satisfies curiosity for free and kills conversion).
export const FREE_BOOK_COOKIE = "ww_free_book"
