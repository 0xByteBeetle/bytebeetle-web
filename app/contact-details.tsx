export const contactEmail = "bytebeetle1@gmail.com";

export function EmailLink({ subject }: { subject?: string }) {
  const href = `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return <a className="direct-email" href={href}>{contactEmail}</a>;
}
