# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BhutanWiki (bhutanwiki.org) is a custom-built, open, crowdsourced, multilingual wiki encyclopedia documenting Bhutan's history, culture, and the Bhutanese refugee diaspora experience.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`)

## Tech Stack

- **Next.js 16** (App Router), TypeScript strict mode, React 19
- **Tailwind CSS v4** + **shadcn/ui** (base-ui variant, NOT Radix — except Button which uses @radix-ui/react-slot for `asChild`)
- **Supabase** (PostgreSQL, Auth with anonymous mode, Storage)
- **Tiptap** rich text editor for article editing
- Hosting: Vercel

## Architecture

### Key Directories
- `src/app/` — Next.js App Router pages and API routes
- `src/components/ui/` — shadcn/ui components (auto-generated, use base-ui primitives)
- `src/components/layout/` — Header, Footer
- `src/components/articles/` — ArticleCard, ArticleEditor (Tiptap), ArticleMetadata
- `src/components/auth/` — AuthProvider (React context for auth state)
- `src/lib/supabase/` — client.ts (browser), server.ts (server components/routes), middleware.ts (session refresh)
- `src/lib/types.ts` — All TypeScript interfaces (Article, ArticleVersion, Contributor, etc.)
- `src/lib/constants.ts` — Categories, status labels, roles
- `supabase/migrations/` — SQL migration files (001-009), run manually in Supabase dashboard

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

## Conventions

- **Article slugs:** kebab-case (auto-generated from title via `slugify()`)
- **Components:** PascalCase filenames
- **Database tables:** snake_case
- **API routes:** kebab-case
- **Styling:** Tailwind utilities only
- **shadcn/ui quirk:** These components use base-ui primitives. Button is customized to use `@radix-ui/react-slot` for `asChild` support. Other components (DropdownMenuTrigger, SheetTrigger, DialogClose) use base-ui's `render` prop instead.
- Three languages: English (en), Nepali (ne), Dzongkha (dz)

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
