'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Facebook } from 'lucide-react'

/**
 * WhatsApp and Facebook share buttons for article pages.
 * Client component because it needs access to the current page URL.
 */
interface ShareButtonsProps {
  /** The article title, used in the WhatsApp share text */
  title: string
  /** The article slug, used to construct the canonical share URL */
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const articleUrl = `https://bhutanwiki.org/articles/${slug}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${articleUrl}`)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on WhatsApp`}
      >
        <Button
          variant="outline"
          size="sm"
          className="border-[#7B1E3A]/30 text-[#7B1E3A] hover:bg-[#7B1E3A]/10 hover:text-[#7B1E3A]"
        >
          <MessageCircle className="mr-1 h-3.5 w-3.5" />
          WhatsApp
        </Button>
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on Facebook`}
      >
        <Button
          variant="outline"
          size="sm"
          className="border-[#D4A843]/50 text-[#D4A843] hover:bg-[#D4A843]/10 hover:text-[#D4A843]"
        >
          <Facebook className="mr-1 h-3.5 w-3.5" />
          Facebook
        </Button>
      </a>
    </>
  )
}
