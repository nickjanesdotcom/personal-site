"use client"

import { useState, useEffect } from 'react'

interface TopNavProps {
  onStartSelfie: () => void
}

export default function TopNav({ onStartSelfie }: TopNavProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialDarkMode = savedMode ? savedMode === 'true' : prefersDark
    setIsDarkMode(initialDarkMode)

    if (initialDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Toggle dark class on html element
    document.documentElement.classList.toggle('dark', newDarkMode)

    // Save preference
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 p-6">
      <div className="flex justify-between items-center">
        {/* Camera Icon - Left */}
        <button
          onClick={onStartSelfie}
          className="w-10 h-10 text-gray-900 dark:text-white flex items-center justify-center hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 group"
          title="Start Selfie Exchange"
        >
          <svg
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <circle cx="12" cy="13" r="3" fill="none"/>
          </svg>
        </button>

        {/* Dark Mode Toggle - Right */}
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 text-gray-900 dark:text-white flex items-center justify-center hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 group"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            // Simple sun icon
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.66-7.66l-1.42 1.42M6.76 6.76L5.34 5.34m12.32 12.32l-1.42-1.42M6.76 17.24l-1.42 1.42"/>
            </svg>
          ) : (
            // Simple moon icon
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}