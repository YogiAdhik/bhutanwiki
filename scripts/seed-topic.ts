import { createClient } from '@supabase/supabase-js'
import type { SeedArticle } from './articles/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const topic = process.argv[2]
if (!topic) {
  console.error('Usage: npx tsx --env-file=.env.local scripts/seed-topic.ts <topic>')
  console.error('Topics: history, people, places, culture, politics, society, diaspora, documents')
  process.exit(1)
}

async function seed() {
  // Dynamic import of the topic file
  let articles: SeedArticle[]
  try {
    const mod = await import(`./articles/${topic}.ts`)
    articles = mod.default ?? mod.articles
  } catch (e) {
    console.error(`Could not load articles for topic "${topic}". Make sure scripts/articles/${topic}.ts exists.`)
    process.exit(1)
  }

  console.log(`\nSeeding ${articles.length} "${topic}" articles...\n`)

  // Get or create the BhutanWiki Editorial contributor
  const { data: existingContrib } = await supabase
    .from('contributors')
    .select()
    .eq('display_name', 'BhutanWiki Editorial')
    .single()

  let contributorId: string

  if (existingContrib) {
    contributorId = existingContrib.id
    console.log(`Using existing contributor: ${existingContrib.display_name}`)
  } else {
    const { data: newContrib, error } = await supabase
      .from('contributors')
      .insert({
        display_name: 'BhutanWiki Editorial',
        role: 'editor',
        is_anonymous: false,
      })
      .select()
      .single()

    if (error || !newContrib) {
      console.error('Failed to create contributor:', error?.message)
      process.exit(1)
    }
    contributorId = newContrib.id
    console.log(`Created contributor: ${newContrib.display_name}`)
  }

  let created = 0
  let skipped = 0
  let failed = 0

  for (const article of articles) {
    // Check if article already exists
    const { data: existing } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', article.slug)
      .single()

    if (existing) {
      console.log(`  SKIP (exists): ${article.title}`)
      skipped++
      continue
    }

    const { data, error } = await supabase
      .from('articles')
      .insert({
        slug: article.slug,
        title: article.title,
        category: article.category,
        summary: article.summary,
        content_md: article.content_md,
        status: article.status,
        created_by: contributorId,
      })
      .select()
      .single()

    if (error) {
      console.error(`  FAIL: ${article.title} — ${error.message}`)
      failed++
      continue
    }

    // Create version 1
    await supabase.from('article_versions').insert({
      article_id: data.id,
      version_number: 1,
      content_md: article.content_md,
      edit_summary: 'Initial creation',
      edited_by: contributorId,
    })

    console.log(`  OK: ${article.title}`)
    created++
  }

  console.log(`\n--- Done ---`)
  console.log(`Created: ${created} | Skipped: ${skipped} | Failed: ${failed} | Total: ${articles.length}`)
}

seed()
