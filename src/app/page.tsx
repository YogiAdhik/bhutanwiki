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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.15),transparent_70%)]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              The People&apos;s Encyclopedia{' '}
              <span className="text-amber-400">of Bhutan</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Every Voice, Every Story, Every Truth. An open, community-owned repository
              documenting the complete history, culture, and lived experience of all
              Bhutanese people — including the stories that official narratives have erased.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-base">
                <Link href="/articles">
                  Browse Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-slate-400 text-white bg-transparent hover:bg-white/10">
                <Link href="/auth/register">Start Contributing</Link>
              </Button>
            </div>
          </div>
        </div>
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
              <Card className="h-full transition-all hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="mb-3 text-amber-600">
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="font-semibold">{cat.label}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 border-y">
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
                <div className="text-3xl font-bold text-amber-600 mb-1">100,000+</div>
                <p className="text-sm text-muted-foreground">Refugees displaced</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-1">3</div>
                <p className="text-sm text-muted-foreground">Languages supported</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-1">Open</div>
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
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
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
