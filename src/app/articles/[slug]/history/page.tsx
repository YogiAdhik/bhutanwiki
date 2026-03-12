export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, User } from 'lucide-react'

interface HistoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: HistoryPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title')
    .eq('slug', slug)
    .single()

  return {
    title: data ? `History: ${data.title}` : 'History',
  }
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('id, title, slug')
    .eq('slug', slug)
    .single()

  if (!article) notFound()

  const { data: versions } = await supabase
    .from('article_versions')
    .select('*, contributor:contributors!edited_by(*)')
    .eq('article_id', article.id)
    .order('version_number', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href={`/articles/${slug}`}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to article
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Version History</h1>
        <p className="text-muted-foreground mb-8">{article.title}</p>

        {!versions || versions.length === 0 ? (
          <p className="text-muted-foreground">No version history available.</p>
        ) : (
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className="flex items-start gap-4 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Badge variant={index === 0 ? 'default' : 'outline'}>
                    v{version.version_number}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {version.edit_summary || 'No edit summary'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {version.contributor?.display_name ?? 'Unknown'}
                    </span>
                    <span>{formatDate(version.created_at)}</span>
                    {version.is_reverted && (
                      <Badge variant="destructive" className="text-xs">Reverted</Badge>
                    )}
                  </div>
                </div>
                {index === 0 && (
                  <Badge variant="secondary" className="shrink-0">Current</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
