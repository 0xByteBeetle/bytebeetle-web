"use client";

import { useRef, useState, type FormEvent } from "react";
import { EmailLink } from "../contact-details";

export default function CourseInterestForm({ course }: { course: "evm-engineering" | "advanced-evm" }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef<number | null>(null);
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    sending.current = true;
    setState("sending");
    setMessage("");
    const data = new FormData(form);
    try {
      const response = await fetch("/api/course-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, name: data.get("name"), email: data.get("email"), website: data.get("website"), startedAt: startedAt.current }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.message || "Your request could not be saved. Please try again, or email me directly below.");
      }
      form.reset();
      setState("success");
      setMessage("Thank you. Your request has been saved. I’ll get in touch at the email you shared.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again, or email me directly below.");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="course-interest" id="course-interest" aria-labelledby="course-interest-title">
      <div>
        <h2 id="course-interest-title">Interested in this bootcamp?</h2>
        <p>Leave your email and I’ll get in touch to talk about the course and whether it’s right for you.</p>
        <p className="direct-contact">Prefer to write directly? <EmailLink /></p>
      </div>
      <form onSubmit={submit} onFocusCapture={() => { startedAt.current ??= Date.now(); }} onPointerDownCapture={() => { startedAt.current ??= Date.now(); }} aria-label="Bootcamp interest" aria-busy={state === "sending"}>
        {state !== "success" && <>
          <div className="interest-fields">
            <div className="form-field">
              <label htmlFor="interest-name">Name <span>(optional)</span></label>
              <input id="interest-name" name="name" autoComplete="name" maxLength={100} disabled={state === "sending"} />
            </div>
            <div className="form-field">
              <label htmlFor="interest-email">Email</label>
              <input id="interest-email" name="email" type="email" autoComplete="email" maxLength={254} required disabled={state === "sending"} />
            </div>
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="interest-website">Website</label>
            <input id="interest-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button className="button button-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Ask me about this course"}</button>
          <p className="interest-privacy">Only a reply about this course. No newsletter signup. <a href="/privacy">Privacy details</a></p>
        </>}
        <p className={`interest-status ${state}`} role={state === "error" ? "alert" : "status"}>{message}</p>
        <noscript><p>Please email me directly using the link above if JavaScript is turned off.</p></noscript>
      </form>
    </section>
  );
}
