import type { Metadata } from "next";
import ContactForm from "../contact-form";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Contact | 0xByteBeetle",
  description: "Contact Andrey Obruchkov about bootcamps, mentoring, training, writing, or protocol engineering.",
};

const reasons = [
  "You are considering one of the bootcamps and want to understand whether the level is right.",
  "You want guided study, private mentoring, code review, or a one-to-one learning format.",
  "Your team needs focused training around EVM internals, transactions, testing, or protocol architecture.",
  "You found something interesting or questionable in an article and want to discuss it.",
  "You want to talk about protocol engineering, technical writing, or collaboration.",
];

export default function ContactPage() {
  return (
    <main>
      <SiteHeader active="contact" />
      <section className="contact-page-shell">
        <div className="contact-context">
          <p className="eyebrow">Contact</p>
          <h1>Send me a note.</h1>
          <p>I read these messages myself. You do not need to prepare a formal inquiry or know exactly what format you need.</p>
          <ul className="plain-list">
            {reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
          <p className="contact-small-note">Share at least one way to reply. Email, Telegram, and Discord are all supported.</p>
        </div>
        <div className="contact-panel standalone-contact">
          <ContactForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
