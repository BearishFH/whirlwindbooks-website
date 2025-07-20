import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WhirlwindBooks",
  description: "Login to your WhirlwindBooks account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}