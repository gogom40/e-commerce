import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import { Toaster } from 'react-hot-toast'; // Ensure Toaster is imported from the correct library
import Checkout from './Components/Checkout/Checkout.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import WishlistContextProvider from './Context/WishlistContext.jsx';
import ReactDOM from 'react-dom/client';
import ForgetPass from './Components/ForgetPass/ForgetPass.jsx';
import ResetCode from './Components/ResetCode/ResetCode.jsx';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><Wishlist /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'forgotPasswords', element: <ProtectRoute><ForgetPass /></ProtectRoute> },
      { path: 'verifyResetCode', element: <ProtectRoute><ResetCode /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: 'allorders', element: <ProtectRoute><AllOrders /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'productdetails/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
        <CartContextProvider>
          <WishlistContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers} />
          <ReactQueryDevtools />
          <Toaster />
        </UserContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>

    </QueryClientProvider>
  );
}

export default App;
