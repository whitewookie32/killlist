import { json } from "@sveltejs/kit";
import { e as ensureSchema, g as getPool } from "../../../../chunks/db.js";
import { randomUUID } from "crypto";
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
const GET = async ({ url }) => {
  await ensureSchema();
  const status = url.searchParams.get("status");
  const targetDate = url.searchParams.get("targetDate");
  const conditions = [];
  const values = [];
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  if (targetDate) {
    values.push(targetDate);
    conditions.push(`target_date = $${values.length}`);
  }
  let query = `SELECT ${SELECT_COLUMNS} FROM contracts`;
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }
  query += " ORDER BY created_at DESC";
  const { rows } = await getPool().query(query, values);
  return json(rows);
};
const POST = async ({ request }) => {
  await ensureSchema();
  const payload = await request.json();
  if (!payload?.title) {
    return json({ error: "title is required" }, { status: 400 });
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const record = {
    id: payload.id ?? randomUUID(),
    title: payload.title,
    targetDate: payload.targetDate ?? null,
    terminusTime: payload.terminusTime ?? null,
    priority: payload.priority ?? "normal",
    status: payload.status ?? "registry",
    createdAt: payload.createdAt ?? now,
    killedAt: payload.killedAt ?? null,
    acceptedAt: payload.acceptedAt ?? null,
    order: payload.order ?? null,
    frozenUntil: payload.frozenUntil ?? null
  };
  const { rows } = await getPool().query(
    `
      INSERT INTO contracts (
        id,
        title,
        target_date,
        terminus_time,
        priority,
        status,
        created_at,
        killed_at,
        accepted_at,
        order_index,
        frozen_until
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING ${SELECT_COLUMNS}
    `,
    [
      record.id,
      record.title,
      record.targetDate,
      record.terminusTime,
      record.priority,
      record.status,
      record.createdAt,
      record.killedAt,
      record.acceptedAt,
      record.order,
      record.frozenUntil
    ]
  );
  return json(rows[0], { status: 201 });
};
const DELETE = async ({ request }) => {
  await ensureSchema();
  const payload = await request.json();
  const ids = Array.isArray(payload?.ids) ? payload.ids : [];
  if (ids.length === 0) {
    return json({ error: "ids array is required" }, { status: 400 });
  }
  await getPool().query("DELETE FROM contracts WHERE id = ANY($1::text[])", [ids]);
  return json({ success: true });
};
export {
  DELETE,
  GET,
  POST
};
