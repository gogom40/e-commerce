import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Products.module.css'; // Assuming you're using CSS modules
import RecentProductsList from "../RecentProduct/RecentProduct";
import Loading from '../Loading/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle the loading indicator

  async function getProducts() {
    try {
      let response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      console.log("Full Response:", response); 
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        console.log("No products found in the response.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Ensure loading stops after fetching is complete
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={style.productsContainer}>
      {loading ? (
        <div className="text-center pt-11 py-14"><Loading /></div>
      ) : (
        products.length ? (
          <RecentProductsList products={products} />
        ) : (
          <div className="text-center py-14">No products available.</div>
        )
      )}
    </div>
  );
}
