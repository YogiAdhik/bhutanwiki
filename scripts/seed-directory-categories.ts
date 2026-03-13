export interface SeedDirectoryCategory {
  name: string
  slug: string
  icon: string
  description: string
  display_order: number
  subcategories?: { name: string; slug: string; description: string }[]
}

export const directoryCategories: SeedDirectoryCategory[] = [
  {
    name: 'Education',
    slug: 'education',
    icon: 'GraduationCap',
    description: 'Schools, colleges, universities, and training institutes',
    display_order: 1,
    subcategories: [
      { name: 'Primary Schools', slug: 'primary-schools', description: 'Primary and lower secondary schools' },
      { name: 'Secondary Schools', slug: 'secondary-schools', description: 'Middle and higher secondary schools' },
      { name: 'Colleges & Universities', slug: 'colleges-universities', description: 'Higher education institutions' },
      { name: 'Vocational Training', slug: 'vocational-training', description: 'Technical and vocational institutes' },
      { name: 'Monastic Schools', slug: 'monastic-schools', description: 'Buddhist monastic education centers' },
    ]
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: 'Heart',
    description: 'Hospitals, clinics, and health services',
    display_order: 2,
    subcategories: [
      { name: 'Hospitals', slug: 'hospitals', description: 'Government and referral hospitals' },
      { name: 'Basic Health Units', slug: 'basic-health-units', description: 'Community health centers' },
      { name: 'Traditional Medicine', slug: 'traditional-medicine', description: 'Indigenous medicine facilities' },
      { name: 'Pharmacies', slug: 'pharmacies', description: 'Pharmacies and drug stores' },
    ]
  },
  {
    name: 'Government',
    slug: 'government',
    icon: 'Landmark',
    description: 'Government offices and public services',
    display_order: 3,
    subcategories: [
      { name: 'District Offices', slug: 'district-offices', description: 'Dzongkhag administration offices' },
      { name: 'Courts', slug: 'courts', description: 'District and high courts' },
      { name: 'Post Offices', slug: 'post-offices', description: 'Bhutan Post offices' },
      { name: 'Embassies & Consulates', slug: 'embassies-consulates', description: 'Foreign diplomatic missions' },
    ]
  },
  {
    name: 'Hospitality',
    slug: 'hospitality',
    icon: 'Hotel',
    description: 'Hotels, restaurants, and accommodation',
    display_order: 4,
    subcategories: [
      { name: 'Hotels', slug: 'hotels', description: 'Hotels and resorts' },
      { name: 'Guesthouses', slug: 'guesthouses', description: 'Guesthouses and homestays' },
      { name: 'Restaurants', slug: 'restaurants', description: 'Restaurants and eateries' },
      { name: 'Cafes', slug: 'cafes', description: 'Cafes and tea houses' },
    ]
  },
  {
    name: 'Business',
    slug: 'business',
    icon: 'Briefcase',
    description: 'Companies, enterprises, and commercial establishments',
    display_order: 5,
    subcategories: [
      { name: 'Large Enterprises', slug: 'large-enterprises', description: 'Major corporations and state enterprises' },
      { name: 'Medium Businesses', slug: 'medium-businesses', description: 'Medium-scale commercial operations' },
      { name: 'Small Businesses', slug: 'small-businesses', description: 'Small shops, workshops, and services' },
      { name: 'Banks & Finance', slug: 'banks-finance', description: 'Banks, financial institutions, and ATMs' },
      { name: 'Telecom', slug: 'telecom', description: 'Telecommunications providers' },
    ]
  },
  {
    name: 'Religious Sites',
    slug: 'religious-sites',
    icon: 'Church',
    description: 'Dzongs, monasteries, temples, and sacred places',
    display_order: 6,
    subcategories: [
      { name: 'Dzongs', slug: 'dzongs', description: 'Fortress monasteries and administrative centers' },
      { name: 'Monasteries', slug: 'monasteries', description: 'Buddhist monasteries and nunneries' },
      { name: 'Temples', slug: 'temples', description: 'Lhakhangs and prayer halls' },
      { name: 'Chortens & Stupas', slug: 'chortens-stupas', description: 'Memorial and sacred structures' },
    ]
  },
  {
    name: 'Entertainment & Media',
    slug: 'entertainment-media',
    icon: 'Film',
    description: 'Films, media, cultural centers, and recreation',
    display_order: 7,
    subcategories: [
      { name: 'Bhutanese Films', slug: 'bhutanese-films', description: 'Movies produced in Bhutan' },
      { name: 'Media Houses', slug: 'media-houses', description: 'Newspapers, radio, and TV stations' },
      { name: 'Cultural Centers', slug: 'cultural-centers', description: 'Museums, galleries, and performance spaces' },
      { name: 'Sports & Recreation', slug: 'sports-recreation', description: 'Sports facilities and recreation centers' },
    ]
  },
  {
    name: 'Tourism',
    slug: 'tourism',
    icon: 'Mountain',
    description: 'Tourist attractions, parks, and heritage sites',
    display_order: 8,
    subcategories: [
      { name: 'National Parks', slug: 'national-parks', description: 'Protected areas and wildlife sanctuaries' },
      { name: 'UNESCO Sites', slug: 'unesco-sites', description: 'World Heritage sites and tentative list' },
      { name: 'Trekking Routes', slug: 'trekking-routes', description: 'Popular hiking and trekking trails' },
      { name: 'Hot Springs', slug: 'hot-springs', description: 'Natural tshachus and hot springs' },
      { name: 'Tour Operators', slug: 'tour-operators', description: 'Licensed tour and travel agencies' },
    ]
  },
  {
    name: 'Infrastructure',
    slug: 'infrastructure',
    icon: 'Building2',
    description: 'Transport, utilities, and public infrastructure',
    display_order: 9,
    subcategories: [
      { name: 'Airports', slug: 'airports', description: 'Domestic and international airports' },
      { name: 'Bus Terminals', slug: 'bus-terminals', description: 'Bus stations and transport hubs' },
      { name: 'Hydropower Plants', slug: 'hydropower-plants', description: 'Hydroelectric power stations' },
    ]
  },
  {
    name: 'Municipalities',
    slug: 'municipalities',
    icon: 'MapPin',
    description: 'Cities, towns, and urban centers',
    display_order: 10,
    subcategories: [
      { name: 'Thromdes', slug: 'thromdes', description: 'Self-governing municipal corporations' },
      { name: 'Towns', slug: 'towns', description: 'Major towns and urban settlements' },
    ]
  },
]
