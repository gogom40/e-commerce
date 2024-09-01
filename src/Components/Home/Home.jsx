import { useEffect, useState } from 'react';
import axios from 'axios';
//import style from './Home.module.css';
//import Cart from '../Cart/Cart';
//import Products from '../Products/Products';
//import Brands from '../Brands/Brands';

import RecentProductsList from "../RecentProduct/RecentProduct";
import Loading from '../Loading/Loading';
import CategoriestSlider from '../categoriestSlider/categoriestSlider';
import MainSlide from '../mainSlide/mainSlide';

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getRecentProducts() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      console.log("Full Response:", response); 
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        console.log("No data found in the response.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <><div className="pt-11"> <MainSlide />
    <CategoriestSlider />
    {products.length ? (
      <RecentProductsList products={products} /> 
    ) : (
      <div className="text-center py-14"><Loading /></div>
    )}</div>
     
    </>
  );
}
