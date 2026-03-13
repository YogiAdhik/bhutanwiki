import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // Fetch all categories
  const { data: categories, error } = await supabase
    .from('directory_categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Nest subcategories under parents
  const parents = categories?.filter(c => !c.parent_id) || []
  const children = categories?.filter(c => c.parent_id) || []

  const nested = parents.map(parent => ({
    ...parent,
    subcategories: children
      .filter(child => child.parent_id === parent.id)
      .sort((a, b) => a.display_order - b.display_order),
  }))

  return NextResponse.json(nested)
}
