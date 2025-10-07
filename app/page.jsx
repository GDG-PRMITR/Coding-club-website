"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarCheck2, Globe, GraduationCap, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarqueComponent from "@/components/marque.component";
import CardsMarqueComponent from "@/components/cards.marque.component";
import PresentSectionComponent from "@/components/present.section.component";
import NvidiaCardDialogComponent from "../components/nvidia.card.dialog.component";

const cardDetails = [
  {
    title: "GDG",
    logoHref: "/logo/logo-gdg.png",
    description:
      "Google Developer Groups - Connecting developers worldwide through technology, innovation, and community-driven learning experiences.",
    link: "#",
    linkText: "Events",
    isRedirectionExist: true,
    redirectionLink: "/GDG",
  },
  // {
  //   title: "Coding Club",
  //   logoHref: "/logo/logo-coding-club.png",
  //   description:
  //     "Coding Club - A community for developers to learn, share, and grow together.",
  //   link: "#",
  //   linkText: "Events",
  //   isRedirectionExist: true,
  //   redirectionLink: "/gdg-coding-club",
  // },
  {
    title: "GSA",
    logoHref: "/logo/logo-gsac.png",
    description:
      "Google Student Ambassador - Empowering students with Google technologies and fostering innovation in academic communities.",
    link: "#",
    linkText: "Learn More",
    isRedirectionExist: true,
    redirectionLink: "/GSA",
  },
  {
    title: "Cisco",
    logoHref: "/logo/logo-cisco.jpg",
    description: "Cisco - Leading the way in IT and networking solutions.",
    isRedirectionExist: true,
    redirectionLink: "https://academy.prmitr.in",
  },
  {
    title: "Coding Club",
    logoHref: "/logo/logo-coding-club.png",
    description:
      "Coding Club - Fostering creativity and innovation through coding.",
    isRedirectionExist: true,
    redirectionLink: "/gdg-coding-club",
  },
  {
    title: "Nvidia",
    logoHref: "/logo/logo-nvidia.jpg",
    description:
      "Nvidia - Pioneering the future of AI and graphics processing.",
    isRedirectionExist: true,
    redirectionLink: "https://www.nvidia.com/",
    Button: NvidiaCardDialogComponent,
  },
  {
    title: "Cisco",
    logoHref: "/logo/logo-cisco.jpg",
    description: "Cisco - Leading the way in IT and networking solutions.",
    isRedirectionExist: true,
    redirectionLink: "https://academy.prmitr.in/",
  },
];

const socialDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Email",
    href: "mailto:example@example.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    href: "https://github.com/dev-roxy",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.069 1.689-.069 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    href: "https://www.instagram.com/dev_rohit_gupta/",
  },
];
const statistics = [
  {
    number: "500+",
    label: "Participants Reach",
    color: "#EA4335",
    icon: Zap,
  },
  {
    number: "25+",
    label: "Events Hosted",
    color: "#FBBC04",
    icon: CalendarCheck2,
  },
  {
    number: "200+",
    label: "Study Jams Participants",
    color: "#34A853",
    icon: GraduationCap,
  },
  {
    number: "8+",
    label: "Number of Domains",
    color: "#4285F4",
    icon: Globe,
  },
];

