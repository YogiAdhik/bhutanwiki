'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dzongkhag } from '@/lib/types'

interface DirectoryFiltersProps {
  onSearchChange: (search: string) => void
  onDzongkhagChange: (dzongkhag: string | null) => void
  initialSearch?: string
  initialDzongkhag?: string | null
}

export default function DirectoryFilters({
  onSearchChange,
  onDzongkhagChange,
  initialSearch = '',
  initialDzongkhag = null,
}: DirectoryFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [dzongkhags, setDzongkhags] = useState<Dzongkhag[]>([])
  const [activeDzongkhag, setActiveDzongkhag] = useState<string | null>(initialDzongkhag)

  // Fetch dzongkhags
  useEffect(() => {
    async function fetchDzongkhags() {
      const res = await fetch('/api/directory/dzongkhags')
      if (res.ok) {
        const data = await res.json()
        setDzongkhags(data)
      }
    }
    fetchDzongkhags()
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, onSearchChange])

  const handleDzongkhagChange = useCallback((slug: string | null) => {
    setActiveDzongkhag(slug)
    onDzongkhagChange(slug)
  }, [onDzongkhagChange])

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search directory..."
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

      {/* Dzongkhag filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeDzongkhag === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleDzongkhagChange(null)}
          className={activeDzongkhag === null ? 'bg-[#7B1E3A] hover:bg-[#5a1530]' : 'border-[#e8d5b8]'}
        >
          All Districts
        </Button>
        {dzongkhags.map((dz) => (
          <Button
            key={dz.slug}
            variant={activeDzongkhag === dz.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDzongkhagChange(dz.slug)}
            className={activeDzongkhag === dz.slug ? 'bg-[#7B1E3A] hover:bg-[#5a1530]' : 'border-[#e8d5b8]'}
          >
            {dz.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
