import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const status = searchParams.get('status') || 'published'
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  let query = supabase
    .from('articles')
    .select('*, contributor:contributors!created_by(*)', { count: 'exact' })
    .eq('status', status)
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    articles: data,
    total: count,
    page,
    limit,
  })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, content_md, summary, category, subcategory, status: articleStatus } = body

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
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

  const slug = slugify(title)

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from('articles')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'An article with a similar title already exists' }, { status: 409 })
  }

  // Create article
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .insert({
      slug,
      title,
      content_md: content_md || '',
      summary: summary || '',
      category: category || null,
      subcategory: subcategory || null,
      status: articleStatus || 'draft',
      created_by: contributor.id,
    })
    .select()
    .single()

  if (articleError) {
    return NextResponse.json({ error: articleError.message }, { status: 500 })
  }

  // Create first version
  await supabase.from('article_versions').insert({
    article_id: article.id,
    version_number: 1,
    content_md: content_md || '',
    edit_summary: 'Initial creation',
    edited_by: contributor.id,
  })

  return NextResponse.json(article, { status: 201 })
}
