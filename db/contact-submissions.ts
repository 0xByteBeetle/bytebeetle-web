import {
  CONTACT_SUBMISSIONS_CREATED_AT_INDEX_SQL,
  CONTACT_SUBMISSIONS_STATUS_INDEX_SQL,
  CONTACT_SUBMISSIONS_TABLE_SQL,
} from "./schema";

const RETENTION_DAYS = 180;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

export type ContactSubmission = {
  id: string;
  created_at: number;
  name: string | null;
  email: string | null;
  telegram: string | null;
  discord: string | null;
  message: string;
  status: "new" | "replied" | "archived";
};

type DbEnv = { DB?: D1Database };

async function getDb(): Promise<D1Database> {
  const { env } = await import("cloudflare:workers");
  const db = (env as unknown as DbEnv).DB;
  if (!db) throw new Error("Contact database is unavailable");
  return db;
}

async function prepareContactDatabase(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(CONTACT_SUBMISSIONS_TABLE_SQL),
    db.prepare(CONTACT_SUBMISSIONS_CREATED_AT_INDEX_SQL),
    db.prepare(CONTACT_SUBMISSIONS_STATUS_INDEX_SQL),
  ]);

  await db
    .prepare("DELETE FROM contact_submissions WHERE created_at < ?1")
    .bind(Date.now() - RETENTION_MS)
    .run();
}

export async function createContactSubmission(input: {
  name: string | null;
  email: string | null;
  telegram: string | null;
  discord: string | null;
  message: string;
}): Promise<void> {
  const db = await getDb();
  await prepareContactDatabase(db);
  await db
    .prepare(`
      INSERT INTO contact_submissions
        (id, created_at, name, email, telegram, discord, message, status)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'new')
    `)
    .bind(
      crypto.randomUUID(),
      Date.now(),
      input.name,
      input.email,
      input.telegram,
      input.discord,
      input.message,
    )
    .run();
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  await prepareContactDatabase(db);
  const result = await db
    .prepare(`
      SELECT id, created_at, name, email, telegram, discord, message, status
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 250
    `)
    .all<ContactSubmission>();
  return result.results;
}

export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmission["status"],
): Promise<void> {
  const db = await getDb();
  await prepareContactDatabase(db);
  await db
    .prepare("UPDATE contact_submissions SET status = ?1 WHERE id = ?2")
    .bind(status, id)
    .run();
}
