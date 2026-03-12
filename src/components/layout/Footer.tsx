import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-amber-600" />
              <span className="font-bold">
                <span className="text-slate-800">Bhutan</span>
                <span className="text-amber-600">Wiki</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The People&apos;s Encyclopedia of Bhutan — Every Voice, Every Story, Every Truth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/articles" className="hover:text-foreground">Browse Articles</Link></li>
              <li><Link href="/articles?category=history" className="hover:text-foreground">History</Link></li>
              <li><Link href="/articles?category=diaspora" className="hover:text-foreground">Diaspora</Link></li>
              <li><Link href="/articles?category=culture" className="hover:text-foreground">Culture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/auth/register" className="hover:text-foreground">Contribute</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>Content licensed under CC BY-SA 4.0 unless otherwise noted.</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} BhutanWiki. A community project.</p>
        </div>
      </div>
    </footer>
  )
}
