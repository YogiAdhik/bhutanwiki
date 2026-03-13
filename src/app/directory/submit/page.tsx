'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { DirectoryCategory, Dzongkhag, Gewog } from '@/lib/types'

export default function SubmitListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [categories, setCategories] = useState<(DirectoryCategory & { subcategories?: DirectoryCategory[] })[]>([])
  const [dzongkhags, setDzongkhags] = useState<Dzongkhag[]>([])
  const [gewogs, setGewogs] = useState<Gewog[]>([])

  // Form state
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [dzongkhagId, setDzongkhagId] = useState('')
  const [gewogId, setGewogId] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [establishedYear, setEstablishedYear] = useState('')

  // Ensure user is signed in (auto anonymous)
  useEffect(() => {
    async function ensureAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        await supabase.auth.signInAnonymously()
      }
    }
    ensureAuth()
  }, [])

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('/api/directory/categories')
      if (res.ok) setCategories(await res.json())
    }
    fetchCategories()
  }, [])

  // Fetch dzongkhags
  useEffect(() => {
    async function fetchDzongkhags() {
      const res = await fetch('/api/directory/dzongkhags')
      if (res.ok) setDzongkhags(await res.json())
    }
    fetchDzongkhags()
  }, [])

  // Fetch gewogs when dzongkhag changes
  useEffect(() => {
    if (!dzongkhagId) {
      setGewogs([])
      return
    }

    async function fetchGewogs() {
      const supabase = createClient()
      const { data } = await supabase
        .from('gewogs')
        .select('*')
        .eq('dzongkhag_id', dzongkhagId)
        .order('name')
      setGewogs(data ?? [])
    }
    fetchGewogs()
  }, [dzongkhagId])

  // All subcategories flattened for the dropdown
  const allCategories = categories.flatMap(parent => [
    parent,
    ...(parent.subcategories ?? []).map(sub => ({
      ...sub,
      name: `  ${parent.name} → ${sub.name}`,
    })),
  ])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category_id: categoryId,
          dzongkhag_id: dzongkhagId || null,
          gewog_id: gewogId || null,
          address: address || null,
          phone: phone ? phone.split(',').map(p => p.trim()) : null,
          email: email || null,
          website: website || null,
          description: description || null,
          established_year: establishedYear ? parseInt(establishedYear) : null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create listing')
      }

      const listing = await res.json()
      router.push(`/directory/listing/${listing.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "h-11 w-full rounded-lg border border-[#e8d5b8] bg-white px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]"
  const labelClass = "block text-sm font-medium mb-1.5"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/directory" className="hover:text-[#7B1E3A]">Directory</Link>
          <span>/</span>
          <span className="text-foreground">Submit Listing</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Add a Directory Listing</h1>
        <p className="text-muted-foreground mb-8">
          Help build the Bhutan Directory by adding a school, hospital, business, or any establishment.
          No account required.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Sherubtse College"
              className={inputClass}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select a category</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dzongkhag + Gewog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>District (Dzongkhag)</label>
              <select
                value={dzongkhagId}
                onChange={e => { setDzongkhagId(e.target.value); setGewogId('') }}
                className={inputClass}
              >
                <option value="">Select district</option>
                {dzongkhags.map((dz) => (
                  <option key={dz.id} value={dz.id}>{dz.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Gewog</label>
              <select
                value={gewogId}
                onChange={e => setGewogId(e.target.value)}
                className={inputClass}
                disabled={!dzongkhagId}
              >
                <option value="">Select gewog</option>
                {gewogs.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street address or landmark"
              className={inputClass}
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+975-2-322496"
                className={inputClass}
              />
              <p className="text-xs text-muted-foreground mt-1">Separate multiple with commas</p>
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="info@example.bt"
                className={inputClass}
              />
            </div>
          </div>

          {/* Website + Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://www.example.bt"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Established Year</label>
              <input
                type="number"
                value={establishedYear}
                onChange={e => setEstablishedYear(e.target.value)}
                placeholder="1968"
                min="1600"
                max={new Date().getFullYear()}
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of this establishment..."
              rows={4}
              className="w-full rounded-lg border border-[#e8d5b8] bg-white px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843] resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading || !name || !categoryId}
              className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white h-11 px-8"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Listing
            </Button>
            <Link href="/directory">
              <Button variant="outline" type="button">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Directory
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
