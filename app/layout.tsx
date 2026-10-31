import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayFinder — Find your kind of stay",
  description: "Discover stays, compare amenities, and plan your next trip with StayFinder."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}