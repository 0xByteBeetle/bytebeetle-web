import type { Metadata } from "next";
import CourseInterestForm from "../course-interest-form";
import { Curriculum } from "../curriculum";
import { solanaCurriculum } from "../solana-curriculum";
import { SiteFooter, SiteHeader } from "../../site-shell";

export const metadata: Metadata = {
  title: "Solana Bootcamp Waitlist | 0xByteBeetle",
  description: "Preview the planned six-week Solana curriculum and join the waitlist. The bootcamp is not available yet.",
};

export default function SolanaBootcampPage() {
  return (
    <main>
      <SiteHeader active="bootcamps" />
      <section className="page-hero">
        <p className="eyebrow">Solana · Not available yet · Waitlist open</p>
        <h1>Solana Bootcamp</h1>
        <p>This bootcamp is not available yet. Preview the planned curriculum and join the waitlist to register your interest in future availability.</p>
        <p>For students with some programming experience.</p>
        <p><strong>Planned introductory price: $999</strong></p>
        <div className="hero-actions">
          <a className="button button-primary" href="#course-interest">Join the Solana waitlist ↓</a>
          <a className="button button-secondary" href="#planned-curriculum">Preview the planned curriculum ↓</a>
        </div>
      </section>

      <section className="curriculum-section" id="planned-curriculum" aria-labelledby="planned-curriculum-heading">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Planned curriculum</p>
          <h2 id="planned-curriculum-heading">Six planned weeks, from the SVM to a full-stack project.</h2>
          <p>This is a curriculum preview. The bootcamp and its lessons are not available yet.</p>
        </div>
        <Curriculum weeks={solanaCurriculum} planned />
      </section>

      <CourseInterestForm course="solana" />
      <section className="quiet-cta">
        <h2>Explore the public Solana articles.</h2>
        <a className="text-link" href="/blogs/solana">Read the Solana writing →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
