import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "../library-page";

export const metadata: Metadata = {
  title: "Hyperliquid Blogs | 0xByteBeetle",
  description: "Explore the five published Hyperliquid parts on architecture, HyperBFT, accounting, HyperEVM precompiles, HIP-3, and agent signing with Andrey Obruchkov.",
};

export default async function HyperliquidBlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="Hyperliquid" searchParams={await searchParams} />;
}
