import type React from "react";
import type { Metadata } from "next";
import { Inria_Serif, Inter } from "next/font/google";
import "./globals.css";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Whirlwind - Timeless Mysteries",
  description:
    "Read and listen to original mystery stories. Chapter 1 is always free. Continue with a book purchase or monthly access.",
  keywords:
    "mystery, audiobooks, stories, reading, Lucien von Castellanos, Thea",
  openGraph: {
    title: "Whirlwind - Timeless Mysteries",
    description:
      "Read and listen to original mystery stories. Chapter 1 is always free.",
    type: "website",
  },
  icons: {
    icon: "/whirlwind-logo.png",
    shortcut: "/whirlwind-logo.png",
    apple: "/whirlwind-logo.png",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inriaSerif.variable} ${inter.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-ash-grey text-ivory font-serif antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
