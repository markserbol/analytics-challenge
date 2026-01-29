# Social Media Analytics Dashboard

A full-stack Next.js application for tracking social media engagement metrics across Instagram and TikTok, built with Supabase, TypeScript, and modern React patterns.

## 🚀 Live Demo

[https://analytics-challenge-delta.vercel.app](https://analytics-challenge-delta.vercel.app)

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture Decisions](#architecture-decisions)
- [Security & RLS](#security--rls)
- [Future Improvements](#future-improvements)
- [Time Spent](#time-spent)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **State Management**: 
  - Zustand (UI state)
  - TanStack Query v5 (Server state)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- A Supabase account

### 1. Clone and Install

```bash
git clone <repository-url>
cd analytics-challenge
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration:
   ```sql
   -- Copy contents of supabase/migrations/001_initial_schema.sql
   ```
3. Create 2 test users via **Authentication** > **Users** > **Add User**
4. Update `supabase/seed.sql` with the actual user UUIDs
5. Run the seed file in SQL Editor

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update with your Supabase credentials from **Project Settings** > **API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Generate TypeScript Types

```bash
npx supabase gen types typescript --project-id your-project-id > lib/database.types.ts
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Test RLS Data Isolation

1. Log in as User A → Should only see User A's posts
2. Log in as User B → Should only see User B's posts
3. Verify complete data isolation between users

## 🏗 Architecture Decisions

### 1. Where Should Engagement Metrics Be Aggregated?

**Decision**: API Route (`/api/analytics/summary`)

**Reasoning**:
- **Server-side computation** reduces client bundle size and ensures consistent calculations
- **Cacheable** via TanStack Query with automatic revalidation
- **Scalable** - Client doesn't need to fetch all posts to compute summaries
- **Security** - Aggregation logic hidden from client, easier to audit

**Trade-offs**:
- ✅ Better performance for users with many posts (fetches pre-computed data)
- ✅ Single source of truth for metric calculations
- ✅ Easier to add caching layers (Redis, CDN) in the future
- ❌ Slightly higher latency on first load (one API call vs direct DB query)
- ❌ More complex than pure client-side computation

---

### 2. State Management: Zustand vs TanStack Query vs URL State

**Decision Map**:

| State | Location | Reasoning |
|-------|----------|-----------|
| Platform filter | Zustand | Ephemeral UI preference, no need for URL persistence |
| Sort column/direction | Zustand | Table UI state, resets on refresh (acceptable UX) |
| Selected post (modal) | Zustand | Temporary modal state, should reset on navigation |
| Chart view type (line/bar) | Zustand | UI preference, non-critical if lost on refresh |
| Posts data | TanStack Query | Server data with cache invalidation needs |
| Daily metrics | TanStack Query | Server data fetched from Edge API |
| Analytics summary | TanStack Query | Server-aggregated data with refresh requirements |

**Reasoning**:
- **Zustand** for UI state that doesn't need:
  - Persistence across sessions
  - URL shareability
  - Server synchronization
  
- **TanStack Query** for all server data because:
  - Automatic caching with configurable TTL
  - Loading/error states out of the box
  - Cache invalidation after mutations
  - Request deduplication
  - Background refetching

- **URL State** not used because:
  - Filter/sort preferences aren't critical to preserve
  - No requirement for shareable filtered views
  - Simpler mental model without URL sync complexity

**Trade-offs**:
- ✅ Clear separation of concerns
- ✅ No prop drilling
- ✅ Automatic request deduplication
- ❌ Filters reset on page refresh (acceptable for this use case)
- ❌ Can't share filtered/sorted views via URL

---

### 3. Empty State Handling Strategy

**Decision**: Graceful degradation with user-friendly messaging

**Implementation**:

**API Routes**:
- Return valid JSON with zero values
- `/api/analytics/summary` returns:
  ```json
  {
    "totalEngagement": 0,
    "averageEngagementRate": 0,
    "topPerformingPost": null,
    "trendPercentage": 0,
    "trendDirection": "neutral",
    "postsCount": 0
  }
  ```
- `/api/metrics/daily` returns empty array with filled dates (all zeros)

**UI Components**:
- **Posts Table**: Shows "No posts found. Create your first post to see analytics!"
- **Chart**: Renders with zero values (doesn't crash), shows flat line at zero
- **Summary Cards**: Displays "0", "N/A", or "0.00%" appropriately
- **Loading States**: Skeleton loaders during fetch

**Edge Cases Handled**:
- New user with zero data → Welcoming empty state
- User deletes all posts → Same empty state (data persists in metrics table if needed)
- Engagement rate with zero posts → Returns 0, displays "0.00%"
- Trend with no previous data → Returns 0% with "neutral" direction
- Null `engagement_rate` in database → Defaults to 0 with `??` operator

**Reasoning**:
- Empty states should **guide users** to take action, not confuse them
- Components should **never crash** - always render something
- API contracts should be **consistent** regardless of data availability

---

### 4. Trend Percentage Calculation

**Decision**: Last 7 days vs. Previous 7 days

**Formula**:
```typescript
trendPercentage = ((recent7days - previous7days) / previous7days) * 100
```

**Reasoning**:
- **7-day window** provides meaningful, recent insights
- **Rolling comparison** (not calendar-based) works regardless of current date
- **Percentage change** is intuitive for users familiar with social media analytics
- **Direction indicator** (up/down/neutral) adds quick visual feedback

**Edge Cases**:
- Previous period has zero engagement → Show +100% if recent > 0, else 0%
- Both periods zero → Show 0% with "neutral" direction
- Negative trend → Display as positive number with down arrow

**Alternatives Considered**:
- **30 vs 30 days**: More stable but less responsive to recent changes
- **This month vs last month**: Calendar-dependent, awkward on month boundaries
- **Same day last week**: Too granular, high variance

**Trade-offs**:
- ✅ Responsive to recent performance changes
- ✅ Works with minimal data (only 14 days needed)
- ✅ Intuitive comparison period
- ❌ More volatile than monthly comparisons
- ❌ Requires filtering logic in API route

---

## 🔐 Security & RLS

### Row Level Security Policies

All tables enforce **complete data isolation** between users:

**Posts Table** - 4 policies:
```sql
-- SELECT: Users can only view their own posts
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: Users can only insert posts with their own user_id
CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own posts
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own posts  
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

**Daily Metrics Table** - Same 4 policies pattern

### Authentication Flow

1. **Middleware** (`middleware.ts`): Refreshes Supabase session on every request
2. **Protected Routes**: Dashboard checks auth, redirects to login if unauthenticated
3. **API Routes**: Verify `auth.getUser()` before returning any data
4. **Client Components**: Use browser Supabase client with automatic token handling

### Security Best Practices

- ✅ All secrets in `.env.local` (never committed)
- ✅ `.env.example` provided without real values
- ✅ Anon key safe for client-side use (RLS enforces security)
- ✅ Service role key never exposed to client
- ✅ Input validation on all API routes (query params, request bodies)
- ✅ HTTP auth checks before database queries
- ✅ Type-safe database queries via generated types

---

## 🎯 Future Improvements

Given more time, I would add:

### Features
- **Date range filters/pickers** - Custom date ranges for charts and summary cards
- **URL-based filters** - Shareable filtered/sorted views via query params
- **Pagination** - Client and server-side pagination for large datasets
- **Export functionality** - CSV/PDF export for reports

### Performance
- **Server-side pagination** - Handle 1000+ posts efficiently with limit/offset
- **Database indexes** - Add indexes on `user_id`, `posted_at`, `platform` for faster queries

### Testing
- **Unit tests** - API routes and utility functions (Vitest)
- **E2E tests** - Critical user flows like auth and data fetching (Playwright)

---

## ⏱ Time Spent

**Total**: ~6 hours

**Breakdown**:
- Supabase setup & RLS policies: 1 hour
- Database schema, migrations, seed data: 45 min
- Auth implementation (login, signup, middleware): 45 min
- State management setup (Zustand, TanStack Query): 30 min
- API routes (/analytics/summary, /metrics/daily): 1 hour
- Dashboard components (Summary Cards, Chart, Table, Modal): 2 hours
- Documentation (README, design decisions): 30 min
- Testing & debugging (RLS, API routes, edge cases): 30 min

---

## 📝 Notes

- **AI-assisted development**: Used GitHub Copilot for boilerplate generation, analytics metrics calculations, and Chart.js integration
- **shadcn/ui defaults**: Minimal custom styling to focus on architecture
- **Edge runtime**: Successfully implemented for `/api/metrics/daily` with custom cookie handling for Supabase authentication
- **TypeScript strict mode**: Zero `any` types, full type safety throughout

---

## 🙏 Acknowledgments

Built as part of a frontend engineering challenge. Special thanks to the team for the well-structured requirements and clear evaluation criteria.

---

## 📄 License

MIT
