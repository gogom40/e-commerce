import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import slide1 from '../../assets/images/bag (3).jpg'
import slide2 from '../../assets/images/bag (2).jpg'
import slide3 from '../../assets/images/bag (1).jpg'
import right1 from '../../assets/images/right (1).jpg'
import right2 from '../../assets/images/right (2).jpg'
export default function MainSlide() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 3,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
  };

    
  return <>
  <div className="flex justify-center">
    <div className="w-1/4">
    <Slider {...settings}>
    <img src={slide3} className="w-full h-[420px]" alt="" />
    <img src={slide2} className="w-full h-[420px]" alt="" />
      <img src={slide1} className="w-full h-[420px]" alt="" />
    </Slider>
    </div>
    <div className="w-1/4">
     <img src={right1} className="w-full h-[210px]" alt="" />
     <img src={right2} className="w-full h-[210px]" alt="" />
    </div>
  </div>
   
  </>
}
