'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ArticleCard from '@/components/articles/ArticleCard'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import { Search, X } from 'lucide-react'
import type { Article } from '@/lib/types'

function ArticlesContent() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const searchFilter = searchParams.get('search')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryFilter)
  const [searchQuery, setSearchQuery] = useState(searchFilter ?? '')

  useEffect(() => {
    setActiveCategory(categoryFilter)
  }, [categoryFilter])

  useEffect(() => {
    if (searchFilter) setSearchQuery(searchFilter)
  }, [searchFilter])

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from('articles')
        .select('*, contributor:contributors!created_by(*)')
        .eq('status', 'published')
        .order('title')

      if (activeCategory) {
        query = query.eq('category', activeCategory)
      }

      if (searchQuery && searchQuery.length >= 2) {
        query = query.or(`title.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`)
      }

      const { data } = await query
      setArticles(data ?? [])
      setLoading(false)
    }

    fetchArticles()
  }, [activeCategory, searchQuery])

  return (
    <>
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search 626 articles..."
          className="h-11 w-full rounded-lg border border-[#e8d5b8] bg-white pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

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
