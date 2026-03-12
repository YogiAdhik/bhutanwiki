import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const NOTIFY_EMAIL = 'yogesha@att.net'

export async function POST(req: NextRequest) {
  // Verify webhook secret
  const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET || ''
  const authHeader = req.headers.get('authorization')
  if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const payload = await req.json()
    const record = payload.record

    if (!record) {
      return NextResponse.json({ error: 'No record' }, { status: 400 })
    }

    // Fetch article details using service role
    const articleRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${record.article_id}&select=title,slug`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
      }
    )
    const articles = await articleRes.json()
    const article = articles?.[0]

    // Fetch contributor name if available
    let editorName = 'Anonymous'
    if (record.edited_by) {
      const contribRes = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/contributors?id=eq.${record.edited_by}&select=display_name,is_anonymous`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          },
        }
      )
      const contributors = await contribRes.json()
      if (contributors?.[0]) {
        editorName = contributors[0].is_anonymous
          ? `${contributors[0].display_name} (anonymous)`
          : contributors[0].display_name
      }
    }

    const articleTitle = article?.title ?? 'Unknown Article'
    const articleSlug = article?.slug ?? ''
    const editSummary = record.edit_summary || 'No summary provided'
    const versionNumber = record.version_number ?? '?'
    const timestamp = new Date(record.created_at).toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    await resend.emails.send({
      from: 'BhutanWiki <noreply@bhutanwiki.org>',
      to: NOTIFY_EMAIL,
      subject: `[BhutanWiki] Edit: "${articleTitle}" by ${editorName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #7B1E3A; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #D4A843; margin: 0; font-size: 18px;">BhutanWiki Edit Notification</h2>
          </div>
          <div style="border: 1px solid #e8d5b8; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Article</td>
                <td style="padding: 8px 0; font-weight: bold;">
                  <a href="https://bhutanwiki.org/articles/${articleSlug}" style="color: #7B1E3A; text-decoration: none;">
                    ${articleTitle}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Editor</td>
                <td style="padding: 8px 0;">${editorName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Version</td>
                <td style="padding: 8px 0;">#${versionNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Summary</td>
                <td style="padding: 8px 0;">${editSummary}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Time</td>
                <td style="padding: 8px 0;">${timestamp}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <a href="https://bhutanwiki.org/articles/${articleSlug}/history" style="display: inline-block; background: #7B1E3A; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
                View Edit History
              </a>
            </div>
          </div>
          <p style="color: #999; font-size: 11px; margin-top: 16px; text-align: center;">
            BhutanWiki — The People's Encyclopedia of Bhutan
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Edit notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
