import type { SeedArticle } from './types'

import constitution from './politics-constitution'
import monarchy from './politics-monarchy'
import parliament from './politics-parliament'
import parties from './politics-parties'
import elections from './politics-elections'
import judiciary from './politics-judiciary'
import foreign1 from './politics-foreign-1'
import foreign2 from './politics-foreign-2'
import gnhRights from './politics-gnh-rights'
import citizenship from './politics-citizenship'
import militaryMedia from './politics-military-media'
import governance from './politics-governance'
import remaining from './politics-remaining'
import pms from './politics-pms'

const articles: SeedArticle[] = [
  ...constitution,
  ...monarchy,
  ...parliament,
  ...parties,
  ...elections,
  ...judiciary,
  ...foreign1,
  ...foreign2,
  ...gnhRights,
  ...citizenship,
  ...militaryMedia,
  ...governance,
  ...remaining,
  ...pms,
]

export default articles
