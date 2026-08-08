"use client";

import { FormEvent, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        telegram: formData.get("telegram"),
        discord: formData.get("discord"),
        message: formData.get("message"),
        website: formData.get("website"),
        startedAt: startedAt.current,
      }),
    });

    const result = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setState("error");
      setMessage(result?.message ?? "I could not send your message. Please try again.");
      return;
    }

    form.reset();
    startedAt.current = Date.now();
    setState("success");
    setMessage("Thank you. Your message is in my inbox, and I will get back to you using the contact details you shared.");
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Name <span>(optional)</span></label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} />
      </div>

      <fieldset>
        <legend>How can I reply?</legend>
        <p className="field-hint">Add at least one. The others are optional.</p>
        <div className="contact-methods">
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-telegram">Telegram</label>
            <input id="contact-telegram" name="telegram" type="text" autoComplete="off" placeholder="@username" maxLength={64} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-discord">Discord</label>
            <input id="contact-discord" name="discord" type="text" autoComplete="off" placeholder="username" maxLength={64} />
          </div>
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="contact-message">What would you like to talk about?</label>
        <textarea id="contact-message" name="message" rows={6} minLength={10} maxLength={4000} required />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="privacy-note">
        I will use these details only to reply to your message. They are kept privately
        for up to six months. <a href="/privacy">Privacy details</a>
      </p>

      <div className="form-submit-row">
        <button className="button button-light" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending..." : "Send message"}
        </button>
        {message ? <p className={`form-message ${state}`} role="status">{message}</p> : null}
      </div>
    </form>
  );
}
