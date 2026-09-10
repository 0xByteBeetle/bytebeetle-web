import { createContactSubmission } from "@/db/contact-submissions";
import { handleCourseInterest } from "./handler";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleCourseInterest(request, createContactSubmission);
}
