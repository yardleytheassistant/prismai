# Hermes Mission Control — Setup Guide

A cyberpunk-style mission control dashboard for monitoring and commanding your Hermes agent, embedded in the PrismAI site.

## Prerequisites

- Node.js 18+
- npm or yarn
- Hermes Agent running locally (default: `http://127.0.0.1:8642`)

## Quick Start

```bash
# 1. Clone / pull the repo
git clone https://github.com/yardleytheassistant/prismai.git
cd prismai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local — set HERMES_URL and HERMES_API_KEY

# 4. Start the dev server
npm run dev

# 5. Open the app
# → http://localhost:3000
# → Click the glowing "MISSION CONTROL" button in the hero, or press Ctrl+Shift+M
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `HERMES_URL` | `http://127.0.0.1:8642` | Your Hermes API server base URL |
| `HERMES_API_KEY` | _(empty)_ | Bearer token if Hermes auth is enabled |

## Opening Mission Control

- **Button**: Glowing `MISSION CONTROL` button in the hero section
- **Keyboard**: `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac) — toggles from anywhere on the page
- **Close**: `ESC` key or the `✕` button

## Mission Control Panels

### Agent Topology (top-left)
Animated SVG graph showing the central Hermes node and all active sessions as satellite nodes. Cyan particles flow along edges indicating live message traffic. Refreshes every 5 seconds from `GET /api/sessions`.

### System Metrics (bottom-left)
Live health chips pulled from `GET /health/detailed` — status, version, model, uptime, active session count. Refreshes every 5 seconds.

### Event Stream (center)
Real-time SSE terminal displaying structured lifecycle events from a running job. Enter a `run_id` in the header bar and click **WATCH** to start streaming from `GET /v1/runs/{run_id}/events`.

Event color coding:
- **Cyan** — `tool.started`
- **Green** — `tool.completed`
- **Amber** — `run.completed`
- **Red** — errors / `run.failed`
- **Gray** — `assistant.delta` tokens

### Sessions (right)
List of active sessions from `GET /api/sessions`. Click any session to select it as the target for the command bar.

### Command Bar (bottom)
Send messages directly to any Hermes session via `POST /api/sessions/{id}/chat`. Supports command history with ↑/↓ arrow keys. Select a session in the right panel first.

## API Proxy

All browser requests go through `/api/hermes/*` (Next.js route handler at `src/app/api/hermes/[...path]/route.ts`). This keeps your `HERMES_API_KEY` server-side and avoids CORS issues.

The proxy transparently passes:
- `GET`, `POST`, `PATCH`, `DELETE` requests
- SSE streams (for live event feeds)
- Query parameters and request bodies

## Watching a Run

When Hermes starts a task, it returns a `run_id`. Paste it into the **RUN ID** field in the mission control header and click **WATCH**. The event stream will connect to `GET /v1/runs/{run_id}/events` and display all lifecycle events in real time.

To stop watching, click **STOP** next to the run ID field.

## Hermes API Endpoints Used

| Endpoint | Panel |
|---|---|
| `GET /health/detailed` | Metrics HUD |
| `GET /api/sessions` | Session Grid + Topology |
| `GET /v1/runs/{id}/events` | Event Stream (SSE) |
| `POST /api/sessions/{id}/chat` | Command Bar |
| `POST /v1/runs/{id}/stop` | (available via API) |
| `POST /v1/runs/{id}/approval` | (available via API) |

All endpoints are accessed through the local proxy at `/api/hermes/*`.
