# CLAUDE.event.md — Ran Online Event System (Frontend)

You are a senior frontend engineer building the web interface for the Ran Online Tyranny War + KOTH event system. This is an **existing Next.js 16 project** — you must discover and follow its conventions before writing any code.

Read the full system design in `docs/war-of-three-crowns.md` before writing any code. That document is the single source of truth for all API contracts, response shapes, business rules, and frontend behavior.

---

## CRITICAL: Discover the Existing Project First

**Before creating any files, run these discovery steps and adapt to whatever you find:**

### Step 1: Scan project structure

```bash
# Root structure
ls -la
cat package.json | head -60
cat next.config.ts || cat next.config.js || cat next.config.mjs

# App router vs Pages router
ls src/app/ 2>/dev/null || ls app/ 2>/dev/null || ls pages/ 2>/dev/null

# Existing layout and providers
find . -name "layout.tsx" -not -path "*/node_modules/*" | head -20
find . -name "providers.tsx" -o -name "providers.ts" | head -10

# Styling approach
ls tailwind.config* 2>/dev/null
find . -name "*.module.css" -not -path "*/node_modules/*" | head -5
find . -name "globals.css" -o -name "global.css" | head -5
cat postcss.config* 2>/dev/null
```

### Step 2: Identify patterns in existing code

```bash
# How existing pages are structured
find . -name "page.tsx" -not -path "*/node_modules/*" | head -20

# Data fetching patterns (server components, client components, SWR, React Query, fetch)
grep -r "use client" --include="*.tsx" -l | head -10
grep -r "useSWR\|useQuery\|react-query\|@tanstack" --include="*.tsx" --include="*.ts" -l | head -10
grep -r "fetch(" --include="*.tsx" --include="*.ts" -l | head -10

# Existing API client / HTTP utility
find . -name "api.ts" -o -name "client.ts" -o -name "http.ts" -o -name "fetcher.ts" | grep -v node_modules | head -10

# Component library in use
grep -E "shadcn|radix|mantine|mui|antd|chakra|headless" package.json

# State management
grep -E "zustand|jotai|recoil|redux|@reduxjs" package.json

# Auth pattern
find . -name "auth*" -o -name "session*" -o -name "middleware.ts" | grep -v node_modules | head -10
grep -r "useSession\|getServerSession\|next-auth\|clerk\|supabase" --include="*.tsx" --include="*.ts" -l | head -10

# Existing type definitions pattern
find . -name "types.ts" -o -name "types.d.ts" -o -name "*.types.ts" | grep -v node_modules | head -10

# Existing shared components
ls src/components/ 2>/dev/null || ls components/ 2>/dev/null
```

### Step 3: Match what you find

- If the project uses App Router → use App Router with `app/events/`
- If it uses Pages Router → use `pages/events/`
- If it uses SWR → use SWR for data fetching
- If it uses React Query / TanStack → use that
- If it uses shadcn/ui → use shadcn components
- If it has a `fetcher.ts` or API client → use that, don't create a new one
- If it has a specific auth pattern → follow it exactly
- If it uses a specific folder naming convention (kebab-case, camelCase) → match it
- If it has an existing layout wrapper, sidebar, or nav → nest under it

**Do not introduce new libraries, patterns, or conventions that the project doesn't already use.** If the project uses `fetch` + SWR, don't add Axios. If it uses Tailwind, don't add CSS modules. If it uses shadcn/ui tables, don't build custom table components.

---

## Project Overview

This frontend serves two audiences:

1. **Players** — register characters, view leaderboards (guild, school, KOTH per-class), see match status, browse snapshot history
2. **Admins** — create/manage events, schedule matches, impose deductions, trigger re-tallies, view dashboard

The backend is a Rust/Axum REST API. All API response shapes are defined in `docs/war-of-three-crowns.md` Section 7.2.

---

## Route Structure

All event pages live under `/events`. Follow the existing project's router pattern (App Router or Pages Router).

### App Router layout (if project uses `app/`):

```
app/
└── events/
    ├── layout.tsx                          ← event section layout (tabs/nav for sub-pages)
    ├── page.tsx                            ← /events → current event overview + registration
    ├── register/
    │   └── page.tsx                        ← /events/register → registration form
    ├── leaderboard/
    │   ├── page.tsx                        ← /events/leaderboard → guild rankings (default)
    │   ├── guilds/
    │   │   └── page.tsx                    ← /events/leaderboard/guilds
    │   ├── schools/
    │   │   └── page.tsx                    ← /events/leaderboard/schools
    │   └── koth/
    │       └── page.tsx                    ← /events/leaderboard/koth?class=3
    └── snapshots/
        ├── page.tsx                        ← /events/snapshots → snapshot list
        └── [snapshotId]/
            └── page.tsx                    ← /events/snapshots/{id} → frozen standings

```

