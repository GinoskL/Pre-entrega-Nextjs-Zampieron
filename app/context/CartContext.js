"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null); // 🔔 Notificación

  // Agregar producto al carrito con cantidad y uniqueId
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity, uniqueId: `${product.id}-${Date.now()}` },
        ];
      }
    });

    // 🔔 Notificación de producto agregado
    setNotification({ product, quantity });
    setTimeout(() => setNotification(null), 5000);
  };

  // Eliminar un producto del carrito (opción de eliminar toda la cantidad)
  const removeFromCart = (uniqueId, eliminarTodo = false) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: eliminarTodo ? 0 : item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Elimina los productos con cantidad 0
    );
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener el total del carrito (precio total)
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Obtener el total de productos en el carrito
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        cartItemCount,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
