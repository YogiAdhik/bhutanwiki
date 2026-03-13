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

// Directory categories
export const DIRECTORY_CATEGORIES = [
  { slug: 'education', name: 'Education', icon: 'GraduationCap', description: 'Schools, colleges, universities, and training institutes' },
  { slug: 'healthcare', name: 'Healthcare', icon: 'Heart', description: 'Hospitals, clinics, and health services' },
  { slug: 'government', name: 'Government', icon: 'Landmark', description: 'Government offices and public services' },
  { slug: 'hospitality', name: 'Hospitality', icon: 'Hotel', description: 'Hotels, restaurants, and accommodation' },
  { slug: 'business', name: 'Business', icon: 'Briefcase', description: 'Companies, enterprises, and commercial establishments' },
  { slug: 'religious-sites', name: 'Religious Sites', icon: 'Church', description: 'Dzongs, monasteries, temples, and sacred places' },
  { slug: 'entertainment-media', name: 'Entertainment & Media', icon: 'Film', description: 'Films, media, cultural centers, and recreation' },
  { slug: 'tourism', name: 'Tourism', icon: 'Mountain', description: 'Tourist attractions, parks, and heritage sites' },
  { slug: 'infrastructure', name: 'Infrastructure', icon: 'Building2', description: 'Transport, utilities, and public infrastructure' },
  { slug: 'municipalities', name: 'Municipalities', icon: 'MapPin', description: 'Cities, towns, and urban centers' },
] as const

export const DIRECTORY_LISTING_STATUSES: Record<string, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  published: { label: 'Published', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
}
