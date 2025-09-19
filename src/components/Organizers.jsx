"use client"

import { useState, useEffect } from "react"

const Organizers = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "organisers") {
            setIsVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("organisers")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const organizers = [
    {
      name: "Vedant Mali",
      position: "GDG Lead",
      description:
        "Passionate about Google technologies and community building. Leading innovative workshops and tech talks.",
      image: "/professional-young-man-in-business-attire-presenti.jpg",
    },
    {
      name: "Sneha Giri",
      position: "Coding Club Lead",
      description:
        "Dedicated to fostering a collaborative learning environment and organizing impactful coding events.",
      image: "/professional-young-woman-in-business-attire-in-off.jpg",
    },
    {
      name: "Adnan Qureshi",
      position: "GSA Lead",
      description: "Enthusiastic about student engagement and creating opportunities for peer-to-peer learning.",
      image: "/professional-young-man-in-business-attire-presenti.jpg",
    },
  ]

  const socialLinks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: "Email",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: "GitHub",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.069 1.689-.069 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: "Instagram",
    },
  ]

  return (
    <section id="organisers" className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Organisers</h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {organizers.map((organizer, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={organizer.image || "/placeholder.svg"}
                  alt={organizer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {organizer.name}
                </h3>
                <p className="text-slate-800 font-semibold mb-4">{organizer.position}</p>
                <p className="text-slate-600 leading-relaxed mb-6">{organizer.description}</p>

                <div className="flex justify-center md:justify-start space-x-6">
                  {socialLinks.map((social, socialIndex) => (
                    <button
                      key={socialIndex}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 hover:scale-110"
                    >
                      {social.icon}
                      <span className="text-sm font-medium">{social.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Organizers
