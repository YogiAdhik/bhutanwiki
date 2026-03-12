import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  MapPin: <MapPin className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Landmark: <Landmark className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3a0a1a] via-[#5a1530] to-[#7B1E3A] text-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(212,168,67,0.3) 30px, rgba(212,168,67,0.3) 31px)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,67,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              The People&apos;s Encyclopedia{' '}
              <span className="text-[#D4A843] whitespace-nowrap">of Bhutan</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Every Voice, Every Story, Every Truth. An open, community-owned repository
              documenting the complete history, culture, and lived experience of all
              Bhutanese people — including the stories that official narratives have erased.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-[#D4A843] hover:bg-[#c49a35] text-[#3a0a1a] font-semibold text-base">
                <Link href="/articles">
                  Browse Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white/40 text-white bg-transparent hover:bg-white/10">
                <Link href="/auth/register">Start Contributing</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Kemar band at bottom of hero */}
        <div className="kemar-band" />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Explore by Topic</h2>
        <p className="text-muted-foreground text-center mb-10">
          Browse articles across all aspects of Bhutanese life and history
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/articles?category=${cat.slug}`}>
              <Card className="group h-full cursor-pointer border-[#e8d5b8] bg-gradient-to-b from-white to-[#FFF8E7] transition-all duration-300 hover:border-[#D4A843] hover:shadow-lg hover:shadow-[#D4A843]/15 hover:-translate-y-1 active:translate-y-0 active:shadow-md">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-3 text-[#7B1E3A] transition-transform duration-300 group-hover:scale-110">
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="font-semibold transition-colors duration-300 group-hover:text-[#7B1E3A]">{cat.label}</h3>
                  <div className="mt-2 h-0.5 w-0 bg-[#D4A843] transition-all duration-300 group-hover:w-8 rounded-full" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#FFF0DB]/50 border-y border-[#e8d5b8]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Why BhutanWiki?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bhutan is one of the most information-controlled nations on earth. Over 100,000
              Lhotshampa were expelled in one of the largest per-capita refugee crises in
              modern history — yet the world barely knows. BhutanWiki exists to preserve
              these stories, document the truth, and give every Bhutanese person a voice.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">100,000+</div>
                <p className="text-sm text-muted-foreground">Refugees displaced</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">3</div>
                <p className="text-sm text-muted-foreground">Languages supported</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#7B1E3A] mb-1">Open</div>
                <p className="text-sm text-muted-foreground">CC BY-SA 4.0 licensed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Your Story Matters</h2>
          <p className="text-muted-foreground mb-6">
            Whether you are part of the diaspora, a researcher, a journalist, or simply
            someone who believes in truth — join us. Anonymous contributions welcome.
          </p>
          <Button asChild size="lg" className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white">
            <Link href="/auth/register">
              Become a Contributor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
