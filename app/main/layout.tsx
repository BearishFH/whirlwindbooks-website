
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Whirlwind - Book Reading Platform",
  description: "Discover and read amazing books online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body> 
    </html>
  );
}
