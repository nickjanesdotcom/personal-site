"use client"

import { useRef, useState } from "react"

export default function SelfieExchange() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cameraStarted, setCameraStarted] = useState(false)

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
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
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 320, 240)
        setPhoto(canvasRef.current.toDataURL("image/png"))

        // Stop camera stream
        const stream = videoRef.current.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach(track => track.stop())
        }
        setCameraStarted(false)
      }
    }
  }

  function retakePhoto() {
    setPhoto(null)
    startCamera()
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
            Let&apos;s capture this moment and exchange contact information!
          </p>
        </div>

        {!photo ? (
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                width="320"
                height="240"
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

            <canvas ref={canvasRef} width="320" height="240" className="hidden" />

            <div className="flex gap-3 justify-center">
              {!cameraStarted ? (
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={takePhoto}
                  className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Take Photo
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