"use client"

const resources = [
  {
    title: "Attio SDK Integrations",
    description: "Discover our collection of custom-built Attio integrations and apps",
    category: "Integration",
    link: "https://dialed.tech/sdk",
    featured: true
  },
  {
    title: "Notion Templates",
    description: "Explore my collection of productivity-focused Notion templates",
    category: "Template",
    link: "https://www.notion.so/@nickjanes",
    featured: false
  }
]

export default function ResourceGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">Resources & Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              resource.featured
                ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                resource.featured
                  ? 'bg-white dark:bg-black text-black dark:text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {resource.category}
              </span>

              <svg
                className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  resource.featured ? 'text-white dark:text-black' : 'text-gray-400 dark:text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
              {resource.title}
            </h3>

            <p className={`text-sm leading-relaxed ${
              resource.featured ? 'text-gray-200 dark:text-gray-700' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {resource.description}
            </p>
          </a>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-300 mb-6">Looking for something custom?</p>
        <a
          href="https://cal.com/nickjanes/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          Let&apos;s Talk
        </a>
      </div>
    </section>
  )
}