"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CardComponent from "@/components/card.component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";

function CardsMarqueComponent({ cardDetails }) {

const isMobile = useIsMobile();

  if (!cardDetails || cardDetails.length === 0) {
    return <p className="text-center">No card data available.</p>;
  }

  return (
    <div className="w-full">
      <Swiper
        pagination={{
          dynamicBullets: true          
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper py-4 mb-8 h-96 max-sm:h-[26rem] "
        spaceBetween={30}
        autoplay={{ delay: 1000, disableOnInteraction: false , pauseOnMouseEnter: true }}
        slidesPerView={isMobile ? 1.2 : 3.15}
        loop={true}
      >
        {cardDetails.map((cardDetail) => (
          <SwiperSlide
            id="cards"
            key={cardDetail.title}
            className={cn(
              `text-center transition-all duration-500 cursor-pointer h-full py-4  rounded-md`,
            )}
          >
            <CardComponent
              key={cardDetail.title}
              {...cardDetail}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardsMarqueComponent;
