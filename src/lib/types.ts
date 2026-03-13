export interface Article {
  id: string
  slug: string
  title: string
  title_dz: string | null
  title_ne: string | null
  category: string | null
  subcategory: string | null
  content_md: string | null
  summary: string | null
  status: ArticleStatus
  protection_level: ProtectionLevel
  created_at: string
  updated_at: string
  created_by: string | null
  contributor?: Contributor
}

export interface ArticleVersion {
  id: string
  article_id: string
  version_number: number
  content_md: string
  edit_summary: string | null
  edited_by: string | null
  created_at: string
  is_reverted: boolean
  contributor?: Contributor
}

export interface Contributor {
  id: string
  display_name: string
  auth_id: string | null
  email: string | null
  role: ContributorRole
  is_anonymous: boolean
  trust_level: number
  location_country: string | null
  created_at: string
}

export interface Citation {
  id: string
  article_id: string
  citation_key: string | null
  source_type: SourceType
  title: string | null
  author: string | null
  publication: string | null
  date: string | null
  url: string | null
  archived_url: string | null
  page_numbers: string | null
  quote: string | null
  verified: boolean
}

export interface Tag {
  id: string
  name: string
  name_dz: string | null
  name_ne: string | null
  description: string | null
  parent_tag_id: string | null
}

export interface Discussion {
  id: string
  article_id: string
  parent_id: string | null
  content_md: string
  author_id: string | null
  created_at: string
  contributor?: Contributor
}

export type ArticleStatus = 'draft' | 'review' | 'published' | 'disputed'
export type ProtectionLevel = 'open' | 'semi' | 'full'
export type ContributorRole = 'reader' | 'contributor' | 'editor' | 'admin' | 'steward'
export type SourceType = 'book' | 'journal' | 'news' | 'report' | 'oral' | 'government' | 'web'
export type SupportedLanguage = 'en' | 'ne' | 'dz'

// Directory types
export interface Dzongkhag {
  id: string
  name: string
  name_dz: string | null
  slug: string
  area_km2: number | null
  population: number | null
  capital: string | null
  created_at: string
}

export interface Gewog {
  id: string
  name: string
  name_dz: string | null
  slug: string
  dzongkhag_id: string
  created_at: string
}

export interface DirectoryCategory {
  id: string
  name: string
  slug: string
  parent_id: string | null
  icon: string | null
  description: string | null
  display_order: number
  created_at: string
  subcategories?: DirectoryCategory[]
}

export interface DirectoryListing {
  id: string
  article_id: string | null
  name: string
  slug: string
  category_id: string
  dzongkhag_id: string | null
  gewog_id: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  phone: string[] | null
  email: string | null
  website: string | null
  description: string | null
  established_year: number | null
  featured_image: string | null
  status: DirectoryListingStatus
  created_by: string | null
  created_at: string
  updated_at: string
  // Joined fields
  category?: DirectoryCategory
  dzongkhag?: Dzongkhag
  gewog?: Gewog
  contributor?: Contributor
}

export type DirectoryListingStatus = 'draft' | 'review' | 'published' | 'rejected'
