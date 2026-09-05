import type { Metadata } from "next";
import { BlogLibraryPage, type BlogSearchParams } from "../library-page";

export const metadata: Metadata = {
  title: "EVM Blogs | 0xByteBeetle",
  description: "Browse EVM articles on execution, transactions, signatures, proxies, RPCs, and developer tools.",
};

export default async function EvmBlogsPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
  return <BlogLibraryPage chain="EVM" searchParams={await searchParams} />;
}
