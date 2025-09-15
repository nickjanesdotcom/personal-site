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
        <div className="flex justify-center gap-2 mb-12">
          <a
            href="https://www.linkedin.com/in/nickjanesdotcom/"
            className="p-3 hover:opacity-80 transition-opacity duration-200"
            title="LinkedIn"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/linkedin-clay.png"
                alt="LinkedIn"
                fill
                className="object-contain"
              />
            </div>
          </a>

          <a
            href="https://twitter.com/nickjanesdotcom"
            className="p-3 hover:opacity-80 transition-opacity duration-200"
            title="Twitter/X"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/twitter-clay.png"
                alt="Twitter/X"
                fill
                className="object-contain"
              />
            </div>
          </a>

          <a
            href="https://www.youtube.com/nickjanesdotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:opacity-80 transition-opacity duration-200"
            title="YouTube"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/youtube-clay.png"
                alt="YouTube"
                fill
                className="object-contain"
              />
            </div>
          </a>

          <a
            href="mailto:hello@nickjanes.com"
            className="p-3 hover:opacity-80 transition-opacity duration-200"
            title="Email"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/email-clay.png"
                alt="Email"
                fill
                className="object-contain"
              />
            </div>
          </a>

          <a
            href="https://cal.com/nickjanes/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:opacity-80 transition-opacity duration-200"
            title="Schedule a Chat"
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/calendar-clay.png"
                alt="Schedule a Chat"
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
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm mx-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-4 right-4 w-8 h-8 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:text-gray-800 dark:hover:text-gray-100 transition-colors z-10 bg-white dark:bg-dark-gray rounded-full shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* QR Code Content */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <Image
                  src="/nickjanedotcom-qr.png"
                  alt="QR Code for nickjanes.com"
                  fill
                  className="object-contain"
                />
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