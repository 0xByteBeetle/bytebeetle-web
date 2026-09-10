import { timingSafeEqual } from "node:crypto";
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export default {
  async fetch(request, env) {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/notify") return json({ error: "Not found" }, 404);
    if (!env.MAILER_TOKEN) return json({ error: "Unavailable" }, 503);
    const encode = new TextEncoder();
    const [provided, expected] = await Promise.all([
      crypto.subtle.digest("SHA-256", encode.encode(request.headers.get("authorization") || "")),
      crypto.subtle.digest("SHA-256", encode.encode("Bearer " + env.MAILER_TOKEN)),
    ]);
    if (!timingSafeEqual(new Uint8Array(provided), new Uint8Array(expected))) return json({ error: "Unauthorized" }, 401);
    if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "JSON required" }, 415);
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ error: "Body required" }, 400);
      let length = 0;
      const chunks = [];
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 16384) { await reader.cancel(); return json({ error: "Too large" }, 413); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      data = JSON.parse(new TextDecoder().decode(bytes));
    } catch { return json({ error: "Invalid request" }, 400); }
    if (!data || typeof data !== "object" || typeof data.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(data.id) || typeof data.message !== "string" || data.message.length < 10 || data.message.length > 4000) return json({ error: "Invalid request" }, 400);
    for (const [key, limit] of [["name",100],["email",254],["telegram",64],["discord",64]]) {
      if (data[key] != null && (typeof data[key] !== "string" || data[key].length > limit || /[\r\n]/.test(data[key]))) return json({ error: "Invalid contact details" }, 400);
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ error: "Invalid email" }, 400);
    const hash = await crypto.subtle.digest("SHA-256", encode.encode(data.email || data.telegram || data.discord || "anonymous"));
    const key = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2,"0")).join("");
    if (!(await env.PER_CONTACT.limit({ key })).success || !(await env.GLOBAL_LIMIT.limit({ key: "notifications" })).success) return json({ error: "Rate limited" }, 429);
    try {
      const result = await env.EMAIL.send({
        to: "bytebeetle1@gmail.com",
        from: "notifications@0xbytebeetle.com",
        ...(data.email ? { replyTo: data.email } : {}),
        subject: "New 0xByteBeetle enquiry",
        text: ["Name: " + (data.name || "Not provided"), "Email: " + (data.email || "Not provided"), "Telegram: " + (data.telegram || "Not provided"), "Discord: " + (data.discord || "Not provided"), "", data.message, "", "Request: " + data.id, "Private inbox: https://0xbytebeetle.com/inbox"].join("\n"),
      });
      console.log(JSON.stringify({ event: "notification_sent", requestId: data.id }));
      return json({ ok: true, messageId: result?.messageId ?? null });
    } catch (error) {
      console.error(JSON.stringify({ event: "notification_failed", requestId: data.id, code: typeof error?.code === "string" ? error.code : "EMAIL_SEND_FAILED" }));
      return json({ error: "Delivery failed" }, 502);
    }
  },
};
