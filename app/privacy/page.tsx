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
          <p>Contact requests and bootcamp enquiries are also emailed to Andrey through Cloudflare’s email service. These details are used to reply to your request, not to subscribe you to a newsletter. Email copies remain in the owner’s mailbox until deleted.</p>
          <p>Website inbox records older than 180 days are removed when the inbox is accessed or a new request arrives. Email copies are separate. If you want a message removed sooner, email bytebeetle1@gmail.com with “privacy request” at the beginning and include the same contact detail.</p>
          <a className="button button-primary" href="/contact">Return to contact</a>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
