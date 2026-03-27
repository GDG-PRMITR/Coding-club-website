import { faculty } from "./faculty";

export interface TeamMember {
  name: string;
  role?: string;
  position?: string;
  photo: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  executives?: TeamMember[];
  members?: TeamMember[];
  roles?: TeamMember[];
}

export const domains: Domain[] = [
  {
    id: "web-dev",
    name: "Web Development",
    description: "Build responsive, scalable web applications with modern technologies.",
    executives: [
      { name: "Ninad Vaidya", role: "Web Dev Executive", photo: "/images/team/ninad-vaidya.jpg" },
      { name: "Riya Umekar", role: "Web Dev Executive", photo: "/images/team/riya-umekar.jpg" },
    ],
    members: [
      { name: "Amruta Topale", photo: "/images/team/amruta-topale.jpg" },
      { name: "Kartik Shriwas", photo: "/images/team/kartik-shriwas.jpg" },
      { name: "Rohit Gupta", photo: "/images/team/rohit-gupta.jpg" },
    ],
  },
  {
    id: "ai-ml",
    name: "AI/ML",
    description: "Explore artificial intelligence and machine learning technologies.",
    executives: [
      {
        name: "Harshal Alaspure",
        role: "AI/ML Executive",
        photo: "/images/team/harshal-alaspure.jpg",
      },
      { name: "Krushna Mohod", role: "AI/ML Executive", photo: "/images/team/krushna-mohod.jpg" },
    ],
    members: [
      { name: "Abhang Vyawhare", photo: "/images/team/abhang-vyawhare.jpg" },
      { name: "Kaushik Tayde", photo: "/images/team/kaushik-tayde.jpg" },
    ],
  },
  {
    id: "app-dev",
    name: "App Development",
    description: "Create mobile and cross-platform applications.",
    executives: [
      { name: "Ayush Waghade", role: "App Dev Executive", photo: "/images/team/ayush-waghade.jpg" },
      { name: "Pranav Rajput", role: "App Dev Executive", photo: "/images/team/pranav-rajput.jpg" },
    ],
    members: [{ name: "Anand Kakad", photo: "/images/team/anand-kakad.jpg" }],
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description: "Master cloud platforms and distributed systems.",
    executives: [{ name: "Radhika Adhau", role: "Cloud Executive", photo: "/images/team/radhika-adhau.jpg" }],
    members: [{ name: "Atharv Kakade", photo: "/images/team/atharv-kakade.jpg" }],
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyze data and extract meaningful insights.",
    executives: [{ name: "Aryan Bute", role: "Data Science Executive", photo: "/images/team/aryan-bute.jpg" }],
    members: [{ name: "Ishita Rathi", photo: "/images/team/ishita-rathi.jpg" }],
  },
  {
    id: "dsa",
    name: "Data Structure & Algorithms",
    description: "Master fundamental computer science concepts.",
    executives: [
      { name: "Bhargavi Kulkarni", role: "DSA Executive", photo: "/images/team/bhargavi-kulkarni.jpg" },
      { name: "Gauri Garole", role: "DSA Executive", photo: "/images/team/gauri-garole.jpg" },
    ],
    members: [{ name: "Chirag Bhoyar", photo: "/images/team/chirag-bhoyar.jpg" }],
  },
  {
    id: "iot",
    name: "IoT (Internet of Things)",
    description: "Build connected smart devices and systems.",
    executives: [{ name: "Adnan Ahmad", role: "IoT Executive", photo: "/images/team/adnan-ahmad.jpg" }],
    members: [{ name: "Kartik Akhade", photo: "/images/team/kartik-akhade.jpg" }],
  },
  {
    id: "placement",
    name: "Placement Preparation",
    description: "Prepare for interviews and land your dream job.",
    executives: [
      { name: "Shivani Bhure", role: "Placement Executive", photo: "/images/team/shivani-bhure.jpg" },
    ],
    members: [{ name: "Ayuti Pendhari", photo: "/images/team/ayuti-pendhari.jpg" }],
  },
  {
    id: "social-media",
    name: "Social Media & Promotions",
    description: "Share our story and connect with the community.",
    roles: [
      { name: "Aditya Rathod", position: "Graphic Designer", photo: "/images/team/aditya-rathod.jpg" },
      { name: "Arjun Solanke", position: "Graphic Designer", photo: "/images/team/arjun-solanke.jpg" },
      { name: "Maitreyee Patil", position: "Copy Writer", photo: "/images/team/maitreyee-patil.jpg" },
    ],
  },
  {
    id: "community",
    name: "Community",
    description: "Build culture, events, and networking opportunities.",
    executives: [{ name: "Parth Deshmukh", role: "Core Committee", photo: "/images/team/parth-deshmukh.jpg" }],
    members: [{ name: "Tanvi Markad", photo: "/images/team/tanvi-markad.jpg" }],
  },
  {
    id: "cisco",
    name: "Cisco Networking Club",
    description: "Master networking fundamentals, cybersecurity, and enterprise technologies through hands-on labs and certifications.",
    executives: [
      { name: "Jay Jadhao", role: "Web Dev Lead", photo: "/images/team/jay-jadhao.jpg" },
      { name: "Riddhi Akhare", role: "Web Dev Lead", photo: "/images/team/riddhi-akhare.jpg" },
      { name: "Atharv Borkar", role: "Management Lead", photo: "/images/team/atharv-borkar.jpg" },
      { name: "Gunjan Pachpohar", role: "AI/Data Science Lead", photo: "/images/team/gunjan-pachpohar.jpg" },
      { name: "Apurva Kadu", role: "Cybersecurity Lead", photo: "/images/team/apurva-kadu.jpg" },
      { name: "Rahul Kharap", role: "Networking Lead", photo: "/images/team/rahul-kharap.jpg" },
      { name: "Lajari Pawanikar", role: "Creative Lead", photo: "/images/team/lajari-pawanikar.jpg" },
      { name: "Soham Ingole", role: "Creative Lead", photo: "/images/team/soham-ingole.jpg" },
    ],
    members: [
      // Management
      { name: "Vedavati Joshi", role: "Management", photo: "/images/team/vedavati-joshi.jpg" },
      { name: "Sameer Mujawar", role: "Management", photo: "/images/team/sameer-mujawar.jpg" },
      // Web Development
      { name: "Advaith Hegde", role: "Web Development", photo: "/images/team/advaith-hegde.jpg" },
      { name: "Kanan Puri", role: "Web Development", photo: "/images/team/kanan-puri.jpg" },
      { name: "Diya Kadam", role: "Web Development", photo: "/images/team/diya-kadam.jpg" },
      // AI/Data Science
      { name: "Yash Phalke", role: "AI/Data Science", photo: "/images/team/yash-phalke.jpg" },
      { name: "Divya Soni", role: "AI/Data Science", photo: "/images/team/divya-soni.jpg" },
      { name: "Arjun Nair", role: "AI/Data Science", photo: "/images/team/arjun-nair.jpg" },
      // Cybersecurity
      { name: "Anushka Vishwakarma", role: "Cybersecurity", photo: "/images/team/anushka-vishwakarma.jpg" },
      { name: "Neha Sharma", role: "Cybersecurity", photo: "/images/team/neha-sharma.jpg" },
      { name: "Rishi Jain", role: "Cybersecurity", photo: "/images/team/rishi-jain.jpg" },
      { name: "Priya Desai", role: "Cybersecurity", photo: "/images/team/priya-desai.jpg" },
      // DSA
      { name: "Arth Gundapure", role: "DSA", photo: "/images/team/arth-gundapure.jpg" },
      { name: "Harsh Deshmukh", role: "DSA", photo: "/images/team/harsh-deshmukh.jpg" },
      { name: "Harsh Verma", role: "DSA", photo: "/images/team/harsh-verma.jpg" },
      { name: "Shreya Patil", role: "DSA", photo: "/images/team/shreya-patil.jpg" },
      { name: "Amandeep Singh", role: "DSA", photo: "/images/team/amandeep-singh.jpg" },
      // Networking
      { name: "Deep Singnapure", role: "Networking", photo: "/images/team/deep-singnapure.jpg" },
      { name: "Vedant Himte", role: "Networking", photo: "/images/team/vedant-himte.jpg" },
      { name: "Tanmay Reddy", role: "Networking", photo: "/images/team/tanmay-reddy.jpg" },
      { name: "Meera Kapoor", role: "Networking", photo: "/images/team/meera-kapoor.jpg" },
      { name: "Vikas Kumar", role: "Networking", photo: "/images/team/vikas-kumar.jpg" },
      { name: "Pooja Srivastava", role: "Networking", photo: "/images/team/pooja-srivastava.jpg" },
      // Creative
      { name: "Aisha Khan", role: "Creative", photo: "/images/team/aisha-khan.jpg" },
      { name: "Rohan Mehta", role: "Creative", photo: "/images/team/rohan-mehta.jpg" },
      { name: "Sneha Gupta", role: "Creative", photo: "/images/team/sneha-gupta.jpg" },
      { name: "Akshay Rao", role: "Creative", photo: "/images/team/akshay-rao.jpg" },
    ],
  },
];

export const coreTeam: TeamMember[] = [
  { name: "Parth Deshmukh", role: "Core Committee", photo: "/images/team/parth-deshmukh.jpg" },
  { name: "Sarang Mahore", role: "Core Committee", photo: "/images/team/sarang-mahore.jpg" },
  { name: "Shruti Raju Misal", role: "Core Committee", photo: "/images/team/shruti-raju-misal.jpg" },
  { name: "Tanvi Markad", role: "Core Committee", photo: "/images/team/tanvi-markad.jpg" },
  { name: "Tanvi Watane", role: "Core Committee", photo: "/images/team/tanvi-watane.jpg" },
];

export { faculty };
