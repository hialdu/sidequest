import { createClient } from '@libsql/client/web';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema';
let db: LibSQLDatabase<typeof schema> | undefined;
export function getDb() {
  if (db) return db;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) throw new Error('Database is not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Vercel.');
  db = drizzle(createClient({ url, authToken }), { schema });
  return db;
}
