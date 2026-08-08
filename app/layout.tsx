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
  title: "ByteBeetle — EVM Engineering Education",
  description:
    "Rigorous EVM bootcamps, mentoring, and team training built around runnable code and verifiable technical claims.",
  icons: {
    icon: "/andrey-logo.jpeg",
    shortcut: "/andrey-logo.jpeg",
  },
  openGraph: {
    title: "ByteBeetle — EVM Engineering Education",
    description:
      "Understand Ethereum at the level where it actually runs.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ByteBeetle — EVM Engineering Education",
    description:
      "Understand Ethereum at the level where it actually runs.",
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
