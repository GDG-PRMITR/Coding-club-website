"use client";
import useScrollChange from "@/hooks/use-scroll-change";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const events = [
  {
    image: "/gallery/all-gdg-members-in-seminar-hall.jpeg",
    title: "GDG Members in Seminar Hall",
    description:
      "All GDG members gathered together in the seminar hall.",
  },
  {
    image: "/gallery/all-gdg-members-top.jpeg",
    title: "GDG Members Top View",
    description:
      "Top view of all GDG members at the event.",
  },
  {
    image: "/gallery/all-gdg-members.jpeg",
    title: "GDG Members Group Photo",
    description:
      "Complete team photo of all GDG members.",
  },
  {
    image: "/gallery/guests-on-stage.jpeg",
    title: "Guests on Stage",
    description:
      "Distinguished guests sharing their insights on stage.",
  },
  {
    image: "/gallery/principal-sir-on-stage.jpeg",
    title: "Principal Sir's Speech",
    description:
      "Principal sir addressing the gathering.",
  },
  {
    image: "/gallery/principal-speach-from-last.jpeg",
    title: "Principal's Speech",
    description:
      "Principal sir delivering an inspiring speech.",
  },
  {
    image: "/gallery/roshan-sir-speach.jpeg",
    title: "Roshan Sir's Speech",
    description:
      "Roshan sir sharing valuable insights with the audience.",
  },
  {
    image: "/gallery/students-attended.jpeg",
    title: "Students in Attendance",
    description:
      "Enthusiastic students attending the event.",
  },
  {
    image: "/gallery/web-dev-team.jpeg",
    title: "Web Development Team",
    description:
      "The talented web development team of the coding club.",
  }
];

function Page() {
  const [isVisible, setIsVisible] = useState({});
  const scrollingDown = useScrollChange(50);
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
    <main className="font-google-sans">
      <section className='h-screen flex flex-col gap-4 justify-center items-center text-center p-4 max-sm:max-h-screen bg-[url("/prmitr.jpeg")] bg-cover bg-center'>
        <h1 className=" text-6xl md:text-9xl font-extrabold text-google-gradient-sharp ">Gallery</h1>
        <p className="text-lg  max-w-4xl text-gray-300">
          We came together to turn ideas into code and challenges into solutions.
This gallery is the source code of our community's passion and teamwork.
        </p>
      </section>
      <section className=" flex flex-col justify-center items-center gap-8 p-2 lg:p-8 mt-16 overflow-clip">
        <Image
          src="/gallery/installation-ceremony-main.jpeg"
          alt="Installation Ceremony 2025"
          className="rounded-lg box-border mx-4 sm:max-w-8/12 object-contain max-sm:min-w-10/12"
          width={1280}
          height={420}
        />
        <h2 className="text-4xl font-bold text-center px-4">
          Installation Ceremony 2025
        </h2>
        <p className="max-w-3xl text-center px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          praesentium consequatur. Repudiandae fuga vel autem, ea cumque
          provident minus dolorum dolores ex veritatis eveniet.
        </p>
      </section>
      <section className="mt-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Events Gallery</h2>
        <div className="columns-xs" id="card" data-animate>
          {events.map((event, index) => (
            <div
              key={event.title}
              className={cn(
                "group relative mb-4 break-inside-avoid  rounded-lg transition-all duration-500  overflow-hidden bg-transparent",
                isVisible.card
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <Image
                height={400}
                width={300}
                src={event.image}
                alt={event.title}
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-lg"></div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-xl text-left font-semibold">{event.title}</h3>
                {/* <p className="text-gray-400">{event.description.slice(0,3)}...</p> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Page;
