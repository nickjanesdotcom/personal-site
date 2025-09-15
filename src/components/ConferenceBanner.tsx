"use client"

import { useState, useEffect } from 'react'

interface ConferenceBannerProps {
  isActive?: boolean
  conferenceName?: string
  calendlyUrl?: string
  onBannerShow?: (show: boolean) => void
}

export default function ConferenceBanner({
  isActive = false,
  conferenceName = "Make with Notion 2025",
  calendlyUrl = "https://cal.com/nickjanes/chat",
  onBannerShow
}: ConferenceBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showExchangeForm, setShowExchangeForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    if (isActive) {
      // Check if user has already dismissed this session
      const dismissed = sessionStorage.getItem('conference-popup-dismissed')
      if (dismissed) {
        // User previously dismissed, show banner immediately
        setIsDismissed(true)
        setIsVisible(false)
      } else if (!isDismissed) {
        // Show popup after 3 seconds for new users
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [isActive, isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('conference-popup-dismissed', 'true')
    onBannerShow?.(true) // Show banner when popup is dismissed
  }

  const handleReopenPopup = () => {
    setIsVisible(true)
    setIsDismissed(false)
    sessionStorage.removeItem('conference-popup-dismissed')
    onBannerShow?.(false) // Hide banner when popup is reopened
  }

  // Notify parent about banner visibility changes
  useEffect(() => {
    if (isActive) {
      onBannerShow?.(isDismissed && !isVisible)
    } else {
      onBannerShow?.(false)
    }
  }, [isActive, isDismissed, isVisible, onBannerShow])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const twitter = formData.get('twitter') as string
    const linkedin = formData.get('linkedin') as string
    const company = formData.get('company') as string

    const errors: {[key: string]: string} = {}

    // Validate required name field
    if (!name.trim()) {
      errors.name = 'Name is required'
    }

    // Validate that at least one connection method is provided
    if (!email && !phone && !twitter && !linkedin) {
      errors.connection = 'Please provide at least one way to connect with you (email, phone, Twitter, or LinkedIn)'
    }

    // If there are validation errors, show them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    const data = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      twitter: twitter || undefined,
      linkedin: linkedin || undefined,
      company: company || undefined,
      source: 'conference_banner'
    }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      setFormSubmitted(true)
      setFormErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormErrors({ submit: 'Failed to submit. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isActive) return null

  // Exchange Contact Form Popup
  if (showExchangeForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-dark-gray text-black dark:text-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-auto relative animate-in zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={() => {
              setShowExchangeForm(false)
              setFormSubmitted(false)
              setFormErrors({})
            }}
            className="absolute top-3 right-3 w-6 h-6 text-gray-400 hover:text-gray-200 dark:text-gray-600 dark:hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="pr-6">
            <h3 className="font-bold text-xl mb-2 text-center">
              Exchange Contact
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
              Share your details and I&apos;ll send you my contact information!
            </p>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name *"
                    className={`w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-dark-gray ${
                      formErrors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 dark:border-gray-600 focus:ring-black dark:focus:ring-white'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>

                <input
                  type="text"
                  name="company"
                  placeholder="Company (optional)"
                  className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-dark-gray"
                />

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Choose how you&apos;d like to connect (at least one required):
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-dark-gray"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-dark-gray"
                />

                <input
                  type="text"
                  name="twitter"
                  placeholder="Twitter/X handle (e.g., @username)"
                  className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-dark-gray"
                />

                <input
                  type="url"
                  name="linkedin"
                  placeholder="LinkedIn profile URL"
                  className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-dark-gray"
                />

                {formErrors.connection && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-xs">{formErrors.connection}</p>
                  </div>
                )}

                {formErrors.submit && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-xs">{formErrors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 transition-colors text-sm"
                >
                  {isSubmitting ? 'Sending...' : 'Connect'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎉</div>
                <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                  Connected!
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  I&apos;ll send you my contact details soon!
                </p>
                <button
                  onClick={() => {
                    setShowExchangeForm(false)
                    setFormSubmitted(false)
                    setFormErrors({})
                  }}
                  className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show small banner if popup was dismissed
  if (isDismissed && !isVisible) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={handleReopenPopup}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">At {conferenceName} - Click for More</span>
          </div>
        </button>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-gray text-black dark:text-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-auto relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 text-gray-400 hover:text-gray-200 dark:text-gray-600 dark:hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-400">AT CONFERENCE</span>
          </div>

          <h3 className="font-bold text-lg mb-2">
            {conferenceName}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            I&apos;m here for the next few days. Let&apos;s grab coffee, discuss your ops needs, or just say hi!
            <br />
            <strong>Find me in the Maker Space (2nd Floor).</strong>
          </p>

          <div className="space-y-3">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center text-sm"
            >
              Schedule a Chat
            </a>

            <button
              onClick={() => setShowExchangeForm(true)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center text-sm"
            >
              Exchange Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}