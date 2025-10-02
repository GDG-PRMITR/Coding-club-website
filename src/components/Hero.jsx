const Hero = () => {
  return (
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
  )
}

export default Hero
