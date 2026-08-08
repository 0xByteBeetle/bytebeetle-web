CREATE TABLE IF NOT EXISTS `contact_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text,
	`email` text,
	`telegram` text,
	`discord` text,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL CHECK (`status` IN ('new', 'replied', 'archived'))
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_contact_submissions_created_at` ON `contact_submissions` (`created_at` DESC);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_contact_submissions_status_created_at` ON `contact_submissions` (`status`, `created_at` DESC);
