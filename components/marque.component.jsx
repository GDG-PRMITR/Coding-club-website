"use client";
import React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";
import Image from "next/image";

function MarqueComponent({ faculty, isVisible }) {
  const isMobile = useIsMobile();

  if (!faculty || faculty.length === 0) {
    return <p className="text-center">No faculty data available.</p>;
  }

  return (
    <div className="h-54 w-full">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className="mySwiper h-full"
        spaceBetween={30}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        slidesPerView={isMobile ? 1 : 3}
        loop={true}
      >
        {faculty.map((faculty, index) => (
          <SwiperSlide
            id="faculty"
            key={faculty.name}
            className={cn(
              `text-center transition-all duration-500 cursor-pointer  py-4 rounded-md`,
              isVisible.faculty
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-amber-600 to-amber-800  overflow-hidden transition-transform duration-300">
              <Image
                src={
                  faculty.image ||
                  "/professional-faculty-member-in-office-with-books.jpg"
                }
                alt={faculty.name}
                className="w-full h-full object-cover"
                loading="lazy"
                width={112}
                height={112}
              />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-xl">
              {faculty.name}
            </h3>
            <p className="text-slate-600 text-md ">{faculty.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MarqueComponent;
