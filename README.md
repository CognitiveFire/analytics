# Signal Room

Premium white-labelled analytics and operational intelligence platform for Apriil.

Signal Room is intentionally positioned as an intelligence layer on top of existing reporting infrastructure such as Looker Studio, BigQuery, GA4, Google Ads, Search Console, CM360, DV360, Floodlight, and CRM systems.

## Stack

- Next.js 15 App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Zustand

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

## Connector Runtime Modes

Signal Room supports two connector modes controlled by `SIGNALROOM_CONNECTOR_MODE`:

- `mock`: use local mock connector data
- `live`: call your existing ingestion/reporting API for real snapshots

### Required env for live mode

- `SIGNALROOM_CONNECTOR_MODE=live`
- `SIGNALROOM_DATA_API_BASE_URL=https://your-ingestion-api.example.com`
- `SIGNALROOM_DATA_API_KEY=...` (optional bearer token)
- `SIGNALROOM_CONNECTOR_TIMEOUT_MS=8000`

### Live API contract expected by Signal Room

For each source (`googleAds`, `ga4`, `searchConsole`, `bigQuery`, `cm360`, `dv360`, `floodlight`, `crm`) Signal Room requests:

`GET /v1/connectors/:source/snapshot?clientId=:clientId`

Response JSON:

```json
{
	"snapshot": {
		"source": "googleAds",
		"account": "GOOGLEADS / nordic-retail",
		"metrics": {
			"spend": 12345,
			"roas": 4.9,
			"conversions": 321
		},
		"trendDelta": -2.4,
		"anomalies": ["Spend anomaly in brand segment"],
		"historySummary": "Stable with selective volatility in mobile acquisition."
	}
}
```

## Internal API route

Signal Room exposes a server route that aggregates all connectors:

`GET /api/connectors/snapshots?clientId=nordic-retail`

Implemented in [app/api/connectors/snapshots/route.ts](app/api/connectors/snapshots/route.ts).

## Build and Quality

```bash
npm run lint
npm run build
```
