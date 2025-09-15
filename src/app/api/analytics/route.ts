import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const ANALYTICS_DB_ID = "26fab9fd509880098973f7d9a3595da8"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validate action
    if (!data.action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    // Prepare analytics event
    const event = {
      action: data.action,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent'),
      referer: req.headers.get('referer'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
      ...data.metadata
    }

    console.log("Analytics event:", event)

    // Save to Notion Analytics database
    if (process.env.NOTION_TOKEN) {
      try {
        await notion.pages.create({
          parent: { database_id: ANALYTICS_DB_ID },
          properties: {
            Action: {
              select: { name: data.action }
            },
            Timestamp: {
              date: { start: event.timestamp }
            },
            "User Agent": {
              rich_text: [{ text: { content: event.userAgent || 'Unknown' } }]
            },
            Referer: {
              url: event.referer || null
            },
            "IP Address": {
              rich_text: [{ text: { content: event.ip || 'Unknown' } }]
            }
          }
        })
        console.log("Analytics event saved to Notion successfully")
      } catch (notionError) {
        console.error("Failed to save to Notion:", notionError)
        // Continue execution even if Notion fails
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error logging analytics event:', error)
    return NextResponse.json(
      { error: 'Failed to log event' },
      { status: 500 }
    )
  }
}

// GET endpoint for retrieving analytics (optional)
export async function GET(req: Request) {
  try {
    // This could return analytics data for a dashboard
    // For now, return basic info
    return NextResponse.json({
      message: 'Analytics endpoint active',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error retrieving analytics:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    )
  }
}