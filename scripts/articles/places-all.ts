import type { SeedArticle } from './types'

// Import all places batches
import dzongkhags1 from './places-dzongkhags-1'
import dzongkhags2 from './places-dzongkhags-2'
import dzongkhags3 from './places-dzongkhags-3'
import dzongkhags4 from './places-dzongkhags-4'
import dzongs1 from './places-dzongs-1'
import dzongs2 from './places-dzongs-2'
import monasteries1 from './places-monasteries-1'
import monasteries2 from './places-monasteries-2'
import parks1 from './places-parks-1'
import parks2 from './places-parks-2'
import mountainsRivers from './places-mountains-rivers'
import riversPasses from './places-rivers-passes'
import rivers2 from './places-rivers-2'
import remote from './places-remote'
import refugeeCamps from './places-refugee-camps'
import diasporaUsa1 from './places-diaspora-usa-1'
import diasporaUsa2 from './places-diaspora-usa-2'
import diasporaAustralia from './places-diaspora-australia'
import diasporaCanada from './places-diaspora-canada'
import diasporaNzEurope from './places-diaspora-nz-europe'
import india from './places-india'
import extra from './places-extra'
import cities from './places-cities'
import unesco from './places-unesco'

const articles: SeedArticle[] = [
  ...dzongkhags1,
  ...dzongkhags2,
  ...dzongkhags3,
  ...dzongkhags4,
  ...dzongs1,
  ...dzongs2,
  ...monasteries1,
  ...monasteries2,
  ...parks1,
  ...parks2,
  ...mountainsRivers,
  ...riversPasses,
  ...rivers2,
  ...remote,
  ...refugeeCamps,
  ...diasporaUsa1,
  ...diasporaUsa2,
  ...diasporaAustralia,
  ...diasporaCanada,
  ...diasporaNzEurope,
  ...india,
  ...extra,
  ...cities,
  ...unesco,
]

export default articles
