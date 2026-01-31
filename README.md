# KILL LIST

A John Wick-themed productivity PWA built with SvelteKit. Execute your tasks with ruthless efficiency.

## Features

- **Hybrid Storage**: IndexedDB (local-first) or Postgres (Railway) via API for multi-device sync and n8n access
- **GPU-Accelerated Swipe**: Swipe right to complete tasks with buttery smooth 60fps animations
- **Spacebar Trigger** (Desktop): Hold spacebar to charge, release to execute the top contract
- **Cinematic Oath Screen**: Blood oath ritual that unlocks Web Audio
- **PWA Ready**: Install as a standalone app on mobile and desktop

## Tech Stack

- **Framework**: SvelteKit 2 with TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Dexie.js (IndexedDB) + Postgres (Railway)
- **Audio**: Web Audio API (synthesized sounds)
- **Build**: Vite

## Installation

```bash
# Remove old Next.js dependencies
rm -rf node_modules package-lock.json

# Install fresh dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── lib/
│   ├── db.ts                    # Dexie IndexedDB configuration
│   ├── audio.ts                 # Audio manager singleton
│   ├── stores/
│   │   └── contracts.ts         # Svelte stores with optimistic updates
│   └── components/
│       ├── ContractCard.svelte  # Swipeable task card
│       ├── OathScreen.svelte    # Cinematic onboarding
│       └── TriggerIndicator.svelte # Spacebar charge UI
├── routes/
│   ├── +layout.svelte           # Global layout + keyboard bindings
│   └── +page.svelte             # Main contracts list
├── app.html                     # HTML template with PWA meta
└── app.css                      # Global styles + Tailwind
```

## Design System

- **Background**: `#050505` (Obsidian Black)
- **Accent**: `#D4AF37` (Continental Gold)
- **Danger**: `#DC2626` (Blood Red)
- **Surface**: `#1A1A1A` (Gunmetal)
- **Typography**: Cinzel (headings), JetBrains Mono (body)

## Performance Optimizations

1. **Optimistic Updates**: UI updates instantly, DB writes async
2. **GPU Compositing**: `transform: translate3d()` + `will-change: transform`
3. **Touch Optimization**: `touch-action: pan-y` prevents scroll jank
4. **Lazy Audio**: AudioContext only created after user interaction

## PWA Installation

The app can be installed as a PWA:
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Install App
- **Desktop**: Chrome → Address bar install icon

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type check
```

## Railway Postgres + n8n

To run the app against a Railway Postgres database (and make the data available to n8n):

1. Create a Railway project and add a Postgres service.
2. Add these environment variables to the Railway service running the app:
   - `DATABASE_URL` = Railway's Postgres connection string
   - `DATABASE_SSL=true` (recommended for Railway)
   - `PUBLIC_STORAGE_MODE=postgres`
3. Deploy the app. The API will auto-create `contracts` and `settings` tables on first request.

n8n can connect directly to the same Railway Postgres instance (use the same `DATABASE_URL` details)
and query the `contracts` and `settings` tables for automations.

To keep the local IndexedDB mode for offline use in development, set `PUBLIC_STORAGE_MODE=local` or run in dev mode. In production builds, the app defaults to Postgres unless you explicitly set `PUBLIC_STORAGE_MODE=local`.

## API Endpoints

### Contracts

`GET /api/contracts`
- Query params: `status` (optional), `targetDate` (optional, `YYYY-MM-DD`)
- Response: Array of contracts

`POST /api/contracts`
- Body: `{ title, id?, targetDate?, terminusTime?, priority?, status?, createdAt?, killedAt?, acceptedAt?, order?, frozenUntil? }`
- `title` required
- Response: Created contract

`DELETE /api/contracts`
- Body: `{ ids: string[] }`
- Response: `{ success: true }`

`PATCH /api/contracts/:id`
- Body: partial contract fields (any of: `title, targetDate, terminusTime, priority, status, createdAt, killedAt, acceptedAt, order, frozenUntil`)
- Response: Updated contract

`DELETE /api/contracts/:id`
- Response: `{ success: true }`

### Settings

`GET /api/settings`
- Response: `{ id: "settings", onboardingComplete, vaultCount }`

`PATCH /api/settings`
- Body: `{ onboardingComplete?, vaultCount? }`
- Response: Updated settings

### Secure Uplink

`POST /api/uplink`
- Body: `{ message: string, metadata: { appVersion?, platform?, deviceModel?, bodyCount? } }`
- Sends email via Resend
- Response: `{ success: true, id }`
- Requires env vars: `RESEND_API_KEY`, `UPLINK_RECIPIENT_EMAIL`

### Webhooks

`POST /api/webhooks/burn`
- Body: Any JSON payload (forwarded to n8n)
- Response: `{ ok: true }` or `{ skipped: true, reason: "N8N_BURN_WEBHOOK_URL not set" }`
- Requires env var: `N8N_BURN_WEBHOOK_URL`

## License

MIT



