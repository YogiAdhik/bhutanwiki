'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil, AlertCircle, PlusCircle } from 'lucide-react'

/**
 * A warm, inviting callout displayed at the bottom of every article,
 * encouraging community members to contribute their knowledge.
 */
export default function CommunityPrompt({ slug }: { slug: string }) {
  return (
    <section
      className="mt-12 rounded-xl border border-[#e8d5b8] bg-gradient-to-br from-[#FFF8E7] to-[#FFF0DB] p-6 md:p-8"
      aria-labelledby="community-prompt-heading"
    >
      <h2
        id="community-prompt-heading"
        className="text-lg font-bold text-[#1a1a2e] mb-2"
      >
        Help improve this article
      </h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Do you have personal knowledge about this topic? Were you there? Your
        experience matters. BhutanWiki is built by the community, for the
        community.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <Link href={`/articles/${slug}/edit`}>
          <Button className="bg-[#7B1E3A] hover:bg-[#5a1530] text-white">
            <Pencil className="mr-1.5 h-4 w-4" />
            Edit this article
          </Button>
        </Link>

        <Button
          variant="outline"
          className="border-[#e8d5b8]"
          onClick={() => {
            document
              .getElementById('suggest-correction')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <AlertCircle className="mr-1.5 h-4 w-4" />
          Suggest a correction
        </Button>

        <Link href="/articles/new">
          <Button variant="outline" className="border-[#e8d5b8]">
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Create a new article
          </Button>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground italic">
        Anonymous contributions welcome. No account required.
      </p>
    </section>
  )
}
