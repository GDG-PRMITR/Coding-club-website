"use client";
import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

const MemberCard = (member) => {
  const [imageError, setImageError] = useState(false);
  const getNickname = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    
    const initials = names.map(n => n.trim().charAt(0).toUpperCase());
    return initials.join("");
  }
  return (
    <div
      className="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:shadow-sm hover-neon-border transition-all duration-300  group w-full max-w-[280px] relative z-10"
    >
      <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
        {imageError ? (
          <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {getNickname(member.name)}
          </div>
        ) : (
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            width={112}
            height={112}
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {member.name}
      </h3>
      <p className="text-gray-600 mb-4 text-sm">{member.position}</p>

      <div className="flex justify-center gap-3">
        <a
          href={`https://linkedin.com/in/${member.social.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <Linkedin className="w-5 h-5 text-white" />
        </a>
        
        <a
          href={`https://github.com/${member.social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <Github className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  );
};

MemberCard.displayName = "MemberCard";
export default MemberCard;