"use client"

import React from "react";
import { Github, Linkedin } from "lucide-react";
import GoogleParticlesCanvas from "@/components/googleParticleBackground";

export default function GdgCodingClubPage() {

  const leads = [
    {
      name: "Sneha Giri",
      position: "Coding Club Lead",
      image: "/images/Sneha_Giri_Coding_Club.jpg",
      social: { instagram: "vedant_mali", linkedin: "vedantmali", github: "vedantmali" },
    },
    {
      name: "Lavannya Deshpande",
      position: "Coding Club Co-Lead",
      image: "/images/Lavannya_Deshpande_Coding_Club.png",
      social: { instagram: "sneha_codes", linkedin: "snehagiri", github: "snehagiri" },
    },
    {
      name: "Vedant Mali",
      position: "GDGoC Organizer",
      image: "/images/Vedant_Mali_Organiser.png",
      social: { instagram: "adnan_tech", linkedin: "adnanqureshi", github: "adnanqureshi" },
    },
  ]

  const coreTeam = [
    {
      name: "Shruti Raju Misal",
      position: "Technical Lead",
      image: "/images/Shruti_Misal_Core_Team.jpg",
      social: { instagram: "rahul_tech", linkedin: "rahulsharma", github: "rahulsharma" },
    },
    {
      name: "Tanvi Markad",
      position: "Event Coordinator",
      image: "/images/Tanvi_Markad_Core_Team.jpg",
      social: { instagram: "priya_events", linkedin: "priyapatel", github: "priyapatel" },
    },
    {
      name: "Tanvi Watane",
      position: "Design Lead",
      image: "/images/Tanvi_Watane_Core_Team.jpg",
      social: { instagram: "arjun_design", linkedin: "arjunkumar", github: "arjunkumar" },
    },
    {
      name: "Sarang Mahore",
      position: "Content Manager",
      image: "/images/Sarang_Mahore_Core_Team.jpg",
      social: { instagram: "ananya_content", linkedin: "ananyasingh", github: "ananyasingh" },
    },
    {
      name: "Parth Deshmukh",
      position: "Community Manager",
      image: "/images/Parth_Deshmukh_Core_Team.png",
      social: { instagram: "karan_community", linkedin: "karanmehta", github: "karanmehta" },
    },
  ]

  const domains = {
    "Web Development": {
      executives: [
        {
          name: "Ninad Vaidya",
          position: "Web Dev Executive",
          image: "/images/Ninad_Vaidya_Web_Development.jpg",
          social: { instagram: "rohit_web", linkedin: "rohitagarwal", github: "rohitagarwal" },
        },
        {
          name: "Riya Umekar",
          position: "Web Dev Executive",
          image: "/images/Riya_Umekar_Web_Development.jpeg",
          social: { instagram: "sakshi_web", linkedin: "sakshijain", github: "sakshijain" },
        },
      ],
      members: [
        {
          name: "Rohit Gupta",
          position: "Domain Member",
          image: "/images/Rohit_Gupta_Web_Developement.png",
          social: { instagram: "amit_frontend", linkedin: "amitverma", github: "amitverma" },
        },
        {
          name: "Vedant Deshmukh",
          position: "Domain Member",
          image: "/images/Vedant_Deshmukh_Web_Dev.png",
          social: { instagram: "neha_backend", linkedin: "nehagupta", github: "nehagupta" },
        },
        {
          name: "Vedant Payghan",
          position: "Domain Member",
          image: "/images/Vedant_Payghan_Web_Development.jpg",
          social: { instagram: "vikash_fullstack", linkedin: "vikashsingh", github: "vikashsingh" },
        },
        {
          name: "Bhaumik Dhore",
          position: "Domain Member",
          image: "/images/Bhaumik_Dhore_Web_Development.png",
          social: { instagram: "pooja_uiux", linkedin: "poojasharma", github: "poojasharma" },
        },
        {
          name: "Kartik Shriwas",
          position: "Domain Member",
          image: "/images/Kartik_Shriwas_Web.jpg",
          social: { instagram: "ravi_react", linkedin: "ravikumar", github: "ravikumar" },
        },
        {
          name: "Shruti Raut",
          position: "Domain Member",
          image: "/images/Shruti_Raut_Web_Development.jpg",
          social: { instagram: "divya_vue", linkedin: "divyapatel", github: "divyapatel" },
        },
        {
          name: "Amruta Topale",
          position: "Domain Member",
          image: "/images/Amruta_Tople_Web_Development.jpg",
          social: { instagram: "suresh_angular", linkedin: "sureshyadav", github: "sureshyadav" },
        },
        {
          name: "Krishna Mastud",
          position:"Domain Member",
          image: "/images/Krishna_Mastud_Web_Development.jpg",
          social: { instagram: "kavya_node", linkedin: "kavyareddy", github: "kavyareddy" },
        },
        {
          name: "Harshal Gunjarkar",
          position: "Domain Member",
          image: "/images/Harshal_Gunjarkar_Web_Development.jpg",
          social: { instagram: "manish_php", linkedin: "manishjoshi", github: "manishjoshi" },
        }

      ],
    },
    "App Development": {
      executives: [
        {
          name: "Pranav Rajput ",
          position: "App Dev Executive",
          image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
          social: { instagram: "harsh_app", linkedin: "harshpatel", github: "harshpatel" },
        },
        {
          name: "Ayush Waghade",
          position: "App Dev Executive",
          image: "/images/Ayush_Waghade_App_Development.png",
          social: { instagram: "isha_app", linkedin: "ishagupta", github: "ishagupta" },
        },
      ],
      members: [
        {
          name: "Anand Kakad",
          position: "Domain Member",
          image: "/images/Anand_Kakad_App_Development.jpg",
          social: { instagram: "nikhil_android", linkedin: "nikhiljain", github: "nikhiljain" },
        },
        {
          name: "Anurag Deshmukh",
          position: "Domain Member",
          image: "/images/Anurag_Deshmukh_App_Development.png",
          social: { instagram: "ritika_ios", linkedin: "ritikasingh", github: "ritikasingh" },
        },
        {
          name: "Krupa Sawarkar",
          position: "Domain Member",
          image: "/images/Krupa_Sawarkar_App_Development - Krupa Sawarkar.jpg",
          social: { instagram: "gaurav_flutter", linkedin: "gauravkumar", github: "gauravkumar" },
        },
      ],
    },
    "AI/ML": {
      executives: [
        {
          name: "Krushna Mohod",
          position: "AI/ML Executive",
          image: "/images/Krushna_Mohod_AIML.jpeg",
          social: { instagram: "aditya_ai", linkedin: "adityasharma", github: "adityasharma" },
        },
        {
          name: "Harshal Alaspure",
          position: "AI/ML Executive",
          image: "/images/Harshal_Alaspure_AIML.jpg",
          social: { instagram: "nisha_ml", linkedin: "nishapatel", github: "nishapatel" },
        },
      ],
      members: [
        {
          name: "Abhang Vyawhare",
          position: "Domain Member",
          image: "/images/Abhang_Vyawhare_AIML.png",
          social: { instagram: "rajesh_data", linkedin: "rajeshkumar", github: "rajeshkumar" },
        },
        {
          name: "Kaushik Tayde",
          position: "Domain Member",
          image: "/images/Kaushik_Tayde_AIML.png",
          social: { instagram: "meera_ml", linkedin: "meerajoshi", github: "meerajoshi" },
        },
        {
          name: "Rashika  Gangraj",
          position: "Domain Member",
          image: "/images/Rashika_Gangraj_AIML.png",
          social: { instagram: "sanjay_ai", linkedin: "sanjayverma", github: "sanjayverma" },
        },
        {
          name: "Rutvik Bele",
          position: "Domain Member",
          image: "/images/Rutvik_Bele_ALML.png",
          social: { instagram: "priyanka_dl", linkedin: "priyankasingh", github: "priyankasingh" },
        },
      ],
    },
    "Data Science": {
      executives: [
        {
          name: "Aryan Bute",
          position: "Data Science Executive",
          image: "/images/Aryan_Bute_Data_Science.jpg",
          social: { instagram: "vishal_data", linkedin: "vishalagarwal", github: "vishalagarwal" },
        },
      ],
      members: [
        {
          name: "Dnyandeep Bendewar",
          position: "Domain Member",
          image: "/images/Dnyandeep_Bendewar_Data_Science.jpg",
          social: { instagram: "akash_analyst", linkedin: "akashgupta", github: "akashgupta" },
        },
        {
          name: "Devendra Deshmukh",
          position: "Domain Member",
          image: "/images/Devendra_Deshmukh_Data_Science.jpg",
          social: { instagram: "ritu_business", linkedin: "ritupatel", github: "ritupatel" },
        },
        {
          name: "Harshad  Badge",
          position: "Domain Member",
          image: "/images/Harshad_Badge_Data_Science.jpg",
          social: { instagram: "mohit_stats", linkedin: "mohitkumar", github: "mohitkumar" },
        },
        {
          name: "Ishita Rathi",
          position: "Domain Member",
          image: "/images/Ishita_Rathi_Data_Science - Ishita Rathi.png",
          social: { instagram: "anjali_viz", linkedin: "anjalisingh", github: "anjalisingh" },
        },
        {
          name: "Srushti Makwana",
          position: "Domain Member",
          image: "/images/Srushti_Makwana_Data_Science.jpg",
          social: { instagram: "anjali_viz", linkedin: "anjalisingh", github: "anjalisingh" },
        },
      ],
    },
    "Data Stucture & Algorithms": {
      executives: [
        {
          name: "Bhargavi  Kulkarni",
          position: "Data Science & Algorithms Executive",
          image: "/images/Bhargavi_Kulkarni_DSA.png",
          social: { instagram: "vishal_data", linkedin: "vishalagarwal", github: "vishalagarwal" },
        },
        {
          name: "Gauri Garole",
          position: "Data Science & Algorithms Executive",
          image: "/images/Gauri_Garole_DSA.jpg",
          social: { instagram: "vishal_data", linkedin: "vishalagarwal", github: "vishalagarwal" },
        },
      ],
      members: [
        {
          name: "Chirag Bhoyar",
          position: "Domain Member",
          image: "/images/Chirag_Bhoyar_DSA.jpg",
          social: { instagram: "akash_analyst", linkedin: "akashgupta", github: "akashgupta" },
        },
        {
          name: "Pratik Ingole",
          position: "Domain Member",
          image: "/images/Pratik_Ingole_DSA.png",
          social: { instagram: "ritu_business", linkedin: "ritupatel", github: "ritupatel" },
        },
        {
          name: "Prathamesh Nistane",
          position: "Domain Member",
          image: "/images/Prathamesh_ Nistane_DSA.jpg",
          social: { instagram: "mohit_stats", linkedin: "mohitkumar", github: "mohitkumar" },
        },
        {
          name: "Rohit Datir",
          position: "Domain Member",
          image: "/images/Rohit_Datir_DSA.jpg",
          social: { instagram: "anjali_viz", linkedin: "anjalisingh", github: "anjalisingh" },
        },
      ],
    },
    "Cloud Computing": {
      executives: [
        {
          name: "Radhika Adhau",
          position: "Cloud Executive",
          image: "/images/Radhika_Adhau_Cloud_Computing.jpg",
          social: { instagram: "abhishek_cloud", linkedin: "abhishekjain", github: "abhishekjain" },
        },
        {
          name: "Hirek Warhekar",
          position:  "Cloud Executive",
          image: "/images/Hirek_Warhekar_Cloud_Computing.jpg",
          social: { instagram: "tanvi_cloud", linkedin: "tanvisharma", github: "tanvisharma" },
        },
      ],
      members: [],
    },
    "IoT (Internet of Things)": {
      executives: [
        {
          name: "Adnan Ahmad Rizwan Ahmad",
          position: "IoT Executive",
          image: "/images/ADNAN_AHMAD_IOT.jpg",
          social: { instagram: "karthik_iot", linkedin: "karthikreddy", github: "karthikreddy" },
        },
      ],
      members: [
        {
          name: "Yash Dhobale ",
          position: "Domain Member",
          image: "/images/Yash_dhoble_IOT.png",
          social: { instagram: "varun_hardware", linkedin: "varunkumar", github: "varunkumar" },
        },
        {
          name: "Smit Pathade",
          position: "Domain Member",
          image: "/images/Smit_Pathade_IOT.png",
          social: { instagram: "pallavi_embedded", linkedin: "pallavisingh", github: "pallavisingh" },
        },
        {
          name: "Kartik Akhade",
          position: "Domain Member",
          image: "/images/Kartik_Akhade_IOT.png",
          social: { instagram: "rohit_sensor", linkedin: "rohitverma", github: "rohitverma" },
        },
      ],
    },
    "Placement Preparation": {
      executives: [
        {
          name: "Shivani Bhure",
          position: "Placement Executive",
          image: "/images/Shivani_Bhure_Placement_Preparation.jpg",
          social: { instagram: "ankit_placement", linkedin: "ankitsharma", github: "ankitsharma" },
        },
      ],
      members: [
        {
          name: "Ayuti Pendhari",
          position: "Domain Member",
          image: "/images/Ayuti_ Pendhari_Placement_Preparation.png",
          social: { instagram: "saurabh_mentor", linkedin: "saurabhgupta", github: "saurabhgupta" },
        },
        {
          name: "Lekha Sedani",
          position: "Domain Member",
          image: "/images/Lekha_Sedani_Placement_Preperation.jpg",
          social: { instagram: "kriti_resume", linkedin: "kritisingh", github: "kritisingh" },
        },
        {
          name: "Pooja Ladhave",
          position: "Domain Member",
          image: "/images/Pooja_Ladhawe_Placement_Preparation.jpeg",
          social: { instagram: "mayank_coding", linkedin: "mayankkumar", github: "mayankkumar" },
        },
        {
          name: "Tanushka Mathurkar",
          position: "Domain Member",
          image: "/images/Tanushka_Mathurkar_Placement_ Preparation.png",
          social: { instagram: "simran_aptitude", linkedin: "simranjoshi", github: "simranjoshi" },
        },
      ],
    },
    "Social Media & Promotions": {
      executives: [],
      members: [
        {
          name: "Aditya Rathod",
          position: "Graphic Designer",
          image: "/images/Aditya_Rathod_Graphic_Designing.jpg",
          social: { instagram: "yash_content", linkedin: "yashagarwal", github: "yashagarwal" },
        },
        {
          name: "Arjun Solanke",
          position: "Graphic Designer",
          image: "/images/Arjun_Solanke_Graphic_Designer.jpg",
          social: { instagram: "nikita_design", linkedin: "nikitasingh", github: "nikitasingh" },
        },
        {
          name: "Om Charthal",
          position: "Photographer",
          image: "/images/Om_Charthal_Photography.jpg",
          social: { instagram: "harsh_video", linkedin: "harshkumar", github: "harshkumar" },
        },
        {
          name: "Nirbhay Shende",
          position: "Photographer",
          image: "/images/Nirbhay_ Shende_Social_media _&_PR.jpg",
          social: { instagram: "riya_marketing", linkedin: "riyapatel", github: "riyapatel" },
        },
        {
          name: "Maitreyee Patil",
          position: "Copy Writer",
          image: "/images/Maitreyee_Patil_Social_Media_&_PR.jpg",
          social: { instagram: "yash_content", linkedin: "yashagarwal", github: "yashagarwal" },
        },
        {
          name: "Sudhanshu Khakse",
          position: "Video Editor",
          image: "/images/1758606694268 - Sudhanshu Khakse.jpg",
          social: { instagram: "nikita_design", linkedin: "nikitasingh", github: "nikitasingh" },
        },
        {
          name: "Vedant Dange",
          position: "Video Editor",
          image: "/images/Vedant_Dange_Video_Editor.jpg",
          social: { instagram: "harsh_video", linkedin: "harshkumar", github: "harshkumar" },
        },
        {
          name: "Mohit Gadling",
          position: "Social Media & Public Relations",
          image: "/images/Mohit_Social_Media_&_PR.png",
          social: { instagram: "riya_marketing", linkedin: "riyapatel", github: "riyapatel" },
        },
        {
          name: "Rashmi Varma",
          position: "Social Media & Public Relations",
          image: "/images/Rashmi_Varma_Social_Media_&_PR.png",
          social: { instagram: "riya_marketing", linkedin: "riyapatel", github: "riyapatel" },
        },
        {
          name: "Shreya Somani",
          position: "Social Media & Public Relations",
          image: "/images/Shreya_Somani_Social_Media_PR.png",
          social: { instagram: "yash_content", linkedin: "yashagarwal", github: "yashagarwal" },
        },
        {
          name: "Vedant  Wankhade",
          position: "Social Media & Public Relations",
          image: "/images/Vedant_Wankhade_Social_Media_PR.png",
          social: { instagram: "nikita_design", linkedin: "nikitasingh", github: "nikitasingh" },
        },
      ],
    },
  }

  // const renderMemberCard = (member) => (
  //   <div
  //     key={member.name}
  //     className="bg-white rounded-xl p-6 text-center border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl group w-full max-w-[280px]"
  //   >
  //     <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
  //       <img
  //         src={member.image || "/placeholder.svg"}
  //         alt={member.name}
  //         className="w-full h-full object-cover"
  //       />
  //     </div>
  //     <h3 className="text-xl font-semibold text-gray-800 mb-2">
  //       {member.name}
  //     </h3>
  //     <p className="text-gray-600 mb-4 text-sm">{member.position}</p>

  //     <div className="flex justify-center gap-3">
  //       <a
  //         href={`https://linkedin.com/in/${member.social.linkedin}`}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
  //       >
  //         <Linkedin className="w-5 h-5 text-white" />
  //       </a>
  //       <a
  //         href={`https://github.com/${member.social.github}`}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-110"
  //       >
  //         <Github className="w-5 h-5 text-white" />
  //       </a>
  //     </div>
  //   </div>
  // )
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
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full">
        <GoogleParticlesCanvas />
      </div>
      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            The minds powering GDG on Campus x Coding Club at PRMITR
          </p>
        </div>
      </section>

      {/* Leads Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Leads
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {leads.map((lead) => renderMemberCard(lead))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Core Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {coreTeam.map((member) => renderMemberCard(member))}
          </div>
        </div>
      </section>

      {/* Domain Teams */}
      {Object.entries(domains).map(([domainName, domainData]) => (
        <section key={domainName} className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {domainName}
              </h2>

              {/* Domain Executives */}
              {domainData.executives.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">
                    Domain Executives
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {domainData.executives.map((exec) => renderMemberCard(exec))}
                  </div>
                </div>
              )}

              {/* Domain Members */}
              {domainData.members.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">
                    Domain Members
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {domainData.members.map((member) => renderMemberCard(member))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  )
}