export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/constants'
import {
  BookOpen,
  Users,
  MapPin,
  Palette,
  Landmark,
  Building,
  Globe,
  FileText,
  ArrowRight,
  Pen,
  Shield,
  Heart,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-7 w-7" />,
  Users: <Users className="h-7 w-7" />,
  MapPin: <MapPin className="h-7 w-7" />,
  Palette: <Palette className="h-7 w-7" />,
  Landmark: <Landmark className="h-7 w-7" />,
  Building: <Building className="h-7 w-7" />,
  Globe: <Globe className="h-7 w-7" />,
  FileText: <FileText className="h-7 w-7" />,
}

export default async function HomePage() {
  const supabase = await createClient()
  const { count } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
  const articleCount = count ?? 0

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3a0a1a] via-[#5a1530] to-[#7B1E3A] text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(212,168,67,0.3) 30px, rgba(212,168,67,0.3) 31px)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,67,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-8 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4A843] animate-pulse" />
              {articleCount} articles and growing
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              The People&apos;s Encyclopedia{' '}
              <span className="text-[#D4A843] whitespace-nowrap">of Bhutan</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Every Voice, Every Story, Every Truth. An open, community-owned repository
              documenting the complete history, culture, and lived experience of all
              Bhutanese people — including the stories that official narratives have erased.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#D4A843] hover:bg-[#c49a35] text-[#3a0a1a] font-semibold text-base h-12 px-8 rounded-lg">
                <Link href="/articles">
                  Browse Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white/30 text-white bg-white/5 hover:bg-white/15 h-12 px-8 rounded-lg backdrop-blur-sm">
                <Link href="/articles/new">Start Writing</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="kemar-band" />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore by Topic</h2>
          <p className="text-lg text-muted-foreground">
            Browse articles across all aspects of Bhutanese life and history
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/articles?category=${cat.slug}`}>
              <div className="group relative h-full rounded-xl border border-[#e8d5b8] bg-gradient-to-br from-white via-white to-[#FFF8E7] p-6 transition-all duration-300 hover:border-[#D4A843] hover:shadow-xl hover:shadow-[#D4A843]/10 hover:-translate-y-1.5 active:translate-y-0">
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#7B1E3A]/10 p-3 text-[#7B1E3A] transition-all duration-300 group-hover:bg-[#7B1E3A] group-hover:text-white group-hover:scale-110">
                  {iconMap[cat.icon]}
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold mb-1.5 text-[#1a1a2e] transition-colors group-hover:text-[#7B1E3A]">
                  {cat.label}
                </h3>
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
                {/* Animated underline */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-[#7B1E3A] to-[#D4A843] transition-all duration-300 group-hover:w-full rounded-full" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-b from-[#FFF0DB]/40 to-[#FFF8E7] border-y border-[#e8d5b8]">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why BhutanWiki?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Bhutan is one of the most information-controlled nations on earth. Over 100,000
                Lhotshampa were expelled in one of the largest per-capita refugee crises in
                modern history — yet the world barely knows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-white border border-[#e8d5b8]">
                <div className="inline-flex items-center justify-center rounded-full bg-[#7B1E3A]/10 p-3 mb-4">
                  <Pen className="h-6 w-6 text-[#7B1E3A]" />
                </div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">{articleCount}</div>
                <p className="text-base text-muted-foreground font-medium">Encyclopedia articles</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white border border-[#e8d5b8]">
                <div className="inline-flex items-center justify-center rounded-full bg-[#7B1E3A]/10 p-3 mb-4">
                  <Shield className="h-6 w-6 text-[#7B1E3A]" />
                </div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">100%</div>
                <p className="text-base text-muted-foreground font-medium">Free and open access</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white border border-[#e8d5b8]">
                <div className="inline-flex items-center justify-center rounded-full bg-[#7B1E3A]/10 p-3 mb-4">
                  <Heart className="h-6 w-6 text-[#7B1E3A]" />
                </div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">Safe</div>
                <p className="text-base text-muted-foreground font-medium">Anonymous contributions welcome</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Story Matters</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you are part of the diaspora, a researcher, a journalist, or simply
            someone who believes in truth — join us. No account required to start editing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white h-12 px-8 rounded-lg text-base">
              <Link href="/articles/new">
                Write an Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-lg text-base border-[#e8d5b8] hover:border-[#D4A843]">
              <Link href="/articles">
                Browse All Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
