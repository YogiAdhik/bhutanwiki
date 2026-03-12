import type { SeedArticle } from './types'

// Import all people batches
import royalsArticles from './people-royals'
import politiciansArticles from './people-politicians'
import religiousArticles from './people-religious'
import artsCultureArticles from './people-arts-culture'
import athletesDiasporaArticles from './people-athletes-diaspora'
import miscArticles from './people-misc'

const articles: SeedArticle[] = [
  ...royalsArticles,
  ...politiciansArticles,
  ...religiousArticles,
  ...artsCultureArticles,
  ...athletesDiasporaArticles,
  ...miscArticles,
]

export default articles