### Pages Router layout (if project uses `pages/`):

```
pages/
└── events/
    ├── index.tsx                            ← /events
    ├── register.tsx                         ← /events/register
    ├── leaderboard/
    │   ├── index.tsx                        ← /events/leaderboard (guilds default)
    │   ├── guilds.tsx
    │   ├── schools.tsx
    │   └── koth.tsx                         ← /events/leaderboard/koth?class=3
    └── snapshots/
        ├── index.tsx
        └── [snapshotId].tsx
```

### Shared components (place in existing component directory):

```
components/events/                          ← or wherever the project keeps shared components
├── match-status-banner.tsx                 ← "match ongoing" / "tallying" banner
├── guild-leaderboard-table.tsx             ← ranked guild table with score columns
├── school-leaderboard-card.tsx             ← school ranking cards (only 3 schools)
├── koth-leaderboard-table.tsx              ← per-class player ranking table
├── koth-class-tabs.tsx                     ← tab bar for 8 character classes
├── registration-form.tsx                   ← character select + category checkboxes
├── registration-status.tsx                 ← current registration badge/card
├── snapshot-timeline.tsx                   ← list of snapshots with rank movement
├── rank-change-indicator.tsx               ← ↑3 / ↓1 / — arrows
├── score-formula-display.tsx               ← tower + kills - deaths - deduction = score
├── event-countdown.tsx                     ← countdown to next match / registration close
└── hooks/                                  ← or use the project's existing hooks directory
    ├── use-match-status.ts                 ← poll match status, return displayStatus
    ├── use-leaderboard.ts                  ← fetch + cache leaderboard data
    ├── use-registration.ts                 ← registration CRUD
    └── use-event-admin.ts                  ← admin event/match/deduction operations
```

---

## API Integration

### Base URL

Use whatever API base URL pattern the project already uses. Look for:

- An environment variable like `NEXT_PUBLIC_API_URL` or `NEXT_PUBLIC_BACKEND_URL`
- An existing API client module
- Next.js API route proxying (`app/api/` or `pages/api/`)

### All API Endpoints (from design doc Section 7.1)

**Player endpoints:**

```typescript
// Event info
GET  /api/events/current
GET  /api/events/{eventId}/characters
GET  /api/events/{eventId}/match/status
GET  /api/events/{eventId}/matches

// Registration
POST /api/events/{eventId}/register
PUT  /api/events/{eventId}/register/{chaNum}
DELETE /api/events/{eventId}/register/{chaNum}
GET  /api/events/{eventId}/registration-status

// Leaderboards
GET  /api/events/{eventId}/leaderboard/guilds?page=1&limit=20
GET  /api/events/{eventId}/leaderboard/schools
GET  /api/events/{eventId}/leaderboard/koth?class=3&page=1&limit=20

// Snapshots
GET  /api/events/{eventId}/snapshots
GET  /api/events/{eventId}/snapshots/{sid}/guilds
GET  /api/events/{eventId}/snapshots/{sid}/koth?class=3
GET  /api/events/{eventId}/snapshots/{sid}/schools
```

### TypeScript Types (derive from API response shapes)

