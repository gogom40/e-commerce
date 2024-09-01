import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
export default function ProductDetails() {


let {id} = useParams()
console.log(id);
const [produactDetails, setProduactDetails] = useState({});
var settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,
  autoplay:true,
  autoplaySpeed:1000,
};
 async function getProuductDetails(id){
    let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data.data);
    setProduactDetails(data.data)
   
  }
  useEffect(()=>{
    getProuductDetails(id)
  }, [])
    
  return <>
    
    <h1 className="text-3xl">ProductDetails</h1>
    <div className="flex items-center py-10">
      <div className="w-1/4 p-4">
      <Slider {...settings}>
        {produactDetails.images?.map((image,index)=> <img src={image} key={index} className="w-full" alt="" />)}
    </Slider>
      
      </div>
      <div className="w-3/4">
      <div>
        <h2>{produactDetails.title}</h2>
        <p className="my-6 text-gray-500">{produactDetails.description}</p>
        <h3>{produactDetails.category?.name}</h3>
        <div className="flex justify-between my-2">
      <h3>{produactDetails.price} EGP</h3>
      <h3><i className="fas fa-star text-yellow-400"></i>{produactDetails.ratingsAverage}</h3>
      </div>
      <button className="btn w-full bg-green-500 text-white rounded py-1">Add To Cart</button>
      </div>
      </div>
    </div>
  
  </>
}
