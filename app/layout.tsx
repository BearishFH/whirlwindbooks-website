import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inria_Serif, Inter } from "next/font/google"
import "./globals.css"

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE = "https://whirlwindbooks.com"
const TITLE = "Whirlwind — Original Mystery & Thriller Novels"
const DESCRIPTION =
  "Read or listen to hundreds of original mystery and thriller novels you won't find anywhere else — in your browser or on iPhone. Chapter one is free, no account needed, and new mysteries land every week."

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s — Whirlwind" },
  description: DESCRIPTION,
  applicationName: "Whirlwind",
  alternates: { canonical: "/" },
  keywords: [
    "mystery novels",
    "thriller books",
    "whodunit",
    "audiobooks",
    "original fiction",
    "detective stories",
    "read mysteries online",
    "mystery reading app",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Whirlwind",
    url: SITE,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/whirlwind-logo.png",
    shortcut: "/whirlwind-logo.png",
    apple: "/whirlwind-logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0909",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inriaSerif.variable} ${inter.variable} scroll-smooth`}>
      <body className="overflow-x-hidden bg-[#0a0909] font-serif text-[#f5ead4] antialiased">
        {children}
      </body>
    </html>
  )
}
