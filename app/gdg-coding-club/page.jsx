
"use client"

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
          position: "Frontend Developer",
          image: "/images/Rohit_Gupta_Web_Developement.png",
          social: { instagram: "amit_frontend", linkedin: "amitverma", github: "amitverma" },
        },
        {
          name: "Vedant Deshmukh",
          position: "Backend Developer",
          image: "/images/Vedant_Deshmukh_Web_Dev.png",
          social: { instagram: "neha_backend", linkedin: "nehagupta", github: "nehagupta" },
        },
        {
          name: "Vedant Payghan",
          position: "Full Stack Developer",
          image: "/images/Vedant_Payghan_Web_Development.jpg",
          social: { instagram: "vikash_fullstack", linkedin: "vikashsingh", github: "vikashsingh" },
        },
        {
          name: "Bhaumik Dhore",
          position: "UI/UX Developer",
          image: "/images/Bhaumik_Dhore_Web_Development.png",
          social: { instagram: "pooja_uiux", linkedin: "poojasharma", github: "poojasharma" },
        },
        {
          name: "Kartik Shriwas",
          position: "React Developer",
          image: "/images/Kartik_Shriwas_Web.jpg",
          social: { instagram: "ravi_react", linkedin: "ravikumar", github: "ravikumar" },
        },
        {
          name: "Shruti Raut",
          position: "Vue.js Developer",
          image: "/images/Shruti_Raut_Web_Development.jpg",
          social: { instagram: "divya_vue", linkedin: "divyapatel", github: "divyapatel" },
        },
        {
          name: "Amruta Topale",
          position: "Angular Developer",
          image: "/images/Amruta_Tople_Web_Development.jpg",
          social: { instagram: "suresh_angular", linkedin: "sureshyadav", github: "sureshyadav" },
        },
        {
          name: "Krishna Mastud",
          position: "Node.js Developer",
          image: "/images/Krishna_Mastud_Web_Development.jpg",
          social: { instagram: "kavya_node", linkedin: "kavyareddy", github: "kavyareddy" },
        },
        {
          name: "Harshal Gunjarkar",
          position: "PHP Developer",
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
          position: "Android Developer",
          image: "/images/Anand_Kakad_App_Development.jpg",
          social: { instagram: "nikhil_android", linkedin: "nikhiljain", github: "nikhiljain" },
        },
        {
          name: "Anurag Deshmukh",
          position: "iOS Developer",
          image: "/images/Anurag_Deshmukh_App_Development.png",
          social: { instagram: "ritika_ios", linkedin: "ritikasingh", github: "ritikasingh" },
        },
        {
          name: "Krupa Sawarkar",
          position: "Flutter Developer",
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
          position: "Data Scientist",
          image: "/images/Abhang_Vyawhare_AIML.png",
          social: { instagram: "rajesh_data", linkedin: "rajeshkumar", github: "rajeshkumar" },
        },
        {
          name: "Kaushik Tayde",
          position: "ML Engineer",
          image: "/images/Kaushik_Tayde_AIML.png",
          social: { instagram: "meera_ml", linkedin: "meerajoshi", github: "meerajoshi" },
        },
        {
          name: "Rashika  Gangraj",
          position: "AI Researcher",
          image: "/images/Rashika_Gangraj_AIML.png",
          social: { instagram: "sanjay_ai", linkedin: "sanjayverma", github: "sanjayverma" },
        },
        {
          name: "Rutvik Bele",
          position: "Deep Learning Specialist",
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
          position: "Data Analyst",
          image: "/images/Dnyandeep_Bendewar_Data_Science.jpg",
          social: { instagram: "akash_analyst", linkedin: "akashgupta", github: "akashgupta" },
        },
        {
          name: "Devendra Deshmukh",
          position: "Business Analyst",
          image: "/images/Devendra_Deshmukh_Data_Science.jpg",
          social: { instagram: "ritu_business", linkedin: "ritupatel", github: "ritupatel" },
        },
        {
          name: "Harshad  Badge",
          position: "Statistical Analyst",
          image: "/images/Harshad_Badge_Data_Science.jpg",
          social: { instagram: "mohit_stats", linkedin: "mohitkumar", github: "mohitkumar" },
        },
        {
          name: "Ishita Rathi",
          position: "Data Visualization Specialist",
          image: "/images/Ishita_Rathi_Data_Science - Ishita Rathi.png",
          social: { instagram: "anjali_viz", linkedin: "anjalisingh", github: "anjalisingh" },
        },
        {
          name: "Srushti Makwana",
          position: "Data Visualization Specialist",
          image: "/images/Srushti_Makwana_Data_Science.jpg",
          social: { instagram: "anjali_viz", linkedin: "anjalisingh", github: "anjalisingh" },
        },
      ],
    },
    // "AI/ML": {
    //   executives: [
    //     {
    //       name: "Krushna Mohod",
    //       position: "AI/ML Executive",
    //       image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "aditya_ai", linkedin: "adityasharma", github: "adityasharma" },
    //     },
    //     {
    //       name: "Harshal Alaspure",
    //       position: "AI/ML Executive",
    //        image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "nisha_ml", linkedin: "nishapatel", github: "nishapatel" },
    //     },
    //   ],
    //   members: [
    //     {
    //       name: "Abhang Vyawhare",
    //       position: "Data Scientist",
    //         image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "rajesh_data", linkedin: "rajeshkumar", github: "rajeshkumar" },
    //     },
    //     {
    //       name: "Kaushik Tayde",
    //       position: "ML Engineer",
    //     image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "meera_ml", linkedin: "meerajoshi", github: "meerajoshi" },
    //     },
    //     {
    //       name: "Rashika  Gangraj",
    //       position: "AI Researcher",
    //        image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "sanjay_ai", linkedin: "sanjayverma", github: "sanjayverma" },
    //     },
    //     {
    //       name: "Rutvik Bele",
    //       position: "Deep Learning Specialist",
    //       image: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    //       social: { instagram: "priyanka_dl", linkedin: "priyankasingh", github: "priyankasingh" },
    //     },
    //   ],
    // },
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
          position: "Data Analyst",
          image: "/images/Chirag_Bhoyar_DSA.jpg",
          social: { instagram: "akash_analyst", linkedin: "akashgupta", github: "akashgupta" },
        },
        {
          name: "Pratik Ingole",
          position: "Business Analyst",
              image: "/images/Pratik_Ingole_DSA.png",
          social: { instagram: "ritu_business", linkedin: "ritupatel", github: "ritupatel" },
        },
        {
          name: "Prathamesh Nistane",
          position: "Statistical Analyst",
             image: "/images/Prathamesh_ Nistane_DSA.jpg",
          social: { instagram: "mohit_stats", linkedin: "mohitkumar", github: "mohitkumar" },
        },
        {
          name: "Rohit Datir",
          position: "Data Visualization Specialist",
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
          position: "Cloud Domain Member",
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
          position: "Hardware Engineer",
        image:"/images/Yash_dhoble_IOT.png",
          social: { instagram: "varun_hardware", linkedin: "varunkumar", github: "varunkumar" },
        },
        {
          name: "Smit Pathade",
          position: "Embedded Systems Developer",
    image: "/images/Smit_Pathade_IOT.png",
          social: { instagram: "pallavi_embedded", linkedin: "pallavisingh", github: "pallavisingh" },
        },
        {
          name: "Kartik Akhade",
          position: "Sensor Specialist",
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
        {
          name: "Deepika Patel",
          position: "Placement Executive",
          image: "/images/Deepika_Patel_Placement_Preparation.jpg",
          social: { instagram: "deepika_placement", linkedin: "deepikapatel", github: "deepikapatel" },
        },
      ],
      members: [
        {
          name: "Ayuti Pendhari",
          position: "Interview Mentor",
          image: "/images/Ayuti_ Pendhari_Placement_Preparation.png",
          social: { instagram: "saurabh_mentor", linkedin: "saurabhgupta", github: "saurabhgupta" },
        },
        {
          name: "Lekha Sedani",
          position: "Resume Specialist",
         image: "/images/Lekha_Sedani_Placement_Preperation.jpg",
          social: { instagram: "kriti_resume", linkedin: "kritisingh", github: "kritisingh" },
        },
        {
          name: "Pooja Ladhave",
          position: "Coding Mentor",
          image: "/images/Pooja_Ladhawe_Placement_Preparation.jpeg",
          social: { instagram: "mayank_coding", linkedin: "mayankkumar", github: "mayankkumar" },
        },
        {
          name: "Tanushka Mathurkar",
          position: "Aptitude Trainer",
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
        // {
        //   name: "Pratik wankhade",
        //   position: "Photographer",
        //   image: "/images/Arjun_Solanke_Graphic_Designer.jpg",
        //   social: { instagram: "riya_marketing", linkedin: "riyapatel", github: "riyapatel" },
        // },
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

        <a
          href={`https://linkedin.com/in/${member.social.linkedin}`}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href={`https://github.com/${member.social.github}`}
          className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-colors duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  )

return (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <div className="fixed inset-0 w-full h-full">
      <GoogleParticlesCanvas />
    </div>

    {/* Header */}
    <section id="header" className="relative pt-32 pb-20 px-6 z-10">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">Meet Our Team</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
          The minds powering GDG on Campus x Coding Club at PRMITR
        </p>
      </div>
    </section>

    {/* Leads Section */}
    <section id="leads" className="relative py-20 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Leads</h2>
        {/* We will use our new, consistent grid here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leads.map((lead, index) => renderMemberCard(lead, index))}
        </div>
      </div>
    </section>

    {/* Core Team Section */}
    <section id="core-team" className="relative py-20 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Core Team</h2>
        {/* We use the SAME consistent grid here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {coreTeam.map((member, index) => renderMemberCard(member, index))}
        </div>
      </div>
    </section>

    {/* Domain Teams */}
    {Object.entries(domains).map(([domainName, domainData]) => (
      <section
        key={domainName}
        id={domainName.toLowerCase().replace(/\s+/g, "-")}
        className="relative py-20 px-6 z-10"
      >
        <div className="container mx-auto max-w-6xl [#3b4a5a]/50 backdrop-blur-md border border-blue/20 rounded-xl shadow-lg p-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">{domainName}</h2>

          {/* Domain Executives */}
          {domainData.executives.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center mb-8 text-muted-foreground">Domain Executives</h3>
              {/* CHANGE: Replaced 'flex flex-wrap' with our consistent 'grid' */}
              <div className="flex flex-wrap justify-center gap-8">
                {domainData.executives.map((exec, index) => renderMemberCard(exec, index))}
              </div>
            </div>
          )}

          {/* Domain Members */}
          {domainData.members.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-center mb-8 text-muted-foreground">Domain Members</h3>
              {/* CHANGE: Replaced 'flex flex-wrap' with our consistent 'grid' */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {domainData.members.map((member, index) => renderMemberCard(member, index))}
              </div>
            </div>
          )}
        </div>
      </section>
    ))}
  </div>
)
}
