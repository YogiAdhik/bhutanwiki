import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select('*, contributor:contributors!created_by(*)')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { content_md, summary, title, category, subcategory, status: articleStatus, edit_summary } = body

  // Get the article
  const { data: article, error: fetchError } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (fetchError || !article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  // Get contributor
  const { data: contributor } = await supabase
    .from('contributors')
    .select('id')
    .eq('auth_id', user.id)
    .single()

  if (!contributor) {
    return NextResponse.json({ error: 'Contributor profile not found' }, { status: 400 })
  }

  // Update article
  const updateData: Record<string, unknown> = {}
  if (content_md !== undefined) updateData.content_md = content_md
  if (summary !== undefined) updateData.summary = summary
  if (title !== undefined) updateData.title = title
  if (category !== undefined) updateData.category = category
  if (subcategory !== undefined) updateData.subcategory = subcategory
  if (articleStatus !== undefined) updateData.status = articleStatus

  const { data: updated, error: updateError } = await supabase
    .from('articles')
    .update(updateData)
    .eq('slug', slug)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Get latest version number
  const { data: latestVersion } = await supabase
    .from('article_versions')
    .select('version_number')
    .eq('article_id', article.id)
    .order('version_number', { ascending: false })
    .limit(1)
    .single()

  const nextVersion = (latestVersion?.version_number ?? 0) + 1

  // Create new version
  if (content_md !== undefined) {
    await supabase.from('article_versions').insert({
      article_id: article.id,
      version_number: nextVersion,
      content_md,
      edit_summary: edit_summary || `Edit #${nextVersion}`,
      edited_by: contributor.id,
    })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('slug', slug)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
