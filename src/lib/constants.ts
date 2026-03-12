export const ARTICLE_STATUSES = ['draft', 'review', 'published', 'disputed'] as const
export const PROTECTION_LEVELS = ['open', 'semi', 'full'] as const
export const CONTRIBUTOR_ROLES = ['reader', 'contributor', 'editor', 'admin', 'steward'] as const
export const SOURCE_TYPES = ['book', 'journal', 'news', 'report', 'oral', 'government', 'web'] as const
export const SUPPORTED_LANGUAGES = ['en', 'ne', 'dz'] as const

export const CATEGORIES = [
  { slug: 'history', label: 'History', icon: 'BookOpen', description: 'From ancient kingdoms to modern nation' },
  { slug: 'people', label: 'People', icon: 'Users', description: 'Kings, leaders, artists, and activists' },
  { slug: 'places', label: 'Places', icon: 'MapPin', description: 'Dzongs, valleys, mountains, and diaspora cities' },
  { slug: 'culture', label: 'Culture', icon: 'Palette', description: 'Language, cuisine, festivals, and arts' },
  { slug: 'politics', label: 'Politics', icon: 'Landmark', description: 'Government, law, and democracy' },
  { slug: 'society', label: 'Society', icon: 'Building', description: 'Economy, education, and daily life' },
  { slug: 'diaspora', label: 'Diaspora', icon: 'Globe', description: 'Refugee crisis, resettlement, and identity' },
  { slug: 'documents', label: 'Documents', icon: 'FileText', description: 'Treaties, laws, and historic texts' },
] as const

export const STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Draft', variant: 'secondary' },
  review: { label: 'Under Review', variant: 'outline' },
  published: { label: 'Published', variant: 'default' },
  disputed: { label: 'Disputed', variant: 'destructive' },
}
