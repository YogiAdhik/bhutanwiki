# BhutanWiki Tech Stack

## Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 16 | App Router, server/client components, API routes |
| React 19 | UI framework |
| TypeScript | Strict mode, type safety across the codebase |
| Tailwind CSS v4 | Utility-first styling with custom Bhutanese color palette |
| @tailwindcss/typography | Prose styles for article content |
| shadcn/ui (base-ui) | Component library (Button, DropdownMenu, Sheet, Badge, etc.) |
| Tiptap | Rich text editor for article editing |
| Lucide React | Icon library |

## Backend & Database
| Technology | Purpose |
|-----------|---------|
| Supabase (PostgreSQL) | Database, auth, storage, real-time |
| Supabase Auth | Email/password + anonymous sign-in (Wikipedia-style editing) |
| Supabase Storage | Article images (bucket: `article-images`, public, 10MB limit) |
| Supabase Database Webhooks | Triggers email notifications on article edits |
| Row Level Security (RLS) | Published articles public, writes require auth |

## Hosting & Deployment
| Technology | Purpose |
|-----------|---------|
| Vercel | Web hosting, auto-deploys from `main` branch on GitHub |
| Vercel Cron | Daily digest email job (8am UTC) |
| GoDaddy | Domain registrar for bhutanwiki.org |
| GitHub | Source code repository (YogiAdhik/bhutanwiki) |

## Email
| Technology | Purpose |
|-----------|---------|
| Resend | Transactional email API |
| bhutanwiki.org (verified) | Custom sending domain (`noreply@bhutanwiki.org`) |

## Mobile App
| Technology | Purpose |
|-----------|---------|
| Capacitor | Native shell wrapping bhutanwiki.org for Android & iOS |
| Android Studio | Android build toolchain |
| Xcode | iOS build toolchain |

## Progressive Web App (PWA)
| Technology | Purpose |
|-----------|---------|
| Web App Manifest | Installable "Add to Home Screen" on mobile browsers |
| Service Worker | Offline caching (network-first for pages, cache-first for assets) |

## Content Pipeline
| Technology | Purpose |
|-----------|---------|
| tsx | TypeScript script runner for seed scripts |
| sharp | Image processing (icon/splash screen generation) |
| Wikimedia Commons API | Source for article images with proper licensing |
| Supabase JS Client | Direct database writes for article seeding |

## Key Integrations
| Integration | Flow |
|------------|------|
| Article edit → Email | `article_versions` INSERT → Supabase Webhook → `/api/notify/edit` → Resend → yogesha@att.net |
| Daily digest | Vercel Cron (8am UTC) → `/api/cron/daily-digest` → Resend → yogesha@att.net |
| Image pipeline | Wikimedia Commons API → download → Supabase Storage → update article HTML |
| Auth flow | Email/password or anonymous → Supabase Auth → `contributors` table → session cookie |
| Deploy | `git push main` → GitHub → Vercel auto-build → bhutanwiki.org live (~1 min) |

## Environment Variables
| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` + Vercel | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` + Vercel | Supabase admin key (server-side only) |
| `RESEND_API_KEY` | `.env.local` + Vercel | Resend email API key |
| `CRON_SECRET` | Vercel | Authenticates Vercel cron requests |
| `SUPABASE_WEBHOOK_SECRET` | Vercel + Supabase | Authenticates webhook calls (optional) |
