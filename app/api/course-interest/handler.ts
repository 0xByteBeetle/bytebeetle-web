const courses = {
  "evm-engineering": "EVM Engineering Bootcamp",
  "advanced-evm": "Advanced EVM Bootcamp",
};

export type CourseRequest = {
  name: string | null;
  email: string;
  telegram: null;
  discord: null;
  message: string;
};

export async function handleCourseInterest(request: Request, save: (input: CourseRequest) => Promise<void>) {
  const json = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ message: "Please submit the form again." }, 415);
  let payload;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ message: "Please check your details and try again." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); return json({ message: "This request is too large." }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return json({ message: "Please check your details and try again." }, 400); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json({ message: "Please check your details and try again." }, 400);
  if (typeof payload.website === "string" && payload.website.trim()) return json({ ok: true });
  if (typeof payload.course !== "string" || !Object.hasOwn(courses, payload.course)) return json({ message: "Please use a bootcamp’s interest form." }, 400);
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ message: "Please enter a valid email address." }, 400);
  if (name.length > 100 || /[\r\n]/.test(name)) return json({ message: "Please enter your name on one line, under 100 characters." }, 400);
  const startedAt = payload.startedAt;
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt) || startedAt <= 0 || Date.now() - startedAt < 1500) {
    return json({ message: "Please wait a moment, then submit again." }, 429);
  }
  const course = courses[payload.course as keyof typeof courses];
  try {
    await save({ name: name || null, email, telegram: null, discord: null, message: `Course enquiry: ${course}\n\nPlease contact me by email about this bootcamp. This is not a newsletter subscription.` });
    return json({ ok: true });
  } catch {
    return json({ message: "Your request could not be saved. Please try again, or email me directly." }, 503);
  }
}
