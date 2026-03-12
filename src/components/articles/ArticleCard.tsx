import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate, truncate } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const statusInfo = STATUS_LABELS[article.status]

  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="group h-full rounded-xl border border-[#e8d5b8] bg-white p-5 transition-all duration-300 hover:border-[#D4A843] hover:shadow-lg hover:shadow-[#D4A843]/10 hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-3">
          {article.category && (
            <Badge variant="outline" className="text-xs capitalize border-[#e8d5b8] text-[#7B1E3A] font-medium">
              {article.category}
            </Badge>
          )}
          <Badge variant={statusInfo?.variant ?? 'secondary'} className="text-xs">
            {statusInfo?.label ?? article.status}
          </Badge>
        </div>

        <h3 className="text-lg font-bold leading-snug mb-2 text-[#1a1a2e] group-hover:text-[#7B1E3A] transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.summary && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {truncate(article.summary, 180)}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[#e8d5b8]/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(article.updated_at)}
          </p>
          <span className="text-xs font-medium text-[#7B1E3A] opacity-0 group-hover:opacity-100 transition-opacity">
            Read more &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
