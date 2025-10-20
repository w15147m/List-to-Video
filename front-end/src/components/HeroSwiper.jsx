import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import HeroImg from "../assets/images/banner-1.jpg";
import HeroImg2 from "../assets/images/banner-2.jpg";

import { Autoplay } from "swiper/modules";
const HeroSwiper = () => {
  return (
     <section className="section-1">
        <Swiper
          modules={[Autoplay]} // ✅ Add Autoplay here
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2000, // ✅ 2 seconds
            disableOnInteraction: false, // keeps autoplay after user swipes
          }}
          loop={true} // ✅ Makes it loop infinitely
        >
          <SwiperSlide>
            <div
              className="content w-100 h-100"
              style={{ backgroundImage: `url(${HeroImg2})` }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${HeroImg})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </section>
  )
}

export default HeroSwiper