# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BhutanWiki (bhutanwiki.org) is a custom-built, open, crowdsourced, multilingual wiki encyclopedia documenting Bhutan's history, culture, and the Bhutanese refugee diaspora experience. It is live in production.

## Deployment & Infrastructure

- **Live URL:** https://bhutanwiki.org
- **Hosting:** Vercel (auto-deploys from `main` branch on GitHub)
- **Repo:** github.com/YogiAdhik/bhutanwiki
- **Database:** Supabase Cloud (project: `izzzbwfdiqklgytrkzfr`)
- **Domain:** bhutanwiki.org on GoDaddy, DNS pointed to Vercel (A record → `76.76.21.21`, CNAME www → `cname.vercel-dns.com`)
- **Code changes:** `git push` to main → Vercel auto-deploys (~1 min)
- **Content changes:** Seed scripts write directly to Supabase — instant, no deploy needed

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npx tsx --env-file=.env.local scripts/seed-articles.ts` — Seed foundational articles
- `npx tsx --env-file=.env.local scripts/seed-neutral-articles.ts` — Seed neutral/general articles
- Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`)

## Tech Stack

- **Next.js 16** (App Router), TypeScript strict mode, React 19
- **Tailwind CSS v4** + `@tailwindcss/typography` (prose styles) + **shadcn/ui** (base-ui variant)
- **Supabase** (PostgreSQL, Auth with anonymous sign-in enabled, Storage)
- **Tiptap** rich text editor for article editing
- **Hosting:** Vercel

## Architecture

### Key Directories
- `src/app/` — Next.js App Router pages and API routes
- `src/components/ui/` — shadcn/ui components (use base-ui primitives)
- `src/components/layout/` — Header, Footer
- `src/components/articles/` — ArticleCard, ArticleEditor (Tiptap), ArticleMetadata
- `src/components/auth/` — AuthProvider (React context for auth state)
- `src/lib/supabase/` — client.ts (browser), server.ts (server components/routes), middleware.ts (session refresh)
- `src/lib/types.ts` — All TypeScript interfaces (Article, ArticleVersion, Contributor, etc.)
- `src/lib/constants.ts` — Categories, status labels, roles
- `scripts/` — Seed scripts for populating articles directly to Supabase
- `supabase/migrations/` — SQL migration files (001-009), already run on production Supabase

### Pages
- `/` — Home page (hero, category grid, mission stats, CTAs)
- `/articles` — Browse articles with category filters (client-side, wrapped in Suspense)
- `/articles/[slug]` — Article view (server component, `force-dynamic`)
- `/articles/[slug]/edit` — Edit article with Tiptap editor, requires auth
- `/articles/[slug]/history` — Version history (server component, `force-dynamic`)
- `/articles/new` — Create new article, requires auth
- `/auth/login` — Email/password + anonymous sign-in
- `/auth/register` — Sign up with display name (pseudonym OK)
- `/auth/callback` — Supabase auth code exchange

### API Routes
- `GET/POST /api/articles` — List (paginated, filterable by status/category) and create articles
- `GET/PUT/DELETE /api/articles/[slug]` — Single article CRUD; PUT creates a new version entry
- `GET /api/articles/[slug]/versions` — Version history

### Auth Flow
- `AuthProvider` wraps the app, exposes `useAuth()` hook with `user`, `contributor`, `signIn`, `signUp`, `signInAnonymously`, `signOut`
- Anonymous auth creates a `contributors` row with `is_anonymous: true` and auto-generated display name
- Session refresh handled by `src/middleware.ts`

### Database
- Core tables: `articles`, `article_versions`, `contributors`, `citations`, `tags`, `article_tags`, `discussions`, `media`, `oral_histories`
- Every article edit creates a new `article_versions` row (version history is non-negotiable)
- RLS policies in `009_rls_policies.sql` — published articles are public, writes require auth
- All migrations (001-009) have been run on the production Supabase instance

## Build Gotchas

- Server components that call Supabase need `export const dynamic = 'force-dynamic'` to prevent build-time pre-rendering failures
- Client pages using `useSearchParams()` must be wrapped in `<Suspense>` boundary
- Button component uses `@radix-ui/react-slot` for `asChild` support; other shadcn components (DropdownMenuTrigger, SheetTrigger, DialogClose) use base-ui's `render` prop — do NOT nest `<Button>` inside these triggers (causes button-in-button hydration error)

## Current Content (30 published articles)

Seed articles attributed to "BhutanWiki Editorial" contributor.

**History & Crisis:** Bhutanese Refugee Crisis, 1985 Citizenship Act, Driglam Namzha, Wangchuck Dynasty
**People:** Ugyen Wangchuck, Jigme Wangchuck, Jigme Dorji Wangchuck, Jigme Singye Wangchuck, Jigme Khesar Namgyel Wangchuck, Tek Nath Rizal
**Culture:** Lhotshampa, Languages of Bhutan
**Politics:** Government of Bhutan, Constitution of Bhutan, Gross National Happiness, Human Rights in Bhutan
**Places:** Punakha Dzong, Tiger's Nest, Tashichho Dzong, Dzongs of Bhutan, Thimphu, Paro International Airport
**Society/Economy:** Economy of Bhutan, Hydropower in Bhutan, Tourism in Bhutan, Bhutanese Ngultrum, Druk Air, Bhutan Airlines, Media and Press Freedom in Bhutan
**Diaspora:** Refugee Camps in Nepal

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
- Sensitive content requires content warnings
- Content licensed CC BY-SA 4.0 (except restricted oral histories)
- Be factual about documented atrocities — no euphemisms

## Security

Contributor safety is critical (political repression risk):
- Never require real names or email
- Support anonymous contribution mode
- Article content rendered via `dangerouslySetInnerHTML` — ensure content sanitization before production launch
