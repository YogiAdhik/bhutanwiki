# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BhutanWiki (bhutanwiki.org) is a custom-built, open, crowdsourced, multilingual wiki encyclopedia documenting Bhutan's history, culture, and the Bhutanese refugee diaspora experience. It is live in production with 600+ published articles.

## Deployment & Infrastructure

- **Live URL:** https://bhutanwiki.org
- **Hosting:** Vercel (auto-deploys from `main` branch on GitHub)
- **Repo:** github.com/YogiAdhik/bhutanwiki
- **Database:** Supabase Cloud (project: `izzzbwfdiqklgytrkzfr`)
- **Domain:** bhutanwiki.org on GoDaddy, DNS pointed to Vercel (A record → `76.76.21.21`, CNAME www → `cname.vercel-dns.com`)
- **Email:** Resend (verified domain `bhutanwiki.org`), sends from `noreply@bhutanwiki.org`
- **Code changes:** `git push` to main → Vercel auto-deploys (~1 min)
- **Content changes:** Seed scripts write directly to Supabase — instant, no deploy needed

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npx tsx --env-file=.env.local scripts/seed-topic.ts <topic>` — Seed articles by topic (e.g., `history`, `diaspora-all`)
- `npx tsx --env-file=.env.local scripts/seed-images.ts` — Attach Wikimedia Commons images to top articles
- `npx tsx scripts/generate-icons.ts` — Regenerate app icons and splash screens
- `npx tsx --env-file=.env.local scripts/test-email.ts` — Test Resend email delivery
- `npx tsx --env-file=.env.local scripts/seed-directory.ts` — Seed directory data (dzongkhags, gewogs, categories, listings)
- `npx supabase db push` — Push pending migrations to remote Supabase (requires `supabase link` first)
- Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`

## Tech Stack

- **Next.js 16** (App Router), TypeScript strict mode, React 19
- **Tailwind CSS v4** + `@tailwindcss/typography` (prose styles) + **shadcn/ui** (base-ui variant)
- **Supabase** (PostgreSQL, Auth with anonymous sign-in enabled, Storage bucket `article-images`)
- **Tiptap** rich text editor for article editing
- **Capacitor** — Native mobile app shell (Android + iOS) wrapping bhutanwiki.org
- **PWA** — Service worker (`public/sw.js`) + manifest for offline support and "Add to Home Screen"
- **Hosting:** Vercel

## Architecture

### Key Directories
- `src/app/` — Next.js App Router pages and API routes
- `src/components/ui/` — shadcn/ui components (use base-ui primitives)
- `src/components/layout/` — Header (with SearchBar), Footer
- `src/components/articles/` — ArticleCard, ArticleEditor, ArticleMetadata, ShareButtons, ContentWarning, TextToSpeech, SuggestCorrection, CommunityPrompt, DiscussionSection
- `src/components/directory/` — ListingCard, DirectoryCategoryCard, DirectoryFilters
- `src/components/auth/` — AuthProvider (React context for auth state)
- `src/components/ServiceWorkerRegister.tsx` — PWA service worker registration
- `src/lib/supabase/` — client.ts (browser), server.ts (server components/routes), middleware.ts (session refresh)
- `src/lib/types.ts` — All TypeScript interfaces (Article, ArticleVersion, Contributor, Discussion, Dzongkhag, Gewog, DirectoryCategory, DirectoryListing, etc.)
- `src/lib/constants.ts` — Categories, directory categories, status labels, roles
- `scripts/` — Seed scripts and icon generation
- `scripts/articles/` — Article content organized by topic (TypeScript files → aggregator files → seed-topic.ts)
- `supabase/migrations/` — SQL migration files (001-010), all run on production Supabase
- `android/` — Capacitor Android project (Android Studio)
- `ios/` — Capacitor iOS project (Xcode)

### Pages
- `/` — Home page (server component, dynamic article count from Supabase, hero, category grid, mission stats)
- `/articles` — Browse articles with category filters and search (client-side, wrapped in Suspense)
- `/articles/[slug]` — Article view (server component, `force-dynamic`) with share buttons, TTS, content warnings, community prompt, suggest correction
- `/articles/[slug]/edit` — Edit article with Tiptap editor, auto anonymous sign-in (no login wall)
- `/articles/[slug]/history` — Version history (server component, `force-dynamic`)
- `/articles/[slug]/discussion` — Talk page for article discussions (server component + client DiscussionSection)
- `/articles/new` — Create new article, auto anonymous sign-in
- `/directory` — Directory home (server component, `force-dynamic`) with category grid and listing counts
- `/directory/[category]` — Browse listings by category with search and dzongkhag filters (client-side, Suspense)
- `/directory/listing/[slug]` — Listing detail page (server component, `force-dynamic`) with location, contact, metadata
- `/directory/dzongkhag/[slug]` — Browse listings by district (client-side, Suspense)
- `/directory/submit` — Submit new listing form, auto anonymous sign-in
- `/auth/login` — Email/password + anonymous sign-in
- `/auth/register` — Sign up with display name (pseudonym OK)
- `/auth/forgot-password` — Password reset email
- `/auth/reset-password` — Set new password (from email link)
- `/auth/callback` — Supabase auth code exchange

