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

const TITLE = "Whirlwind — Original Mystery & Thriller Novels"
const DESCRIPTION =
  "Read or listen to original mystery and thriller novels on iPhone and iPad. Chapter one is free, no account needed, and new mysteries land every week."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Whirlwind",
  keywords: [
    "mystery novels",
    "thriller books",
    "audiobooks",
    "original fiction",
    "reading app",
    "mystery app",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Whirlwind",
    type: "website",
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