```typescript
// --- Core entities ---

type EventDefinition = {
  eventId: string; // UUID
  eventName: string;
  season: number;
  isActive: boolean;
  registrationOpen: string; // ISO datetime
  registrationClose: string;
  eventStart: string;
  eventEnd: string;
  matchDurationMin: number;
  tallyDelayMin: number;
  minLevel: number;
  matchCount: number;
  registrationCount: number;
  createdAt: string;
};

type Registration = {
  registrationId: string;
  chaNum: number;
  characterName: string;
  chaClass: number;
  className: string;
  chaLevel: number;
  guildNum: number | null;
  guildName: string | null;
  chaSchool: number;
  schoolName: string;
  categories: ("GvG" | "KOTH")[];
  registeredAt: string;
};

type Character = {
  chaNum: number;
  chaName: string;
  chaClass: number;
  className: string;
  chaLevel: number;
  guildNum: number | null;
  guildName: string | null;
  chaSchool: number;
  schoolName: string;
};

// --- Match status ---

type DisplayStatus = "IDLE" | "LIVE" | "TALLYING_SOON" | "TALLYING_NOW";

type MatchStatus = {
  eventId: string;
  currentMatch: {
    matchId: string;
    label: string;
    startTime: string;
    endTime: string;
    tallyScheduled: string;
    displayStatus: DisplayStatus;
    message: string;
  } | null;
  leaderboardStale: boolean;
  lastTallyCompletedAt: string | null;
};

// --- Leaderboards ---

type GuildRanking = {
  rank: number;
  guildNum: number;
  guildName: string;
  chaSchool: number;
  schoolName: string;
  schoolAbbr: string;
  kills: number;
  deaths: number;
  towerPoints: number;
  deduction: number;
  score: number;
  matchBreakdown: MatchBreakdown[];
};

type MatchBreakdown = {
  matchId: string;
  label: string;
  kills: number;
  deaths: number;
  tower: number;
};

type SchoolRanking = {
  rank: number;
  chaSchool: number;
  schoolName: string;
  schoolAbbr: string;
  kills: number;
  deaths: number;
  towerPoints: number;
  deduction: number;
  score: number;
  guildCount: number;
};

type KothRanking = {
  rank: number;
  chaNum: number;
  characterName: string;
  guildNum: number | null;
  guildName: string | null;
  kills: number;
  deaths: number;
  deduction: number;
  adjustedKills: number;
  kdr: number;
};

type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
};

type PaginatedResponse<T> = {
  success: boolean;
  pagination: Pagination;
  rankings: T[];
  updatedAt: string;
  matchesTallied: number;
  totalMatches: number;
};

// --- Snapshots ---

type Snapshot = {
  snapshotId: string;
  matchId: string;
  time: string;
  label: string;
};

// --- Request payloads ---

type RegisterPayload = {
  chaNum: number;
  joinGvG: boolean;
  joinKOTH: boolean;
};

// --- API error response ---

type ApiError = {
  success: false;
  code: string;
  message: string;
};
```

---

## Page Specifications

### Page 1: Event Overview (`/events`)

**Purpose:** Landing page — show current event info, match status banner, and quick links.

**Data fetching:**

- `GET /api/events/current` — event info
- `GET /api/events/{eventId}/match/status` — match status (poll every 60s)
- `GET /api/events/{eventId}/registration-status` — if user is logged in

**UI elements:**

- Event name, season, date range
- Registration status badge (if logged in): "Registered for GvG + KOTH" or "Not registered — Register now →"
- Match status banner (see Section 7.3 of design doc for state machine)
- Quick stat cards: total registered players, guilds, next match countdown
- Navigation cards to: Leaderboards, Registration, Snapshots

### Page 2: Registration (`/events/register`)

**Purpose:** Register a character for the current event.

**Data fetching:**

- `GET /api/events/current` — check if registration is open
- `GET /api/events/{eventId}/characters` — list user's characters
- `GET /api/events/{eventId}/registration-status` — check existing registration

**UI elements:**

- If registration is closed: show closed message with dates
- Character selector (dropdown or card list): show ChaName, class, level, guild, school
- Category checkboxes: GvG / KOTH (at least one required)
- If character has no guild: GvG checkbox disabled with tooltip "Must be in a guild"
- If character level < MinLevel: show warning, disable submit
- Submit button → `POST /api/events/{eventId}/register`
- If already registered: show current registration with option to update categories or withdraw

**Error handling:**

- `DUPLICATE` → "Already registered" with link to update
- `CLOSED` → "Registration closed on {date}"
- `LEVEL_REQ` → "Character must be at least level {min}"
- `NO_GUILD` → "Join a guild first to participate in GvG"

### Page 3: Leaderboard — Guilds (`/events/leaderboard/guilds`)

**Purpose:** Ranked guild leaderboard with score breakdown.

**Data fetching:**

- `GET /api/events/{eventId}/leaderboard/guilds?page=1&limit=20`
- `GET /api/events/{eventId}/match/status` — for banner

**UI elements:**

- Match status banner (if match is live)
- "Last updated: {updatedAt}" + "Matches tallied: 3/8"
- Table columns: Rank, Guild Name, School, Kills, Deaths, Tower, Deduction, Score
- Score formula tooltip: "Score = Tower + Kills - Deaths - Deduction"
- Pagination controls
- Expandable row → per-match breakdown
- School filter (optional): filter by SG / MP / PNX
- Rank change arrows (↑3 / ↓1 / —) if snapshot data available

