'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

/**
 * A low-barrier correction suggestion form for article readers.
 * Inserts suggestions into the `discussions` table. If the user is not
 * logged in, they are signed in anonymously before submission.
 */
export default function SuggestCorrection({ articleId }: { articleId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { user, contributor, signInAnonymously } = useAuth()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      let authorId = contributor?.id

      // If the user is not logged in, sign them in anonymously first
      if (!user) {
        const { error } = await signInAnonymously()
        if (error) {
          setStatus('error')
          setErrorMessage('Could not sign in. Please try again.')
          return
        }

        // After anonymous sign-in, fetch the newly created contributor
        const { data: { user: newUser } } = await supabase.auth.getUser()
        if (newUser) {
          const { data: newContributor } = await supabase
            .from('contributors')
            .select('id')
            .eq('auth_id', newUser.id)
            .single()
          authorId = newContributor?.id
        }
      }

      // Build the suggestion content, prefixed with the optional name
      const prefix = name.trim() ? `[Suggestion from ${name.trim()}] ` : '[Correction suggestion] '
      const fullContent = prefix + content.trim()

      const { error: insertError } = await supabase.from('discussions').insert({
        article_id: articleId,
        author_id: authorId ?? null,
        content_md: fullContent,
      })

      if (insertError) {
        setStatus('error')
        setErrorMessage('Failed to submit. Please try again.')
        return
      }

      setStatus('success')
      setContent('')
      setName('')
    } catch {
      setStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="mt-10 border border-[#e8d5b8] rounded-lg bg-[#FFF8E7] p-5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-[#5a1530] font-medium">
          Thank you! Your suggestion has been recorded.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setIsOpen(false)
          }}
          className="mt-3 text-sm text-[#7B1E3A] underline underline-offset-2 hover:text-[#5a1530]"
        >
          Submit another suggestion
        </button>
      </div>
    )
  }

  return (
    <div id="suggest-correction" className="mt-10 border border-[#e8d5b8] rounded-lg bg-[#FFF8E7]">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full px-5 py-4 text-left text-[#5a1530] font-medium hover:bg-[#FFF0DB] rounded-lg transition-colors"
          aria-expanded={false}
          aria-controls="suggest-correction-form"
        >
          Suggest a correction
        </button>
      ) : (
        <form
          id="suggest-correction-form"
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >
          <label htmlFor="correction-content" className="block text-sm font-medium text-[#5a1530]">
            Suggest a correction
          </label>

          <textarea
            id="correction-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What needs to be corrected?"
            required
            rows={4}
            className="w-full rounded-md border border-[#e8d5b8] bg-white px-3 py-2 text-sm text-[#5a1530] placeholder:text-[#5a1530]/50 focus:outline-none focus:ring-2 focus:ring-[#7B1E3A]/30 focus:border-[#7B1E3A]"
          />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-md border border-[#e8d5b8] bg-white px-3 py-2 text-sm text-[#5a1530] placeholder:text-[#5a1530]/50 focus:outline-none focus:ring-2 focus:ring-[#7B1E3A]/30 focus:border-[#7B1E3A]"
            aria-label="Your name (optional)"
          />

          {status === 'error' && (
            <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === 'submitting' || !content.trim()}
              className="rounded-md bg-[#7B1E3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a1530] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                setContent('')
                setName('')
                setStatus('idle')
                setErrorMessage('')
              }}
              className="text-sm text-[#5a1530]/70 hover:text-[#5a1530]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
