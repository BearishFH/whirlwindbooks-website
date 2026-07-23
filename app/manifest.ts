import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Whirlwind — Original Mysteries",
    short_name: "Whirlwind",
    description:
      "Read or listen to original mystery and thriller novels. Chapter one free, new mysteries every week.",
    start_url: "/browse",
    display: "standalone",
    background_color: "#0a0909",
    theme_color: "#0a0909",
    icons: [
      { src: "/whirlwind-logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/whirlwind-logo.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
  }
}