### Page 4: Leaderboard — Schools (`/events/leaderboard/schools`)

**Purpose:** School ranking cards (only 3 schools, no pagination needed).

**Data fetching:**

- `GET /api/events/{eventId}/leaderboard/schools`

**UI elements:**

- 3 ranking cards (podium style or vertical stack)
- Each card: rank, school name + abbreviation, kills, deaths, tower, deduction, score, guild count
- Color-coded by school identity

### Page 5: Leaderboard — KOTH (`/events/leaderboard/koth`)

**Purpose:** Per-class individual player rankings.

**Data fetching:**

- `GET /api/events/{eventId}/leaderboard/koth?class={chaClass}&page=1&limit=20`

**UI elements:**

- **Class tab bar** with 8 tabs: Shaman, Brawler, Assassin, Science, Swordsman, Magician, Archer, Extreme
- Only fetch data for the active tab — lazy-load others on click
- Table columns: Rank, Character Name, Guild, Kills, Deaths, Deduction, Adjusted Kills, KDR
- Pagination controls
- Rank change arrows if snapshot data available

### Page 6: Snapshots (`/events/snapshots`)

**Purpose:** Historical standings at each tally point.

**Data fetching:**

- `GET /api/events/{eventId}/snapshots` — snapshot list
- `GET /api/events/{eventId}/snapshots/{sid}/guilds` — frozen guild data (on drill-down)

**UI elements:**

- Timeline or list of snapshots with date/time and match label
- Click a snapshot → show frozen leaderboard at that point in time
- Optional: compare two snapshots side-by-side (rank movement)

## Frontend Behavior Rules

### Match Status Polling (State Machine)

```typescript
// Poll GET /match/status every 60 seconds
// Increase to every 10 seconds when displayStatus === "TALLYING_NOW"
// Stop polling when no active event

function useMatchStatusPolling(eventId: string) {
  // Use the project's existing data fetching pattern (SWR / React Query / custom)
  // refreshInterval: status === 'TALLYING_NOW' ? 10_000 : 60_000
  // Return:
  // - displayStatus: 'IDLE' | 'LIVE' | 'TALLYING_SOON' | 'TALLYING_NOW'
  // - banner message text
  // - leaderboardStale: boolean
  // - nextUpdateAt: string | null
}
```

### Match Status Banner Behavior

| displayStatus                  | Banner                                                                 | Leaderboard State                                   |
| ------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------- |
| `IDLE`                         | Hidden                                                                 | Fresh data, normal styling                          |
| `LIVE`                         | "⚔ The match is ongoing! Total tally will be updated after the match." | Previous data visible, grayed out, refresh disabled |
| `TALLYING_SOON`                | "Match ended. Tally processing at {time}..."                           | Previous data visible                               |
| `TALLYING_NOW`                 | "Crunching the numbers..." (with spinner)                              | Previous data visible, poll faster                  |
| Transition TALLYING_NOW → IDLE | Flash "Updated!" notification                                          | Refetch all leaderboard data                        |

### Leaderboard Data Fetching

- Cache leaderboard responses in-memory (SWR/React Query cache)
- On page load: show cached data immediately, then revalidate in background
- Between tallies: data doesn't change, so stale-while-revalidate works perfectly
- After tally completes (detected via match status poll): invalidate cache, refetch all

### KOTH Class Tab Lazy Loading

```typescript
// Only fetch the active class tab's data
// On tab switch: check if data exists in cache → show immediately, or fetch

const CLASSES = [
  { chaClass: 1, name: "Shaman" },
  { chaClass: 2, name: "Brawler" },
  { chaClass: 3, name: "Assassin" },
  { chaClass: 4, name: "Science" },
  { chaClass: 5, name: "Swordsman" },
  { chaClass: 6, name: "Magician" },
  { chaClass: 7, name: "Archer" },
  { chaClass: 8, name: "Extreme" },
];
```

### Registration Form Logic

```
Character selected
  │
  ├── ChaLevel < MinLevel?
  │     → Disable submit, show "Level {ChaLevel} — requires {MinLevel}"
  │
  ├── GuildNum is null?
  │     → Disable GvG checkbox, tooltip "Must be in a guild"
  │     → KOTH is auto-checked and required
  │
  ├── Neither GvG nor KOTH checked?
  │     → Disable submit, show "Select at least one category"
  │
  └── All valid → Enable submit
```

### Admin Auth Guard

