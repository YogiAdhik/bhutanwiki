import type { SeedArticle } from './types'

import legal from './documents-legal'
import royal from './documents-royal'
import treaties from './documents-treaties'
import refugee from './documents-refugee'
import historical from './documents-historical'
import media from './documents-media'

const articles: SeedArticle[] = [
  ...legal,
  ...royal,
  ...treaties,
  ...refugee,
  ...historical,
  ...media,
]

export default articles
