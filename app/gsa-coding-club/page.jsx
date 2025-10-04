"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import GoogleParticlesCanvas from "@/components/googleParticleBackground";

// Data for the team members
const gsaLeads = [
  {
    name: "Adnan Ahmad",
    position: "GSA & Head",
    image: "/images/ADNAN_AHMAD_IOT.jpg",
    social: { linkedin: "adnheyr", github: "adnheyr" },
  },
];

const gsaCoreTeam = [];

const gsaDomains = {
  "Team GenAI": [
    {
      name: "Yash Dhoble",
      position: "Team GenAI",
      image: "/images/Yash_dhoble_IOT.png",
      social: { linkedin: "yash_dhoble", github: "yash_dhoble" },
    },
    {
      name: "Anurag Deshmukh",
      position: "Team GenAI",
      image: "/images/Anurag_Deshmukh_App_Development.png",
      social: { linkedin: "anurag_deshmukh", github: "anurag_deshmukh" },
    },
    {
      name: "Radha Waghmare",
      position: "Team GenAI",
      image: "/GSA-images/Radha-GSA.jpg",
      social: { linkedin: "radha_waghmare", github: "radha_waghmare" },
    },
  ],
  "Team WebTech": [
    {
      name: "Ninad Vaidya",
      position: "Team WebTech",
      image: "/images/Ninad_Vaidya_Web_Development.jpg",
      social: { linkedin: "ninad_vaidya", github: "ninad_vaidya" },
    },
    {
      name: "Kaushal Patel",
      position: "Team WebTech",
      image: "/GSA-images/Kaushal-GSA.jpg",
      social: { linkedin: "kaushal_patel", github: "kaushal_patel" },
    },
  ],
  "Team Public Relations": [
    {
      name: "Khushboo Mishra",
      position: "Team Public Relations",
      image: "/GSA-images/Khushboo-GSA.jpg",
      social: { linkedin: "khushboo_mishra", github: "khushboo_mishra" },
    },
    {
      name: "Shrutika Tayade",
      position: "Team Public Relations",
      image: "/GSA-images/Shrutika-GSA.jpg",
      social: { linkedin: "shrutika_tayade", github: "shrutika_tayade" },
    },
  ],
  "Team Social Media": [
    {
      name: "Shivapriya Thakare",
      position: "Team Social Media",
      image: "/GSA-images/Shivpriya-GSA.jpg",
      social: { linkedin: "shivapriya_thakare", github: "shivapriya_thakare" },
    },
    {
      name: "Prachi Sable",
      position: "Team Social Media",
      image: "/GSA-images/Prachi-GSA.jpg",
      social: { linkedin: "prachi_sable", github: "prachi_sable" },
    },
  ],
  "Team Graphics and Editing": [
    {
      name: "Aditya Rathod",
      position: "Team Graphics and Editing",
      image: "/GSA-images/Aditya-GSA.jpg",
      social: { linkedin: "aditya_rathod", github: "aditya_rathod" },
    },
    {
      name: "Arjun Solanke",
      position: "Team Graphics and Editing",
      image: "/images/Arjun_Solanke_Graphic_Designer.jpg",
      social: { linkedin: "arjun_solanke", github: "arjun_solanke" },
    },
    {
      name: "Rahul Kharap",
      position: "Team Graphics and Editing",
      image: "/GSA-images/Rahul-GSA.jpg",
      social: { linkedin: "rahul_kharap", github: "rahul_kharap" },
    },
  ],
};

const renderMemberCard = (member) => (
  <div
    key={member.name}
    className="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group w-full max-w-[280px] relative z-10"
  >
    <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
      <img
        src={member.image || "/placeholder.svg"}
        alt={member.name}
        className="w-full h-full object-cover"
      />
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

export default function GsaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full">
        <GoogleParticlesCanvas />
      </div>
      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center relative">
          {/* Logo */}
          <div className="absolute top-0 right-6 md:right-8">
            <img
              src="/logo/logo-gsac.png"
              alt="Google Student Ambassador Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            The minds powering GSA on Campus at PRMITR
          </p>
        </div>
      </section>

      {/* Leads Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            GSA Lead
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-[320px]">
              {gsaLeads.map((lead) => renderMemberCard(lead))}
            </div>
          </div>
        </div>
      </section>

      {/* Domain Teams */}
      {Object.entries(gsaDomains).map(([domainName, members]) => (
        <section key={domainName} className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {domainName}
              </h2>

              {/* Domain Members - Centered Grid */}
              <div className="flex flex-wrap justify-center gap-8">
                {members.map((member) => renderMemberCard(member))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  );
}