import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "./library-page";

export const metadata: Metadata = {
  title: "Blogs | 0xByteBeetle",
  description: "Explore Andrey Obruchkov's EVM, Solana, and Hyperliquid articles by topic, with companion code where available.",
};

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="all" searchParams={await searchParams} />;
}
