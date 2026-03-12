import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#e8d5b8] bg-[#FFF0DB]/30">
      <div className="prayer-flag-stripe" />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-[#7B1E3A]" />
              <span className="font-bold">
                <span className="text-[#1a1a2e]">Bhutan</span>
                <span className="text-[#D4A843]">Wiki</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The People&apos;s Encyclopedia of Bhutan — Every Voice, Every Story, Every Truth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/articles" className="hover:text-[#7B1E3A]">Browse Articles</Link></li>
              <li><Link href="/articles?category=history" className="hover:text-[#7B1E3A]">History</Link></li>
              <li><Link href="/articles?category=diaspora" className="hover:text-[#7B1E3A]">Diaspora</Link></li>
              <li><Link href="/articles?category=culture" className="hover:text-[#7B1E3A]">Culture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/auth/register" className="hover:text-[#7B1E3A]">Contribute</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e8d5b8] text-center text-xs text-muted-foreground">
          <p>Content licensed under CC BY-SA 4.0 unless otherwise noted.</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} BhutanWiki. A community project.</p>
        </div>
      </div>
    </footer>
  )
}
