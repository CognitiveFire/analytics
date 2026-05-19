# Comprehensive Workspace Architecture Map

## Project Overview
**Name:** Signal Room | Apriil  
**Type:** Next.js 15 (App Router) operational intelligence platform  
**Language:** Norwegian (Bokmål) with English support  
**Database:** PostgreSQL (via Prisma ORM)  
**Key Services:** Google Cloud BigQuery, OpenAI GPT (analysis/recommendations)  
**Mode:** **READ-ONLY** - No direct modifications to Google Ads (analysis only)

---

## 1. ALL ROUTES & PAGES

### Main Platform Pages (app/)

| Route | File | Purpose | Language Support | Notes |
|-------|------|---------|-------------------|-------|
| `/` | `app/page.tsx` | Landing page | Yes (nb/en) | Feature overview, link to dashboard |
| `/dashboard` | `app/dashboard/page.tsx` | Main platform dashboard | Yes | KPIs, trends, AI insights (demo account only) |
| `/clients` | `app/clients/page.tsx` | Client management | Yes | List clients, add new clients |
| `/reports` | `app/reports/page.tsx` | Executive reporting portal | Yes | Report methodology guide + templates |
| `/seo` | `app/seo/page.tsx` | SEO data upload (Screaming Frog) | Yes | CSV import, crawl status, health panel |
| `/tasks` | `app/tasks/page.tsx` | Task prioritization engine | Yes | Operational task list, completed tasks |
| `/settings` | `app/settings/page.tsx` | Platform configuration | Yes | Connector orchestration overview |
| `/settings/connectors` | `app/settings/connectors/page.tsx` | Connector wizard | No i18n | Multi-step setup for data sources |

### Ads Sub-Routes (app/ads/)

| Route | File | Purpose | Language Support | Notes |
|-------|------|---------|-------------------|-------|
| `/ads` | `app/ads/page.tsx` | Redirect to ads/dashboard | - | Simple redirect |
| `/ads/dashboard` | `app/ads/dashboard/page.tsx` | Ads operational intelligence | Yes | KPIs, strategic findings, tasks (demo only) |
| `/ads/recommendations` | `app/ads/recommendations/page.tsx` | AI recommendations review | Yes | Recommendation cards with approval actions |
| `/ads/execution` | `app/ads/execution/page.tsx` | Execution preview & approval | Yes | **READ-ONLY**: Manual review workflow |
| `/ads/campaigns` | `app/ads/campaigns/page.tsx` | Campaign list | Exists | Not fully detailed in source |
| `/ads/history` | `app/ads/history/page.tsx` | Audit log of all actions | Yes | Recommendation gen, approvals, executions |
| `/ads/settings` | `app/ads/settings/page.tsx` | Ads-specific settings | Exists | Not fully detailed in source |

---

## 2. ALL API ENDPOINTS

### Data Collection Endpoints (GET)

| Endpoint | Method | Purpose | Auth | Returns |
|----------|--------|---------|------|---------|
| `/api/clients` | GET | List all clients (static + stored) | No | `{ clients: Client[] }` |
| `/api/ads/recommendations` | GET | Generate/retrieve recommendations | Yes (Ads auth) | `{ recommendations: Recommendation[], summary: string }` |
| `/api/ads/history` | GET | List audit logs for account | Yes (Ads auth) | `{ entries: AuditLogEntry[] }` |
| `/api/connectors/google-ads` | GET | Get Google Ads connector state | No | `{ state: { connected, selectedAccounts } }` |
| `/api/connectors/wizard-state` | GET | Get connector wizard state | No | `{ state: PersistedWizardState }` |
| `/api/seo/screamingfrog/upload` | GET | Get SEO upload state for account | No | `{ result: ScreamingFrogUploadResult }` |

### Data Modification Endpoints (POST)

