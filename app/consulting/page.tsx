import type { Metadata } from "next";
import Link from "next/link";
import { EmailLink } from "../contact-details";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Consulting | 0xByteBeetle",
  description: "Contact Andrey Obruchkov about blockchain engineering consulting.",
};

export default function ConsultingPage() {
  return (
    <main>
      <SiteHeader active="consulting" />
      <section className="page-hero">
        <p className="eyebrow">Consulting</p>
        <h1>Discuss what you’re working on.</h1>
        <p>Have a blockchain engineering question or a project you’d like to discuss? Tell me what you’re building and where you need help.</p>
        <p className="direct-contact">For consulting, email me at <EmailLink subject="Consulting enquiry" />.</p>
        <Link className="text-link" href="/#work-title">Explore writing, mentoring, and bootcamps →</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
