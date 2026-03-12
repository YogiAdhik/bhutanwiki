import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const NOTIFY_EMAIL = 'yogesha@att.net'

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const headers = {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    }

    // Get edits from last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const versionsRes = await fetch(
      `${supabaseUrl}/rest/v1/article_versions?created_at=gte.${since}&select=id,article_id,version_number,edit_summary,edited_by,created_at&order=created_at.desc`,
      { headers }
    )
    const versions = await versionsRes.json()

    if (!Array.isArray(versions) || versions.length === 0) {
      return NextResponse.json({ message: 'No edits in last 24 hours, no email sent' })
    }

    // Fetch article titles
    const articleIds = [...new Set(versions.map((v: { article_id: string }) => v.article_id))]
    const articlesRes = await fetch(
      `${supabaseUrl}/rest/v1/articles?id=in.(${articleIds.map((id: string) => `"${id}"`).join(',')})&select=id,title,slug`,
      { headers }
    )
    const articles = await articlesRes.json()
    const articleMap = new Map(
      (articles as { id: string; title: string; slug: string }[]).map(
        (a) => [a.id, { title: a.title, slug: a.slug }]
      )
    )

    // Fetch editor names
    const editorIds = [...new Set(versions.map((v: { edited_by: string | null }) => v.edited_by).filter((id): id is string => id !== null))]
    let editorMap = new Map<string, string>()
    if (editorIds.length > 0) {
      const editorsRes = await fetch(
        `${supabaseUrl}/rest/v1/contributors?id=in.(${editorIds.map((id: string) => `"${id}"`).join(',')})&select=id,display_name,is_anonymous`,
        { headers }
      )
      const editors = await editorsRes.json()
      editorMap = new Map(
        (editors as { id: string; display_name: string; is_anonymous: boolean }[]).map(
          (e) => [e.id, e.is_anonymous ? `${e.display_name} (anon)` : e.display_name]
        )
      )
    }

    // Build email
    const editRows = versions
      .map((v: { article_id: string; edited_by: string | null; version_number: number; edit_summary: string | null; created_at: string }) => {
        const article = articleMap.get(v.article_id)
        const editor = v.edited_by ? editorMap.get(v.edited_by) ?? 'Unknown' : 'Anonymous'
        const time = new Date(v.created_at).toLocaleString('en-US', {
          timeZone: 'America/New_York',
          timeStyle: 'short',
          dateStyle: 'short',
        })
        return `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8d5b8;">
              <a href="https://bhutanwiki.org/articles/${article?.slug ?? ''}" style="color: #7B1E3A; text-decoration: none; font-weight: 600;">
                ${article?.title ?? 'Unknown'}
              </a>
            </td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8d5b8; font-size: 13px;">${editor}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8d5b8; font-size: 13px;">${v.edit_summary || '—'}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8d5b8; font-size: 13px; color: #666;">${time}</td>
          </tr>`
      })
      .join('')

    const uniqueArticles = articleIds.length
    const totalEdits = versions.length

    await resend.emails.send({
      from: 'BhutanWiki <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      subject: `[BhutanWiki] Daily Digest: ${totalEdits} edit${totalEdits === 1 ? '' : 's'} across ${uniqueArticles} article${uniqueArticles === 1 ? '' : 's'}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 700px; margin: 0 auto;">
          <div style="background: #7B1E3A; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #D4A843; margin: 0; font-size: 18px;">BhutanWiki Daily Digest</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">
              ${new Date().toLocaleDateString('en-US', { dateStyle: 'full', timeZone: 'America/New_York' })}
            </p>
          </div>
          <div style="border: 1px solid #e8d5b8; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 15px; margin: 0 0 16px;">
              <strong>${totalEdits}</strong> edit${totalEdits === 1 ? '' : 's'} across
              <strong>${uniqueArticles}</strong> article${uniqueArticles === 1 ? '' : 's'} in the last 24 hours.
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background: #FFF8E7;">
                  <th style="padding: 8px 12px; text-align: left; border-bottom: 2px solid #e8d5b8;">Article</th>
                  <th style="padding: 8px 12px; text-align: left; border-bottom: 2px solid #e8d5b8;">Editor</th>
                  <th style="padding: 8px 12px; text-align: left; border-bottom: 2px solid #e8d5b8;">Summary</th>
                  <th style="padding: 8px 12px; text-align: left; border-bottom: 2px solid #e8d5b8;">Time</th>
                </tr>
              </thead>
              <tbody>
                ${editRows}
              </tbody>
            </table>
            <div style="margin-top: 20px;">
              <a href="https://bhutanwiki.org/articles" style="display: inline-block; background: #7B1E3A; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
                Browse BhutanWiki
              </a>
            </div>
          </div>
          <p style="color: #999; font-size: 11px; margin-top: 16px; text-align: center;">
            BhutanWiki — The People's Encyclopedia of Bhutan
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, edits: totalEdits })
  } catch (error) {
    console.error('Daily digest error:', error)
    return NextResponse.json({ error: 'Failed to send digest' }, { status: 500 })
  }
}
