"use client"

import { useState, useEffect } from "react"

const Faculty = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "faculty") {
            setIsVisible(entry.isIntersecting)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("faculty")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const facultyMembers = [
    { name: "Roshan Karwa Sir", title: "Professor, Computer Science" },
    { name: "Bamnote Sir", title: "Associate Professor, IT" },
    { name: "Dr. Sharma", title: "Head of Department" },
    { name: "Prof. Gupta", title: "Senior Lecturer" },
  ]

  return (
    <section id="faculty" className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Faculty Members</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
  )
}

export default Faculty
