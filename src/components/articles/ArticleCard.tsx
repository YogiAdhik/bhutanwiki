import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      <Card className="h-full transition-colors hover:border-amber-300 hover:shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
            <Badge variant={statusInfo?.variant ?? 'secondary'} className="shrink-0 text-xs">
              {statusInfo?.label ?? article.status}
            </Badge>
          </div>
          {article.category && (
            <Badge variant="outline" className="w-fit text-xs capitalize">
              {article.category}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {article.summary && (
            <p className="text-sm text-muted-foreground mb-3">
              {truncate(article.summary, 150)}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(article.updated_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
