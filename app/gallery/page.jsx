"use client";
import useScrollChange from "@/hooks/use-scroll-change";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const events = [
  {
    image: "https://picsum.photos/400/300?random=1",
    title: "Tech Symposium",
    description:
      "A gathering of tech enthusiasts sharing the latest trends and innovations in technology.",
  },
  {
    image: "https://picsum.photos/300/400?random=2",
    title: "Art Exhibition",
    description:
      "Showcasing creative artworks from talented students and local artists.",
  },
  {
    image: "https://picsum.photos/450/320?random=3",
    title: "Robotics Workshop",
    description:
      "Hands-on workshop building and programming robots for beginners and pros.",
  },
  {
    image: "https://picsum.photos/350/420?random=4",
    title: "Coding Hackathon",
    description:
      "24-hour coding marathon where teams solve real-world problems.",
  },
  {
    image: "https://picsum.photos/420/350?random=5",
    title: "Photography Contest",
    description:
      "Capture the best moments and win exciting prizes in our annual contest.",
  },
  {
    image: "https://picsum.photos/360/440?random=6",
    title: "Science Fair",
    description:
      "Students present innovative science projects and experiments.",
  },
  {
    image: "https://picsum.photos/430/370?random=7",
    title: "Guest Lecture Series",
    description:
      "Industry experts share insights on emerging technologies and career paths.",
  },
  {
    image: "https://picsum.photos/340/420?random=8",
    title: "Gaming Tournament",
    description: "Competitive gaming event featuring popular eSports titles.",
  },
  {
    image: "https://picsum.photos/400/280?random=9",
    title: "Math Olympiad",
    description:
      "Challenge your problem-solving skills in our annual math competition.",
  },
  {
    image: "https://picsum.photos/300/420?random=10",
    title: "Cultural Fest",
    description:
      "A celebration of diverse cultures with music, dance, and food.",
  },
  {
    image: "https://picsum.photos/460/350?random=11",
    title: "Quiz Night",
    description:
      "Test your knowledge across various topics in a fun quiz competition.",
  },
  {
    image: "https://picsum.photos/330/400?random=12",
    title: "Startup Pitch",
    description:
      "Aspiring entrepreneurs pitch their startup ideas to a panel of judges.",
  },
  {
    image: "https://picsum.photos/420/380?random=13",
    title: "Alumni Meet",
    description: "Reconnect with alumni and expand your professional network.",
  },
  {
    image: "https://picsum.photos/450/320?random=14",
    title: "Book Fair",
    description:
      "Explore a wide range of books and meet your favorite authors.",
  },
  {
    image: "https://picsum.photos/380/400?random=15",
    title: "Music Night",
    description: "Enjoy soulful performances and live music under the stars.",
  },
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
      <section className='h-screen flex flex-col gap-4 justify-center items-center text-center p-4   bg-[url("/prmitr.jpeg")] bg-cover bg-center'>
        <h1 className=" text-6xl md:text-9xl font-extrabold text-google-gradient-sharp ">Gallery</h1>
        <p className="text-lg  max-w-4xl text-gray-300">
          We came together to turn ideas into code and challenges into solutions.
This gallery is the source code of our community's passion and teamwork.
        </p>
      </section>
      <section className=" flex flex-col justify-center items-center gap-8 p-2 lg:p-8 mt-16">
        <Image
          src="https://placehold.co/1280x420/ccc/black/png?font=poppins&text=1280x420+Installation+Ceremony+2025"
          alt="Installation Ceremony 2025"
          className="rounded-lg box-border mx-4"
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
