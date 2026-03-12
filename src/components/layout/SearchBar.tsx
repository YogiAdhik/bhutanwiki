'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, X } from 'lucide-react'

interface SearchResult {
  id: string
  slug: string
  title: string
  category: string
  summary: string | null
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('articles')
      .select('id, slug, title, category, summary')
      .eq('status', 'published')
      .or(`title.ilike.%${q}%,summary.ilike.%${q}%`)
      .order('title')
      .limit(8)
    setResults(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), 250)
    return () => clearTimeout(timer)
  }, [query, search])

  useEffect(() => {
    setSelectedIndex(-1)
  }, [results])

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navigate = (slug: string) => {
    setOpen(false)
    setQuery('')
    router.push(`/articles/${slug}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        navigate(results[selectedIndex].slug)
      } else if (query.length >= 2) {
        setOpen(false)
        router.push(`/articles?search=${encodeURIComponent(query)}`)
        setQuery('')
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search articles..."
          className="h-9 w-full rounded-lg border border-[#e8d5b8] bg-white pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843] transition-colors"
        />
        {query ? (
          <button
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-[#e8d5b8] bg-[#FFF8E7] px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>

      {/* Results dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#e8d5b8] bg-white shadow-lg overflow-hidden z-50">
          {loading ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No articles found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul>
              {results.map((article, i) => (
                <li key={article.id}>
                  <button
                    onClick={() => navigate(article.slug)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      i === selectedIndex
                        ? 'bg-[#FFF0DB]'
                        : 'hover:bg-[#FFF8E7]'
                    }`}
                  >
                    <div className="font-medium text-[#1a1a2e]">{article.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                      <span className="capitalize text-[#7B1E3A] font-medium">{article.category}</span>
                      {article.summary && (
                        <>
                          <span>&middot;</span>
                          <span className="truncate">{article.summary.slice(0, 80)}...</span>
                        </>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
