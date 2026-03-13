'use client'

import { Suspense, useEffect, useState, useCallback, use } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/directory/ListingCard'
import { Button } from '@/components/ui/button'
import { DIRECTORY_CATEGORIES } from '@/lib/constants'
import { Search, X, Plus } from 'lucide-react'
import type { DirectoryListing, Dzongkhag } from '@/lib/types'

function DzongkhagContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [listings, setListings] = useState<DirectoryListing[]>([])
  const [dzongkhag, setDzongkhag] = useState<Dzongkhag | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Fetch dzongkhag info
  useEffect(() => {
    async function fetchDzongkhag() {
      const res = await fetch('/api/directory/dzongkhags')
      if (res.ok) {
        const data = await res.json()
        const dz = data.find((d: Dzongkhag) => d.slug === slug)
        setDzongkhag(dz ?? null)
      }
    }
    fetchDzongkhag()
  }, [slug])

  // Fetch listings
  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      const params = new URLSearchParams({ dzongkhag: slug })
      if (search) params.set('search', search)
      if (activeCategory) params.set('category', activeCategory)

      const res = await fetch(`/api/directory?${params}`)
      if (res.ok) {
        const data = await res.json()
        setListings(data.listings ?? [])
      }
      setLoading(false)
    }
    fetchListings()
  }, [slug, search, activeCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Link href="/directory" className="hover:text-[#7B1E3A]">Directory</Link>
        <span>/</span>
        <span className="text-foreground">{dzongkhag?.name ?? slug}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{dzongkhag?.name ?? slug} District</h1>
          {dzongkhag && (
            <p className="text-muted-foreground">
              Capital: {dzongkhag.capital} · Area: {dzongkhag.area_km2?.toLocaleString()} km² · Population: {dzongkhag.population?.toLocaleString()}
            </p>
          )}
        </div>
        <Link href="/directory/submit">
          <Button variant="outline" size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search in ${dzongkhag?.name ?? slug}...`}
          className="h-11 w-full rounded-lg border border-[#e8d5b8] bg-white pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? 'bg-[#7B1E3A] hover:bg-[#5a1530]' : 'border-[#e8d5b8]'}
        >
          All
        </Button>
        {DIRECTORY_CATEGORIES.map((cat) => (
          <Button
            key={cat.slug}
            variant={activeCategory === cat.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat.slug)}
            className={activeCategory === cat.slug ? 'bg-[#7B1E3A] hover:bg-[#5a1530]' : 'border-[#e8d5b8]'}
          >
            {cat.name}
          </Button>
        ))}
      </div>

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
            Be the first to add a listing in {dzongkhag?.name ?? slug}.
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

export default function DzongkhagPage({ params }: { params: Promise<{ slug: string }> }) {
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
      <DzongkhagContent params={params} />
    </Suspense>
  )
}
