export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ShareButtons from '@/components/articles/ShareButtons'
import { formatDate } from '@/lib/utils'
import {
  MapPin, Phone, Mail, Globe, Calendar, Pencil,
  ArrowLeft, ExternalLink, Building2,
} from 'lucide-react'

interface ListingPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ListingPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('directory_listings')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Listing Not Found' }

  return {
    title: `${data.name} — Bhutan Directory`,
    description: data.description,
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
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

  if (!listing) notFound()

  // Get parent category for breadcrumb
  let parentCategory = null
  if (listing.category?.parent_id) {
    const { data } = await supabase
      .from('directory_categories')
      .select('name, slug')
      .eq('id', listing.category.parent_id)
      .single()
    parentCategory = data
  }

  const categorySlug = parentCategory?.slug ?? listing.category?.slug

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/directory" className="hover:text-[#7B1E3A]">Directory</Link>
          <span>/</span>
          {parentCategory && (
            <>
              <Link href={`/directory/${parentCategory.slug}`} className="hover:text-[#7B1E3A]">
                {parentCategory.name}
              </Link>
              <span>/</span>
            </>
          )}
          {listing.category && !parentCategory && (
            <>
              <Link href={`/directory/${listing.category.slug}`} className="hover:text-[#7B1E3A]">
                {listing.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{listing.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {listing.category && (
              <Badge variant="outline" className="border-[#e8d5b8] text-[#7B1E3A] font-medium">
                {listing.category.name}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              Published
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{listing.name}</h1>
          <div className="flex flex-wrap gap-2">
            <Link href={`/directory/submit`}>
              <Button variant="outline" size="sm">
                <Pencil className="mr-1 h-3.5 w-3.5" />
                Suggest Edit
              </Button>
            </Link>
            <ShareButtons title={listing.name} slug={`directory/listing/${slug}`} />
          </div>
        </div>

        {/* Description */}
        {listing.description && (
          <div className="bg-[#FFF0DB]/40 border border-[#e8d5b8] rounded-lg p-5 mb-8">
            <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Location */}
          <div className="rounded-xl border border-[#e8d5b8] bg-white p-5">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#7B1E3A]" />
              Location
            </h2>
            <div className="space-y-2 text-sm">
              {listing.dzongkhag && (
                <div>
                  <span className="text-muted-foreground">District: </span>
                  <Link href={`/directory/dzongkhag/${listing.dzongkhag.slug}`} className="text-[#7B1E3A] hover:underline">
                    {listing.dzongkhag.name}
                  </Link>
                </div>
              )}
              {listing.gewog && (
                <div>
                  <span className="text-muted-foreground">Gewog: </span>
                  <span>{listing.gewog.name}</span>
                </div>
              )}
              {listing.address && (
                <div>
                  <span className="text-muted-foreground">Address: </span>
                  <span>{listing.address}</span>
                </div>
              )}
              {listing.latitude && listing.longitude && (
                <div className="pt-2">
                  <span className="text-xs text-muted-foreground">
                    GPS: {listing.latitude.toFixed(4)}, {listing.longitude.toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-xl border border-[#e8d5b8] bg-white p-5">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#7B1E3A]" />
              Details
            </h2>
            <div className="space-y-3 text-sm">
              {listing.phone && listing.phone.length > 0 && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    {listing.phone.map((p: string, i: number) => (
                      <div key={i}>{p}</div>
                    ))}
                  </div>
                </div>
              )}
              {listing.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${listing.email}`} className="text-[#7B1E3A] hover:underline">
                    {listing.email}
                  </a>
                </div>
              )}
              {listing.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-[#7B1E3A] hover:underline flex items-center gap-1">
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {listing.established_year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>Established {listing.established_year}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related article */}
        {listing.article_id && (
          <div className="rounded-xl border border-[#e8d5b8] bg-white p-5 mb-8">
            <h2 className="text-lg font-bold mb-2">Related Wiki Article</h2>
            <p className="text-sm text-muted-foreground mb-3">Read more about this in the BhutanWiki encyclopedia.</p>
            <Link href={`/articles/${listing.article_id}`}>
              <Button variant="outline" size="sm">
                Read Article
                <ArrowLeft className="ml-1 h-3.5 w-3.5 rotate-180" />
              </Button>
            </Link>
          </div>
        )}

        {/* Metadata */}
        <div className="text-xs text-muted-foreground border-t border-[#e8d5b8] pt-4">
          {listing.contributor && (
            <p>Added by {listing.contributor.display_name}</p>
          )}
          <p>Last updated {formatDate(listing.updated_at)}</p>
        </div>
      </div>
    </div>
  )
}
