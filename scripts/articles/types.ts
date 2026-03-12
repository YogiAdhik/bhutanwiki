export interface SeedArticle {
  slug: string
  title: string
  category: string
  summary: string
  content_md: string
  status: 'published' | 'draft' | 'review'
}
