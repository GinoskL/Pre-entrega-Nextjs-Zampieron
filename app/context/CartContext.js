"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null); // 🔔 Nueva notificación

  // Agregar producto con la cantidad seleccionada
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === product.id);
      if (itemExistente) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    // 🔔 Notificación
    setNotification({ product, quantity });
    setTimeout(() => setNotification(null), 5000); // La notificación desaparece en 5s
  };

  // Eliminar 1 unidad o quitar el producto si quantity llega a 0
  const removeFromCart = (productId, eliminarTodo = false) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: eliminarTodo ? 0 : item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, notification, setNotification }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
