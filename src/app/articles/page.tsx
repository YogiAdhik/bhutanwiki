'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ArticleCard from '@/components/articles/ArticleCard'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import type { Article } from '@/lib/types'

function ArticlesContent() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryFilter)

  useEffect(() => {
    setActiveCategory(categoryFilter)
  }, [categoryFilter])

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from('articles')
        .select('*, contributor:contributors!created_by(*)')
        .order('updated_at', { ascending: false })

      if (activeCategory) {
        query = query.eq('category', activeCategory)
      }

      const { data } = await query
      setArticles(data ?? [])
      setLoading(false)
    }

    fetchArticles()
  }, [activeCategory])

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.slug}
            variant={activeCategory === cat.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">No articles found</p>
          <p className="text-sm text-muted-foreground">
            {activeCategory
              ? `No articles in the "${activeCategory}" category yet.`
              : 'Be the first to contribute an article.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </>
  )
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground">
          Browse the encyclopedia
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        }
      >
        <ArticlesContent />
      </Suspense>
    </div>
  )
}
