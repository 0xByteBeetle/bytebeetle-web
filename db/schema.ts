export const CONTACT_SUBMISSIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY NOT NULL,
  created_at INTEGER NOT NULL,
  name TEXT,
  email TEXT,
  telegram TEXT,
  discord TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'replied', 'archived'))
)
`;

export const CONTACT_SUBMISSIONS_CREATED_AT_INDEX_SQL = `
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
ON contact_submissions(created_at DESC)
`;

export const CONTACT_SUBMISSIONS_STATUS_INDEX_SQL = `
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_created_at
ON contact_submissions(status, created_at DESC)
`;
