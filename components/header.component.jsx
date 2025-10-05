"use client"

import Link from 'next/link'
import React from 'react'
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


  const pathname = usePathname()
  const router = useRouter()

  const navigate = (href) => {
    // keep client-side navigation
    router.push(href)
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
  )
}

