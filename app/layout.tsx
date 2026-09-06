import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./design.css";

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
  title: "0xByteBeetle: Multichain Engineering Education",
  description:
    "Notes, bootcamps, and practical experiments in multichain engineering by Andrey Obruchkov.",
  icons: {
    icon: "/andrey-logo.jpeg",
    shortcut: "/andrey-logo.jpeg",
  },
  openGraph: {
    title: "0xByteBeetle: Multichain Engineering Education",
    description:
      "Notes, bootcamps, and practical experiments in multichain engineering.",
    type: "website",
    images: [
      {
        url: "https://bytebeetle-learn.andreyobruchkov1996.chatgpt.site/og-v2.png",
        width: 1731,
        height: 909,
        alt: "0xByteBeetle multichain engineering notes and bootcamps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0xByteBeetle: Multichain Engineering Education",
    description:
      "Notes, bootcamps, and practical experiments in multichain engineering.",
    images: ["https://bytebeetle-learn.andreyobruchkov1996.chatgpt.site/og-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`site-design ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
