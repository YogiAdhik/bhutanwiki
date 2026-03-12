'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Contributor } from '@/lib/types'

interface AuthContextType {
  user: User | null
  contributor: Contributor | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>
  signInAnonymously: () => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [contributor, setContributor] = useState<Contributor | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchContributor = useCallback(async (authId: string) => {
    const { data } = await supabase
      .from('contributors')
      .select('*')
      .eq('auth_id', authId)
      .single()
    setContributor(data)
  }, [supabase])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) {
          await fetchContributor(currentUser.id)
        } else {
          setContributor(null)
        }
        setLoading(false)
      }
    )

    // Initial session check
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser)
      if (currentUser) {
        fetchContributor(currentUser.id)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, fetchContributor])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error: error.message }

    if (data.user) {
      await supabase.from('contributors').insert({
        display_name: displayName,
        auth_id: data.user.id,
        email,
        is_anonymous: false,
      })
    }

    return { error: null }
  }

  const signInAnonymously = async () => {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) return { error: error.message }

    if (data.user) {
      const shortId = data.user.id.slice(0, 8)
      await supabase.from('contributors').insert({
        display_name: `Anonymous-${shortId}`,
        auth_id: data.user.id,
        is_anonymous: true,
      })
    }

    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setContributor(null)
  }

  return (
    <AuthContext.Provider value={{ user, contributor, loading, signIn, signUp, signInAnonymously, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
