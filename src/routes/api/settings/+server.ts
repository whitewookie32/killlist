import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ensureSchema, getPool } from '$lib/server/db';

const SELECT_COLUMNS = `
  id,
  onboarding_complete AS "onboardingComplete",
  vault_count AS "vaultCount"
`;

export const GET: RequestHandler = async () => {
  await ensureSchema();

  const { rows } = await getPool().query(
    `SELECT ${SELECT_COLUMNS} FROM settings WHERE id = 'settings'`
  );

  if (rows.length === 0) {
    return json({ id: 'settings', onboardingComplete: false, vaultCount: 0 });
  }

  return json(rows[0]);
};

export const PATCH: RequestHandler = async ({ request }) => {
  await ensureSchema();

  const updates = await request.json();
  if (!updates || typeof updates !== 'object') {
    return json({ error: 'Invalid payload' }, { status: 400 });
  }

  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (Object.prototype.hasOwnProperty.call(updates, 'onboardingComplete')) {
    values.push(updates.onboardingComplete);
    setClauses.push(`onboarding_complete = $${values.length}`);
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'vaultCount')) {
    values.push(updates.vaultCount);
    setClauses.push(`vault_count = $${values.length}`);
  }

  if (setClauses.length === 0) {
    return json({ error: 'No valid fields provided' }, { status: 400 });
  }

  values.push('settings');

  const { rows } = await getPool().query(
    `
      UPDATE settings
      SET ${setClauses.join(', ')}
      WHERE id = $${values.length}
      RETURNING ${SELECT_COLUMNS}
    `,
    values
  );

  return json(rows[0]);
};
