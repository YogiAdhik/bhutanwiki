export const ARTICLE_STATUSES = ['draft', 'review', 'published', 'disputed'] as const
export const PROTECTION_LEVELS = ['open', 'semi', 'full'] as const
export const CONTRIBUTOR_ROLES = ['reader', 'contributor', 'editor', 'admin', 'steward'] as const
export const SOURCE_TYPES = ['book', 'journal', 'news', 'report', 'oral', 'government', 'web'] as const
export const SUPPORTED_LANGUAGES = ['en', 'ne', 'dz'] as const

export const CATEGORIES = [
  { slug: 'history', label: 'History', icon: 'BookOpen' },
  { slug: 'people', label: 'People', icon: 'Users' },
  { slug: 'places', label: 'Places', icon: 'MapPin' },
  { slug: 'culture', label: 'Culture', icon: 'Palette' },
  { slug: 'politics', label: 'Politics', icon: 'Landmark' },
  { slug: 'society', label: 'Society', icon: 'Building' },
  { slug: 'diaspora', label: 'Diaspora', icon: 'Globe' },
  { slug: 'documents', label: 'Documents', icon: 'FileText' },
] as const

export const STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Draft', variant: 'secondary' },
  review: { label: 'Under Review', variant: 'outline' },
  published: { label: 'Published', variant: 'default' },
  disputed: { label: 'Disputed', variant: 'destructive' },
}
