import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const migrationFile = process.argv[2]
if (!migrationFile) {
  console.error('Usage: npx tsx --env-file=.env.local scripts/run-migration.ts <path-to-sql>')
  process.exit(1)
}

const sql = readFileSync(migrationFile, 'utf-8')

async function runMigration() {
  console.log(`Running migration: ${migrationFile}`)
  console.log(`Against: ${SUPABASE_URL}\n`)

  // Use the Supabase Management API's SQL endpoint
  // The /pg endpoint requires the service role key
  const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: 'HEAD',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
  })

  // Since we can't run raw SQL via REST, we'll use the pg_net extension
  // or create a helper function. Let's try the management API approach.

  // Actually, Supabase exposes a /pg/query endpoint for the service role
  // Let's try the correct Supabase SQL execution path

  // Use the database connection string approach via the pooler
  const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '')

  // Try the Supabase Management API
  const mgmtRes = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  })

  if (mgmtRes.ok) {
    const result = await mgmtRes.json()
    console.log('Migration completed successfully!')
    console.log(result)
    return
  }

  // If management API doesn't work, fall back to running statements individually
  console.log('Management API not available, trying alternative approach...')
  console.log('Status:', mgmtRes.status, await mgmtRes.text())
  console.log('')
  console.log('Please run the migration manually:')
  console.log('1. Go to https://supabase.com/dashboard/project/izzzbwfdiqklgytrkzfr/sql/new')
  console.log('2. Paste the contents of supabase/migrations/010_directory.sql')
  console.log('3. Click "Run"')
  console.log('')
  console.log('Or install psql: brew install libpq')
  console.log('Then run: psql "postgresql://postgres.izzzbwfdiqklgytrkzfr:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres" -f supabase/migrations/010_directory.sql')
}

runMigration()
