import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const category = searchParams.get('category')
  const dzongkhag = searchParams.get('dzongkhag')
  const search = searchParams.get('search')
  const status = searchParams.get('status') || 'published'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  let query = supabase
    .from('directory_listings')
    .select(`
      *,
      category:directory_categories!category_id(*),
      dzongkhag:dzongkhags!dzongkhag_id(*),
      gewog:gewogs!gewog_id(*),
      contributor:contributors!created_by(*)
    `, { count: 'exact' })
    .eq('status', status)
    .order('name', { ascending: true })
    .range(offset, offset + limit - 1)

  if (category) {
    // Filter by category slug via a subquery
    const { data: cat } = await supabase
      .from('directory_categories')
      .select('id')
      .eq('slug', category)

    if (cat && cat.length > 0) {
      const categoryIds = cat.map(c => c.id)
      query = query.in('category_id', categoryIds)
    }
  }

  if (dzongkhag) {
    const { data: dz } = await supabase
      .from('dzongkhags')
      .select('id')
      .eq('slug', dzongkhag)
      .single()

    if (dz) {
      query = query.eq('dzongkhag_id', dz.id)
    }
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    listings: data,
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
  const {
    name, category_id, dzongkhag_id, gewog_id,
    address, latitude, longitude,
    phone, email, website,
    description, established_year, featured_image,
    status: listingStatus,
  } = body

  if (!name || !category_id) {
    return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
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

  const slug = slugify(name)

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from('directory_listings')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'A listing with a similar name already exists' }, { status: 409 })
  }

  const { data: listing, error: insertError } = await supabase
    .from('directory_listings')
    .insert({
      name,
      slug,
      category_id,
      dzongkhag_id: dzongkhag_id || null,
      gewog_id: gewog_id || null,
      address: address || null,
      latitude: latitude || null,
      longitude: longitude || null,
      phone: phone || null,
      email: email || null,
      website: website || null,
      description: description || null,
      established_year: established_year || null,
      featured_image: featured_image || null,
      status: listingStatus || 'published',
      created_by: contributor.id,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json(listing, { status: 201 })
}
