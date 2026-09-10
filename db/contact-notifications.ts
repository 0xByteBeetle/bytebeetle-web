export type NotificationInput = {
  id: string;
  name: string | null;
  email: string | null;
  telegram: string | null;
  discord: string | null;
  message: string;
};

export async function deliverContactNotification(input: NotificationInput, config: { url: string; token: string }, fetcher: typeof fetch = fetch): Promise<boolean> {
  // Only this fixed owner-only relay may receive contact details or the secret.
  if (config.url !== "https://bytebeetle-contact-mailer.0xbytebeetle.workers.dev/notify" || !config.token) return false;
  try {
    const response = await fetcher(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.token}` },
      body: JSON.stringify(input),
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) { await response.body?.cancel(); return false; }
    const result = await response.json() as { ok?: boolean };
    return result.ok === true;
  } catch { return false; }
}

export async function notifyContactSubmission(input: NotificationInput): Promise<void> {
  try {
    const { env } = await import("cloudflare:workers");
    const url = Reflect.get(env, "CONTACT_MAILER_URL");
    const token = Reflect.get(env, "CONTACT_MAILER_TOKEN");
    const sent = typeof url === "string" && typeof token === "string" && await deliverContactNotification(input, { url, token });
    if (!sent) console.error(JSON.stringify({ event: "contact_notification_failed", requestId: input.id }));
  } catch {
    console.error(JSON.stringify({ event: "contact_notification_failed", requestId: input.id }));
  }
}
