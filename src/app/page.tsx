"use client"

import { useState } from 'react'
import TopNav from '@/components/TopNav'
import Hero from '@/components/Hero'
import ConferenceBanner from '@/components/ConferenceBanner'
import ResourceGrid from '@/components/ResourceGrid'
import SelfieExchange from '@/components/SelfieExchange'
import Footer from '@/components/Footer'

export default function HomePage() {
  // Conference mode can be controlled via environment variable
  const isConferenceMode = process.env.NEXT_PUBLIC_CONFERENCE_MODE === 'true'
  const conferenceName = process.env.NEXT_PUBLIC_CONFERENCE_NAME || 'TechConf 2024'
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/yourname'

  const [showSelfiePopup, setShowSelfiePopup] = useState(false)
  const [showConferenceBanner, setShowConferenceBanner] = useState(false)

  // Function to open selfie popup
  const handleStartSelfie = () => {
    setShowSelfiePopup(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Top Navigation */}
      <TopNav onStartSelfie={handleStartSelfie} />

      {/* Conference Banner - only shows when enabled */}
      <ConferenceBanner
        isActive={isConferenceMode}
        conferenceName={conferenceName}
        calendlyUrl={calendlyUrl}
        onBannerShow={setShowConferenceBanner}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onStartSelfie={handleStartSelfie} />

        {/* Resources Grid */}
        <div className="border-t border-gray-100">
          <ResourceGrid />
        </div>


      </main>

      {/* Footer */}
      <div className={showConferenceBanner ? "pb-16" : ""}>
        <Footer />
      </div>

      {/* Selfie Exchange Popup */}
      {showSelfiePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-gray rounded-3xl max-w-xl w-full mx-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSelfiePopup(false)}
              className="absolute top-4 right-4 w-8 h-8 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:text-gray-800 dark:hover:text-gray-100 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Selfie Exchange Component */}
            <div className="p-6">
              <SelfieExchange />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}