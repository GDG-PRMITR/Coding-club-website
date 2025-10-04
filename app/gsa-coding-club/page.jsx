"use client"

import React from 'react';
import GoogleParticlesCanvas from "@/components/googleParticleBackground";
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Data for the team members
const gsaLeads = [
  {
    name: "Adnan Ahmad",
    position: "GSA & Head",
    image: "/adnan-qureshi.jpg",
    social: { linkedin: "adnheyr", github: "adnheyr" },
  },
];

const gsaCoreTeam = [];

const gsaDomains = {
  "Team GenAI": [
    { name: "Yash Dhoble", position: "Team GenAI", social: { linkedin: "yash_dhoble", github: "yash_dhoble" } },
    { name: "Anurag Deshmukh", position: "Team GenAI", social: { linkedin: "anurag_deshmukh", github: "anurag_deshmukh" } },
    { name: "Radha Waghmare", position: "Team GenAI", social: { linkedin: "radha_waghmare", github: "radha_waghmare" } },
  ],
  "Team WebTech": [
    { name: "Ninad Vaidya", position: "Team WebTech", social: { linkedin: "ninad_vaidya", github: "ninad_vaidya" } },
    { name: "Kaushal Patel", position: "Team WebTech", social: { linkedin: "kaushal_patel", github: "kaushal_patel" } },
  ],
  "Team Public Relations": [
    { name: "Khushboo Mishra", position: "Team Public Relations", social: { linkedin: "khushboo_mishra", github: "khushboo_mishra" } },
    { name: "Shrutika Tayade", position: "Team Public Relations", social: { linkedin: "shrutika_tayade", github: "shrutika_tayade" } },
  ],
  "Team Social Media": [
    { name: "Shivapriya Thakare", position: "Team Social Media", social: { linkedin: "shivapriya_thakare", github: "shivapriya_thakare" } },
    { name: "Prachi Sable", position: "Team Social Media", social: { linkedin: "prachi_sable", github: "prachi_sable" } },
  ],
  "Team Graphics and Editing": [
    { name: "Aditya Rathod", position: "Team Graphics and Editing", social: { linkedin: "aditya_rathod", github: "aditya_rathod" } },
    { name: "Arjun Solanke", position: "Team Graphics and Editing", social: { linkedin: "arjun_solanke", github: "arjun_solanke" } },
    { name: "Rahul Kharap", position: "Team Graphics and Editing", social: { linkedin: "rahul_kharap", github: "rahul_kharap" } },
  ],
};

const renderMemberCard = (member, index) => (
  <div
    key={index}
    className="bg-card rounded-xl p-6 text-center border border-border hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
  >
    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
      <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
    <p className="text-muted-foreground mb-4">{member.position}</p>

    <div className="flex justify-center space-x-3 opacity-100 transition-opacity duration-300">
      <Link href={`https://linkedin.com/in/${member.social.linkedin}`} target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors duration-300 hover:scale-110">
        <Linkedin className="w-5 h-5 text-white" />
      </Link>
      <Link href={`https://github.com/${member.social.github}`} target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-colors duration-300 hover:scale-110">
        <Github className="w-5 h-5 text-white" />
      </Link>
    </div>
  </div>
);

export default function GsaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full">
        <GoogleParticlesCanvas />
      </div>

      {/* Header and GSA Head section */}
      <section id="header" className="relative pt-32 pb-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl text-center relative">
          {/* Logo added here */}
          <div className="absolute top-4 right-6 md:top-8 md:right-8 z-20">
            <Image
              src="/logo/logo-gsac.png"
              alt="Google Student Ambassador Logo"
              width={80}
              height={80}
              className="w-20 h-auto"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">Meet Our Team</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            The minds powering GSA on Campus at PRMITR
          </p>
        </div>
      </section>

      {/* Leads Section */}
      <section id="leads" className="relative py-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Leads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gsaLeads.map((lead, index) => renderMemberCard(lead, index))}
          </div>
        </div>
      </section>

      {/* Core Team Section (Empty, but matching structure) */}
      <section id="core-team" className="relative py-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {gsaCoreTeam.map((member, index) => renderMemberCard(member, index))}
          </div>
        </div>
      </section>

      {/* Domain Teams */}
      {Object.entries(gsaDomains).map(([domainName, members]) => (
        <section
          key={domainName}
          id={domainName.toLowerCase().replace(/\s+/g, "-")}
          className="relative py-20 px-6 z-10"
        >
          <div className="container mx-auto max-w-6xl bg-[#3b4a5a]/50 backdrop-blur-md border border-blue/20 rounded-xl shadow-lg p-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">{domainName}</h2>

            {/* Domain Members */}
            {members.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 text-muted-foreground">Domain Members</h3>
                <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-4">
                  {members.map((member, index) => renderMemberCard(member, index))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
