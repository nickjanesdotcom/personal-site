import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateVCard(data: {
  name: string
  email: string
  phone?: string
  company?: string
  title?: string
  website?: string
}) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
EMAIL:${data.email}
${data.phone ? `TEL:${data.phone}` : ''}
${data.company ? `ORG:${data.company}` : ''}
${data.title ? `TITLE:${data.title}` : ''}
${data.website ? `URL:${data.website}` : ''}
END:VCARD`

  return vcard.split('\n').filter(line => line.trim()).join('\n')
}

export function downloadVCard(vcard: string, filename: string = 'contact.vcf') {
  const blob = new Blob([vcard], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function shareContent(data: {
  title: string
  text: string
  url?: string
}) {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    } catch (err) {
      console.log('Share cancelled')
      return false
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(data.url || data.text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}