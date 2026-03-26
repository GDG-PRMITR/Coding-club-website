export interface Member {
  name: string;
  role: string;
}

export interface DomainGroup {
  name: string;
  executives: Member[];
  members: Member[];
}

export const gdgLeads: Member[] = [
  { name: "Sneha Giri", role: "Coding Club Lead" },
  { name: "Lavannya Deshpande", role: "Coding Club Co-Lead" },
  { name: "Vedant Mali", role: "GDGoC Organizer" },
];

export const gdgCoreTeam: Member[] = [
  { name: "Parth Deshmukh", role: "Core Committee" },
  { name: "Sarang Mahore", role: "Core Committee" },
  { name: "Shruti Raju Misal", role: "Core Committee" },
  { name: "Tanvi Markad", role: "Core Committee" },
  { name: "Tanvi Watane", role: "Core Committee" },
];

export const gdgDomains: DomainGroup[] = [
  {
    name: "Web Development",
    executives: [
      { name: "Ninad Vaidya", role: "Web Dev Executive" },
      { name: "Riya Umekar", role: "Web Dev Executive" },
    ],
    members: [
      { name: "Amruta Topale", role: "Domain Member" },
      { name: "Bhaumik Dhore", role: "Domain Member" },
      { name: "Harshal Gunjarkar", role: "Domain Member" },
      { name: "Kartik Shriwas", role: "Domain Member" },
      { name: "Krishna Mastud", role: "Domain Member" },
      { name: "Rohit Gupta", role: "Domain Member" },
      { name: "Shruti Raut", role: "Domain Member" },
      { name: "Vedant Deshmukh", role: "Domain Member" },
      { name: "Vedant Payghan", role: "Domain Member" },
    ],
  },
  {
    name: "AI/ML",
    executives: [
      { name: "Harshal Alaspure", role: "AI/ML Executive" },
      { name: "Krushna Mohod", role: "AI/ML Executive" },
    ],
    members: [
      { name: "Abhang Vyawhare", role: "Domain Member" },
      { name: "Kaushik Tayde", role: "Domain Member" },
      { name: "Rashika Gangraj", role: "Domain Member" },
      { name: "Rutvik Bele", role: "Domain Member" },
    ],
  },
  {
    name: "App Development",
    executives: [
      { name: "Ayush Waghade", role: "App Dev Executive" },
      { name: "Pranav Rajput", role: "App Dev Executive" },
    ],
    members: [
      { name: "Anand Kakad", role: "Domain Member" },
      { name: "Anurag Deshmukh", role: "Domain Member" },
      { name: "Krupa Sawarkar", role: "Domain Member" },
    ],
  },
  {
    name: "Cloud Computing",
    executives: [{ name: "Radhika Adhau", role: "Cloud Executive" }],
    members: [
      { name: "Atharv Kakade", role: "Domain Member" },
      { name: "Hirek Warhekar", role: "Domain Member" },
      { name: "Manjiri Jawarkar", role: "Domain Member" },
      { name: "Sharvil Wange", role: "Domain Member" },
    ],
  },
  {
    name: "Data Science",
    executives: [{ name: "Aryan Bute", role: "Data Science Executive" }],
    members: [
      { name: "Devendra Deshmukh", role: "Domain Member" },
      { name: "Dnyandeep Bendewar", role: "Domain Member" },
      { name: "Harshad Badge", role: "Domain Member" },
      { name: "Ishita Rathi", role: "Domain Member" },
      { name: "Srushti Makwana", role: "Domain Member" },
    ],
  },
  {
    name: "Data Structure & Algorithms",
    executives: [
      { name: "Bhargavi Kulkarni", role: "Data Science & Algorithms Executive" },
      { name: "Gauri Garole", role: "Data Science & Algorithms Executive" },
    ],
    members: [
      { name: "Chirag Bhoyar", role: "Domain Member" },
      { name: "Prathamesh Nistane", role: "Domain Member" },
      { name: "Pratik Ingole", role: "Domain Member" },
      { name: "Rohit Datir", role: "Domain Member" },
      { name: "Akshay Shinde", role: "Domain Member" },
    ],
  },
  {
    name: "IoT (Internet of Things)",
    executives: [{ name: "Adnan Ahmad", role: "IoT Executive" }],
    members: [
      { name: "Kartik Akhade", role: "Domain Member" },
      { name: "Smit Pathade", role: "Domain Member" },
      { name: "Yash Dhoble", role: "Domain Member" },
      { name: "Sampada Deshmukh", role: "Domain Member" },
    ],
  },
  {
    name: "Placement Preparation",
    executives: [{ name: "Shivani Bhure", role: "Placement Executive" }],
    members: [
      { name: "Ayuti Pendhari", role: "Domain Member" },
      { name: "Lekha Sedani", role: "Domain Member" },
      { name: "Pooja Ladhave", role: "Domain Member" },
      { name: "Tanushka Mathurkar", role: "Domain Member" },
    ],
  },
  {
    name: "Social Media & Promotions",
    executives: [
      { name: "Maitreyee Patil", role: "Copywriting Executive" },
      { name: "Shreya Somani", role: "Social Media & Public Relations Executive" },
    ],
    members: [
      { name: "Aditya Rathod", role: "Graphic Designing" },
      { name: "Arjun Solanke", role: "Graphic Designing" },
      { name: "Rakshita Hanwatkar", role: "Graphic Designing" },
      { name: "Bhumika Chopda", role: "Graphic Designing" },
      { name: "Mohit Gadling", role: "Social Media & Public Relations" },
      { name: "Arya Raut", role: "Social Media & Public Relations" },
      { name: "Rashmi Varma", role: "Social Media & Public Relations" },
      { name: "Vedant Dange", role: "Video Editor" },
      { name: "Nirbhay Shende", role: "Photographer" },
      { name: "Om Charthal", role: "Photographer" },
      { name: "Krishna Pandit Kedar", role: "Photographer" },
    ],
  },
];
