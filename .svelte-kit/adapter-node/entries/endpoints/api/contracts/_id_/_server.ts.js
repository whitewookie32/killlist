import { json } from "@sveltejs/kit";
import { e as ensureSchema, g as getPool } from "../../../../../chunks/db.js";
const SELECT_COLUMNS = `
  id,
  title,
  target_date AS "targetDate",
  terminus_time AS "terminusTime",
  priority,
  status,
  created_at AS "createdAt",
  killed_at AS "killedAt",
  accepted_at AS "acceptedAt",
  order_index AS "order",
  frozen_until AS "frozenUntil"
`;
const FIELD_MAP = {
  title: "title",
  targetDate: "target_date",
  terminusTime: "terminus_time",
  priority: "priority",
  status: "status",
  createdAt: "created_at",
  killedAt: "killed_at",
  acceptedAt: "accepted_at",
  order: "order_index",
  frozenUntil: "frozen_until"
};
const PATCH = async ({ params, request }) => {
  await ensureSchema();
  const updates = await request.json();
  if (!updates || typeof updates !== "object") {
    return json({ error: "Invalid payload" }, { status: 400 });
  }
  const setClauses = [];
  const values = [];
  for (const [key, column] of Object.entries(FIELD_MAP)) {
    if (Object.prototype.hasOwnProperty.call(updates, key)) {
      values.push(updates[key]);
      setClauses.push(`${column} = $${values.length}`);
    }
  }
  if (setClauses.length === 0) {
    return json({ error: "No valid fields provided" }, { status: 400 });
  }
  values.push(params.id);
  const query = `
    UPDATE contracts
    SET ${setClauses.join(", ")}
    WHERE id = $${values.length}
    RETURNING ${SELECT_COLUMNS}
  `;
  const { rows } = await getPool().query(query, values);
  if (rows.length === 0) {
    return json({ error: "Contract not found" }, { status: 404 });
  }
  return json(rows[0]);
};
const DELETE = async ({ params }) => {
  await ensureSchema();
  await getPool().query("DELETE FROM contracts WHERE id = $1", [params.id]);
  return json({ success: true });
};
export {
  DELETE,
  PATCH
};
