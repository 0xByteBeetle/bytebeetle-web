import type { Metadata } from "next";
import ContactForm from "../contact-form";
import { EmailLink } from "../contact-details";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Contact | 0xByteBeetle",
  description: "Contact Andrey Obruchkov about bootcamps, mentoring, training, writing, or protocol engineering.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader active="contact" />
      <section className="contact-page-shell">
        <div className="contact-context">
          <p className="eyebrow">Contact</p>
          <h1>Send me a note.</h1>
          <p>A question about an article, a bootcamp, or something you are working on? I read these messages myself.</p>
          <p className="direct-contact">Email me directly at <EmailLink />, or leave a message using the form.</p>
          <p className="contact-small-note">Leave whichever contact works for you: email, Telegram, or Discord. You only need one.</p>
        </div>
        <div className="contact-panel standalone-contact">
          <ContactForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
