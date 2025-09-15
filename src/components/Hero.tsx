"use client"

import Image from 'next/image'
import { useState } from 'react'
import ContactButtons from './ContactButtons'

interface HeroProps {
  onStartSelfie?: () => void
}

export default function Hero({ onStartSelfie }: HeroProps) {
  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      {/* Profile Picture */}
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto mb-6 group">
          <Image
            src="/nick_clay_avatar.png"
            alt="Nick Janes Profile"
            fill
            className="rounded-full object-cover border-2 border-gray-200"
            priority
          />

          {/* QR Code Button Overlay */}
          <button
            onClick={() => setShowQRCode(true)}
            className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg opacity-80 hover:opacity-100"
            title="Show QR Code"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
            </svg>
          </button>
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black dark:text-white">
          Nick Janes
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-semibold">
          Ops Expert and Developer
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-12">
          <a
            href="https://www.linkedin.com/in/nickjanesdotcom/"
            className="p-3 hover:text-black dark:hover:text-white transition-colors duration-200"
            style={{ color: '#2A2A2A' }}
            title="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <a
            href="https://twitter.com/nickjanesdotcom"
            className="p-3 hover:text-black dark:hover:text-white transition-colors duration-200"
            style={{ color: '#2A2A2A' }}
            title="Twitter/X"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <a
            href="https://www.youtube.com/nickjanesdotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:text-black dark:hover:text-white transition-colors duration-200"
            style={{ color: '#2A2A2A' }}
            title="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          <a
            href="mailto:hello@nickjanes.com"
            className="p-3 hover:text-black dark:hover:text-white transition-colors duration-200"
            style={{ color: '#2A2A2A' }}
            title="Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
            </svg>
          </a>

          <a
            href="https://cal.com/nickjanes/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:text-black dark:hover:text-white transition-colors duration-200"
            style={{ color: '#2A2A2A' }}
            title="Schedule a Chat"
          >
            <div className="w-5 h-5 relative">
              <Image
                src="/cal_icon.png"
                alt="Cal.com"
                fill
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </div>

      {/* Contact Buttons */}
      <ContactButtons />

      {/* QR Code Popup Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-4 right-4 w-8 h-8 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* QR Code Content */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-32 h-32 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
                </svg>
              </div>

              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                nickjanes.com
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}