import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);

  const headers = {
    token: localStorage.getItem('userToken')
  };

  const addProductToWishlist = async (productId) => {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
      toast.success(data.message, { duration: 1000 });
      function changeColor() {
        // Ensure to select the specific heart icon related to this product
        const heartIcon = document.querySelector(`#heart-icon-${productId}`);
        if (heartIcon) {
          heartIcon.style.color = "red"; // Correct property to change color
        }
      }
  
      changeColor();
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  const deleteProductFromWishlist = async (productId) => {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      setWishlist(data?.data);
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
      toast.error("Failed to delete product from wishlist.");
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      setWishlist(null);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error("Failed to clear wishlist.");
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
      setWishlist(response.data); // Make sure this aligns with the API response structure
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error("Failed to fetch wishlist.");
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ clearWishlist, deleteProductFromWishlist, addProductToWishlist, getWishlist, wishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
