import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-shell";

export const metadata: Metadata = {
  title: "Contact privacy | 0xByteBeetle",
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader active="contact" />
      <div className="privacy-page">
        <article>
          <p className="eyebrow">Contact privacy</p>
          <h1>What happens to the details you send</h1>
          <p>Your name, message, and any email, Telegram, or Discord username you provide are used only to read your request and reply to you.</p>
          <p>The information is stored in a private 0xByteBeetle inbox. It is not sold or used for advertising. The website hosting provider processes the information to operate the form and database.</p>
          <p>Contact requests are automatically removed after 180 days. If you want a message removed sooner, submit another message with “privacy request” at the beginning and include the same contact detail.</p>
          <a className="button button-primary" href="/contact">Return to contact</a>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
