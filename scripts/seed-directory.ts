import { createClient } from '@supabase/supabase-js'
import { dzongkhags } from './seed-dzongkhags'
import { directoryCategories } from './seed-directory-categories'
import { directoryListings } from './seed-directory-listings'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('\n=== Seeding Directory Data ===\n')

  // 1. Seed dzongkhags
  console.log('--- Dzongkhags ---')
  let dzCreated = 0, dzSkipped = 0
  for (const dz of dzongkhags) {
    const { error } = await supabase
      .from('dzongkhags')
      .upsert({
        name: dz.name,
        name_dz: dz.name_dz,
        slug: dz.slug,
        area_km2: dz.area_km2,
        population: dz.population,
        capital: dz.capital,
      }, { onConflict: 'slug' })

    if (error) {
      console.log(`  FAIL: ${dz.name} — ${error.message}`)
    } else {
      console.log(`  OK: ${dz.name}`)
      dzCreated++
    }
  }
  console.log(`Dzongkhags: ${dzCreated} upserted\n`)

  // 2. Seed gewogs
  console.log('--- Gewogs ---')
  let gewogCount = 0
  for (const dz of dzongkhags) {
    // Look up dzongkhag ID
    const { data: dzRow } = await supabase
      .from('dzongkhags')
      .select('id')
      .eq('slug', dz.slug)
      .single()

    if (!dzRow) {
      console.log(`  SKIP gewogs for ${dz.name} — dzongkhag not found`)
      continue
    }

    for (const gewog of dz.gewogs) {
      const { error } = await supabase
        .from('gewogs')
        .upsert({
          name: gewog.name,
          slug: gewog.slug,
          dzongkhag_id: dzRow.id,
        }, { onConflict: 'dzongkhag_id,slug' })

      if (error) {
        console.log(`  FAIL: ${gewog.name} (${dz.name}) — ${error.message}`)
      } else {
        gewogCount++
      }
    }
    console.log(`  OK: ${dz.name} — ${dz.gewogs.length} gewogs`)
  }
  console.log(`Gewogs: ${gewogCount} upserted\n`)

  // 3. Seed directory categories
  console.log('--- Directory Categories ---')
  let catCount = 0, subCount = 0

  // Insert parent categories first
  for (const cat of directoryCategories) {
    const { error } = await supabase
      .from('directory_categories')
      .upsert({
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        display_order: cat.display_order,
        parent_id: null,
      }, { onConflict: 'slug' })

    if (error) {
      console.log(`  FAIL: ${cat.name} — ${error.message}`)
    } else {
      console.log(`  OK: ${cat.name}`)
      catCount++
    }
  }

  // Insert subcategories
  for (const cat of directoryCategories) {
    if (!cat.subcategories) continue

    const { data: parentRow } = await supabase
      .from('directory_categories')
      .select('id')
      .eq('slug', cat.slug)
      .single()

    if (!parentRow) continue

    for (const sub of cat.subcategories) {
      const { error } = await supabase
        .from('directory_categories')
        .upsert({
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          parent_id: parentRow.id,
          display_order: 0,
        }, { onConflict: 'slug' })

      if (error) {
        console.log(`  FAIL: ${sub.name} — ${error.message}`)
      } else {
        subCount++
      }
    }
  }
  console.log(`Categories: ${catCount} parents, ${subCount} subcategories\n`)

  // 4. Seed directory listings
  console.log('--- Directory Listings ---')
  let listCreated = 0, listFailed = 0

  for (const listing of directoryListings) {
    // Resolve category_id
    const { data: catRow } = await supabase
      .from('directory_categories')
      .select('id')
      .eq('slug', listing.category_slug)
      .single()

    if (!catRow) {
      console.log(`  FAIL: ${listing.name} — category "${listing.category_slug}" not found`)
      listFailed++
      continue
    }

    // Resolve dzongkhag_id (optional)
    let dzongkhagId: string | null = null
    if (listing.dzongkhag_slug) {
      const { data: dzRow } = await supabase
        .from('dzongkhags')
        .select('id')
        .eq('slug', listing.dzongkhag_slug)
        .single()
      dzongkhagId = dzRow?.id ?? null
    }

    const { error } = await supabase
      .from('directory_listings')
      .upsert({
        name: listing.name,
        slug: listing.slug,
        category_id: catRow.id,
        dzongkhag_id: dzongkhagId,
        description: listing.description,
        address: listing.address ?? null,
        phone: listing.phone ?? null,
        email: listing.email ?? null,
        website: listing.website ?? null,
        established_year: listing.established_year ?? null,
        latitude: listing.latitude ?? null,
        longitude: listing.longitude ?? null,
        status: 'published',
      }, { onConflict: 'slug' })

    if (error) {
      console.log(`  FAIL: ${listing.name} — ${error.message}`)
      listFailed++
    } else {
      console.log(`  OK: ${listing.name}`)
      listCreated++
    }
  }

  console.log(`\n=== Done ===`)
  console.log(`Dzongkhags: ${dzCreated} | Gewogs: ${gewogCount} | Categories: ${catCount}+${subCount} | Listings: ${listCreated} created, ${listFailed} failed`)
}

seed()
