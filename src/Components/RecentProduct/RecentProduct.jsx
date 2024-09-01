import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { WishlistContext } from '../../Context/WishlistContext';

export default function RecentProductsList() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState('');

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getProducts,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  // Filter products based on the search term
  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (<>
    <label
      htmlFor="default-search"
      className="mb-2 text-xl text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-[85%] m-auto p-3 ps-10 my-12 text-gray-900 rounded-lg bg-gray-50"
        placeholder="Search ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        required
      />

  

      {filteredProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border product rounded-lg hover:shadow-lg transition-shadow"
            >
              <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.imageCover || '/path/to/fallback-image.jpg'}
                  className="w-full h-48 object-cover rounded-t-lg"
                  alt={`${product.title} - ${product.category.name}`}
                />
                <div className="p-4">
                  <h2 className="text-gray-900 text-lg font-semibold truncate">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h2>
                  <h3 className="text-gray-600 text-sm">{product.category.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <h3 className="text-gray-900 font-medium">{product.price} EGP</h3>
                    <h3 className="text-yellow-400 flex items-center">
                      <i className="fas fa-star"></i> {product.ratingsAverage}
                    </h3>
                  </div>
                </div>
              </Link>
              <div className="p-4 flex justify-between items-center">
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="bg-green-500 text-white py-2 px-12 rounded btn hover:bg-green-600 transition"
                >
                  Add To Cart
                </button>
                <i
                 id={`heart-icon-${product.id}`} 
                  className="fa-solid fa-heart text-3xl mb-10 cursor-pointer"
                  onClick={() => addProductToWishlist(product.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-14">No products available.</div>
      )}
    </div>
    </>);
}
