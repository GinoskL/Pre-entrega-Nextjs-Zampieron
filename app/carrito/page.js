"use client";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between bg-white p-4 rounded-lg shadow-md mb-4">
              <p>{item.name}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Vaciar carrito</button>
        </>
      )}
    </div>
  );
}
