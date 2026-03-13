import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('directory_listings')
    .select(`
      *,
      category:directory_categories!category_id(*),
      dzongkhag:dzongkhags!dzongkhag_id(*),
      gewog:gewogs!gewog_id(*),
      contributor:contributors!created_by(*)
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
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

  // Get the listing
  const { data: listing, error: fetchError } = await supabase
    .from('directory_listings')
    .select('*')
    .eq('slug', slug)
    .single()

  if (fetchError || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  // Get contributor and check permissions
  const { data: contributor } = await supabase
    .from('contributors')
    .select('id, role')
    .eq('auth_id', user.id)
    .single()

  if (!contributor) {
    return NextResponse.json({ error: 'Contributor profile not found' }, { status: 400 })
  }

  // Only allow author, editors, admins, stewards
  const canEdit = listing.created_by === contributor.id ||
    ['editor', 'admin', 'steward'].includes(contributor.role)

  if (!canEdit) {
    return NextResponse.json({ error: 'Not authorized to edit this listing' }, { status: 403 })
  }

  const body = await request.json()
  const updateData: Record<string, unknown> = {}

  const fields = [
    'name', 'category_id', 'dzongkhag_id', 'gewog_id',
    'address', 'latitude', 'longitude',
    'phone', 'email', 'website',
    'description', 'established_year', 'featured_image', 'status',
  ]

  for (const field of fields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field]
    }
  }

  const { data: updated, error: updateError } = await supabase
    .from('directory_listings')
    .update(updateData)
    .eq('slug', slug)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json(updated)
}
