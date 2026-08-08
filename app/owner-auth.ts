import type { ChatGPTUser } from "./chatgpt-auth";

type OwnerEnv = { INBOX_OWNER_EMAIL?: string };

export async function isInboxOwner(user: ChatGPTUser): Promise<boolean> {
  const { env } = await import("cloudflare:workers");
  const configuredEmail = (env as unknown as OwnerEnv).INBOX_OWNER_EMAIL;
  return Boolean(
    configuredEmail &&
      user.email.trim().toLowerCase() === configuredEmail.trim().toLowerCase(),
  );
}
