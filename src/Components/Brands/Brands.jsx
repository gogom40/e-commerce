import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Brands.module.css'; 
import Loading from '../Loading/Loading';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      let response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log("Full Response:", response); 
      if (response.data && response.data.data) {
        setBrands(response.data.data);
      } else {
        console.log("No brands found in the response.");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="px-4 py-11">
      <h1 className="text-3xl text-center mb-8">Brands</h1>
      {loading ? (
        <div className="text-center"><Loading /></div>
      ) : (
        brands.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {brands.map(brand => (
              <div 
                key={brand._id} 
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img src={brand.image} alt={brand.name} className="w-full h-auto mb-4" />
                <h2 className="text-center text-lg font-semibold">{brand.name}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14">No brands available.</div>
        )
      )}
    </div>
  );
}
