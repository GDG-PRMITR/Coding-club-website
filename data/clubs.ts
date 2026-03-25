export interface Person {
  name: string;
  role?: string;
  photo?: string;
}

export interface SubClub {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  description: string;
  color: string;
  website?: string;
  lead?: Person;
  organizer?: Person;
  instructor?: Person;
  coordinators?: Person[];
  teachingAssistants?: Person[];
  subTeams?: {
    name: string;
    members: Person[];
  }[];
}

export const clubs = {
  mainClub: {
    id: "coding-club",
    name: "PRMITR Coding Club",
    logo: "/Coding-Club.png",
    description:
      "A vibrant community of developers, innovators, and tech enthusiasts dedicated to learning, building, and growing together.",
    lead: {
      name: "Sneha Giri",
      role: "Coding Club Lead",
      photo: "/images/Sneha_Giri_Coding_Club.jpg",
    },
    coLead: {
      name: "Lavanya Deshpande",
      role: "Coding Club Co-Lead",
      photo: "/images/Lavannya_Deshpande_Coding_Club.png",
    },
    mission: "To foster innovation, collaboration, and technical excellence among students.",
    vision: "Building tomorrow's tech leaders today.",
    founded: 2022,
  },
  subClubs: [
    {
      id: "gdg",
      name: "Google Developer Group (GDGoC)",
      shortName: "GDG On Campus",
      logo: "/logo/logo-gdg.png",
      organizer: {
        name: "Vedant Mali",
        role: "GDGoC Organizer",
        photo: "/images/Vedant_Mali_Organiser.png",
      },
      description: "Learn Google technologies, connect with developers, and grow your skills.",
      color: "#4285F4",
      website: "https://gdg.community.dev",
    },
    {
      id: "gsa",
      name: "Google Student Ambassador",
      shortName: "GSA",
      logo: "/logo/logo-gsac.png",
      lead: {
        name: "Adnan Ahmad",
        role: "GSA Lead & GSA Head",
        photo: "/images/ADNAN_AHMAD_IOT.jpg",
      },
      description:
        "Student-led initiative to promote Google technologies and build campus tech communities.",
      color: "#EA4335",
      subTeams: [
        {
          name: "Team GenAI",
          members: [
            { name: "Yash Dhoble", photo: "/images/Yash_dhoble_ IOT.png" },
            { name: "Anurag Deshmukh", photo: "/images/Anurag_Deshmukh_App_Development.png" },
            { name: "Radha Waghmare", photo: "/GSA-images/Radha-GSA.jpg" },
          ],
        },
        {
          name: "Team WebTech",
          members: [
            { name: "Ninad Vaidya", photo: "/images/Ninad_Vaidya_Web_Development.jpg" },
            { name: "Kaushal Patel", photo: "/GSA-images/Kaushal-GSA.jpg" },
          ],
        },
      ],
    },
    {
      id: "cisco",
      name: "Cisco Club",
      logo: "/logo/logo-cisco.jpg",
      description: "Learn networking, cybersecurity, and infrastructure through Cisco technologies.",
      coordinators: [
        { name: "Prof. C.N. Deshmukh", role: "Cisco Coordinator" },
        { name: "Dr. A.A. Chaudhari", role: "Cisco Coordinator" },
        { name: "Dr. G.R. Bamnote", role: "Cisco Co-Coordinator" },
      ],
      website: "https://cisco.prmitr.in",
      color: "#001A6E",
    },
    {
      id: "nvidia",
      name: "NVIDIA Club",
      logo: "/logo/logo-nvidia.jpg",
      description: "Dive into AI, GPU computing, and cutting-edge NVIDIA technologies.",
      instructor: {
        name: "Dr. Roshan .R. Karwa",
        role: "NVIDIA Instructor & Ambassador",
        photo: "https://mitra.ac.in/images/faculty_profile/CSE/32.jpg",
      },
      teachingAssistants: [
        {
          name: "Tejas Nikose",
          role: "NVIDIA Teaching Assistant",
          photo: "/nvidia/TA/tejas-nikose.jpg",
        },
        {
          name: "Prathmesh Yende",
          role: "NVIDIA Teaching Assistant",
          photo: "/nvidia/TA/prathamesh-yende.jpg",
        },
      ],
      color: "#76B900",
    },
  ] as SubClub[],
};
