"use client"

import Link from 'next/link'
import React from 'react'
import useScrollChange from '@/hooks/use-scroll-change';
import { cn } from '@/lib/utils';
import Image from 'next/image';


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
        href : "/gdg-coding-club"
    },
    {
        title : "GSA",
        href : "/gsa-coding-club"
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


  return (
      <header className={cn("sticky top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/20 transition-transform duration-300" ,
        scrollingDown ? "-translate-y-full" : "translate-y-0"

      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex flex-col justify-center items-center space-x-3">
              <Image src="/logo/logo-coding-club.png" alt="Logo" width={50} height={50} />
              <span className="text-sm font-bold text-slate-800 font-google-sans-code">Coding Club</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {links.map(({ title, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
                >
                  {title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
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
  )
}

