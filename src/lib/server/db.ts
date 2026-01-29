import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function shouldUseSsl(databaseUrl: string | undefined): boolean {
  if (!databaseUrl) return false;
  if (env.DATABASE_SSL === 'true') return true;

  const lower = databaseUrl.toLowerCase();
  return !lower.includes('localhost') && !lower.includes('127.0.0.1');
}

export function getPool(): Pool {
  if (pool) return pool;

  const databaseUrl = env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  pool = new Pool({
    connectionString: databaseUrl,
    ssl: shouldUseSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined
  });

  return pool;
}

export async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;

  schemaReady = (async () => {
    const client = await getPool().connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS contracts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          target_date TEXT,
          terminus_time TEXT,
          priority TEXT NOT NULL,
          status TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          killed_at TIMESTAMPTZ,
          accepted_at TIMESTAMPTZ,
          order_index INTEGER,
          frozen_until TIMESTAMPTZ
        );
      `);

      await client.query(`
        CREATE INDEX IF NOT EXISTS contracts_target_status_idx
          ON contracts (target_date, status);
      `);

      await client.query(`
        CREATE INDEX IF NOT EXISTS contracts_status_idx
          ON contracts (status);
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS settings (
          id TEXT PRIMARY KEY,
          onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,
          vault_count INTEGER NOT NULL DEFAULT 0
        );
      `);

      await client.query(`
        INSERT INTO settings (id, onboarding_complete, vault_count)
        VALUES ('settings', FALSE, 0)
        ON CONFLICT (id) DO NOTHING;
      `);
    } finally {
      client.release();
    }
  })();

  return schemaReady;
}
