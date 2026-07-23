// Guards against open-redirect abuse. A safe internal redirect target must be
// a same-origin absolute path: it starts with a single "/" that is NOT followed
// by another "/" or a "\". Values like "//evil.com" or "/\evil.com" are
// protocol-relative and browsers resolve them to an EXTERNAL origin, so they are
// rejected in favour of the fallback.
export function safeRedirectPath(
  path: string | undefined | null,
  fallback = "/browse",
): string {
  if (typeof path === "string" && /^\/(?![/\\])/.test(path)) return path
  return fallback
}
