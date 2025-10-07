import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
export default function CardComponent({
  title,
  description,
  link,
  linkTarget = "_blank",
  linkText = "Learn More",
  theme = "blue",
  isRedirectionExist = false, // New prop to check if redirection exists
  redirectionLink,
  logoHref,
  Button
}) {
  return (
    <div
      className={cn(
        "border-2 z-10 hover-neon-border p-6 transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-start h-full rounded-lg"
      )}
    >
      <div className="text-center mb-6 h-16">
        <Image src={logoHref} alt={`${title} logo`} width={80} height={80} className="mx-auto mb-4"/>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center text-pretty mb-6 text-sm leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex justify-end items-center">
        {isRedirectionExist && redirectionLink && (
          <Link
            href={redirectionLink}
            target="_blank"
            title={`visit website of ${title}`}
            className={cn(
              "text-sm hover:underline transition-colors duration-300 ",
              theme === "red" ? "text-red-400" : "text-blue-400"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-gray-500 hover:fill-current inline-block mr-1"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
            </svg>
          </Link>
        )}
        {link && linkText && !Button && (<Link
          href={link}
          target={linkTarget}
          className={cn(
            "flex justify-center items-center gap-0.5 text-sm hover:underline transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
            theme === "red" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600" 
          )}
        >
          <span >{linkText}</span>
          <ChevronRight className="inline-block ml-1" size={16} />
        </Link>)}
        {!!Button && <Button/>}
      </div>
    </div>
  );
}
