import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Children } from "react";


export let CartContext = createContext();

export default function CartContextProvider({children}) {
  let headers = {
    token: localStorage.getItem('userToken')
  };

 const [cart, setCart] = useState(null)

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId 
      }, {
        headers
      });
      toast.success(data.message,{
        duration:1000
      })
      console.log(data);
      setCart(data)
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  }
  async function checkout(shippingAddress) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {
        shippingAddress
      }, {
        headers
      });
      console.log(data);
      window.location.href = data.session.url
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  async function deleteProduct(productId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers
      });
      console.log(data);
      setCart(data)
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  async function clearCart() {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
      console.log(data);
      setCart(null)
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  async function updateProductCount(productId ,count) {
    if(count >0){
      try {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
          count 
        }, {
          headers
        });
        console.log(data);
        setCart(data)
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }else{
      deleteProduct(productId)
    }
   
  }
  async function getCart() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
      toast.success(data.message,{
        duration:1000
      })
      console.log(data);
      setCart(data)
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  useEffect(()=>{
    getCart()
  },[])
  return (
    <CartContext.Provider value={{ clearCart,checkout,deleteProduct,updateProductCount,addProductToCart ,getCart ,setCart ,cart }}>
      {children}
    </CartContext.Provider>
  );
}
