import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "../library-page";

export const metadata: Metadata = {
  title: "Hyperliquid Blogs | 0xByteBeetle",
  description: "Explore Hyperliquid architecture, HyperCore, HyperEVM, the clearinghouse, and agent keys with Andrey Obruchkov.",
};

export default async function HyperliquidBlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="Hyperliquid" searchParams={await searchParams} />;
}
