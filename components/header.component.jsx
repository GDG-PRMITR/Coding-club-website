"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import useScrollChange from '@/hooks/use-scroll-change';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'


export default function HeaderComponent() {
const links = [
    {
        title : "Home",
        href : "/"
    },
    {
        title : "About",
        href : "/about"
    },
    {
        title : "GDG x Coding Club",
        href : "/gdg"
    },
    {
        title : "GSA",
        href : "/gsa"
    },
    {
        title : "Events",
        href : "/events"
    },
    {
        title : "Gallery",
        href : "/gallery"
    },
]

const scrollingDown = useScrollChange(50);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const navigate = (href) => {
    // keep client-side navigation
    router.push(href)
    setMobileMenuOpen(false) // Close mobile menu after navigation
  }

  return (
      <header className={cn("sticky top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/20 transition-transform duration-300" ,
        scrollingDown ? "-translate-y-full" : "translate-y-0"

      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <button 
              onClick={() => navigate('/')} 
              className="flex flex-col justify-center items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Go to home"
            >
              <Image src="/logo/logo-coding-club.png" alt="Logo" width={50} height={50} />
              <span className="text-sm font-bold text-slate-800 font-google-sans-code">Coding Club</span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
              {links.map(({ title, href }) => {
                const isActive = pathname === href
                return (
                  <button
                    key={title}
                    onClick={() => navigate(href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "text-slate-600 hover:text-blue-600 font-medium transition-colors duration-300 relative group cursor-pointer",
                      isActive && "text-blue-600"
                    )}
                  >
                    {title}
                    <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}></span>
                  </button>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-white/20 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={cn("w-full h-0.5 bg-slate-600 transition-all duration-300", 
                  mobileMenuOpen && "rotate-45 translate-y-1.5"
                )}></div>
                <div className={cn("w-full h-0.5 bg-slate-600 transition-all duration-300",
                  mobileMenuOpen && "opacity-0"
                )}></div>
                <div className={cn("w-full h-0.5 bg-slate-600 transition-all duration-300",
                  mobileMenuOpen && "-rotate-45 -translate-y-1.5"
                )}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}>
            <nav className="flex flex-col space-y-2 py-2" aria-label="Mobile navigation">
              {links.map(({ title, href }) => {
                const isActive = pathname === href
                return (
                  <button
                    key={title}
                    onClick={() => navigate(href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                      isActive 
                        ? "bg-blue-50 text-blue-600 font-semibold" 
                        : "text-slate-600 hover:bg-white/30 hover:text-blue-600"
                    )}
                  >
                    {title}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
  )
}

