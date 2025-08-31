import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { BANNER } from "../../../constant";
import AboutUs from "./AboutUs";
import ProductsPage from "./Product";
import CategoryPage from "./Category";

export const Home = () => {
  return (
   <>
    <div className="flex justify-center items-center w-full h-full p-1 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay,EffectCoverflow]}
        spaceBetween={10}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false,  }}
        loop={true}
        
        effect="fade"
        className="w-full h-full rounded-lg shadow-md"
      >
        {
          BANNER.map((image,index)=>{
            return <SwiperSlide key={index}>
            <img
              src={image}
              alt="Nature 1"
              className="w-full h-full rounded-xl"
            />
          </SwiperSlide>
          })
        }
       
      </Swiper>

    </div>
          <AboutUs />
          {/* <ProductsPage /> */}
          <CategoryPage />
   </>

  );
};