const leads = [
  {
    name: "Sneha Giri",
    position: "Coding Club Lead",
    description:
      "Dedicated to fostering a collaborative learning environment and organizing impactful coding events.",
    image: "/images/Sneha_Giri_Coding_Club.jpg",
  },
  {
    name: "Lavannya Deshmukh",
    position: "Coding Club Co-Lead",
    description:
      "Dedicated to fostering a collaborative learning environment and organizing impactful coding events.",
    image: "/images/Lavannya_Deshpande_Coding_Club.png",
  },
];
const organisers = [
  {
    name: "Vedant Mali",
    position: "GDG Lead",
    description:
      "Passionate about Google technologies and community building. Leading innovative workshops and tech talks.",
    image: "/images/Vedant_Mali_Organiser.png",
  },
  {
    name: "Adnan Ahmad",
    position: "GSA Lead",
    description:
      "Enthusiastic about student engagement and creating opportunities for peer-to-peer learning.",
    image: "/images/ADNAN_AHMAD_IOT.jpg",
  },
];
const faculty = [
  {
    name: "Dr. G. R. Bamnote ",
    title: "Principal",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/Gajendra.jpg",
  },
  {
    name: "Dr. M. A. Pund",
    title: "HOKD CSE",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/mahendra.jpg",
  },
  {
    name: "Dr. M. A. Deshmukh",
    title: "IQAC Coordinator",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/MSDESHMUKH.jpg",
  },
  {
    name: "Prof. C. N. Deshmukh",
    title: "cisco coordinator",
    image: "https://academy.prmitr.in/assets/faculty/c_n_deshmukh.png",
  },
  {
    name: "Prof. A. A. Chaudhari",
    title: "placement officer",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/anand.jpg",
  },
  {
    name: "Dr. R. R. Karwa ",
    title: "faculty adviser",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/roshan.jpg",
  },
  {
    name: "Prof. A. U. Chaudhari",
    title: "cisco co-coordinator",
    image: "https://mitra.ac.in/MitraFaculty/public/upload/arpit.jpg",
  },
];
const Page = () => {
  const [isVisible, setIsVisible] = useState({});
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground relative overflow-x-hidden ">
      {/* Present Section */}
      <PresentSectionComponent />
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-6 relative z-10 ">
          {/* Main Container */}
          <div className="max-w-6xl  mx-auto bg-white/20 border backdrop-blur-[2px] rounded-3xl p-8 md:p-12">
            {/* Header with Logo and Tagline */}
            <div className="flex flex-col max-sm:justify-center md:flex-row items-start md:items-center justify-center mb-12">
             
              <div className="text-right max-sm:text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-black text-pretty">
                  Empowering Innovation, One Code at a Time
                </h1>
              </div>
            </div>
            {/* Partnership Cards */}
            <CardsMarqueComponent cardDetails={cardDetails} />
          </div>
        </div>
      </section>
      {/*Tagline */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between my-12 ">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black mx-auto text-center text-pretty">
            A Campus Where Innovation Meets Collaboration
          </h1>
        </div>
      </div>

      {/* Statistics Section */}
      <section id="about" className="py-16 relative z-10 " data-animate>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  `text-center transition-all duration-500 border py-4 rounded-xl cursor-pointer group hover:backdrop-blur-[2px] hover:bg-gray-400/20 `,
                  isVisible.about
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  borderColor: stat.color,
                }}
              >
                <div className="flex justify-center mb-4 transition-transform duration-300">
                  <stat.icon color={stat.color} size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-black mb-2  transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-600 text-sm font-medium text-pretty">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section id="faculty" className="py-16 relative z-10" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            Faculty Members
          </h2>

          <MarqueComponent faculty={faculty} isVisible={isVisible} />

          {/* Horizontal line separator */}
          {/* <div className="w-full max-w-4xl mx-auto mt-12">
            <hr className="border-slate-300" />
          </div> */}
        </div>
      </section>

      {/* Organisers Section */}
      <section id="organisers" className="py-16 relative z-10" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            Organisers
          </h2>

          <div className="mx-auto flex flex-col md:flex-row justify-center items-center max-w-4xl max-md:space-y-2 md:space-x-2 my-2">
            {leads.map((lead, index) => (
              <div
                key={lead.name}
                className={cn(
                  `hover-neon-border max-w-full flex flex-col items-center  space-y-6 md:space-y-0 md:space-x-8 transition-all duration-500  cursor-pointer group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 `,
                  isVisible.organisers
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="rounded-full overflow-hidden flex-shrink-0 transition-transform duration-300 mx-auto max-h-24">
                  <Image
                    src={lead.image || "/placeholder.svg"}
                    alt={lead.name}
                    height={90}
                    width={90}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center ">
                  <h3 className="text-2xl font font-bold text-black mb-2 transition-colors duration-300">
                    {lead.name}
                  </h3>
                  <p className="text-sm text-gray-800/70 font-semibold mb-4">
                    {lead.position}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {lead.description}
                  </p>

                  <div className="flex justify-center space-x-6">
                    {socialDetails.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        className="flex items-center space-x-2 text-gray-400 hover:text-gray-800 transition-colors duration-300 "
                      >
                        {social.icon}
                        <span className="text-sm font-medium">
                          {social.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto space-y-2  my-0">
            {organisers.map((organiser, index) => (
              <div
                key={organiser.name}
                className={cn(
                  `hover-neon-border flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 transition-all duration-500  cursor-pointer group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 `,
                  isVisible.organisers
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="   rounded-full overflow-hidden flex-shrink-0 transition-transform duration-300">
                  <Image
                    src={organiser.image || "/placeholder.svg"}
                    alt={organiser.name}
                    height={90}
                    width={90}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-black mb-2 transition-colors duration-300">
                    {organiser.name}
                  </h3>
                  <p className="text-sm text-gray-800/70 font-semibold mb-4">
                    {organiser.position}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {organiser.description}
                  </p>

                  <div className="flex justify-center md:justify-start space-x-6">
                    {socialDetails.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        className="flex items-center space-x-2 text-gray-400 hover:text-gray-800 transition-colors duration-300 "
                      >
                        {social.icon}
                        <span className="text-sm font-medium">
                          {social.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

Page.displayName = "HomePage";
export default Page;
