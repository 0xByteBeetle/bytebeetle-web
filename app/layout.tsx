import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.andreyobruchkov.com"),
  title: "ByteBeetle — Multichain Engineering Education",
  description:
    "Rigorous multichain engineering education beginning with an evidence-driven EVM learning track.",
  icons: {
    icon: "/andrey-logo.jpeg",
    shortcut: "/andrey-logo.jpeg",
  },
  openGraph: {
    title: "ByteBeetle — Multichain Engineering Education",
    description:
      "Learn to reason across chains—not just deploy to one.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ByteBeetle — Multichain Engineering Education",
    description:
      "Learn to reason across chains—not just deploy to one.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
