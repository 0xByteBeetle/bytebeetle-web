"use client";

import { useRef, useState, type FormEvent } from "react";
import { EmailLink } from "../contact-details";
import { courseOptions } from "./course-options.mjs";
import { submitCourseInterest } from "./submit-course-interest";

export default function CourseInterestForm({ course }: { course: keyof typeof courseOptions }) {
  const selectedCourse = courseOptions[course];
  const waitlist = selectedCourse.waitlist;
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
      await submitCourseInterest({
        course,
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        website: String(data.get("website") ?? ""),
        startedAt: startedAt.current,
      });
      form.reset();
      setState("success");
      setMessage(waitlist
        ? `Thank you. Your interest in the ${selectedCourse.title} has been saved. I’ll contact you about future availability. This does not enroll you or grant course access.`
        : "Thank you. Your request has been saved. I’ll get in touch at the email you shared.");
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
        <h2 id="course-interest-title">{waitlist ? `Join the ${selectedCourse.title} waitlist` : "Interested in this bootcamp?"}</h2>
        <p>{waitlist
          ? "This bootcamp is not available yet. Leave your email to register your interest and hear about future availability."
          : "Leave your email and I’ll get in touch to talk about the course and whether it’s right for you."}</p>
        {waitlist && <p>Joining the waitlist does not enroll you, collect payment, or grant course access.</p>}
        <p className="direct-contact">Prefer to write directly? <EmailLink /></p>
      </div>
      <form onSubmit={submit} onFocusCapture={() => { startedAt.current ??= Date.now(); }} onPointerDownCapture={() => { startedAt.current ??= Date.now(); }} aria-label={waitlist ? `${selectedCourse.title} waitlist` : "Bootcamp interest"} aria-busy={state === "sending"}>
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
          <button className="button button-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : waitlist ? "Join the waitlist" : "Ask me about this course"}</button>
          <p className="interest-privacy">{waitlist ? "Only contact about this bootcamp’s future availability." : "Only a reply about this course."} No newsletter signup. <a href="/privacy">Privacy details</a></p>
        </>}
        <p className={`interest-status ${state}`} role={state === "error" ? "alert" : "status"}>{message}</p>
        <noscript><p>Please email me directly using the link above if JavaScript is turned off.</p></noscript>
      </form>
    </section>
  );
}
