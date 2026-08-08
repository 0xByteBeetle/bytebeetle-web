import type { Metadata } from "next";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { isInboxOwner } from "../owner-auth";
import { listContactSubmissions } from "@/db/contact-submissions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact inbox | 0xByteBeetle",
  robots: { index: false, follow: false },
};

function contactLinks(submission: {
  email: string | null;
  telegram: string | null;
  discord: string | null;
}) {
  return [
    submission.email
      ? { label: submission.email, href: `mailto:${submission.email}` }
      : null,
    submission.telegram
      ? {
          label: `Telegram ${submission.telegram}`,
          href: `https://t.me/${submission.telegram.replace(/^@/, "")}`,
        }
      : null,
    submission.discord
      ? { label: `Discord ${submission.discord}`, href: null }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string | null }>;
}

export default async function InboxPage() {
  const user = await requireChatGPTUser("/inbox");

  if (!(await isInboxOwner(user))) {
    return (
      <main className="inbox-shell">
        <section className="inbox-empty">
          <p className="eyebrow">Private inbox</p>
          <h1>This inbox is only available to the site owner.</h1>
          <a className="button button-primary" href={chatGPTSignOutPath("/inbox")}>Sign out</a>
        </section>
      </main>
    );
  }

  const submissions = await listContactSubmissions();

  return (
    <main className="inbox-shell">
      <header className="inbox-header">
        <div>
          <p className="eyebrow">0xByteBeetle</p>
          <h1>Contact inbox</h1>
          <p>{submissions.length} message{submissions.length === 1 ? "" : "s"} from the last six months</p>
        </div>
        <div className="inbox-actions">
          <a href="/">View website</a>
          <a href={chatGPTSignOutPath("/")}>Sign out</a>
        </div>
      </header>

      {submissions.length === 0 ? (
        <section className="inbox-empty">
          <h2>No messages yet.</h2>
          <p>New contact requests will appear here.</p>
        </section>
      ) : (
        <section className="submission-list" aria-label="Contact messages">
          {submissions.map((submission) => (
            <article className={`submission-card status-${submission.status}`} key={submission.id}>
              <div className="submission-meta">
                <div>
                  <p className="submission-name">{submission.name || "Anonymous"}</p>
                  <time dateTime={new Date(submission.created_at).toISOString()}>
                    {new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Europe/Madrid",
                    }).format(new Date(submission.created_at))}
                  </time>
                </div>
                <span>{submission.status}</span>
              </div>

              <div className="submission-contacts">
                {contactLinks(submission).map((contact) =>
                  contact.href ? (
                    <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {contact.label}
                    </a>
                  ) : (
                    <span key={contact.label}>{contact.label}</span>
                  ),
                )}
              </div>

              <p className="submission-message">{submission.message}</p>

              <form className="status-form" action="/api/inbox/status" method="post">
                <input type="hidden" name="id" value={submission.id} />
                <button name="status" value="new" type="submit">New</button>
                <button name="status" value="replied" type="submit">Replied</button>
                <button name="status" value="archived" type="submit">Archive</button>
              </form>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
