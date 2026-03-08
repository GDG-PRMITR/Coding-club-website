"use client";
import { useState } from "react";
import { Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const MemberCard = (member) => {
  const [imageError, setImageError] = useState(false);
  const isValidSocial = (value) =>
    Boolean(value) && value.trim().toUpperCase() !== "NA";

  const getProfileUrl = (platform, value) => {
    if (!isValidSocial(value)) return "#";
    if (value.startsWith("http")) return value;

    if (platform === "linkedin") return `https://linkedin.com/in/${value}`;
    if (platform === "github") return `https://github.com/${value}`;
    if (platform === "instagram") return `https://instagram.com/${value}`;

    return value;
  };

  const getNickname = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    
    const initials = names.map(n => n.trim().charAt(0).toUpperCase());
    return initials.join("");
  }
  return (
    <div
      className="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:shadow-sm hover-neon-border transition-all duration-300  group w-full max-w-[280px] relative z-10"
      style={{
        "--border-radius": "0.75rem",
        "--border-thickness": "2px",
        "--hover-neon-c1": "rgba(66, 133, 244, 0.18)",
        "--hover-neon-c2": "rgba(52, 168, 83, 0.45)",
        "--hover-neon-c3": "rgba(251, 188, 4, 0.72)",
        "--hover-neon-c4": "rgba(234, 67, 53, 0.92)",
        "--hover-neon-surface": "#ffffff",
      }}
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
            className="w-full object-contain"
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

      <div className="flex justify-center gap-4">
        {isValidSocial(member.social?.instagram) && (
          <a
            href={getProfileUrl("instagram", member.social.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-50 rounded-lg text-[#EA4335] hover:bg-[#EA4335] hover:text-white transition-all shadow-sm"
            aria-label={`${member.name} Instagram`}
          >
            <Instagram className="w-5 h-5" />
          </a>
        )}

        {isValidSocial(member.social?.linkedin) && (
          <a
            href={getProfileUrl("linkedin", member.social.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-50 rounded-lg text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-all shadow-sm"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        
        {isValidSocial(member.social?.github) && (
          <a
            href={getProfileUrl("github", member.social.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-50 rounded-lg text-[#34A853] hover:bg-[#34A853] hover:text-white transition-all shadow-sm"
            aria-label={`${member.name} GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

MemberCard.displayName = "MemberCard";
export default MemberCard;