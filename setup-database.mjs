import { createClient } from '@libsql/client/web';
import { readFileSync } from 'node:fs';
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) throw new Error('Set both Turso variables in .env.local first.');
const client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
// Bootstrap a NEW empty database once. Existing data is never dropped.
const sql = readFileSync(new URL('../drizzle/0000_puzzling_franklin_richards.sql', import.meta.url), 'utf8');
const statements = sql.split(';').map(s => s.replace(/--> statement-breakpoint/g, '').trim()).filter(Boolean);
try {
  await client.batch(statements, 'write');
  console.log('SideQuest database tables created.');
} finally { client.close(); }
