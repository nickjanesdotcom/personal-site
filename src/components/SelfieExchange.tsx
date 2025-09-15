"use client"

import { useRef, useState, useEffect } from "react"

export default function SelfieExchange() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cameraStarted, setCameraStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet', 'blackberry', 'windows phone']
      return mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
             (window.innerWidth <= 768 && 'ontouchstart' in window)
    }
    setIsMobile(checkMobile())
  }, [])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraStarted(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  function takePhoto() {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Use video's actual dimensions for higher quality
        const videoWidth = video.videoWidth || video.clientWidth
        const videoHeight = video.videoHeight || video.clientHeight

        // Set canvas to match video resolution
        canvas.width = videoWidth
        canvas.height = videoHeight

        // Draw the image
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)

        // Convert to high quality JPEG
        setPhoto(canvas.toDataURL("image/jpeg", 0.9))

        // Stop camera stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach(track => track.stop())
        }
        setCameraStarted(false)
      }
    }
  }

  // Handle file input (native camera)
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image is too large. Please choose an image under 10MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          if (ctx) {
            // Resize if image is too large (max 1920x1080)
            let { width, height } = img
            const maxWidth = 1920
            const maxHeight = 1080

            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height)
              width *= ratio
              height *= ratio
            }

            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)
            setPhoto(canvas.toDataURL("image/jpeg", 0.9))
          }
        }
      }
      img.onerror = () => {
        alert('Failed to load image. Please try a different photo.')
      }
      img.src = e.target?.result as string
    }
    reader.onerror = () => {
      alert('Failed to read file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  // Open native camera
  function openNativeCamera() {
    fileInputRef.current?.click()
  }

  function retakePhoto() {
    setPhoto(null)
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    // Don't auto-start camera, let user choose method again
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    const body = {
      name,
      email,
      photo, // selfie as base64
      source: 'selfie_exchange'
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">🤳 Take a Selfie & Share Details</h2>
          <p className="text-gray-600">
            {isMobile
              ? "Use your camera app for the best quality selfie!"
              : "Let's capture this moment and exchange contact information!"
            }
          </p>
        </div>

        {!photo ? (
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full aspect-[4/3] object-cover"
                style={{ display: cameraStarted ? 'block' : 'none' }}
              />
              {!cameraStarted && (
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500">Camera preview will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden file input for native camera */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3 justify-center">
              {!cameraStarted ? (
                <>
                  {isMobile ? (
                    <button
                      onClick={openNativeCamera}
                      className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                    >
                      📱 Open Camera
                    </button>
                  ) : (
                    <button
                      onClick={startCamera}
                      className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                    >
                      💻 Start Camera
                    </button>
                  )}
                  {!isMobile && (
                    <button
                      onClick={openNativeCamera}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      📁 Upload Photo
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={takePhoto}
                  className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  📸 Take Photo
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={photo}
                alt="Selfie"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={retakePhoto}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Retake
              </button>
            </div>
          </div>
        )}

        {photo && !submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Sending..." : "Share & Get Selfie"}
            </button>
          </form>
        ) : null}

        {submitted && (
          <div className="text-center p-6 bg-green-50 rounded-2xl">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-green-700 font-semibold">
              Selfie & details shared — check your inbox!
            </p>
          </div>
        )}
    </div>
  )
}