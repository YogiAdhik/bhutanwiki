'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Send, MessageSquare, User } from 'lucide-react'

interface DiscussionComment {
  id: string
  article_id: string
  parent_id: string | null
  content_md: string
  author_id: string | null
  created_at: string
  contributor?: {
    id: string
    display_name: string
    is_anonymous: boolean
  } | null
}

interface DiscussionSectionProps {
  articleId: string
  initialDiscussions: DiscussionComment[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DiscussionSection({ articleId, initialDiscussions }: DiscussionSectionProps) {
  const [discussions, setDiscussions] = useState<DiscussionComment[]>(initialDiscussions)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { user, contributor, signInAnonymously } = useAuth()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setSubmitting(true)
    setError('')

    try {
      let authorId = contributor?.id

      if (!user) {
        const { error: authError } = await signInAnonymously()
        if (authError) {
          setError('Could not sign in. Please try again.')
          setSubmitting(false)
          return
        }
        const { data: { user: newUser } } = await supabase.auth.getUser()
        if (newUser) {
          const { data: newContributor } = await supabase
            .from('contributors')
            .select('id, display_name, is_anonymous')
            .eq('auth_id', newUser.id)
            .single()
          authorId = newContributor?.id
        }
      }

      const { data: inserted, error: insertError } = await supabase
        .from('discussions')
        .insert({
          article_id: articleId,
          author_id: authorId ?? null,
          content_md: content.trim(),
        })
        .select('*, contributor:contributors!author_id(*)')
        .single()

      if (insertError) {
        setError('Failed to post. Please try again.')
        setSubmitting(false)
        return
      }

      setDiscussions(prev => [...prev, inserted])
      setContent('')
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* Existing discussions */}
      {discussions.length === 0 ? (
        <div className="text-center py-12 border border-[#e8d5b8] rounded-lg bg-[#FFF8E7]/50">
          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No discussion yet. Be the first to comment.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {discussions.map((d) => (
            <div key={d.id} className="rounded-lg border border-[#e8d5b8] bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#7B1E3A]/10">
                  <User className="h-3.5 w-3.5 text-[#7B1E3A]" />
                </div>
                <span className="text-sm font-medium text-[#1a1a2e]">
                  {d.contributor?.display_name ?? 'Anonymous'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(d.created_at)}
                </span>
              </div>
              <p className="text-sm text-[#1a1a2e] whitespace-pre-wrap">{d.content_md}</p>
            </div>
          ))}
        </div>
      )}

      {/* Post form */}
      <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-[#e8d5b8] bg-[#FFF8E7] p-4">
        <label htmlFor="discussion-input" className="block text-sm font-medium text-[#1a1a2e] mb-2">
          Add to the discussion
        </label>
        <textarea
          id="discussion-input"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Share your thoughts, ask questions, or add context..."
          rows={4}
          required
          className="w-full rounded-md border border-[#e8d5b8] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843] resize-none"
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-muted-foreground">No account required. Anonymous posting is welcome.</p>
          <Button
            type="submit"
            size="sm"
            disabled={submitting || !content.trim()}
            className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white"
          >
            <Send className="mr-1 h-3.5 w-3.5" />
            {submitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
