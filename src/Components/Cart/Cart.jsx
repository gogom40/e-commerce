import { useContext, useEffect } from 'react';
//import style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { clearCart, getCart, cart, updateProductCount, deleteProduct } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  if (!cart) {
    return <Loading />;
  }

  if (!cart.data || cart.data.products.length === 0) {
    return <h2 className="text-center pt-11 text-2xl">Your cart is empty</h2>;
  }

  return (
    <>
      <div className="bg-gray-50 relative overflow-x-auto w-[95%] mx-auto shadow-md sm:rounded-lg top-11 mt-11">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-9">
                <h1 className="text-3xl">CartShope</h1>
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                <Link to={'/checkout'} className="bg-blue-400 text-white text-lg m-2 py-4 px-6 rounded-lg">Checkout</Link>
              </th>
            </tr>
            <tr>
              <td scope="col" className="px-16 py-9">
                <h1 className="text-xl">Total Price: <span className="text-green-500">{cart.data.totalCartPrice}</span></h1>
              </td>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3"></td>
              <td scope="col" className="px-6 py-3 text-xl">
                Total number of items: <span className="text-green-500">{cart.numOfCartItems}</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {cart.data.products.map((product) => (
              <tr
                key={product.product.id}
                className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 ps-12">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-44 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="py-4 pe-60 font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-wrap flex-col">
                    <div className="flex-row py-2 text-xl">{product.product.title}</div>
                    <div className="flex-row text-base py-2">{product.price} EGP</div>
                    <div className="flex-row">
                      <button
                        onClick={() => deleteProduct(product.product.id)}
                        className="text-[17px] text-red-600 dark:text-red-500 hover:underline"
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-xl">
                    <button
                      onClick={() => updateProductCount(product.product.id, product.count - 1)}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="w-7 h-7"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() => updateProductCount(product.product.id, product.count + 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="w-7 h-7"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <button
            onClick={()=>clearCart()}
            className="border-2 border-green-500 text-black py-2 px-6 rounded-lg font-semibold "
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </>
  );
}
