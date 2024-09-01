import { useContext, useEffect } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { getWishlist, wishlist, deleteProductFromWishlist, clearWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  if (!wishlist) return <Loading />;

  const isEmptyWishlist = !wishlist.data || !wishlist.data.products || wishlist.data.products.length === 0;

  if (isEmptyWishlist) {
    return <h2 className="text-center pt-11 text-2xl">Your Wishlist is empty</h2>;
  }

  return (
    <div className="bg-gray-50 relative overflow-x-auto w-[95%] mx-auto shadow-md sm:rounded-lg top-11 mt-11">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-9">
              <h1 className="text-3xl">Wishlist</h1>
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              <Link to="/checkout" className="bg-blue-400 text-white text-lg m-2 py-4 px-6 rounded-lg">
                Checkout
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {wishlist.data.products.map((product) => (
            <tr key={product.product.id} className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 ps-12">
                <img
                  src={product.product.imageCover || '/path/to/fallback-image.jpg'}
                  className="w-16 md:w-44 max-w-full max-h-full"
                  alt={product.product.title || 'Product Image'}
                />
              </td>
              <td className="py-4 pe-60 font-semibold text-gray-900 dark:text-white">
                <div className="flex flex-col">
                  <div className="py-2 text-xl">{product.product.title}</div>
                  <div className="text-base py-2">{product.price} EGP</div>
                  <button
                    onClick={() => deleteProductFromWishlist(product.product.id)}
                    className="text-[17px] text-red-600 dark:text-red-500 hover:underline mt-2"
                    aria-label={`Remove ${product.product.title} from wishlist`}
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
              </td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-6">
        <button
          onClick={clearWishlist}
          className="border-2 border-green-500 text-black py-2 px-6 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition"
          aria-label="Clear your wishlist"
        >
          Clear Your Wishlist
        </button>
      </div>
    </div>
  );
}
