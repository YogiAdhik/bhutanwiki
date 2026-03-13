import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { truncate } from '@/lib/utils'
import type { DirectoryListing } from '@/lib/types'
import { MapPin, Phone, Calendar } from 'lucide-react'

interface ListingCardProps {
  listing: DirectoryListing
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/directory/listing/${listing.slug}`}>
      <div className="group h-full rounded-xl border border-[#e8d5b8] bg-white p-5 transition-all duration-300 hover:border-[#D4A843] hover:shadow-lg hover:shadow-[#D4A843]/10 hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-3">
          {listing.category && (
            <Badge variant="outline" className="text-xs border-[#e8d5b8] text-[#7B1E3A] font-medium">
              {listing.category.name}
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-bold leading-snug mb-2 text-[#1a1a2e] group-hover:text-[#7B1E3A] transition-colors line-clamp-2">
          {listing.name}
        </h3>

        {listing.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {truncate(listing.description, 150)}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[#e8d5b8]/50 space-y-1.5">
          {listing.dzongkhag && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{listing.dzongkhag.name} District</span>
            </div>
          )}
          {listing.phone && listing.phone.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{listing.phone[0]}</span>
            </div>
          )}
          {listing.established_year && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>Est. {listing.established_year}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
