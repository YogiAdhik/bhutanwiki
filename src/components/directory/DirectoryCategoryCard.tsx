import Link from 'next/link'
import {
  GraduationCap, Heart, Landmark, Hotel, Briefcase,
  Church, Film, Mountain, Building2, MapPin,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-7 w-7" />,
  Heart: <Heart className="h-7 w-7" />,
  Landmark: <Landmark className="h-7 w-7" />,
  Hotel: <Hotel className="h-7 w-7" />,
  Briefcase: <Briefcase className="h-7 w-7" />,
  Church: <Church className="h-7 w-7" />,
  Film: <Film className="h-7 w-7" />,
  Mountain: <Mountain className="h-7 w-7" />,
  Building2: <Building2 className="h-7 w-7" />,
  MapPin: <MapPin className="h-7 w-7" />,
}

interface DirectoryCategoryCardProps {
  slug: string
  name: string
  icon: string
  description: string
  count: number
}

export default function DirectoryCategoryCard({ slug, name, icon, description, count }: DirectoryCategoryCardProps) {
  return (
    <Link href={`/directory/${slug}`}>
      <div className="group relative h-full rounded-xl border border-[#e8d5b8] bg-gradient-to-br from-white via-white to-[#FFF8E7] p-6 transition-all duration-300 hover:border-[#D4A843] hover:shadow-xl hover:shadow-[#D4A843]/10 hover:-translate-y-1.5 active:translate-y-0">
        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#7B1E3A]/10 p-3 text-[#7B1E3A] transition-all duration-300 group-hover:bg-[#7B1E3A] group-hover:text-white group-hover:scale-110">
          {iconMap[icon] ?? <MapPin className="h-7 w-7" />}
        </div>
        <h3 className="text-xl font-bold mb-1.5 text-[#1a1a2e] transition-colors group-hover:text-[#7B1E3A]">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          {description}
        </p>
        <p className="text-xs font-medium text-[#7B1E3A]">
          {count} {count === 1 ? 'listing' : 'listings'}
        </p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-[#7B1E3A] to-[#D4A843] transition-all duration-300 group-hover:w-full rounded-full" />
      </div>
    </Link>
  )
}
