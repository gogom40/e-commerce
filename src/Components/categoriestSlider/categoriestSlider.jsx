import React, { useEffect, useState } from 'react'
import style from './categoriestSlider.module.css'
import Slider from "react-slick";
import axios from 'axios'

export default function CategoriestSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
  };
  const [categories, setCategories] = useState([])
  async function getRecentcategories(){
    let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data?.data);
  }
  useEffect(()=>{
    getRecentcategories()
  },[])
  return <>
    
    
    <Slider {...settings}>
        {categories?.map((category,index)=> <div key={index} ><img src={category.image} className="w-full h-[200px] mt-4" alt="" />
        <h3>{category.name}</h3>
        </div>)}
    </Slider>
      
  
  </>
}
