import { getChatGPTUser } from "@/app/chatgpt-auth";
import { isInboxOwner } from "@/app/owner-auth";
import { updateContactSubmissionStatus } from "@/db/contact-submissions";

export const dynamic = "force-dynamic";

const statuses = new Set(["new", "replied", "archived"]);

export async function POST(request: Request): Promise<Response> {
  const user = await getChatGPTUser();
  if (!user || !(await isInboxOwner(user))) return new Response("Forbidden", { status: 403 });

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== requestUrl.origin) return new Response("Forbidden", { status: 403 });

  const formData = await request.formData();
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string" || !statuses.has(status)) {
    return new Response("Invalid request", { status: 400 });
  }

  await updateContactSubmissionStatus(
    id,
    status as "new" | "replied" | "archived",
  );
  return Response.redirect(new URL("/inbox", request.url), 303);
}
