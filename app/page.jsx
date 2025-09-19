"use client"

import { useState, useEffect, useRef } from "react"

const CodingClubLandingPage = () => {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState({})

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = []
    const colors = [
      "rgba(234, 67, 53, 0.6)", // Google Red
      "rgba(66, 133, 244, 0.6)", // Google Blue
      "rgba(52, 168, 83, 0.6)", // Google Green
      "rgba(251, 188, 5, 0.6)", // Google Yellow
    ]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.2,
    })

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle())
      }
    }

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initParticles()
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white text-foreground relative overflow-x-hidden">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "white" }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{"</>"}</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">Coding Club</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "About", "GDG x Coding Club", "GSA", "Events", "Gallery"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg glass">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-slate-600"></div>
                <div className="w-full h-0.5 bg-slate-600"></div>
                <div className="w-full h-0.5 bg-slate-600"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-6 relative z-10">
          {/* Main Container */}
          <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
            {/* Header with Logo and Tagline */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold text-2xl">CC</span>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-balance">
                  Empowering Coders, Building the Future
                </h1>
              </div>
            </div>

            {/* Partnership Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* GDG Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">GDG</span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Google Developer Groups - Connecting developers worldwide through technology, innovation, and
                  community-driven learning experiences.
                </p>
                <div className="flex flex-col space-y-3">
                  <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Upcoming Event
                  </button>
                  <a
                    href="#"
                    className="text-blue-600 text-sm hover:underline text-center transition-colors duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* GSA Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">GSA</span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Google Student Ambassador - Empowering students with Google technologies and fostering innovation in
                  academic communities.
                </p>
                <div className="flex flex-col space-y-3">
                  <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Upcoming Event
                  </button>
                  <a
                    href="#"
                    className="text-blue-600 text-sm hover:underline text-center transition-colors duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Cisco Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">CISCO</span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Cisco Networking Academy - Building networking skills and cybersecurity expertise for the digital
                  transformation era.
                </p>
                <div className="flex justify-center">
                  <a href="#" className="text-blue-600 text-sm hover:underline transition-colors duration-300">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="about" className="py-16 relative z-10" data-animate>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "500+",
                label: "Participants Reach",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
                  </svg>
                ),
              },
              {
                number: "25+",
                label: "Events Hosted",
                icon: (
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                ),
              },
              {
                number: "200+",
                label: "Study Jams Participants",
                icon: (
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                ),
              },
              {
                number: "8+",
                label: "Number of Domains",
                icon: (
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                ),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 hover:scale-110 hover:shadow-lg cursor-pointer group ${
                  isVisible.about ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section id="faculty" className="py-16 relative z-10" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Faculty Members</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Roshan Karwa Sir", title: "Professor, Computer Science" },
              { name: "Bamnote Sir", title: "Associate Professor, IT" },
              { name: "Dr. Sharma", title: "Head of Department" },
              { name: "Prof. Gupta", title: "Senior Lecturer" },
            ].map((faculty, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group ${
                  isVisible.faculty ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-amber-600 to-amber-800 mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/professional-faculty-member-in-office-with-books.jpg"
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {faculty.name}
                </h3>
                <p className="text-slate-600 text-sm">{faculty.title}</p>
              </div>
            ))}
          </div>

          {/* Horizontal line separator */}
          <div className="w-full max-w-4xl mx-auto mt-12">
            <hr className="border-slate-300" />
          </div>
        </div>
      </section>

      {/* Organisers Section */}
      <section id="organisers" className="py-16 relative z-10" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Organisers</h2>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
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
                description:
                  "Enthusiastic about student engagement and creating opportunities for peer-to-peer learning.",
                image: "/professional-young-man-in-business-attire-presenti.jpg",
              },
            ].map((organiser, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 ${
                  isVisible.organisers ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={organiser.image || "/placeholder.svg"}
                    alt={organiser.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {organiser.name}
                  </h3>
                  <p className="text-slate-800 font-semibold mb-4">{organiser.position}</p>
                  <p className="text-slate-600 leading-relaxed mb-6">{organiser.description}</p>

                  <div className="flex justify-center md:justify-start space-x-6">
                    {[
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
                    ].map((social, socialIndex) => (
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

      {/* Footer */}
      <footer className="relative z-10 mt-16 bg-slate-900">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Institute Information */}
            <div>
              <h3 className="text-blue-400 font-bold text-xl mb-2">Professor Ram Meghe</h3>
              <h4 className="text-white font-semibold text-lg mb-4">Institute of Technology and Research</h4>
              <p className="text-slate-300 leading-relaxed mb-6">
                Empowering the next generation of technologists through innovation, collaboration, and excellence. Join
                our vibrant community of developers, researchers, and leaders.
              </p>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📍</span>
                  <span>Badnera, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">📧</span>
                  <span>info@prmit.ac.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📞</span>
                  <span>+91 XXXX XXXXXX</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <div className="space-y-3">
                {["Events", "About Us", "Contact", "Gallery", "Resources"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase().replace(/\s+/g, "-"))}
                    className="block text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Follow Our Communities */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Follow Our Communities</h3>
              <div className="space-y-4">
                {[
                  { name: "GDG Instagram", handle: "@gdg_prmit", color: "text-red-400" },
                  { name: "Coding Club Instagram", handle: "@codingclub_prmit", color: "text-green-400" },
                  { name: "GSA Instagram", handle: "@gsa_prmit", color: "text-yellow-400" },
                ].map((social, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-lg">📱</span>
                    <div>
                      <div className="text-white font-medium">{social.name}</div>
                      <div className={`text-sm ${social.color}`}>{social.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer bottom section */}
          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 Professor Ram Meghe Institute of Technology and Research. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Built with passion by our communities</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CodingClubLandingPage
