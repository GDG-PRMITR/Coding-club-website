"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Send , Instagram } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function FooterComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (href) => {
    router.push(href);
  };

  return (
    <>
      {/* Footer */}
      <footer
        className="relative z-10 mt-16 bg-slate-900"
        style={{
          background: "linear-gradient(90deg, #4f46e5 0%, #9333ea 100%)",
        }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Institute Information */}
            <div>
              <h3 className="text-blue-400 font-bold text-xl mb-2">
                Coding Club
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Empowering the next generation of technologists through
                innovation, collaboration, and excellence. Join our vibrant
                community of developers, researchers, and leaders.
              </p>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>Badnera, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400">
                    <Send className="w-4 h-4" />
                  </span>
                  <span>info@prmit.ac.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>+91 XXXX XXXXXX</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { title: "Events", href: "/events" },
                  { title: "About Us", href: "/about" },
                  { title: "GDG", href: "/gdg" },
                  { title: "Gallery", href: "/gallery" },
                  { title: "GSA", href: "/gsa" },
                ].map(({ title, href }) => {
                  const isActive = pathname === href;
                  return (
                    <button
                      key={title}
                      onClick={() => navigate(href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block text-slate-300 hover:text-white transition-colors duration-300 text-left",
                        isActive && "text-white font-semibold"
                      )}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Follow Our Communities */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">
                Follow Our Communities
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "GDG Instagram",
                    handle: "@gdg_prmit",
                    color: "text-red-400",
                    url: "https://instagram.com/gdg_prmit",
                    icon : Instagram
                  },
                  {
                    name: "Coding Club Instagram",
                    handle: "@codingclub_prmit",
                    color: "text-green-400",
                    url: "https://instagram.com/codingclub_prmit",
                    icon : Instagram
                  },
                  {
                    name: "GSA Instagram",
                    handle: "@gsa_prmit",
                    color: "text-yellow-400",
                    url: "https://instagram.com/gsa_prmit",
                    icon : Instagram
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:opacity-90"
                  >
                    <span className="text-lg">
                      {/* <Image
                        src="/social-icons/instagram.svg"
                        alt={social.name}
                        width={24}
                        height={24}
                      /> */}
                      <social.icon className={cn("w-6 h-6", social.color)} />
                    </span>
                    <div>
                      <div className="text-white font-medium">
                        {social.name}
                      </div>
                      <div className={cn(`text-sm`, social.color)}>
                        {social.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer bottom section */}
          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-center md:text-left text-pretty text-sm mb-4 md:mb-0">
              © 2024 Professor Ram Meghe Institute of Technology and Research.
              All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm flex text-nowrap">
                Made with
                <span className="mx-1">❤️</span>
                by our web development team
              </span>
              {/* <span className="text-slate-400 text-sm">Built with passion by our communities</span> */}
              {/* <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterComponent;
