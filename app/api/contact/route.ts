import { createContactSubmission } from "@/db/contact-submissions";

export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  telegram?: unknown;
  discord?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, maxLength);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request): Promise<Response> {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "Please submit the contact form again." }, { status: 415 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const honeypot = text(payload.website, 200);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  if (honeypot || !startedAt || Date.now() - startedAt < 1500) {
    return Response.json({ ok: true });
  }

  const name = text(payload.name, 100);
  const email = text(payload.email, 254);
  const telegram = text(payload.telegram, 64);
  const discord = text(payload.discord, 64);
  const message = text(payload.message, 4000);

  if (!email && !telegram && !discord) {
    return Response.json(
      { message: "Please add an email, Telegram username, or Discord username so I can reply." },
      { status: 400 },
    );
  }

  if (email && !isValidEmail(email)) {
    return Response.json({ message: "Please check the email address." }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return Response.json({ message: "Please tell me a little more about what you would like to discuss." }, { status: 400 });
  }

  try {
    await createContactSubmission({ name, email, telegram, discord, message });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json(
      { message: "I could not save your message right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
