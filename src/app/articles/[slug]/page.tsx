export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ArticleMetadata from '@/components/articles/ArticleMetadata'
import { Button } from '@/components/ui/button'
import { Pencil, History, MessageSquare } from 'lucide-react'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title, summary')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Article Not Found' }

  return {
    title: data.title,
    description: data.summary,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*, contributor:contributors!created_by(*)')
    .eq('slug', slug)
    .single()

  if (!article) notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Article header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <ArticleMetadata article={article} />

          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/articles/${slug}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="mr-1 h-3.5 w-3.5" />
                Edit
              </Button>
            </Link>
            <Link href={`/articles/${slug}/history`}>
              <Button variant="outline" size="sm">
                <History className="mr-1 h-3.5 w-3.5" />
                History
              </Button>
            </Link>
            <Button variant="outline" size="sm" disabled>
              <MessageSquare className="mr-1 h-3.5 w-3.5" />
              Discussion
            </Button>
          </div>
        </div>

        {/* Article summary */}
        {article.summary && (
          <div className="bg-slate-50 border rounded-lg p-4 mb-8">
            <p className="text-muted-foreground italic">{article.summary}</p>
          </div>
        )}

        {/* Article content */}
        <div
          className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-amber-700"
          dangerouslySetInnerHTML={{ __html: article.content_md || '<p>This article is empty. Be the first to contribute.</p>' }}
        />
      </div>
    </div>
  )
}
