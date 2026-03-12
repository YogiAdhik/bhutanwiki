/**
 * Image seeding script for BhutanWiki
 *
 * Searches Wikimedia Commons for CC-licensed images,
 * downloads them, uploads to Supabase Storage,
 * inserts media records, and updates article content.
 *
 * Usage: npx tsx --env-file=.env.local scripts/seed-images.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php'
const BUCKET = 'article-images'
const UA = 'BhutanWikiBot/1.0 (https://bhutanwiki.org; yogeshadhikari@gmail.com)'
const HEADERS = { 'User-Agent': UA }

interface WikiImage {
  title: string
  url: string
  thumbUrl: string
  descriptionUrl: string
  artist: string
  license: string
  width: number
  height: number
}

// Top 50 articles with Wikimedia Commons search terms
const ARTICLE_IMAGE_MAP: { slug: string; searchTerms: string[]; preferredFile?: string }[] = [
  // === PLACES - DZONGS ===
  { slug: 'punakha-dzong', searchTerms: ['Punakha Dzong'], preferredFile: 'File:Punakha Dzong, Bhutan 01.jpg' },
  { slug: 'tigers-nest', searchTerms: ['Paro Taktsang', 'Tiger Nest monastery Bhutan'], preferredFile: 'File:Paro Taktsang, Pair.jpg' },
  { slug: 'tashichho-dzong', searchTerms: ['Tashichho Dzong', 'Tashichhodzong'], preferredFile: 'File:Tashichhodzong.jpg' },
  { slug: 'dzongs-of-bhutan', searchTerms: ['Dzong Bhutan architecture'] },
  { slug: 'rinpung-dzong', searchTerms: ['Rinpung Dzong Paro'] },
  { slug: 'wangdue-phodrang-dzong', searchTerms: ['Wangdue Phodrang Dzong'] },
  { slug: 'trongsa-dzong', searchTerms: ['Trongsa Dzong'] },

  // === PLACES - CITIES & VALLEYS ===
  { slug: 'thimphu', searchTerms: ['Thimphu city Bhutan'] },
  { slug: 'paro-valley', searchTerms: ['Paro Valley Bhutan'] },
  { slug: 'paro-international-airport', searchTerms: ['Paro Airport Bhutan'] },
  { slug: 'bumthang-valley', searchTerms: ['Bumthang Valley Bhutan'] },
  { slug: 'phuentsholing', searchTerms: ['Phuentsholing Bhutan'] },

  // === PEOPLE - ROYALS ===
  { slug: 'ugyen-wangchuck', searchTerms: ['Ugyen Wangchuck King Bhutan'] },
  { slug: 'jigme-dorji-wangchuck', searchTerms: ['Jigme Dorji Wangchuck'] },
  { slug: 'jigme-singye-wangchuck', searchTerms: ['Jigme Singye Wangchuck'] },
  { slug: 'jigme-khesar-namgyel-wangchuck', searchTerms: ['Jigme Khesar Namgyel Wangchuck'], preferredFile: 'File:King Jigme Khesar Namgyel Wangchuck (edit).jpg' },
  { slug: 'wangchuck-dynasty', searchTerms: ['Wangchuck dynasty Bhutan'] },
  { slug: 'zhabdrung-ngawang-namgyal', searchTerms: ['Zhabdrung Ngawang Namgyal'] },

  // === PEOPLE - NOTABLE ===
  { slug: 'tek-nath-rizal', searchTerms: ['Tek Nath Rizal Bhutan'] },
  { slug: 'lotay-tshering', searchTerms: ['Lotay Tshering Prime Minister Bhutan'] },
  { slug: 'tshering-tobgay', searchTerms: ['Tshering Tobgay Bhutan'] },

  // === CULTURE ===
  { slug: 'lhotshampa', searchTerms: ['Lhotshampa Bhutan'] },
  { slug: 'driglam-namzha', searchTerms: ['Driglam Namzha Bhutan dress code'] },
  { slug: 'gho-and-kira', searchTerms: ['Gho Kira Bhutan traditional dress'] },
  { slug: 'bhutanese-cuisine', searchTerms: ['Bhutanese food cuisine ema datshi'] },
  { slug: 'ema-datshi', searchTerms: ['Ema datshi Bhutan'], preferredFile: 'File:Ema datshi.jpg' },
  { slug: 'tshechu', searchTerms: ['Tshechu Bhutan festival'] },
  { slug: 'paro-tshechu', searchTerms: ['Paro Tshechu festival'] },
  { slug: 'cham-dance', searchTerms: ['Cham dance Bhutan'] },
  { slug: 'thangka-painting', searchTerms: ['Thangka Bhutan painting'] },
  { slug: 'archery-in-bhutan', searchTerms: ['Archery Bhutan traditional'] },

  // === NATURE ===
  { slug: 'jigme-dorji-national-park', searchTerms: ['Jigme Dorji National Park Bhutan'] },
  { slug: 'royal-manas-national-park', searchTerms: ['Royal Manas National Park Bhutan'] },
  { slug: 'black-necked-crane', searchTerms: ['Black necked crane Bhutan Phobjikha'] },
  { slug: 'gangkhar-puensum', searchTerms: ['Gangkhar Puensum'], preferredFile: 'File:Gangkhar Puensum.jpg' },

  // === POLITICS ===
  { slug: 'constitution-of-bhutan', searchTerms: ['Constitution Bhutan'] },
  { slug: 'gross-national-happiness', searchTerms: ['Gross National Happiness Bhutan'] },
  { slug: 'national-assembly-of-bhutan', searchTerms: ['National Assembly Bhutan parliament'] },

  // === SOCIETY ===
  { slug: 'hydropower-in-bhutan', searchTerms: ['Hydropower Bhutan dam'] },
  { slug: 'tourism-in-bhutan', searchTerms: ['Tourism Bhutan'] },
  { slug: 'bhutanese-ngultrum', searchTerms: ['Bhutanese ngultrum currency'] },
  { slug: 'druk-air', searchTerms: ['Druk Air Bhutan airline'] },

  // === DIASPORA ===
  { slug: 'bhutanese-refugee-crisis', searchTerms: ['Bhutanese refugees Nepal'] },
  { slug: 'refugee-camps-in-nepal', searchTerms: ['Bhutanese refugee camp Nepal'] },

  // === MONASTERIES ===
  { slug: 'gangtey-monastery', searchTerms: ['Gangtey Monastery Bhutan'] },
  { slug: 'tango-monastery', searchTerms: ['Tango Monastery Bhutan'] },
  { slug: 'cheri-monastery', searchTerms: ['Cheri Monastery Bhutan'] },

  // === FLAG & SYMBOLS ===
  { slug: 'flag-of-bhutan', searchTerms: ['Flag of Bhutan'], preferredFile: 'File:Flag of Bhutan.svg' },
  { slug: 'national-symbols-of-bhutan', searchTerms: ['Bhutan national emblem'] },
]

async function searchWikimediaCommons(searchTerms: string[]): Promise<WikiImage | null> {
  for (const term of searchTerms) {
    const searchUrl = `${COMMONS_API}?action=query&list=search&srsearch=${encodeURIComponent(term)}&srnamespace=6&srlimit=5&format=json`

    const resp = await fetch(searchUrl, { headers: HEADERS })
    if (!resp.ok) continue

    const data = await resp.json()
    const results = data?.query?.search
    if (!results || results.length === 0) continue

    // Try each result to find a usable image
    for (const result of results) {
      const title = result.title as string
      // Skip non-image files (allow common image extensions + files without clear extension)
      if (title.match(/\.(ogg|ogv|webm|pdf|djvu|mid|midi)$/i)) continue

      const imageInfo = await getImageInfo(title)
      if (imageInfo) return imageInfo
    }
  }
  return null
}

async function getImageInfoByTitle(fileTitle: string): Promise<WikiImage | null> {
  return getImageInfo(fileTitle)
}

async function getImageInfo(fileTitle: string): Promise<WikiImage | null> {
  const infoUrl = `${COMMONS_API}?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200&format=json`

  const resp = await fetch(infoUrl, { headers: HEADERS })
  if (!resp.ok) return null

  const data = await resp.json()
  const pages = data?.query?.pages
  if (!pages) return null

  const page = Object.values(pages)[0] as any
  const info = page?.imageinfo?.[0]
  if (!info) return null

  const meta = info.extmetadata || {}

  return {
    title: fileTitle,
    url: info.thumburl || info.url,
    thumbUrl: info.thumburl || info.url,
    descriptionUrl: info.descriptionurl,
    artist: meta.Artist?.value?.replace(/<[^>]*>/g, '') || 'Unknown',
    license: meta.LicenseShortName?.value || 'CC',
    width: info.thumbwidth || info.width,
    height: info.thumbheight || info.height,
  }
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const resp = await fetch(url, { headers: HEADERS })
    if (!resp.ok) return null
    const contentType = resp.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await resp.arrayBuffer()
    return { buffer: Buffer.from(arrayBuffer), contentType }
  } catch {
    return null
  }
}

async function uploadToSupabase(
  slug: string,
  buffer: Buffer,
  contentType: string
): Promise<string | null> {
  const ext = contentType.includes('png') ? 'png' : contentType.includes('svg') ? 'svg' : contentType.includes('webp') ? 'webp' : 'jpg'
  const path = `${slug}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType,
      upsert: true,
    })

  if (error) {
    console.error(`  Upload error for ${slug}:`, error.message)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path)

  return publicUrl
}

async function insertMediaRecord(
  slug: string,
  storageUrl: string,
  image: WikiImage,
  contributorId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('media')
    .insert({
      filename: `${slug}.jpg`,
      file_type: 'image/jpeg',
      storage_url: storageUrl,
      caption: `Image for article: ${slug}`,
      source: image.descriptionUrl,
      license: image.license,
      uploaded_by: contributorId,
    })
    .select('id')
    .single()

  if (error) {
    console.error(`  Media record error for ${slug}:`, error.message)
    return null
  }
  return data.id
}

async function updateArticleWithImage(
  slug: string,
  storageUrl: string,
  image: WikiImage
): Promise<boolean> {
  // Get current article content
  const { data: article, error: fetchErr } = await supabase
    .from('articles')
    .select('id, content_md, title')
    .eq('slug', slug)
    .single()

  if (fetchErr || !article) {
    console.error(`  Article not found: ${slug}`)
    return false
  }

  // Build image HTML with attribution
  const attribution = image.artist !== 'Unknown' ? `Photo: ${image.artist}` : 'Wikimedia Commons'
  const imageHtml = `<figure class="article-lead-image">
<img src="${storageUrl}" alt="${article.title}" loading="lazy" />
<figcaption>${attribution} | License: ${image.license} | <a href="${image.descriptionUrl}">Source</a></figcaption>
</figure>

`

  // Insert image at the very beginning of content (before first <p>)
  const updatedContent = imageHtml + article.content_md

  const { error: updateErr } = await supabase
    .from('articles')
    .update({ content_md: updatedContent })
    .eq('id', article.id)

  if (updateErr) {
    console.error(`  Update error for ${slug}:`, updateErr.message)
    return false
  }

  return true
}

async function main() {
  console.log('=== BhutanWiki Image Seeder ===\n')

  // Get or create contributor
  const { data: contrib } = await supabase
    .from('contributors')
    .select()
    .eq('display_name', 'BhutanWiki Editorial')
    .single()

  if (!contrib) {
    console.error('BhutanWiki Editorial contributor not found')
    process.exit(1)
  }

  const contributorId = contrib.id
  let success = 0
  let failed = 0
  let skipped = 0

  for (const entry of ARTICLE_IMAGE_MAP) {
    const { slug, searchTerms, preferredFile } = entry
    process.stdout.write(`[${slug}] `)

    // Check if article already has an image
    const { data: article } = await supabase
      .from('articles')
      .select('content_md')
      .eq('slug', slug)
      .single()

    if (!article) {
      console.log('SKIP (article not found)')
      skipped++
      continue
    }

    if (article.content_md?.includes('<figure class="article-lead-image">')) {
      console.log('SKIP (already has image)')
      skipped++
      continue
    }

    // Search for image
    let image: WikiImage | null = null

    if (preferredFile) {
      image = await getImageInfoByTitle(preferredFile)
    }

    if (!image) {
      image = await searchWikimediaCommons(searchTerms)
    }

    if (!image) {
      console.log('FAIL (no image found)')
      failed++
      continue
    }

    // Download
    const downloaded = await downloadImage(image.url)
    if (!downloaded) {
      console.log('FAIL (download failed)')
      failed++
      continue
    }

    // Upload to Supabase Storage
    const storageUrl = await uploadToSupabase(slug, downloaded.buffer, downloaded.contentType)
    if (!storageUrl) {
      console.log('FAIL (upload failed)')
      failed++
      continue
    }

    // Insert media record
    await insertMediaRecord(slug, storageUrl, image, contributorId)

    // Update article content
    const updated = await updateArticleWithImage(slug, storageUrl, image)
    if (!updated) {
      console.log('FAIL (article update failed)')
      failed++
      continue
    }

    console.log(`OK (${image.license}) — ${image.title}`)
    success++

    // Small delay to be nice to Wikimedia API
    await new Promise(r => setTimeout(r, 500))
  }

  console.log(`\n=== Done ===`)
  console.log(`Success: ${success} | Failed: ${failed} | Skipped: ${skipped} | Total: ${ARTICLE_IMAGE_MAP.length}`)
}

main()
