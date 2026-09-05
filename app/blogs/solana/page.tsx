import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "../library-page";

export const metadata: Metadata = {
  title: "Solana Blogs | 0xByteBeetle",
  description: "Browse Solana articles on accounts, transactions, Anchor, serialization, and token extensions.",
};

export default async function SolanaBlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="Solana" searchParams={await searchParams} />;
}
