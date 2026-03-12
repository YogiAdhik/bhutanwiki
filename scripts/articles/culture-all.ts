import type { SeedArticle } from './types'

import languages from './culture-languages'
import languages2 from './culture-languages-2'
import cuisine1 from './culture-cuisine-1'
import cuisine2 from './culture-cuisine-2'
import dress from './culture-dress'
import textiles from './culture-textiles'
import festivals1 from './culture-festivals-1'
import festivals2 from './culture-festivals-2'
import cham from './culture-cham'
import architecture from './culture-architecture'
import buddhism from './culture-buddhism'
import sportsMusic from './culture-sports-music'
import musicCinema from './culture-music-cinema'
import arts from './culture-arts'
import zorig from './culture-zorig'
import zorig2 from './culture-zorig-2'
import customs from './culture-customs'
import lhotshampa from './culture-lhotshampa'
import remaining from './culture-remaining'

const articles: SeedArticle[] = [
  ...languages,
  ...languages2,
  ...cuisine1,
  ...cuisine2,
  ...dress,
  ...textiles,
  ...festivals1,
  ...festivals2,
  ...cham,
  ...architecture,
  ...buddhism,
  ...sportsMusic,
  ...musicCinema,
  ...arts,
  ...zorig,
  ...zorig2,
  ...customs,
  ...lhotshampa,
  ...remaining,
]

export default articles
