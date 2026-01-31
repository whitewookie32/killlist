import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
  const webhookUrl = env.N8N_BURN_WEBHOOK_URL;
  if (!webhookUrl) {
    return json({ skipped: true, reason: 'N8N_BURN_WEBHOOK_URL not set' });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    return json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return json(
        { error: 'Webhook request failed', status: response.status, body: text },
        { status: 502 }
      );
    }
  } catch (error) {
    return json({ error: 'Webhook request failed' }, { status: 502 });
  }

  return json({ ok: true });
};
