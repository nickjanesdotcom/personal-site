"use client"

import { useState } from 'react'
import Image from 'next/image'
import { generateVCard, downloadVCard, shareContent } from '@/lib/utils'

const CONTACT_DATA = {
  name: 'Nick Janes',
  email: 'hello@nickjanes.com',
  title: 'Ops Expert and Developer',
  website: 'https://nickjanes.com'
}

export default function ContactButtons() {
  const [isSharing, setIsSharing] = useState(false)

  const handleSaveContact = async () => {
    const vcard = generateVCard(CONTACT_DATA)
    downloadVCard(vcard, `${CONTACT_DATA.name.replace(' ', '_')}.vcf`)

    // Track analytics
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_contact' })
    }).catch(() => {}) // Silent fail for analytics
  }

  const handleShareCard = async () => {
    setIsSharing(true)

    const shareData = {
      title: `${CONTACT_DATA.name} - Digital Business Card`,
      text: `Connect with ${CONTACT_DATA.name}`,
      url: window.location.href
    }

    const shared = await shareContent(shareData)

    if (shared) {
      // Track analytics
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'share_card' })
      }).catch(() => {}) // Silent fail for analytics
    }

    setIsSharing(false)
  }

  return (
    <div className="space-y-4">
      {/* Primary Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
        <button
          onClick={handleSaveContact}
          className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Save My Contact
        </button>

        <button
          onClick={handleShareCard}
          disabled={isSharing}
          className="px-10 py-5 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          {isSharing ? 'Sharing...' : 'Share My Card'}
        </button>
      </div>


      {/* Project/Company Links */}
      <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-semibold">What I&apos;m Building</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <a
            href="https://igeekuplay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/igup_black_white_logo.png"
                  alt="iGeekuPlay"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">iGeekuPlay</div>
                <div className="text-sm opacity-80">Notion Consulting & Automations</div>
              </div>
            </div>
          </a>

          <a
            href="https://dialed.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/dialed_logo_bw.png"
                  alt="dialed technologies"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">dialed technologies</div>
                <div className="text-sm opacity-80">Attio Consulting & Integrations</div>
              </div>
            </div>
          </a>

          <a
            href="https://3d-icons.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/3d_icons_logo.png"
                  alt="3D Icons"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">3D Icons</div>
                <div className="text-sm opacity-80">Generate Beautiful 3D Icons</div>
              </div>
            </div>
          </a>

          <a
            href="https://notion-erd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="/notion-erd-logo.png"
                  alt="Notion ERD"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">Notion ERD</div>
                <div className="text-sm opacity-80">Visualize your Notion Workspace</div>
              </div>
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}