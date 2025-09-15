"use client"

export default function ScrollingBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black dark:bg-white text-white dark:text-black py-2 overflow-hidden z-30">
      <div
        className="whitespace-nowrap animate-marquee"
        style={{
          animation: 'marquee 20s linear infinite'
        }}
      >
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
        <span className="mx-8 text-sm font-medium">
          📍 At Make with Notion 2025? Come see me in the Maker Space (2nd Floor)!
        </span>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}