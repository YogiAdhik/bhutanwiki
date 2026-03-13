'use client'

import { Suspense, useEffect, useState, useCallback, use } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/directory/ListingCard'
import DirectoryFilters from '@/components/directory/DirectoryFilters'
import { Button } from '@/components/ui/button'
import { DIRECTORY_CATEGORIES } from '@/lib/constants'
import { Plus } from 'lucide-react'
import type { DirectoryListing } from '@/lib/types'

function CategoryContent({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const [listings, setListings] = useState<DirectoryListing[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dzongkhag, setDzongkhag] = useState<string | null>(null)

  const categoryInfo = DIRECTORY_CATEGORIES.find(c => c.slug === category)

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      const params = new URLSearchParams({ category })
      if (search) params.set('search', search)
      if (dzongkhag) params.set('dzongkhag', dzongkhag)

      const res = await fetch(`/api/directory?${params}`)
      if (res.ok) {
        const data = await res.json()
        setListings(data.listings ?? [])
      }
      setLoading(false)
    }
    fetchListings()
  }, [category, search, dzongkhag])

  const handleSearchChange = useCallback((s: string) => setSearch(s), [])
  const handleDzongkhagChange = useCallback((d: string | null) => setDzongkhag(d), [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/directory" className="hover:text-[#7B1E3A]">Directory</Link>
            <span>/</span>
            <span className="text-foreground">{categoryInfo?.name ?? category}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{categoryInfo?.name ?? category}</h1>
          <p className="text-muted-foreground">{categoryInfo?.description ?? ''}</p>
        </div>
        <Link href="/directory/submit">
          <Button variant="outline" size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <DirectoryFilters
        onSearchChange={handleSearchChange}
        onDzongkhagChange={handleDzongkhagChange}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">No listings found</p>
          <p className="text-sm text-muted-foreground mb-6">
            Be the first to add a {categoryInfo?.name?.toLowerCase()} listing.
          </p>
          <Link href="/directory/submit">
            <Button className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white">
              <Plus className="mr-1 h-4 w-4" />
              Add Listing
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  )
}