### API Routes
- `GET/POST /api/articles` — List (paginated, filterable by status/category) and create articles
- `GET/PUT/DELETE /api/articles/[slug]` — Single article CRUD; PUT creates a new version entry
- `GET /api/articles/[slug]/versions` — Version history
- `GET/POST /api/directory` — List directory listings (filterable by category, dzongkhag, search) and create
- `GET/PUT /api/directory/[slug]` — Single listing CRUD
- `GET /api/directory/categories` — Nested directory categories
- `GET /api/directory/dzongkhags` — All 20 dzongkhags with gewog counts
- `POST /api/notify/edit` — Supabase webhook endpoint, sends instant email notification on article edit
- `GET /api/cron/daily-digest` — Vercel cron (8am UTC daily), sends summary of last 24h edits

### Email Notifications
- **Instant:** Supabase database webhook on `article_versions` INSERT → `POST /api/notify/edit` → Resend email to `yogesha@att.net`
- **Daily digest:** Vercel cron (`vercel.json`) at 8am UTC → `GET /api/cron/daily-digest` → summarizes all edits from last 24h
- **From address:** `noreply@bhutanwiki.org` (domain verified on Resend)
- **Env vars needed:** `RESEND_API_KEY`, `CRON_SECRET` (Vercel), `SUPABASE_WEBHOOK_SECRET` (optional, for webhook auth)

### Auth Flow
- `AuthProvider` wraps the app, exposes `useAuth()` hook with `user`, `contributor`, `signIn`, `signUp`, `signInAnonymously`, `signOut`
- Anonymous auth creates a `contributors` row with `is_anonymous: true` and auto-generated display name
- Edit and new article pages auto-sign-in anonymously (Wikipedia-style, no login wall)
- Session refresh handled by `src/middleware.ts`

### Database
- Core tables: `articles`, `article_versions`, `contributors`, `citations`, `tags`, `article_tags`, `discussions`, `media`, `oral_histories`
- Directory tables (migration 010): `dzongkhags` (20 districts), `gewogs` (195 village blocks), `directory_categories` (10 parents + 40 subcategories, hierarchical via `parent_id`), `directory_listings` (establishments with category, location, contact, status)
- Every article edit creates a new `article_versions` row (version history is non-negotiable)
- `discussions` table: `id`, `article_id`, `parent_id` (threading), `content_md`, `author_id`, `created_at`
- `directory_listings` can optionally link to an `articles` row via `article_id` for deeper wiki content
- RLS policies in `009_rls_policies.sql` and `010_directory.sql` — published content is public, writes require auth
- All migrations (001-010) have been run on the production Supabase instance
- Supabase CLI linked: `npx supabase link --project-ref izzzbwfdiqklgytrkzfr`, then `npx supabase db push` to apply new migrations

### Article Seeding Pipeline
- `scripts/articles/types.ts` — `SeedArticle` interface: `{ slug, title, category, summary, content_md (HTML), status }`
- Topic files (e.g., `history.ts`, `diaspora-success.ts`) export arrays of `SeedArticle`
- Aggregator files (e.g., `documents-all.ts`, `diaspora-all.ts`) combine batch files
- `scripts/seed-topic.ts` — Universal seeder: dynamically imports topic, creates "BhutanWiki Editorial" contributor, upserts articles
- `scripts/seed-images.ts` — Wikimedia Commons image pipeline: search → download with User-Agent → upload to Supabase Storage → update article HTML

### Directory Seeding Pipeline
- `scripts/seed-dzongkhags.ts` — All 20 dzongkhags with Dzongkha names, population, area, capital, and 195 gewogs
- `scripts/seed-directory-categories.ts` — 10 parent categories (Education, Healthcare, Government, Hospitality, Business, Religious Sites, Entertainment & Media, Tourism, Infrastructure, Municipalities) with 40 subcategories
- `scripts/seed-directory-listings.ts` — 41 real Bhutanese establishments (universities, hospitals, dzongs, airlines, banks, films, national parks, etc.)
- `scripts/seed-directory.ts` — Seed runner: inserts dzongkhags → gewogs → categories → listings with FK resolution and upsert for idempotency

