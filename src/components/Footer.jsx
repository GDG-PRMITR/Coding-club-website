"use client"

const Footer = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
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
  )
}

export default Footer
