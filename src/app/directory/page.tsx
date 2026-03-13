export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import DirectoryCategoryCard from '@/components/directory/DirectoryCategoryCard'
import { ArrowRight, Plus, FolderOpen } from 'lucide-react'

export default async function DirectoryPage() {
  const supabase = await createClient()

  // Fetch categories with listing counts
  const { data: categories } = await supabase
    .from('directory_categories')
    .select('*')
    .is('parent_id', null)
    .order('display_order', { ascending: true })

  // Get total listing count
  const { count: totalListings } = await supabase
    .from('directory_listings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  // Get listing counts per category (parent + children)
  const categoryCounts: Record<string, number> = {}
  if (categories) {
    for (const cat of categories) {
      // Get this category's ID and all its children's IDs
      const { data: children } = await supabase
        .from('directory_categories')
        .select('id')
        .eq('parent_id', cat.id)

      const categoryIds = [cat.id, ...(children?.map(c => c.id) ?? [])]

      const { count } = await supabase
        .from('directory_listings')
        .select('*', { count: 'exact', head: true })
        .in('category_id', categoryIds)
        .eq('status', 'published')

      categoryCounts[cat.slug] = count ?? 0
    }
  }

  // Get dzongkhag count
  const { count: dzongkhagCount } = await supabase
    .from('dzongkhags')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3a0a1a] via-[#5a1530] to-[#7B1E3A] text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(212,168,67,0.3) 30px, rgba(212,168,67,0.3) 31px)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,67,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-8 backdrop-blur-sm">
              <FolderOpen className="h-4 w-4" />
              {totalListings ?? 0} listings across {dzongkhagCount ?? 20} districts
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Bhutan{' '}
              <span className="text-[#D4A843]">Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Discover schools, hospitals, businesses, monasteries, and more across
              all 20 dzongkhags of Bhutan. Community-maintained and always growing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#D4A843] hover:bg-[#c49a35] text-[#3a0a1a] font-semibold text-base h-12 px-8 rounded-lg">
                <Link href="/directory/submit">
                  <Plus className="mr-2 h-4 w-4" />
                  Add a Listing
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white/30 text-white bg-white/5 hover:bg-white/15 h-12 px-8 rounded-lg backdrop-blur-sm">
                <Link href="#categories">
                  Browse Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="kemar-band" />
      </section>

      {/* Categories Grid */}
      <section id="categories" className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-lg text-muted-foreground">
            Find establishments across all sectors of Bhutanese life
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories?.map((cat) => (
            <DirectoryCategoryCard
              key={cat.slug}
              slug={cat.slug}
              name={cat.name}
              icon={cat.icon ?? 'MapPin'}
              description={cat.description ?? ''}
              count={categoryCounts[cat.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-[#FFF0DB]/40 to-[#FFF8E7] border-y border-[#e8d5b8]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Know a Place?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Help build the most comprehensive directory of Bhutanese establishments.
              Add schools, businesses, hospitals, or any place that matters. No account required.
            </p>
            <Button asChild size="lg" className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white h-12 px-8 rounded-lg text-base">
              <Link href="/directory/submit">
                Submit a Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