### Mobile App (Capacitor)
- **App ID:** `org.bhutanwiki.app`
- **Config:** `capacitor.config.ts` — loads `https://bhutanwiki.org` in native WebView
- **Android:** `android/` directory, build with Android Studio or `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" ./android/gradlew assembleDebug`
- **iOS:** `ios/` directory, build with Xcode
- **Icons:** Generated via `scripts/generate-icons.ts` using sharp — creates all Android mipmap sizes, iOS asset catalog, PWA icons, favicon, splash screen
- **Sync:** `npx cap sync android` / `npx cap sync ios` (requires `out/` directory to exist, even if empty when using server URL)
- **Run:** `npx cap open android` / `npx cap open ios`
- Android needs `android/local.properties` with `sdk.dir` pointing to Android SDK (not committed to git)

## Build Gotchas

- Server components that call Supabase need `export const dynamic = 'force-dynamic'` to prevent build-time pre-rendering failures
- Client pages using `useSearchParams()` must be wrapped in `<Suspense>` boundary
- Button component uses `@radix-ui/react-slot` for `asChild` support; other shadcn components (DropdownMenuTrigger, SheetTrigger, DialogClose) use base-ui's `render` prop — do NOT nest `<Button>` inside these triggers (causes button-in-button hydration error)
- Capacitor sync requires `out/` directory to exist (create empty with `mkdir -p out && touch out/index.html` since we use remote server URL)
- Android build requires Java — use Android Studio's bundled JBR: `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"`
- Android `proguard-android.txt` is deprecated — use `proguard-android-optimize.txt` in `android/app/build.gradle`

## Article Engagement Features

Each article page includes these client components:
- **ShareButtons** — WhatsApp, Facebook, X/Twitter share links + copy URL
- **ContentWarning** — Auto-detects sensitive articles by slug keywords/patterns, dismissible with localStorage persistence
- **TextToSpeech** — Browser SpeechSynthesis API with play/pause/stop, strips HTML before reading
- **SuggestCorrection** — Form that inserts into `discussions` table with `[Correction suggestion]` prefix, auto anonymous sign-in
- **CommunityPrompt** — Bottom-of-article CTA encouraging edits and contributions
- **DiscussionSection** — Full talk page with comment list and post form, anonymous posting supported

## Visual Theme — Bhutanese Identity

The portal uses an authentic Bhutanese color palette (not generic amber/slate):

- **Primary (maroon):** `#7B1E3A` — inspired by dzong walls and Buddhist robes
- **Gold accent:** `#D4A843` — Bhutanese flag saffron, used for highlights and hover states
- **Dark maroon:** `#5a1530` / `#3a0a1a` — hero gradients, dark text
- **Cream background:** `#FFFBF5` — warm paper-like base
- **Sand/warm borders:** `#e8d5b8`
- **Secondary warm:** `#FFF0DB` — muted backgrounds (mission section, summary boxes)
- **Crimson:** `#B22234`, **Forest green:** `#2D6A4F`, **Deep blue:** `#1B3A5C` — charts and prayer flag stripe

Decorative CSS classes in `globals.css`:
- `.kemar-band` — 4px gradient stripe (maroon→crimson→gold→crimson→maroon), used at bottom of hero
- `.prayer-flag-stripe` — 3px multi-color stripe (blue/white/red/green/gold), used at top of footer

When adding new components, use these Bhutanese colors instead of Tailwind's default amber/slate palette.

## Conventions

- **Article slugs:** kebab-case (auto-generated from title via `slugify()`)
- **Components:** PascalCase filenames
- **Database tables:** snake_case
- **API routes:** kebab-case
- **Styling:** Tailwind utilities only — use Bhutanese color hex values (see theme section above)
- Three languages supported: English (en), Nepali (ne), Dzongkha (dz)

## Content Standards

- Articles need 3+ citations from reliable sources
- Seed articles are attributed to "BhutanWiki Editorial" and are editable by the public
- Use structured headings (H2 major, H3 sub) with a 2-3 paragraph lead section
- Sensitive content requires content warnings (see ContentWarning component for slug patterns)
- Content licensed CC BY-SA 4.0 (except restricted oral histories)
- Be factual about documented atrocities — no euphemisms

## Security

Contributor safety is critical (political repression risk):
- Never require real names or email
- Support anonymous contribution mode
- Article content rendered via `dangerouslySetInnerHTML` — ensure content sanitization before production launch
