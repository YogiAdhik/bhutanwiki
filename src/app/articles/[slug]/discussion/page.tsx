export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import DiscussionSection from '@/components/articles/DiscussionSection'

interface DiscussionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DiscussionPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Discussion Not Found' }
  return { title: `Discussion: ${data.title}` }
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('id, title, slug')
    .eq('slug', slug)
    .single()

  if (!article) notFound()

  const { data: discussions } = await supabase
    .from('discussions')
    .select('*, contributor:contributors!author_id(*)')
    .eq('article_id', article.id)
    .order('created_at', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href={`/articles/${slug}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to article
          </Button>
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-1">Discussion</h1>
        <p className="text-muted-foreground mb-8">
          Talk page for{' '}
          <Link href={`/articles/${slug}`} className="text-[#7B1E3A] hover:underline font-medium">
            {article.title}
          </Link>
        </p>

        <DiscussionSection
          articleId={article.id}
          initialDiscussions={discussions ?? []}
        />
      </div>
    </div>
  )
}
