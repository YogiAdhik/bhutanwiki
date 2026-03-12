'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

/** Slug keyword patterns that trigger a content warning */
const SENSITIVE_KEYWORDS = [
  'ethnic-cleansing',
  'violence',
  'human-rights-abuses',
  'forced',
  'eviction',
  'torture',
  'refugee-crisis',
  'political-prisoners',
  'persecution',
  'expulsion',
  'voluntary-migration-forms',
  'national-security-act',
  'crackdown',
  'suicide',
] as const

/** Specific slugs that always trigger a content warning */
const SENSITIVE_SLUGS = new Set([
  'bhutanese-refugee-crisis',
  'bhutanese-refugee-crisis-timeline',
  '1990-southern-bhutan-protests',
  'government-crackdown-southern-bhutan',
  'role-rba-in-evictions',
  'violence-human-rights-abuses-bhutan',
  'land-confiscation-southern-bhutan',
  'womens-experiences-bhutanese-refugee-crisis',
  'diaspora-mental-health-suicide-crisis',
  'amnesty-international-reports-bhutan',
  'human-rights-watch-reports-bhutan',
  'joint-verification-team-report-2003',
])

const STORAGE_KEY = 'bhutanwiki-content-warnings-dismissed'

/**
 * Determines whether a given article slug should display a content warning.
 */
export function isSensitiveArticle(slug: string): boolean {
  if (SENSITIVE_SLUGS.has(slug)) return true
  return SENSITIVE_KEYWORDS.some((keyword) => slug.includes(keyword))
}

interface ContentWarningProps {
  /** The article slug used to decide whether to show the warning */
  slug: string
}

/**
 * A collapsible content-warning banner shown at the top of sensitive articles.
 * Users can dismiss it, and the preference is persisted in localStorage.
 */
export default function ContentWarning({ slug }: ContentWarningProps) {
  const [dismissed, setDismissed] = useState(true) // default hidden to avoid flash
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (!isSensitiveArticle(slug)) return

    setShouldShow(true)

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') {
        setDismissed(true)
      } else {
        setDismissed(false)
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — show the warning
      setDismissed(false)
    }
  }, [slug])

  if (!shouldShow || dismissed) return null

  return (
    <div
      role="alert"
      aria-label="Content warning"
      className="mb-6 rounded-lg border border-[#e8d5b8] bg-[#FFF0DB] p-5"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-[#D4A843]"
          aria-hidden="true"
        />
        <div className="flex-1">
          <h2 className="mb-1 text-sm font-semibold text-[#5a1530]">
            Content Warning
          </h2>
          <p className="text-sm leading-relaxed text-[#5a1530]/85">
            This article contains descriptions of political persecution, forced
            displacement, or human rights abuses that some readers may find
            distressing.
          </p>
          <button
            onClick={() => {
              setDismissed(true)
              try {
                localStorage.setItem(STORAGE_KEY, 'true')
              } catch {
                // localStorage unavailable — dismiss for this session only
              }
            }}
            className="mt-3 rounded-md bg-[#7B1E3A] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#5a1530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B1E3A] focus-visible:ring-offset-2"
          >
            Continue reading
          </button>
        </div>
      </div>
    </div>
  )
}
