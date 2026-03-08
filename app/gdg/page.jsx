"use client";

import React from "react";
import MemberCard from "@/components/member.card.component";

export default function GdgCodingClubPage() {
  const leads = [
    {
      name: "Sneha Giri",
      position: "Coding Club Lead",
      image: "/images/Sneha_Giri_Coding_Club.jpg",
      social: {
        instagram: "NA",
        linkedin: "sneha-giri-764700292",
        github: "sneha-giri330",
      },
    },
    {
      name: "Lavannya Deshpande",
      position: "Coding Club Co-Lead",
      image: "/images/Lavannya_Deshpande_Coding_Club.png",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
    {
      name: "Vedant Mali",
      position: "GDGoC Organizer",
      image: "/images/Vedant_Mali_Organiser.png",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
  ];

  const coreTeam = [
    {
      name: "Parth Deshmukh",
      position: "Core Committee",
      image: "/images/Parth_Deshmukh_Core_Team.png",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
    {
      name: "Sarang Mahore",
      position: "Core Committee",
      image: "/images/Sarang_Mahore_Core_Team.jpg",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
    {
      name: "Shruti Raju Misal",
      position: "Core Committee",
      image: "/images/Shruti_Misal_Core_Team.jpg",
      social: {
        instagram: "NA",
        linkedin: "shruti-raju-misal-a1636b25a",
        github: "Shruti2010",
      },
    },
    {
      name: "Tanvi Markad",
      position: "Core Committee",
      image: "/images/Tanvi_Markad_Core_Team.jpg",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
    {
      name: "Tanvi Watane",
      position: "Core Committee",
      image: "/images/Tanvi_Watane_Core_Team.jpg",
      social: {
        instagram: "NA",
        linkedin: "NA",
        github: "NA",
      },
    },
  ];

  const domains = {
    "Web Development": {
      executives: [
        {
          name: "Ninad Vaidya",
          position: "Web Dev Executive",
          image: "/images/Ninad_Vaidya_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Riya Umekar",
          position: "Web Dev Executive",
          image: "/images/Riya_Umekar_Web_Development.jpeg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
      ],
      members: [
        {
          name: "Amruta Topale",
          position: "Domain Member",
          image: "/images/Amruta_Tople_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "amruta-topale-84375231b",
            github: "Amruta907",
          },
        },
        {
          name: "Bhaumik Dhore",
          position: "Domain Member",
          image: "/images/Bhaumik_Dhore_Web_Development.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Harshal Gunjarkar",
          position: "Domain Member",
          image: "/images/Harshal_Gunjarkar_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Kartik Shriwas",
          position: "Domain Member",
          image: "/images/Kartik_Shriwas_Web.jpg",
          social: {
            instagram: "NA",
            linkedin: "kartikshriwas",
            github: "kartikshriwas",
          },
        },
        {
          name: "Krishna Mastud",
          position: "Domain Member",
          image: "/images/Krishna_Mastud_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Rohit Gupta",
          position: "Domain Member",
          image: "/images/Rohit_Gupta_Web_Developement.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Shruti Raut",
          position: "Domain Member",
          image: "/images/Shruti_Raut_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Vedant Deshmukh",
          position: "Domain Member",
          image: "/images/Vedant_Deshmukh_Web_Dev.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Vedant Payghan",
          position: "Domain Member",
          image: "/images/Vedant_Payghan_Web_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
      ],
    },
    "AI/ML": {
      executives: [
        {
          name: "Harshal Alaspure",
          position: "AI/ML Executive",
          image: "/images/Harshal_Alaspure_AIML.jpg",
          social: {
            instagram: "NA",
            linkedin: "harshal-alaspure-36b057291",
            github: "HarshalAl02",
          },
        },
        {
          name: "Krushna Mohod",
          position: "AI/ML Executive",
          image: "/images/Krushna_Mohod_AIML.jpeg",
          social: {
            instagram: "mr_patil_37",
            linkedin: "krushna-mohod-5076a128a",
            github: "krushnamohod",
          },
        },
      ],
      members: [
        {
          name: "Abhang Vyawhare",
          position: "Domain Member",
          image: "/images/Abhang_Vyawhare_AIML.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Kaushik Tayde",
          position: "Domain Member",
          image: "/images/Kaushik_Tayde_AIML.png",
          social: {
            instagram: "kaushik_tayde45",
            linkedin: "kaushik-tayde-055a31290",
            github: "Kaushik-Tayde",
          },
        },
        {
          name: "Rashika  Gangraj",
          position: "Domain Member",
          image: "/images/Rashika_Gangraj_AIML.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Rutvik Bele",
          position: "Domain Member",
          image: "/images/Rutvik_Bele_ALML.png",
          social: {
            instagram: "rutvik_bele07",
            linkedin: "rutvik-bele",
            github: "Rutvik-Bele",
          },
        },
      ],
    },
    "App Development": {
      executives: [
        {
          name: "Ayush Waghade",
          position: "App Dev Executive",
          image: "/images/Ayush_Waghade_App_Development.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Pranav Rajput ",
          position: "App Dev Executive",
          image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
          social: {
            instagram: "pranav____rajput",
            linkedin: "pranav-rajput-9bb446244",
            github: "24-Pranav",
          },
        },
      ],
      members: [
        {
          name: "Anand Kakad",
          position: "Domain Member",
          image: "/images/Anand_Kakad_App_Development.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Anurag Deshmukh",
          position: "Domain Member",
          image: "/images/Anurag_Deshmukh_App_Development.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Krupa Sawarkar",
          position: "Domain Member",
          image: "/images/Krupa_Sawarkar_App_Development - Krupa Sawarkar.jpg",
          social: {
            instagram: "NA",
            linkedin: "krupa-sawarkar-b808ba322",
            github: "krupasawarkar630",
          },
        },
      ],
    },
    "Cloud Computing": {
      executives: [
        {
          name: "Radhika Adhau",
          position: "Cloud Executive",
          image: "/images/Radhika_Adhau_Cloud_Computing.jpg",
          social: {
            instagram: "NA",
            linkedin: "radhika-adhau-71baa0290",
            github: "RadhikaAdhau0708",
          },
        },
      ],
      members: [
        {
          name: "Atharv Kakade",
          position: "Domain Member",
          image: "/images/Atharv_Kakade_Cloud_Computing.jpg",
          social: {
            instagram: "atharv__k_7",
            linkedin: "atharv-kakade-779b1a290",
            github: "Atharvkakade2005",
          },
        },
        {
          name: "Hirek Warhekar",
          position: "Domain Member",
          image: "/images/Hirek_Warhekar_Cloud_Computing.jpg",
          social: {
            instagram: "hirek.18",
            linkedin: "hirek-warhekar-5a1b14290",
            github: "hirek18",
          },
        },
        {
          name: "Manjiri Jawarkar",
          position: "Domain Member",
          image: "/images/Manjiri_Jawarkar_Cloud_Computing.jpg",
          social: {
            instagram: "manjiriiii_17",
            linkedin: "manjiri-jawarkar-b86a01342",
            github: "Manjiri699",
          },
        },
        {
          name: "Sharvil Wange",
          position: "Domain Member",
          image: "/images/Sharvil_Wange_Cloud_Computing.jpg",
          social: {
            instagram: "Na",
            linkedin: "sharvil-wange-618b17290",
            github: "Na",
          },
        },
      ],
    },
    "Data Science": {
      executives: [
        {
          name: "Aryan Bute",
          position: "Data Science Executive",
          image: "/images/Aryan_Bute_Data_Science.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
      ],
      members: [
        {
          name: "Devendra Deshmukh",
          position: "Domain Member",
          image: "/images/Devendra_Deshmukh_Data_Science.jpg",
          social: {
            instagram: "NA",
            linkedin: "devendra-deshmukh-7a330b320",
            github: "Devendra0655",
          },
        },
        {
          name: "Dnyandeep Bendewar",
          position: "Domain Member",
          image: "/images/Dnyandeep_Bendewar_Data_Science.jpg",
          social: {
            instagram: "NA",
            linkedin: "dnyandeep-bendewar-2325b8290",
            github: "dnyandeep-bendewar",
          },
        },
        {
          name: "Harshad  Badge",
          position: "Domain Member",
          image: "/images/Harshad_Badge_Data_Science.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Ishita Rathi",
          position: "Domain Member",
          image: "/images/Ishita_Rathi_Data_Science - Ishita Rathi.png",
          social: {
            instagram: "NA",
            linkedin: "ishita-rathi-9b180230a",
            github: "ishita2740",
          },
        },
        {
          name: "Srushti Makwana",
          position: "Domain Member",
          image: "/images/Srushti_Makwana_Data_Science.jpg",
          social: {
            instagram: "srushtie_11",
            linkedin: "srushti-makwana-5a560b30b",
            github: "SrushtiMakwana",
          },
        },
      ],
    },
    "Data Stucture & Algorithms": {
      executives: [
        {
          name: "Bhargavi  Kulkarni",
          position: "Data Science & Algorithms Executive",
          image: "/images/Bhargavi_Kulkarni_DSA.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Gauri Garole",
          position: "Data Science & Algorithms Executive",
          image: "/images/Gauri_Garole_DSA.jpg",
          social: {
            instagram: "NA",
            linkedin: "gauri-garole-a96411256",
            github: "gaurigarole",
          },
        },
      ],
      members: [
        {
          name: "Chirag Bhoyar",
          position: "Domain Member",
          image: "/images/Chirag_Bhoyar_DSA.jpg",
          social: {
            instagram: "NA",
            linkedin: "chirag-bhoyar-5495b5290",
            github: "chiragbhoyar004",
          },
        },
        {
          name: "Prathamesh Nistane",
          position: "Domain Member",
          image: "/images/Prathamesh_ Nistane_DSA.jpg",
          social: {
            instagram: "prathamesh_nistane",
            linkedin: "pprathameshnistanee-693058291",
            github: "prathamesh-it",
          },
        },
        {
          name: "Pratik Ingole",
          position: "Domain Member",
          image: "/images/Pratik_Ingole_DSA.png",
          social: {
            instagram: "pratik_ingole.45",
            linkedin: "pratik-ingole",
            github: "PratikIngole45",
          },
        },
        {
          name: "Rohit Datir",
          position: "Domain Member",
          image: "/images/Rohit_Datir_DSA.jpg",
          social: {
            instagram: "NA",
            linkedin: "rohit-datir",
            github: "NA",
          },
        },
      ],
    },
    "IoT (Internet of Things)": {
      executives: [
        {
          name: "Adnan Ahmad ",
          position: "IoT Executive",
          image: "/images/ADNAN_AHMAD_IOT.jpg",
          social: {
            instagram: "NA",
            linkedin: "adnanrahmad",
            github: "adnanaskh",
          },
        },
      ],
      members: [
        {
          name: "Kartik Akhade",
          position: "Domain Member",
          image: "/images/Kartik_Akhade_IOT.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Smit Pathade",
          position: "Domain Member",
          image: "/images/Smit_Pathade_IOT.png",
          social: {
            instagram: "smit_576",
            linkedin: "smit-pathade-112b46315",
            github: "Smit576",
          },
        },
        {
          name: "Yash Dhobale ",
          position: "Domain Member",
          image: "/images/Yash_dhoble_ IOT.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
      ],
    },
    "Placement Preparation": {
      executives: [
        {
          name: "Shivani Bhure",
          position: "Placement Executive",
          image: "/images/Shivani_Bhure_Placement_Preparation.jpg",
          social: {
            instagram: "NA",
            linkedin: "shivani-bhure-80b144286",
            github: "Shivanibhure",
          },
        },
      ],
      members: [
        {
          name: "Ayuti Pendhari",
          position: "Domain Member",
          image: "/images/Ayuti_ Pendhari_Placement_Preparation.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Lekha Sedani",
          position: "Domain Member",
          image: "/images/Lekha_Sedani_Placement_Preperation.jpg",
          social: {
            instagram: "NA",
            linkedin: "lekhasedani",
            github: "Lekhasedani15",
          },
        },
        {
          name: "Pooja Ladhave",
          position: "Domain Member",
          image: "/images/Pooja_Ladhawe_Placement_Preparation.jpeg",
          social: {
            instagram: "pooja_123268",
            linkedin: "pooja-ladhawe-4a460a290",
            github: "ladhawepooja",
          },
        },
        {
          name: "Tanushka Mathurkar",
          position: "Domain Member",
          image: "/images/Tanushka_Mathurkar_Placement_ Preparation.png",
          social: {
            instagram: "402.tanushka_mathurkar",
            linkedin: "tanushka-mathurkar",
            github: "TANUSHKAUMESHMATHURKAR",
          },
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
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Arjun Solanke",
          position: "Graphic Designer",
          image: "/images/Arjun_Solanke_Graphic_Designer.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Maitreyee Patil",
          position: "Copy Writer",
          image: "/images/Maitreyee_Patil_Social_Media_&_PR.jpg",
          social: {
            instagram: "NA",
            linkedin: "maitreyee-patil-617mp",
            github: "NA",
          },
        },
        {
          name: "Nirbhay Shende",
          position: "Photographer",
          image: "/images/Nirbhay_ Shende_Social_media _&_PR.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Om Charthal",
          position: "Photographer",
          image: "/images/Om_Charthal_Photography.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Mohit Gadling",
          position: "Social Media & Public Relations",
          image: "/images/Mohit_Social_Media_&_PR.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Arya Raut",
          position: "Social Media & Public Relations",
          image: "/images/aryarautsocialmedia.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Shreya Somani",
          position: "Social Media & Public Relations",
          image: "/images/Shreya_Somani_Social_Media_PR.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Vedant  Wankhade",
          position: "Social Media & Public Relations",
          image: "/images/Vedant_Wankhade_Social_Media_PR.png",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Sudhanshu Khakse",
          position: "Video Editor",
          image: "/images/1758606694268 - Sudhanshu Khakse.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
        {
          name: "Vedant Dange",
          position: "Video Editor",
          image: "/images/Vedant_Dange_Video_Editor.jpg",
          social: {
            instagram: "NA",
            linkedin: "NA",
            github: "NA",
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden">
      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center relative">
          {/* Logo */}
          <div className="absolute top-0 right-6 md:right-8">
            <img
              src="/logo/logo-gdg.png"
              alt="Google Developer Group Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            The minds powering GDGOC x Coding CLub on Campus at PRMITR
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
            {leads.map((lead) => (
              <MemberCard key={lead.name} {...lead} />
            ))}
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
            {coreTeam.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Domain Teams */}
      {Object.entries(domains).map(([domainName, domainData]) => (
        <section key={domainName} id={domainName.toLowerCase().replace(/\s+/g, "-")} className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white/10 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-coding-club-logo-gradient-start to-coding-club-logo-gradient-end bg-clip-text text-transparent">
                {domainName}
              </h2>

              {/* Domain Executives */}
              {domainData.executives.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">
                    Domain Executives
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {domainData.executives.map((exec) => (
                      <MemberCard key={exec.name} {...exec} />
                    ))}
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
                    {domainData.members.map((member) => (
                      <MemberCard key={member.name} {...member} />
                    ))}
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
  );
}