| Endpoint | Method | Purpose | Auth | Request Body | Notes |
|----------|--------|---------|------|--------------|-------|
| `/api/clients` | POST | Create new client | No | `{ name, industry, region, logoMark? }` | Validates duplicates |
| `/api/ads/execution/preview` | POST | Build execution preview | Yes (Ads auth) | `{ recommendationId?, accountId? }` | Returns proposed changes |
| `/api/ads/execution/apply` | POST | **DEPRECATED/DISABLED** | - | - | Returns 403 - read-only mode |
| `/api/connectors/google-ads` | POST | Save Google Ads state | No | `{ clientId, connected, selectedAccounts }` | Tracks connector setup |
| `/api/connectors/wizard-state` | POST | Save wizard step state | No | `{ clientId, step, completed, state }` | Persists progress |
| `/api/seo/screamingfrog/upload` | POST | Upload Screaming Frog CSVs | No | FormData: `{ account, files[] }` | Processes 7 CSV types |

### Key Constraints
- **No actual Google Ads modifications** - `/api/ads/execution/apply` is disabled (returns 403)
- **Demo account only** - Real data only available for demo account (others show placeholder messages)
- **Authorization**: Some endpoints require `authorizeAdsRequest()` with roles: `viewer`, `reviewer`, `executor`, `admin`

---

## 3. USER-FACING TEXT & INTERNATIONALIZATION

### Current i18n Setup
- **Type:** Simple inline language checks (not using i18n library)
- **Supported Languages:** 
  - `nb` (Norwegian Bokmål) - Default
  - `en` (English)
- **Language Resolution:** `resolveAdsLanguage()` from `lib/ads/ui-language.ts`
  - Checks query param `?lang=en` first
  - Falls back to `localStorage["signal-room-language"]`
  - Defaults to `nb`

### All User-Facing Text Strings (by category)

#### Navigation & Layout
| Norwegian | English | Location |
|-----------|---------|----------|
| Oversikt | Overview | Main nav |
| Ads | Ads | Main nav |
| SEO | SEO | Main nav |
| Kunder | Clients | Main nav |
| Rapporter | Reports | Main nav |
| Innstillinger | Settings | Main nav |
| Signal Room | Signal Room | Header |
| Operasjonell innsikt fra Apriil | Operational insight from Apriil | Header tagline |

#### Dashboard Page (`/dashboard`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Ingen seeded data for valgt kunde | No seeded data for selected client | Demo-only warning |
| Oversikt | Overview | Section title |
| Kundeportefølje | Client portfolio | Clients page heading |
| Operasjonell innsikt på tvers av kunder | Operational insights across clients | Clients subtitle |
| Helse | Health | Client card badge label |
| Rapportstatus | Report status | Client card field |
| ROAS-trend | ROAS trend | Chart title |
| Kostnadseffektivitet | Cost efficiency | Chart title |
| Konverteringskvalitet | Conversion quality | Chart title |
| Attribusjonstrend | Attribution trend | Chart title |

#### Ads Dashboard (`/ads/dashboard`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Operasjonell lederinnsikt | Executive Operational Intelligence | Card heading |
| Strategiske funn | AI Strategic Findings | Findings panel |
| Kommersielt fokuserte funn utformet for menneskestyrt planlegging | Commercially focused findings designed for human-supervised execution planning | Panel description |

#### Recommendations Page (`/ads/recommendations`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Gjennomgang av anbefalinger | Recommendation Review | Page heading |
| Anbefalingene er AI-assisterte og støttet av deterministiske signaler | Recommendations are AI-assisted and deterministic-signal-backed | Description |
| Manuell godkjenning kreves alltid før utførelse | Manual approval is always required before execution | Note |
| Effekt | Impact | Badge label |
| Sikkerhet | Confidence | Badge label |
| Kompleksitet | Complexity | Badge label |
| Prioritet | Priority | Badge label |
| Se endringer | Review Changes | Button |
| Rediger anbefaling | Edit Recommendation | Button |
| Godkjenn utførelse | Approve Execution | Button |
| Avvis | Reject | Button |

