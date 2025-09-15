import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const CONTACT_DB_ID = "263ab9fd5098816a8078e51a25238ed5"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Validate that at least one connection method is provided
    if (!data.email && !data.phone && !data.twitter && !data.linkedin) {
      return NextResponse.json(
        { error: 'At least one connection method is required (email, phone, Twitter, or LinkedIn)' },
        { status: 400 }
      )
    }

    // Prepare contact data
    const contactData = {
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      twitter: data.twitter || '',
      linkedin: data.linkedin || '',
      company: data.company || '',
      source: data.source || 'contact_form',
      hasPhoto: !!data.photo,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get('user-agent'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    }

    console.log("New contact submission:", contactData)

    // Save to Notion Contact database
    if (process.env.NOTION_TOKEN) {
      try {
        const notionProperties: any = {
          Name: {
            title: [{ text: { content: data.name } }]
          }
        }

        // Add optional fields only if they have values
        if (data.email) {
          notionProperties.Email = {
            email: data.email
          }
        }

        if (data.phone) {
          notionProperties.Phone = {
            phone_number: data.phone
          }
        }

        if (data.twitter) {
          notionProperties.Twitter = {
            rich_text: [{ text: { content: data.twitter } }]
          }
        }

        if (data.linkedin) {
          notionProperties.LinkedIn = {
            url: data.linkedin
          }
        }

        if (data.company) {
          notionProperties.Company = {
            rich_text: [{ text: { content: data.company } }]
          }
        }

        // Handle selfie photo for SelfieExchange
        if (data.photo) {
          try {
            // Convert base64 to buffer
            const base64Data = data.photo.replace(/^data:image\/\w+;base64,/, '')
            const buffer = Buffer.from(base64Data, 'base64')

            // Generate filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const filename = `selfie-${timestamp}.png`

            // Step 1: Create file upload (single part for small images)
            const uploadResponse = await fetch('https://api.notion.com/v1/file_uploads', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                filename: filename,
                file_size: buffer.length
              })
            })

            if (!uploadResponse.ok) {
              const errorData = await uploadResponse.json()
              throw new Error(`Upload creation failed: ${uploadResponse.statusText} - ${JSON.stringify(errorData)}`)
            }

            const uploadData = await uploadResponse.json()
            console.log('Upload creation response:', uploadData)

            // Step 2: Send file using the file upload ID
            const formData = new FormData()
            const blob = new Blob([buffer], { type: 'image/png' })
            formData.append('file', blob, filename)

            const sendResponse = await fetch(`https://api.notion.com/v1/file_uploads/${uploadData.id}/send`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Notion-Version': '2022-06-28'
              },
              body: formData
            })

            if (!sendResponse.ok) {
              const errorText = await sendResponse.text()
              throw new Error(`File send failed: ${sendResponse.statusText} - ${errorText}`)
            }

            console.log('File sent successfully')

            // Step 3: Add uploaded file to Notion database using file_upload type
            notionProperties.Selfie = {
              files: [{
                name: filename,
                type: 'file_upload',
                file_upload: {
                  id: uploadData.id
                }
              }]
            }

            console.log('Selfie uploaded successfully')
          } catch (photoError) {
            console.error('Failed to upload selfie:', photoError)
            // Add note instead if upload fails
            const existingNote = notionProperties.Note?.rich_text?.[0]?.text?.content || '';
            const photoNote = existingNote ? `${existingNote} | Selfie upload failed` : 'Selfie upload failed';
            notionProperties.Note = {
              rich_text: [{ text: { content: photoNote } }]
            }
          }
        }

        await notion.pages.create({
          parent: { database_id: CONTACT_DB_ID },
          properties: notionProperties
        })
        console.log("Contact saved to Notion successfully")
      } catch (notionError) {
        console.error("Failed to save contact to Notion:", notionError)
        return NextResponse.json(
          { error: 'Failed to save contact information. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      console.error("Notion token not configured")
      return NextResponse.json(
        { error: 'Contact service not available. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact information received successfully!'
    })

  } catch (error) {
    console.error('Error processing contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

// Helper function to generate vCard content
function generateVCardContent() {
  return `BEGIN:VCARD
VERSION:3.0
FN:Nick Janes
EMAIL:hello@nickjanes.com
TITLE:Ops Expert and Developer
URL:https://nickjanes.com
END:VCARD`
}