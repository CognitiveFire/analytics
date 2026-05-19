# Signal Room

Premium white-labelled analytics and operational intelligence platform for Apriil.

Signal Room is intentionally positioned as an intelligence layer on top of existing reporting infrastructure such as Looker Studio, BigQuery, GA4, Google Ads, Search Console, CM360, DV360, Floodlight, and CRM systems.

For SEO, Signal Room uses Screaming Frog CSV exports as the ingestion source. Users upload the crawl export set and Signal Room converts it into executive SEO intelligence and operational tasks.

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
- `live`: call your existing ingestion/reporting API or query BigQuery directly

### Live mode option 1: external ingestion API

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

### Live mode option 2: direct BigQuery connector (no external API)

If `SIGNALROOM_CONNECTOR_MODE=live` and `SIGNALROOM_DATA_API_BASE_URL` is empty, Signal Room automatically uses BigQuery when one of these is provided:

- `SIGNALROOM_BQ_SNAPSHOTS_TABLE`
- `SIGNALROOM_BQ_SNAPSHOT_QUERY`

BigQuery config:

- `SIGNALROOM_BIGQUERY_PROJECT_ID` (optional)
- `SIGNALROOM_BIGQUERY_LOCATION` (default: `EU`)
- `SIGNALROOM_BIGQUERY_CLIENT_EMAIL` and `SIGNALROOM_BIGQUERY_PRIVATE_KEY` (optional, use if not relying on `GOOGLE_APPLICATION_CREDENTIALS`)

#### Default table mode schema

When using `SIGNALROOM_BQ_SNAPSHOTS_TABLE=project.dataset.table`, the default query expects these columns:

- `client_id` STRING
- `source` STRING
- `snapshot_at` TIMESTAMP
- `account` STRING
- `trend_delta` FLOAT64
- `history_summary` STRING
- `anomalies` ARRAY<STRING>
- `metrics` STRUCT or JSON-like fields serializable via `TO_JSON_STRING`

#### Custom SQL mode

Set `SIGNALROOM_BQ_SNAPSHOT_QUERY` to fully control the query, using named parameters:

- `@clientId`
- `@source`

The query must return aliases:

- `account`
- `trend_delta`
- `history_summary`
- `anomalies_json` (JSON string array)
- `metrics_json` (JSON string object containing numeric values)

## Internal API route

Signal Room exposes a server route that aggregates all connectors:

`GET /api/connectors/snapshots?clientId=nordic-retail`

Implemented in [app/api/connectors/snapshots/route.ts](app/api/connectors/snapshots/route.ts).

## Screaming Frog SEO Upload

Signal Room exposes a dedicated SEO upload page at `/seo` and a server route for CSV processing:

`POST /api/seo/screamingfrog/upload`

Processed SEO uploads are stored by account in app-level server storage and can be reloaded via:

`GET /api/seo/screamingfrog/upload?account=:accountLabel`

Expected CSV export set:

- internal_html.csv
- response_codes.csv
- page_titles.csv
- h1.csv
- canonicals.csv
- inlinks.csv
- crawl_overview.csv

The processor normalizes:

- title coverage and duplicates
- H1 coverage and duplicates
- canonical issues
- redirects
- indexability and noindex counts
- inlink row volume

## Build and Quality

```bash
npm run lint
npm run build
```

## Signal Room Ads (GPT-assisted, human-supervised)

Signal Room Ads is an operational intelligence and assisted execution layer for Google Ads teams.

### Product boundaries

- Human-supervised recommendation system: yes
- Deterministic validation and safety enforcement: yes
- Manual approval workflow before mutations: yes
- Autonomous campaign mutations by GPT: no

### Deterministic vs GPT responsibilities

Deterministic services handle:

- metric calculation
- anomaly checks
- safety validation
- mutation execution scaffolding
- audit logging

GPT services handle:

- strategic reasoning
- recommendation drafting
- executive summaries
- prioritisation narratives

### Ads app routes

- `/ads/dashboard`
- `/ads/recommendations`
- `/ads/execution`
- `/ads/campaigns`
- `/ads/history`
- `/ads/settings`

### Ads API routes

- `GET /api/ads/recommendations`
- `POST /api/ads/execution/preview`
- `POST /api/ads/execution/apply`
- `GET /api/ads/history`

### Ads API auth headers

All Ads API endpoints expect user context headers (or matching local dev env defaults):

- `x-signalroom-user-id`
- `x-signalroom-role` (`viewer`, `reviewer`, `executor`, `admin`)
- `x-signalroom-account-ids` (comma-separated account IDs)

Ads API middleware enforces minimum role access across `/api/ads/*` before route handlers run.

### Execution mode

- Default mode is dry-run (`SIGNALROOM_ADS_MUTATION_MODE=dry-run`).
- Live mutation mode requires explicit env setup and approved execution requests.
- GPT never executes mutations directly.

### High-risk approval policy

- Budget changes and bid-strategy updates require dual approval.
- Primary and secondary approvers must be distinct users.
- Policy is enforced deterministically in the execution safety layer.

### Mutation contract harness

Run contract checks for Google Ads mutate payload structures:

```bash
npm run test:ads-contracts
```

### Prisma setup

1. Set `DATABASE_URL` in `.env.local`.
2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations for local development:

```bash
npm run prisma:migrate
```
