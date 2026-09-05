import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "./library-page";

export const metadata: Metadata = {
  title: "Blogs | 0xByteBeetle",
  description: "Explore Andrey Obruchkov's EVM and Solana articles by topic, with companion code beside each post.",
};

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="all" searchParams={await searchParams} />;
}
