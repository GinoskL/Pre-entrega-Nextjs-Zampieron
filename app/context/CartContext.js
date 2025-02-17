"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null); // 🔔 Notificación

  // Agregar producto al carrito con uniqueId
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity, uniqueId: `${product.id}-${Date.now()}` }, // Genera un ID único
    ]);

    // 🔔 Notificación
    setNotification({ product, quantity });
    setTimeout(() => setNotification(null), 5000);
  };

  // Eliminar solo 1 unidad o todo el producto si eliminarTodo es true
  const removeFromCart = (uniqueId, eliminarTodo = false) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: eliminarTodo ? 0 : item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, notification, setNotification }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
