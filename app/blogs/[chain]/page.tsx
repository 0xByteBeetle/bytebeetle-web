import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { substackArticles } from "../../content";
import { chainOptions } from "../library-model";
import { BlogLibraryPage, type BlogSearchParams } from "../library-page";

type Props = { params: Promise<{ chain: string }>; searchParams: Promise<BlogSearchParams> };

function resolveChain(slug: string) {
  const chain = chainOptions(substackArticles).find((item) => item.slug === slug);
  if (!chain) notFound();
  return chain;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chain = resolveChain((await params).chain);
  return { title: `${chain.label} Blogs | 0xByteBeetle`, description: `Explore ${chain.label} articles by Andrey Obruchkov, with companion code and practical examples.` };
}

export default async function ChainBlogsPage({ params, searchParams }: Props) {
  const chain = resolveChain((await params).chain);
  return <BlogLibraryPage key={chain.slug} chain={chain.label} searchParams={await searchParams} />;
}
