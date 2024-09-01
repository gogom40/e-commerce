import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function AllOrders() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart()
  }, []);

  return (
    <>
      <h1 className="text-3xl">All Orders</h1>
    </>
  );
}