#### Execution Page (`/ads/execution`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Read-Only Mode | Read-Only Mode | Card title |
| Signal Room opererer i read-only-modus | Signal Room operates in read-only mode | Description |
| Analyse- og samlingsfunksjonalitet er aktivert | Analysis and collection functionality is enabled | Status message |
| Utførelseskapabilitet er deaktivert | Execution capability is disabled | Status message |
| For å implementere anbefalinger, eksporter resultatene | To implement recommendations, export the results | Instructions |
| Gjennomgå analysegrunnlag | Review analysis reasoning | Workflow step |
| Inspiser anbefalingsdetaljer | Inspect recommendation details | Workflow step |
| Vurdere hvordan endringene bør implementeres manuelt | Decide how changes should be manually implemented | Workflow step |
| Eksporter rapport | Export report | Workflow step |

#### History/Audit Page (`/ads/history`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Revisjonshistorikk | Audit History | Page heading |
| Full sporbarhet på tvers av anbefalingsgenerering | Full traceability across recommendation generation | Description |
| Anbefaling generert | Recommendation generated | Audit type |
| AI-resonnering lagret | AI reasoning snapshot saved | Audit type |
| Anbefaling godkjent | Recommendation approved | Audit type |
| Anbefaling avvist | Recommendation rejected | Audit type |
| Utførelse forhåndsvist | Execution previewed | Audit type |
| Utførelse gjennomført | Execution applied | Audit type |
| Rollback opprettet | Rollback created | Audit type |

#### Reports Page (`/reports`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Rapporteringsoversikt | Reporting overview | Section label |
| Lederportal for rapportering | Executive reporting portal | Page heading |
| Denne rapporten viser resultatutvikling | This report shows performance trends | Description |
| Rapportmetodikk | Report methodology | Card heading |
| Slik fungerer det | How it works | Badge |
| Datakilder | Data sources | Section |
| Sammendrag for ledelsen | Executive Summary | Report section |
| Betalt medierapport - KPI | Paid Media Report - KPI | Report section |
| Betalte medier-anbefalinger | Paid Media Recommendations | Report section |
| SEO-resultatrapport | SEO Performance Report | Report section |
| Operasjonelle anbefalinger | Operational Recommendations | Report section |
| Kanalovergripende innsikt | Cross-channel insight | Report section |
| Kundevennlig kommentar | Client-friendly commentary | Report section |
| Strategifaglig gjennomgang | Strategic review | QA step |
| Kvalitetssikring | Quality assurance | QA step |
| Godkjenning og distribusjon | Approval and distribution | QA step |

#### SEO Page (`/seo`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Apriil signal room | Apriil signal room | Label |
| Importer Screaming Frog-eksporter | Import Screaming Frog exports | Page heading |
| SEO-data leveres som et kuratert CSV-opplastingssett | SEO data is delivered as a curated CSV upload set | Description |
| Konto | Account | Card label |
| Crawl-dato | Crawl date | Card label |
| Opplastingsstatus | Upload status | Card label |
| Siste crawl er behandlet | Latest crawl processed | Status message |
| Sammenligning | Comparison | Card label |
| Sammenlignes med 30. apr 2026 | Compared to Apr 30 2026 | Status |
| Aktiv konto | Active account | Section label |
| Screaming Frog-opplastinger knyttes til | Screaming Frog uploads linked to | Description |

#### Tasks Page (`/tasks`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Oppgavemotor | Task engine | Section label |
| Operasjonell oppgaveprioritering | Operational task prioritization | Page heading |
| Prioriterte SEO-, PPC-, sporing-tiltak | Prioritized SEO, PPC, tracking actions | Description |
| Operasjonell oppgavemotor | Operational task engine | Table heading |
| Prioritetsscore = (Effekt x Sikkerhet x Skala) / Kompleksitet | Priority score formula | Description |
| Oppgave | Task | Table column |
| Kategori | Category | Table column |
| Prioritet | Priority | Table column |
| Score | Score | Table column |
| Forretningseffekt | Business effect | Table column |
| Begrunnelse | Reasoning | Table column |
| Høy | High | Priority level |
| Middels | Medium | Priority level |
| Lav | Low | Priority level |

#### Task Categories
| Category | Norwegian | English |
|----------|-----------|---------|
| seo | SEO | SEO |
| ppc | PPC | PPC |
| tracking | Sporing | Tracking |
| attribution | Attribusjon | Attribution |
| landing-page | Landingsside | Landing page |
| bidding | Budgivning | Bidding |

