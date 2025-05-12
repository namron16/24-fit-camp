import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "./slider.css";
import "swiper/css/bundle";

const Slider = ({ products }) => {
  const slides = useMemo(() =>
    products.map((product) => (
      <SwiperSlide key={product.id} className="product-list">
        <img src={product.img} alt={product.name} />
      </SwiperSlide>
    ))
  );
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {slides}
    </Swiper>
  );
};

export default Slider;
