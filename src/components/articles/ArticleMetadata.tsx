import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { Article } from '@/lib/types'
import { Calendar, User, Shield } from 'lucide-react'

interface ArticleMetadataProps {
  article: Article
}

export default function ArticleMetadata({ article }: ArticleMetadataProps) {
  const statusInfo = STATUS_LABELS[article.status]

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <Badge variant={statusInfo?.variant ?? 'secondary'}>
        {statusInfo?.label ?? article.status}
      </Badge>

      {article.category && (
        <Badge variant="outline" className="capitalize">
          {article.category}
        </Badge>
      )}

      {article.protection_level !== 'open' && (
        <div className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          <span className="capitalize">{article.protection_level}-protected</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <Calendar className="h-3.5 w-3.5" />
        <span>Updated {formatDate(article.updated_at)}</span>
      </div>

      {article.contributor && (
        <div className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          <span>{article.contributor.display_name}</span>
        </div>
      )}
    </div>
  )
}
