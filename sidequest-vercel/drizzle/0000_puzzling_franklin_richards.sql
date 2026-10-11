CREATE TABLE `quests` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`description` text NOT NULL,
	`url` text NOT NULL,
	`category` text NOT NULL,
	`reward` integer NOT NULL,
	`slots` integer NOT NULL,
	`minutes` integer NOT NULL,
	`steps` text NOT NULL,
	`criteria` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`wallet` text NOT NULL,
	`expires` integer NOT NULL,
	`message` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`quest_id` text NOT NULL,
	`wallet` text NOT NULL,
	`answers` text NOT NULL,
	`rating` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`reason` text DEFAULT '' NOT NULL,
	`signature` text,
	`created` integer NOT NULL,
	FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `one_submission_per_wallet` ON `submissions` (`quest_id`,`wallet`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_payout_signature` ON `submissions` (`signature`);