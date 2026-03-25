export interface MemberSocials {
  github?: string;
  linkedin?: string;
  instagram?: string;
  portfolio?: string;
}

export interface MemberProfile {
  photo?: string;
  socials?: MemberSocials;
}

function normalizeName(name: string) {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

const profiles: Record<string, MemberProfile> = {
  "sneha giri": {
    photo: "/images/Sneha_Giri_Coding_Club.jpg",
    socials: {
      github: "https://github.com/sneha-giri330",
      linkedin: "https://www.linkedin.com/in/sneha-giri-764700292/",
    },
  },
  "lavannya deshpande": { photo: "/images/Lavannya_Deshpande_Coding_Club.png" },
  "vedant mali": {
    photo: "/images/Vedant_Mali_Organiser.png",
    socials: {
      github: "https://github.com/vedantmali05",
      linkedin: "https://www.linkedin.com/in/vedant-mali/",
    },
  },
  "parth deshmukh": {
    photo: "/images/Parth_Deshmukh_Core_Team.png",
    socials: {
      github: "https://github.com/parth2506-wq",
      linkedin: "https://www.linkedin.com/in/parth-deshmukh-47946b251/",
      instagram: "https://www.instagram.com/paarth.1211",
    },
  },
  "sarang mahore": { photo: "/images/Sarang_Mahore_Core_Team.jpg" },
  "shruti raju misal": {
    photo: "/images/Shruti_Misal_Core_Team.jpg",
    socials: {
      github: "https://github.com/Shruti2010",
      linkedin: "https://www.linkedin.com/in/shruti-raju-misal-a1636b25a",
    },
  },
  "tanvi markad": { photo: "/images/Tanvi_Markad_Core_Team.jpg" },
  "tanvi watane": { photo: "/images/Tanvi_Watane_Core_Team.jpg" },
  "ninad vaidya": { photo: "/images/Ninad_Vaidya_Web_Development.jpg" },
  "riya umekar": { photo: "/images/Riya_Umekar_Web_Development.jpeg" },
  "amruta topale": { photo: "/images/Amruta_Tople_Web_Development.jpg" },
  "bhaumik dhore": { photo: "/images/Bhaumik_Dhore_Web_Development.png" },
  "harshal gunjarkar": { photo: "/images/Harshal_Gunjarkar_Web_Development.jpg" },
  "kartik shriwas": {
    photo: "/images/Kartik_Shriwas_Web.jpg",
    socials: {
      github: "https://github.com/kartikshriwas",
      linkedin: "https://www.linkedin.com/in/kartikshriwas",
    },
  },
  "krishna mastud": { photo: "/images/Krishna_Mastud_Web_Development.jpg" },
  "rohit gupta": { photo: "/images/Rohit_Gupta_Web_Developement.png" },
  "shruti raut": { photo: "/images/Shruti_Raut_Web_Development.jpg" },
  "vedant deshmukh": { photo: "/images/Vedant_Deshmukh_Web_Development.jpg" },
  "vedant payghan": { photo: "/images/Vedant_Payghan_Web_Development.jpg" },
  "harshal alaspure": {
    photo: "/images/Harshal_Alaspure_AIML.jpg",
    socials: {
      github: "https://github.com/HarshalAl02",
      linkedin: "https://www.linkedin.com/in/harshal-alaspure-36b057291",
      portfolio: "https://leetcode.com/u/Harshal02Al/",
    },
  },
  "krushna mohod": {
    photo: "/images/Krushna_Mohod_AIML.jpeg",
    socials: {
      github: "https://github.com/krushnamohod",
      linkedin: "https://www.linkedin.com/in/krushna-mohod-5076a128a",
      instagram: "https://www.instagram.com/mr_patil_37/",
    },
  },
  "abhang vyawhare": { photo: "/images/Abhang_Vyawhare_AIML.png" },
  "kaushik tayde": {
    photo: "/images/Kaushik_Tayde_AIML.png",
    socials: {
      github: "https://github.com/Kaushik-Tayde",
      linkedin: "https://www.linkedin.com/in/kaushik-tayde-055a31290",
      instagram: "https://www.instagram.com/kaushik_tayde45",
    },
  },
  "rashika gangraj": { photo: "/images/Rashika_Gangraj_AIML.png" },
  "rutvik bele": {
    photo: "/images/Rutvik_Bele_ALML.png",
    socials: {
      github: "https://github.com/Rutvik-Bele",
      linkedin: "https://www.linkedin.com/in/rutvik-bele/",
      instagram: "https://www.instagram.com/rutvik_bele07/",
    },
  },
  "ayush waghade": { photo: "/images/Ayush_Waghade_App_Development.png" },
  "pranav rajput": {
    photo: "/images/Pranav_Rajput_App_Development - Pranav Rajput.jpg",
    socials: {
      github: "https://github.com/24-Pranav",
      linkedin: "https://www.linkedin.com/in/pranav-rajput-9bb446244",
      instagram: "https://www.instagram.com/pranav____rajput",
      portfolio: "https://24-pranav.github.io/",
    },
  },
  "anand kakad": { photo: "/images/Anand_Kakad_App_Development.png" },
  "anurag deshmukh": { photo: "/images/Anurag_Deshmukh_App_Development.png" },
  "krupa sawarkar": {
    photo: "/images/Krupa_Sawarkar_App_Development - Krupa Sawarkar.jpg",
    socials: {
      github: "https://github.com/krupasawarkar630",
      linkedin: "https://www.linkedin.com/in/krupa-sawarkar-b808ba322",
    },
  },
  "radhika adhau": {
    photo: "/images/Radhika_Adhau_Cloud_Computing.jpg",
    socials: {
      github: "https://github.com/RadhikaAdhau0708",
      linkedin: "https://www.linkedin.com/in/radhika-adhau-71baa0290",
    },
  },
  "atharv kakade": {
    photo: "/images/Atharv_Kakade_Cloud_Computing.jpg",
    socials: {
      github: "https://github.com/Atharvkakade2005",
      linkedin: "https://www.linkedin.com/in/atharv-kakade-779b1a290",
      instagram: "https://www.instagram.com/atharv__k_7",
    },
  },
  "hirek warhekar": {
    photo: "/images/Hirek_Warhekar_Cloud_Computing.jpg",
    socials: {
      github: "https://github.com/hirek18",
      linkedin: "https://www.linkedin.com/in/hirek-warhekar-5a1b14290",
      instagram: "https://www.instagram.com/hirek.18",
    },
  },
  "manjiri jawarkar": {
    photo: "/images/Manjiri_Jawarkar_Cloud_Computing.jpg",
    socials: {
      github: "https://github.com/Manjiri699",
      linkedin: "https://www.linkedin.com/in/manjiri-jawarkar-b86a01342",
      instagram: "https://www.instagram.com/manjiriiii_17/",
    },
  },
  "sharvil wange": {
    photo: "/images/Sharvil_Wange_Cloud_Computing.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/sharvil-wange-618b17290/" },
  },
  "aryan bute": { photo: "/images/Aryan_Bute_Data_Science.jpg" },
  "devendra deshmukh": {
    photo: "/images/Devendra_Deshmukh_Data_Science.jpg",
    socials: {
      github: "https://github.com/Devendra0655",
      linkedin: "https://www.linkedin.com/in/devendra-deshmukh-7a330b320/",
      instagram: "https://www.instagram.com/_devendra06",
    },
  },
  "dnyandeep bendewar": {
    photo: "/images/Dnyandeep_Bendewar_Data_Science.jpg",
    socials: {
      github: "https://github.com/dnyandeep-bendewar",
      linkedin: "https://linkedin.com/in/dnyandeep-bendewar-2325b8290",
    },
  },
  "harshad badge": {
    photo: "/images/Harshad_Badge_Data_Science.jpg",
    socials: {
      github: "https://github.com/HarshadBadge3",
      linkedin: "https://www.linkedin.com/in/harshad-badge-386540290",
    },
  },
  "ishita rathi": {
    photo: "/images/Ishita_Rathi_Data_Science - Ishita Rathi.png",
    socials: {
      github: "https://github.com/ishita2740",
      linkedin: "https://linkedin.com/in/ishita-rathi-9b180230a",
      portfolio: "https://medium.com/@rathiishita1005729",
    },
  },
  "srushti makwana": {
    photo: "/images/Srushti_Makwana_Data_Science.jpg",
    socials: {
      github: "https://github.com/SrushtiMakwana",
      linkedin: "https://www.linkedin.com/in/srushti-makwana-5a560b30b",
      instagram: "https://www.instagram.com/srushtie_11/",
    },
  },
  "bhargavi kulkarni": { photo: "/images/Bhargavi_Kulkarni_DSA.png" },
  "gauri garole": {
    photo: "/images/Gauri_Garole_DSA.jpg",
    socials: {
      github: "https://github.com/gaurigarole",
      linkedin: "https://www.linkedin.com/in/gauri-garole-a96411256/",
    },
  },
  "chirag bhoyar": {
    photo: "/images/Chirag_Bhoyar_DSA.jpg",
    socials: {
      github: "https://github.com/chiragbhoyar004",
      linkedin: "https://www.linkedin.com/in/chirag-bhoyar-5495b5290",
    },
  },
  "prathamesh nistane": {
    photo: "/images/Prathamesh_ Nistane_DSA.jpg",
    socials: {
      github: "https://github.com/prathamesh-it",
      linkedin: "https://www.linkedin.com/in/pprathameshnistanee-693058291/",
      instagram: "https://www.instagram.com/prathamesh_nistane/",
    },
  },
  "pratik ingole": {
    photo: "/images/Pratik_Ingole_DSA.png",
    socials: {
      github: "https://github.com/PratikIngole45",
      linkedin: "https://www.linkedin.com/in/pratik-ingole",
      instagram: "https://www.instagram.com/pratik_ingole.45",
    },
  },
  "rohit datir": {
    photo: "/images/Rohit_Datir_DSA.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/rohit-datir",
      portfolio: "https://rohit45portfolio.netlify.app",
    },
  },
  "adnan ahmad": {
    photo: "/images/ADNAN_AHMAD_IOT.jpg",
    socials: {
      github: "https://www.github.com/adnanaskh",
      linkedin: "https://www.linkedin.com/in/adnanrahmad",
      instagram: "https://www.instagram.com/41646e616e",
    },
  },
  "kartik akhade": { photo: "/images/Kartik_Akhade_IOT.png" },
  "smit pathade": {
    photo: "/images/Smit_Pathade_IOT.png",
    socials: {
      github: "https://github.com/Smit576",
      linkedin: "https://www.linkedin.com/in/smit-pathade-112b46315",
      instagram: "https://www.instagram.com/smit_576",
    },
  },
  "yash dhobale": { photo: "/images/Yash_dhoble_ IOT.png" },
  "yash dhoble": { photo: "/images/Yash_dhoble_ IOT.png" },
  "shivani bhure": {
    photo: "/images/Shivani_Bhure_Placement_Preparation.jpg",
    socials: {
      github: "https://github.com/Shivanibhure",
      linkedin: "https://www.linkedin.com/in/shivani-bhure-80b144286/",
      portfolio: "https://shivanibhure.github.io/Portfolio/",
    },
  },
  "ayuti pendhari": { photo: "/images/Ayuti_ Pendhari_Placement_Preparation.png" },
  "lekha sedani": {
    photo: "/images/Lekha_Sedani_Placement_Preperation.jpg",
    socials: {
      github: "https://github.com/Lekhasedani15",
      linkedin: "https://www.linkedin.com/in/lekhasedani",
    },
  },
  "pooja ladhave": {
    photo: "/images/Pooja_Ladhawe_Placement_Preparation.jpeg",
    socials: {
      github: "https://github.com/ladhawepooja",
      linkedin: "https://www.linkedin.com/in/pooja-ladhawe-4a460a290",
      instagram: "https://www.instagram.com/pooja_123268",
    },
  },
  "tanushka mathurkar": {
    photo: "/images/Tanushka_Mathurkar_Placement_ Preparation.png",
    socials: {
      github: "https://github.com/TANUSHKAUMESHMATHURKAR",
      linkedin: "https://www.linkedin.com/in/tanushka-mathurkar",
      instagram: "https://www.instagram.com/402.tanushka_mathurkar/",
    },
  },
  "aditya rathod": { photo: "/images/Aditya_Rathod_Graphic_Designing.jpg" },
  "arjun solanke": { photo: "/images/Arjun_Solanke_Graphic_Designer.jpg" },
  "maitreyee patil": {
    photo: "/images/Maitreyee_Patil_Social_Media_&_PR.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/maitreyee-patil-617mp" },
  },
  "nirbhay shende": { photo: "/images/Nirbhay_ Shende_Social_media _&_PR.jpg" },
  "om charthal": { photo: "/images/Om_Charthal_Photography.jpg" },
  "mohit gadling": { photo: "/images/Mohit_Social_Media_&_PR.png" },
  "arya raut": { photo: "/images/aryarautsocialmedia.jpg" },
  "shreya somani": { photo: "/images/Shreya_Somani_Social_Media_PR.png" },
  "vedant wankhade": { photo: "/images/Vedant_Wankhade_Social_Media_PR.png" },
  "sudhanshu khakse": { photo: "/images/1758606694268 - Sudhanshu Khakse.jpg" },
  "vedant dange": { photo: "/images/Vedant_Dange_Video_Editor.jpg" },
  "khushboo mishra": { photo: "/GSA-images/Khushboo-GSA.jpg" },
  "shrutika tayade": { photo: "/GSA-images/Shrutika-GSA.jpg" },
  "shivapriya thakare": { photo: "/GSA-images/Shivpriya-GSA.jpg" },
  "prachi sable": { photo: "/GSA-images/Prachi-GSA.jpg" },
  "kaushal patel": { photo: "/GSA-images/Kaushal-GSA.jpg" },
  "radha waghmare": { photo: "/GSA-images/Radha-GSA.jpg" },
  "rahul kharap": { photo: "/GSA-images/Rahul-GSA.jpg" },
};

export function getMemberProfile(name: string): MemberProfile {
  const key = normalizeName(name);
  return profiles[key] ?? {};
}
