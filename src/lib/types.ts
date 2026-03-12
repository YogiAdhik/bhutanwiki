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
