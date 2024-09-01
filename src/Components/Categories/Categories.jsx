import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading'; // Import Loading component

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getRecentCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data?.data || []);
    } catch (err) {
      setError('Error fetching categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecentCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-14">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-11 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              src={category.image}
              className="rounded-t-lg w-full h-[400px]"
              alt={category.name}
            />
            <div className="p-2"><h3 className="text-center py-5 text-3xl text-green-700">{category.name}</h3></div>
            
          </div>
        ))
      ) : (
        <div className="text-center py-14">No categories available.</div>
      )}
    </div>
  );
}
