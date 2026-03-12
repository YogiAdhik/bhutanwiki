import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  // Get article by slug
  const { data: article } = await supabase
    .from('articles')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  const { data: versions, error } = await supabase
    .from('article_versions')
    .select('*, contributor:contributors!edited_by(*)')
    .eq('article_id', article.id)
    .order('version_number', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(versions)
}