```typescript
// In the admin layout, check for admin role before rendering children
// If not admin → redirect to /events or show "Access denied"
// Follow whatever auth pattern the project already uses
```

---

## Implementation Order

Build in this order. Each phase should be navigable and functional before moving to the next.

### Phase 1: Foundation + Discovery

1. Run the discovery steps above — document what you find
2. Create the `/events` route group with a layout that nests under the existing project layout
3. Create shared TypeScript types in a `types/events.ts` (or wherever the project puts types)
4. Create the API client functions using the project's existing fetching pattern
5. Create the match status hook with polling logic

### Phase 2: Event Overview + Match Status Banner

1. `/events` page — event info, match status banner, quick links
2. `match-status-banner.tsx` — the core UX component, handles all 4 states
3. Wire up polling with the correct interval switching

### Phase 3: Registration

1. `/events/register` page — character select, category checkboxes, submit
2. `registration-form.tsx` + `registration-status.tsx` components
3. Handle all error cases from the API
4. Show existing registration with update/withdraw options

### Phase 4: Leaderboards

1. `/events/leaderboard/guilds` — table with pagination, expandable match breakdown
2. `/events/leaderboard/schools` — 3 school cards
3. `/events/leaderboard/koth` — class tabs + per-class table with pagination
4. `rank-change-indicator.tsx` — ↑↓— arrows
5. Wire match status banner into all leaderboard pages

### Phase 5: Snapshots

1. `/events/snapshots` — snapshot list/timeline
2. `/events/snapshots/[snapshotId]` — frozen leaderboard view (reuse leaderboard components)

---

## Coding Standards

### Follow the existing project — but if you need guidance:

- Use TypeScript strict mode
- Use `"use client"` directive only on components that need interactivity — keep data-fetching pages as server components when possible (App Router)
- Use the project's existing error boundary / error handling pattern
- Use the project's existing loading state pattern (Suspense, skeleton loaders, spinners — whatever is already in use)
- Use the project's existing toast / notification system for success/error feedback
- Use semantic HTML: `<table>` for tabular data, `<nav>` for navigation, `<form>` for forms
- Make all tables responsive — horizontal scroll on mobile if needed
- All dates displayed in the user's local timezone — use the project's existing date formatting utility or `Intl.DateTimeFormat`

### Accessibility

- All interactive elements must be keyboard accessible
- Tables must have proper `<thead>` / `<th scope="col">` / `<tbody>` structure
- Form inputs must have associated `<label>` elements
- Status banners must use appropriate ARIA roles (`role="alert"` for match status changes)
- Color must not be the only indicator — pair with text labels or icons

### Error States

Every page that fetches data must handle:

1. **Loading** — skeleton or spinner (match existing project pattern)
2. **Error** — show error message with retry button
3. **Empty** — show contextual empty state ("No matches scheduled yet", "No registrations")
4. **Stale** — show cached data with "as of {time}" indicator (during live matches)

---

## Reference Lookup Tables

The API returns `chaClass` and `chaSchool` as integers. The API response includes resolved names (`className`, `schoolName`, `schoolAbbr`), but for any client-side filtering or display, use these constants:

```typescript
export const CLASSES = [
  { chaClass: 1, name: "Shaman" },
  { chaClass: 2, name: "Brawler" },
  { chaClass: 3, name: "Assassin" },
  { chaClass: 4, name: "Science" },
  { chaClass: 5, name: "Swordsman" },
  { chaClass: 6, name: "Magician" },
  { chaClass: 7, name: "Archer" },
  { chaClass: 8, name: "Extreme" },
] as const;

export const SCHOOLS = [
  { chaSchool: 1, name: "Sacred Gate", abbr: "SG" },
  { chaSchool: 2, name: "Mystic Peak", abbr: "MP" },
  { chaSchool: 3, name: "Phoenix", abbr: "PNX" },
] as const;
```

**Note:** These INT values may not match your actual game database. Verify by checking the `RefClass` and `RefSchool` tables or the API response when developing. Replace the values above with the correct ones from your backend.

---

## When In Doubt

- Refer to `docs/war-of-three-crowns.md` Section 7 for all API response shapes
- Refer to Section 7.3 for the match status state machine
- **Always follow the existing project's patterns** — the discovery step is not optional
- If the existing project uses a component library (shadcn, Mantine, MUI), use its Table, Tabs, Dialog, Form, Badge, Card components rather than building custom ones
- The API returns `success: true/false` on every response — always check this before using the data
