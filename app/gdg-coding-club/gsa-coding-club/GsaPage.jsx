"use client"

import React from 'react';
import GoogleParticlesCanvas from "@/components/googleParticleBackground";
import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

// Data for the team members
const gsaData = {
  head: {
    name: "Adnan Ahmad",
    position: "GSA & Head",
    image: "/adnan-qureshi.jpg", // You'll need to add a placeholder image
    social: { linkedin: "adnan-ahmad", github: "adnan-ahmad" },
  },
  domains: {
    "Team GenAI": [
      { name: "Yash Dhoble", position: "Team GenAI", social: { linkedin: "yashdhoble", github: "yashdhoble" } },
      { name: "Anurag Deshmukh", position: "Team GenAI", social: { linkedin: "anuragdeshmukh", github: "anuragdeshmukh" } },
      { name: "Radha Waghmare", position: "Team GenAI", social: { linkedin: "radhawaghmare", github: "radhawaghmare" } },
    ],
    "Team WebTech": [
      { name: "Ninad Vaidya", position: "Team WebTech", social: { linkedin: "ninadvaidya", github: "ninadvaidya" } },
      { name: "Kaushal Patel", position: "Team WebTech", social: { linkedin: "kaushalpatel", github: "kaushalpatel" } },
    ],
    "Team Public Relations": [
      { name: "Khushboo Mishra", position: "Team Public Relations", social: { linkedin: "khushboomishra", github: "khushboomishra" } },
      { name: "Shrutika Tayade", position: "Team Public Relations", social: { linkedin: "shrutikatayade", github: "shrutikatayade" } },
    ],
    "Team Social Media": [
      { name: "Shivapriya Thakare", position: "Team Social Media", social: { linkedin: "shivapriyathakare", github: "shivapriyathakare" } },
      { name: "Prachi Sable", position: "Team Social Media", social: { linkedin: "prachisable", github: "prachisable" } },
    ],
    "Team Graphics and Editing": [
      { name: "Aditya Rathod", position: "Team Graphics and Editing", social: { linkedin: "adityarathod", github: "adityarathod" } },
      { name: "Arjun Solanke", position: "Team Graphics and Editing", social: { linkedin: "arjinsolanke", github: "arjinsolanke" } },
      { name: "Rahul Kharap", position: "Team Graphics and Editing", social: { linkedin: "rahulkharap", github: "rahulkharap" } },
    ],
  },
};

const renderMemberCard = (member) => (
  <div
    key={member.name}
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

      <HeaderComponent />

      {/* Header and GSA Head section */}
      <section id="gsa-head" className="relative pt-32 pb-20 px-6 z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">Meet Our Team</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            The minds powering GSA on Campus at PRMITR
          </p>

          <div className="mt-16 flex justify-center">
            {renderMemberCard(gsaData.head, 0)}
          </div>
        </div>
      </section>

      {/* Domain Teams section */}
      {Object.entries(gsaData.domains).map(([domainName, members]) => (
        <section
          key={domainName}
          id={domainName.toLowerCase().replace(/\s+/g, "-")}
          className="relative py-12 px-6 z-10"
        >
          <div className="container mx-auto max-w-6xl bg-[#3b4a5a]/50 backdrop-blur-md border border-blue/20 rounded-xl shadow-lg p-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">{domainName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => renderMemberCard(member, index))}
            </div>
          </div>
        </section>
      ))}
      
      <FooterComponent />

    </div>
  );
}