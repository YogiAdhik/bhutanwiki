'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import ArticleEditor from '@/components/articles/ArticleEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORIES } from '@/lib/constants'
import { toast } from 'sonner'
import type { Article } from '@/lib/types'
import Link from 'next/link'

export default function EditArticlePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<Article | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [editSummary, setEditSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchArticle() {
      const supabase = createClient()
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

      if (data) {
        setArticle(data)
        setTitle(data.title)
        setSummary(data.summary || '')
        setCategory(data.category || '')
        setContent(data.content_md || '')
      }
      setLoading(false)
    }

    fetchArticle()
  }, [slug])

  if (loading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading…</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
        <p className="text-muted-foreground mb-6">You need to sign in to edit articles.</p>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
      </div>
    )
  }

  const handleSave = async () => {
    if (!editSummary.trim()) {
      toast.error('Please describe your changes')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim(),
          category: category || null,
          content_md: content,
          edit_summary: editSummary.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to save')
        return
      }

      toast.success('Changes saved')
      router.push(`/articles/${slug}`)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Editing: {article.title}
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(val) => setCategory(val ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <ArticleEditor content={content} onChange={setContent} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="editSummary">Edit Summary (required)</Label>
            <Input
              id="editSummary"
              placeholder="Briefly describe your changes"
              value={editSummary}
              onChange={(e) => setEditSummary(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild variant="outline">
              <Link href={`/articles/${slug}`}>Cancel</Link>
            </Button>
            <Button
              onClick={handleSave}
              className="bg-amber-600 hover:bg-amber-700"
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
