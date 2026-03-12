import type { SeedArticle } from './types'

// Import all history batches
import earlyArticles from './history-early'
import articlesFromBatch3 from './history-articles'
import milestonesArticles from './history-milestones'
import crisisArticles from './history-crisis'
import dzongsConflictsArticles from './history-dzongs-conflicts'
import treatiesPoliticsArticles from './history-treaties-and-politics'
import politicsDiplomacyArticles from './history-politics-diplomacy'
import historyArticles from './history'
import foundationsArticles from './history-foundations'

const articles: SeedArticle[] = [
  ...earlyArticles,
  ...articlesFromBatch3,
  ...milestonesArticles,
  ...crisisArticles,
  ...dzongsConflictsArticles,
  ...treatiesPoliticsArticles,
  ...politicsDiplomacyArticles,
  ...historyArticles,
  ...foundationsArticles,
]

export default articles
