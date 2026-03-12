import type { SeedArticle } from './types'

import economy from './society-economy'
import hydropower from './society-hydropower'
import hydropower2 from './society-hydropower-2'
import banking from './society-banking'
import business from './society-business'
import social from './society-social'
import ethnic from './society-ethnic'
import challenges from './society-challenges'
import diaspora from './society-diaspora'
import diasporaThematic from './society-diaspora-thematic'
import remaining from './society-remaining'
import media from './society-media'

const articles: SeedArticle[] = [
  ...economy,
  ...hydropower,
  ...hydropower2,
  ...banking,
  ...business,
  ...social,
  ...ethnic,
  ...challenges,
  ...diaspora,
  ...diasporaThematic,
  ...remaining,
  ...media,
]

export default articles
