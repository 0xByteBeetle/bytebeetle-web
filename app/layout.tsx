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
  title: "ByteBeetle — Deep EVM Engineering Education",
  description:
    "Evidence-driven EVM bootcamps, mentoring, and team training by Andrey Obruchkov.",
  icons: {
    icon: "/andrey-logo.jpeg",
    shortcut: "/andrey-logo.jpeg",
  },
  openGraph: {
    title: "ByteBeetle — Learn the EVM beneath the abstractions",
    description:
      "Deep Ethereum bootcamps built from runnable code, tests, traces, and production failure modes.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1733,
        height: 909,
        alt: "ByteBeetle — Learn the EVM beneath the abstractions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteBeetle — Deep EVM Engineering Education",
    description:
      "Learn execution, storage, signatures, gas, and integration behavior from executable evidence.",
    images: ["/og.png"],
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
