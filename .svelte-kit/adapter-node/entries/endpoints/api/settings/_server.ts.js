import { json } from "@sveltejs/kit";
import { e as ensureSchema, g as getPool } from "../../../../chunks/db.js";
const SELECT_COLUMNS = `
  id,
  onboarding_complete AS "onboardingComplete",
  vault_count AS "vaultCount"
`;
const GET = async () => {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT ${SELECT_COLUMNS} FROM settings WHERE id = 'settings'`
  );
  if (rows.length === 0) {
    return json({ id: "settings", onboardingComplete: false, vaultCount: 0 });
  }
  return json(rows[0]);
};
const PATCH = async ({ request }) => {
  await ensureSchema();
  const updates = await request.json();
  if (!updates || typeof updates !== "object") {
    return json({ error: "Invalid payload" }, { status: 400 });
  }
  const setClauses = [];
  const values = [];
  if (Object.prototype.hasOwnProperty.call(updates, "onboardingComplete")) {
    values.push(updates.onboardingComplete);
    setClauses.push(`onboarding_complete = $${values.length}`);
  }
  if (Object.prototype.hasOwnProperty.call(updates, "vaultCount")) {
    values.push(updates.vaultCount);
    setClauses.push(`vault_count = $${values.length}`);
  }
  if (setClauses.length === 0) {
    return json({ error: "No valid fields provided" }, { status: 400 });
  }
  values.push("settings");
  const { rows } = await getPool().query(
    `
      UPDATE settings
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length}
      RETURNING ${SELECT_COLUMNS}
    `,
    values
  );
  return json(rows[0]);
};
export {
  GET,
  PATCH
};
