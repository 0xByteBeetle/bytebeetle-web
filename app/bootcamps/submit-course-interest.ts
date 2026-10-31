import type { courseOptions } from "./course-options.mjs";

type CourseInterestPayload = {
  course: keyof typeof courseOptions;
  name: string;
  email: string;
  website: string;
  startedAt: number | null;
};

export async function submitCourseInterest(payload: CourseInterestPayload, fetcher: typeof fetch = fetch): Promise<void> {
  const response = await fetcher("/api/course-interest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.message || "Your request could not be saved. Please try again, or email me directly below.");
  }
}