#### Settings Page (`/settings`)
| Norwegian | English | Context |
|-----------|---------|---------|
| Plattforminnstillinger | Platform settings | Section label |
| Konfigurasjon av data og brukeropplevelse | Data and experience configuration | Page heading |
| Koblingsorkestrering | Connector orchestration | Card heading |
| Signal Room synkroniserer bearbeidede data | Signal Room syncs processed data | Description |
| Åpne koblingsveiviser | Open connector wizard | Button |

#### Clients/Add Client Dialog
| Norwegian | English | Context |
|-----------|---------|---------|
| Legg til kunde | Add Client | Button |
| Ny kunde | New client | Dialog heading |
| Kundenavn | Client name | Form label |
| Ukjent feil | Unknown error | Error message |
| Noe gikk galt | Something went wrong | Error message |

#### Language/Theme Controls
| Norwegian | English | Context |
|-----------|---------|---------|
| Lukk | Close | aria-label for close button |

---

## 4. COMPLETE ARCHITECTURE & DATA FLOW

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 FRONTEND                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Pages & Client Components                 │  │
│  │  - Dashboard (KPI trends, AI insights)               │  │
│  │  - Ads Module (recommendations → execution flow)    │  │
│  │  - Reports (executive summaries)                     │  │
│  │  - SEO (Screaming Frog CSV uploads)                  │  │
│  │  - Tasks (prioritized operations)                    │  │
│  │  - Settings/Connectors (data source config)          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        State Management & Persistence                │  │
│  │  - Zustand stores (platform, ads)                    │  │
│  │  - localStorage (language, wizard state)             │  │
│  │  - Client-side form state                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS API ROUTES                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Data Collection & Retrieval                         │  │
│  │  - /api/ads/recommendations (AI-generated)           │  │
│  │  - /api/ads/history (audit logs)                     │  │
│  │  - /api/connectors/google-ads (connector state)      │  │
│  │  - /api/seo/screamingfrog/upload (SEO CSV parse)    │  │
│  │  - /api/clients (client management)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Execution (DISABLED IN READ-ONLY MODE)              │  │
│  │  - /api/ads/execution/apply → 403 Forbidden          │  │
│  │  - /api/ads/execution/preview (dry-run only)         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Configuration Persistence                           │  │
│  │  - /api/connectors/wizard-state (save progress)      │  │
│  │  - /api/connectors/google-ads (save selection)       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               BUSINESS LOGIC LAYER (lib/)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Analysis Engine (lib/analysis/)                     │  │
│  │  - runAdsAnalysis() fetches from Google Ads API      │  │
│  │  - 5 analysis types:                                 │  │
│  │    • Bid strategy analysis                           │  │
│  │    • Campaign structure analysis                     │  │
│  │    • Landing page analysis                           │  │
│  │    • Search term analysis                            │  │
│  │    • Tracking quality analysis                       │  │
│  │  → AnalysisFinding[] (deterministic signals)         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AI Recommendation Generation (lib/openai/)          │  │
│  │  - generateRecommendationDrafts()                    │  │
│  │  - generateExecutiveSummary()                        │  │
│  │  - Both: Analysis → GPT → JSON with lang support    │  │
│  │  → Recommendation[] with scoring                     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Execution Planning (lib/execution/)                 │  │
│  │  - buildExecutionPreview() deterministic changes     │  │
│  │  - applyApprovedExecution() (would apply if enabled) │  │
│  │  - Mutation types:                                   │  │
│  │    • add_negative_keywords                           │  │
│  │    • pause_keywords                                  │  │
│  │    • update_campaign_budget                          │  │
│  │    • update_bid_strategy                             │  │
│  │    • update_audience_target                          │  │
│  │  → ExecutionPreview with safetyChecks & rollback     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Data Persistence (lib/server/ & lib/*)              │  │
│  │  - Recommendation repository                         │  │
│  │  - Execution repository                              │  │
│  │  - Audit log service                                 │  │
│  │  - Client store                                      │  │
│  │  - Connector wizard state                            │  │
│  │  - Google Ads connector state                        │  │
│  │  - SEO upload state                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Scoring & Prioritization (lib/scoring/)             │  │
│  │  - calculatePriorityScore(impact, confidence, etc)   │  │
│  │  - toPriorityLevel(score) → high/medium/low          │  │
│  │  - Task prioritization                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Validation & Safety (lib/validation/)               │  │
│  │  - enforceExecutionSafety()                          │  │
│  │  - enforceDualApprovalForHighRiskChanges()           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│            EXTERNAL SERVICES & DATA SOURCES                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Google Ads API (lib/google-ads/)                    │  │
│  │  - fetchCampaigns()                                  │  │
│  │  - fetchSearchTerms()                                │  │
│  │  - fetchConversions()                                │  │
│  │  - fetchBidStrategies()                              │  │
│  │  - fetchLandingPageMetrics()                         │  │
│  │  → Raw ad performance data                           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  OpenAI GPT API (lib/openai/)                        │  │
│  │  - Text analysis & generation                        │  │
│  │  - Supports: nb (Norwegian), en (English)            │  │
│  │  → Recommendations & summaries                       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Google Cloud BigQuery (lib/bigquery/)               │  │
│  │  - Cross-channel analytics data                      │  │
│  │  - GA4, Search Console, DV360, CM360 data            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Screaming Frog CSV Uploads                          │  │
│  │  - 7 CSV file types (internal_html, canonicals, etc) │  │
│  │  - Processed to SEO health & task generation         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│           DATABASE & PERSISTENCE LAYER                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL via Prisma (prisma/schema.prisma)        │  │
│  │  Tables:                                             │  │
│  │  - AdsRecommendation (id, accountId, title, ...)    │  │
│  │  - AdsExecution (id, accountId, changes, ...)        │  │
│  │  - AdsAuditLog (id, accountId, type, payload, ...)  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Local Storage (Browser)                             │  │
│  │  - signal-room-language (nb/en)                      │  │
│  │  - signal-room:connector-wizard:{clientId}           │  │
│  │  - Client controls state                             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Mock Data (lib/mock-data/)                          │  │
│  │  - For demo account & UI development                 │  │
│  │  - Recommendations, campaigns, keywords, etc.        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Data Flow: Recommendation Generation

```
User selects Ads account
         ↓
Load recommendations from DB
         ↓
If not found in DB:
  ├─ Run Ads Analysis
  │  ├─ Google Ads API: fetch campaigns, keywords, etc.
  │  └─ Analyze: bidding, structure, landing pages, tracking, search terms
  │
  ├─ Generate AI Recommendations
  │  ├─ Send findings + language instruction to GPT
  │  └─ Parse JSON response: title, reasoning, confidence, impact, etc.
  │
  ├─ Score Recommendations
  │  └─ priorityScore = (impact × confidence × scale) / complexity
  │
  └─ Save to PostgreSQL (AdsRecommendation table)
         ↓
Display recommendations with:
  - Title & reasoning
  - Confidence %
  - Impact / Complexity / Priority badges
  - Proposed actions
  - Review/Approve/Reject buttons
         ↓
User clicks "Approve Execution"
         ↓
Build execution preview with deterministic changes
         ↓
Enforce safety checks & dual approval for high-risk
         ↓
**BLOCKED IN READ-ONLY MODE** → Display "Export and implement manually"
         ↓
Audit log entry created for all actions
```

### Key Data Flow: SEO Data Upload

```
User navigates to /seo
         ↓
Load existing Screaming Frog CSV upload state
         ↓
User selects 7 CSV files:
  1. internal_html.csv (all crawled pages)
  2. response_codes.csv (HTTP status codes)
  3. page_titles.csv (title tags)
  4. h1.csv (H1 headings)
  5. canonicals.csv (canonical tags)
  6. inlinks.csv (internal links)
  7. crawl_overview.csv (crawl summary)
         ↓
POST /api/seo/screamingfrog/upload (FormData)
         ↓
Backend processes CSV files:
  - Parse each CSV
  - Detect key by filename pattern
  - Check for issues (duplicates, missing, conflicts)
  - Generate SEO health metrics
  - Generate SEO task recommendations
         ↓
Save to ScreamingFrogUploadResult with status
         ↓
Display health panel & task panel with:
  - File upload status (processed/waiting/missing)
  - SEO health indicators
  - Action items (fix titles, canonicals, etc.)
```

---

## 5. TASK & REPORT GENERATION

### Operational Task Generation

**Source:** `lib/mock-data/tasks.ts` + scoring in `lib/scoring/task-priority.ts`

**Task Types:**
- SEO (technical SEO fixes)
- PPC (bidding, campaign structure)
- Tracking (conversion tracking setup)
- Attribution (multi-touch attribution)
- Landing Page (UX/conversion optimization)
- Bidding (bid strategy changes)

**Priority Scoring Formula:**
```
priorityScore = (impact × confidence × scale) / complexity
priorityLevel = "high" | "medium" | "low" (based on score ranges)
```

**Task Fields:**
- id, title, category, priority level, priority score
- estimatedBusinessEffect, reasoning
- affectedCampaigns, proposedActions

### Report Generation

**Report Types:**
1. **Executive Summary** - Generated by GPT from Ads analysis findings
2. **Paid Media Report - KPI** - Structured KPI performance
3. **Paid Media Recommendations** - AI recommendations summary
4. **SEO Performance Report** - From Screaming Frog + crawl analysis
5. **Operational Recommendations** - Cross-channel recommendations
6. **Cross-channel Insight** - Attribution & channel overlap analysis
7. **Client-friendly Commentary** - Executive narrative

**Report Methodology:**
- **Data sources:** Google Ads, GA4, Search Console, BigQuery, Screaming Frog, CRM, DV360, CM360
- **Quality checks:** Data completeness, channel overlap, attribution quality, narrative consistency
- **QA workflow:** Strategic review → Quality assurance → Approval & distribution

---

## 6. CONNECTOR & DATA SOURCE CONFIGURATION

### Available Connectors

| Source | Type | Status | Use Cases |
|--------|------|--------|-----------|
| Google Ads | Paid | Active | Campaign data, bidding, budget, conversions |
| GA4 | Analytics | Passive | Session analysis, engagement, conversions |
| Search Console | Organic | Passive | Search visibility, queries, CTR, position |
| BigQuery | Warehouse | Passive | Cross-platform spend, impressions, frequency |
| Screaming Frog | SEO Crawl | Active Upload | Technical SEO, indexability, structure |
| CM360 | Attribution | Passive | Floodlight conversions, tracking |
| DV360 | Programmatic | Passive | Display & video spend, impressions |
| CRM Import | CRM | Passive | Lead quality, close rate, revenue attribution |

### Connector Wizard Flow
- Multi-step setup wizard (`/settings/connectors`)
- Per-client source selection
- Account/property selection per source
- Local + server-side state persistence
- Wizard state saved to: localStorage + `/api/connectors/wizard-state`
- Google Ads selection: `/api/connectors/google-ads`

---

## 7. COMPLETE USER-FACING TEXT INVENTORY

**Total Strings:** ~150+ hardcoded translations in codebase

### Categories:
- Navigation & headers (12 strings)
- Dashboard labels (15 strings)
- Page headings (8 strings)
- Report section titles (8 strings)
- Audit types (7 strings)
- Task categories (6 strings)
- Status messages & descriptions (40+ strings)
- Form labels & buttons (20+ strings)
- Chart titles (5+ strings)
- Error messages (8 strings)
- Badge labels (10+ strings)

**Translation Pattern:** Inline ternary operators
```typescript
{lang === "nb" ? "Norwegian text" : "English text"}
```

---

## 8. CURRENT LIMITATIONS & CONSTRAINTS

### Read-Only Mode
- `/api/ads/execution/apply` is **DISABLED** (returns 403)
- No direct modifications to Google Ads via API
- All recommendations are for manual review only
- Users must export and implement changes manually in Google Ads UI

### Demo Account Only
- Full data (recommendations, KPIs, analytics) only available for demo account
- Real/new clients show placeholder messages: "No seeded data available"
- Allows setup & configuration but limited analytics

### Database
- Stores: Recommendations, Executions, Audit logs, Client configs, Connector states
- Does NOT store: Raw ad data (fetched live from Google Ads API)
- Does NOT store: Raw analytics (fetched from BigQuery, GA4, Search Console)

### Language/i18n
- No external i18n library (no i18next, next-intl)
- Simple manual string selection
- Limited to 2 languages (Norwegian default, English optional)
- Would need significant refactor for additional languages

---

## 9. SUMMARY: WHAT THIS SYSTEM DOES

✅ **ENABLED:**
1. **Data Collection** - Fetches data from Google Ads API, BigQuery, GA4, Search Console, Screaming Frog CSVs
2. **Analysis** - Deterministic signal-based analysis (bid strategies, search terms, campaign structure, tracking quality, landing pages)
3. **AI Recommendations** - GPT-powered recommendation generation with reasoning, confidence, impact scoring
4. **Task Prioritization** - Operational task generation with impact-based priority scoring
5. **Report Generation** - Executive summaries, KPI reports, SEO health, cross-channel insights
6. **Audit Logging** - Full traceability of all recommendation, approval, and execution events
7. **Configuration** - Client management, connector setup, language selection, theme toggle
8. **SEO Tools** - Screaming Frog CSV import & analysis with health panels

❌ **DISABLED/NOT IMPLEMENTED:**
- Direct Google Ads API mutations (read-only mode)
- Automatic execution of recommendations
- Real data for non-demo accounts
- Advanced i18n (only 2 languages)
- User authentication/authorization (demo implementation only)
- Real-time data syncing

---

## 10. FILES REFERENCED IN THIS ANALYSIS

### Key Files by Category

**Pages:**
- `app/page.tsx`, `app/dashboard/page.tsx`, `app/ads/dashboard/page.tsx`
- `app/ads/recommendations/page.tsx`, `app/ads/execution/page.tsx`
- `app/ads/history/page.tsx`, `app/clients/page.tsx`
- `app/reports/page.tsx`, `app/seo/page.tsx`, `app/tasks/page.tsx`

**APIs:**
- `app/api/ads/recommendations/route.ts`, `app/api/ads/execution/apply/route.ts`
- `app/api/ads/execution/preview/route.ts`, `app/api/ads/history/route.ts`
- `app/api/clients/route.ts`, `app/api/seo/screamingfrog/upload/route.ts`
- `app/api/connectors/google-ads/route.ts`, `app/api/connectors/wizard-state/route.ts`

**Components:**
- Layout: `components/layout/platform-shell.tsx`, `components/layout/ads-shell.tsx`, `components/layout/platform-nav.tsx`
- Dashboard: `components/dashboard/ai-strategic-findings.tsx`, `components/dashboard/kpi-grid.tsx`
- Recommendations: `components/recommendations/recommendation-review-card.tsx`
- Execution: `components/execution/approval-workflow.tsx`, `components/execution/execution-preview-card.tsx`
- Tasks: `components/tasks/task-table.tsx`, `components/tasks/prioritized-operational-tasks.tsx`
- SEO: `components/seo/screaming-frog-uploader.tsx`, `components/seo/seo-health-panel.tsx`
- Reports: `components/reports/report-methodology-guide.tsx`, `components/reports/report-sections.tsx`

**Business Logic:**
- Analysis: `lib/analysis/run-ads-analysis.ts`, `lib/analysis/*.ts`
- Recommendations: `lib/recommendations/recommendation-generator.ts`
- Execution: `lib/execution/execution-service.ts`, `lib/execution/google-ads-mutations.ts`
- Scoring: `lib/scoring/ads-priority.ts`, `lib/scoring/task-priority.ts`
- OpenAI: `lib/openai/gpt-analysis-service.ts`, `lib/prompts/prompt-templates.ts`

**Data:**
- Types: `types/ads.ts`, `types/index.ts`
- Schema: `prisma/schema.prisma`
- Mock data: `lib/mock-data/*.ts`
- Language: `lib/ads/ui-language.ts`

---

This comprehensive map documents the complete architecture, user-facing text, API structure, data flows, and constraints of the Signal Room platform.
