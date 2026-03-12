import type { SeedArticle } from './types'

import crisis1 from './diaspora-crisis-1'
import camps from './diaspora-camps'
import resettlement from './diaspora-resettlement'
import advocacy from './diaspora-advocacy'
import culture from './diaspora-culture'
import success from './diaspora-success'

const articles: SeedArticle[] = [
  ...crisis1,
  ...camps,
  ...resettlement,
  ...advocacy,
  ...culture,
  ...success,
]

export default articles
