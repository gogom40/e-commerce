import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
export default function Navbar() {
  let {userData ,setUserData}= useContext(UserContext)
  let {cart}= useContext(CartContext);
  let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('login')
  }
 
  return <>
   
    <nav className="bg-gray-100 py-4 text-center md:fixed capitalize top-0 inset-x-0 ">
      <div className="container flex flex-col md:flex-row justify-between items-center">

<div className="flex flex-col md:flex-row items-center space-x-3">
<img src={logo} width={"150px"} alt="" />

      
</div>
<div>
{userData && <ul className="flex  flex-col md:flex-row  space-x-4 text-lg">
          <li><NavLink to="">Home</NavLink></li>
          <li><NavLink to="cart">Cart</NavLink></li>
          <li><NavLink to="wishlist">Wishlist</NavLink></li>
          <li><NavLink to="products">Products</NavLink></li>
          <li><NavLink to="categories">Categories</NavLink></li>
          <li><NavLink to="brands">Brands</NavLink></li>
        </ul>}
</div>
<div className="">
  
        <ul className="flex flex-col md:flex-row space-x-2 items-center">
       
          
          {userData?  (<>    <li className="relative"><NavLink to="cart"><i className="fa-solid fa-cart-shopping text-gray-900 fa-2xl"></i></NavLink><span className="bg-green-600 text-white absolute left-[20px] bottom-3 px-2 basket text-sm"> {cart?cart.numOfCartItems:0}</span></li>
          <li onClick={()=>logOut()}><span className="text-xl">Logout</span></li></>):<>
            <li><NavLink to="register">Register</NavLink></li><li><NavLink to="login">Login</NavLink></li>
            <li className="space-x-2 text-black"><i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
          </li>
            </>}
        </ul>
</div>


      </div>
    </nav>
  </>
}
