"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Carrito() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--primary-bg)] min-h-screen text-[var(--text-dark)]">
      <h1 className="text-3xl font-bold text-center">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">Tu carrito está vacío.</p>
      ) : (
        <div className="mt-6 bg-[var(--card-bg)] shadow-md rounded-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-[var(--text-dark)] py-4">
              {/* Imagen del producto */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shadow"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="font-bold">${item.price}</p>
                </div>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-4">
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>

              {/* Botón para eliminar producto */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => removeFromCart(item.id, true)}
              >
                🗑
              </button>
            </div>
          ))}

          {/* Botón para vaciar carrito */}
          <div className="mt-6 flex justify-between items-center">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>

            {/* Botón para ir a pagar */}
            <Link href="/checkout">
              <button className="bg-[var(--button-bg)] text-white px-6 py-3 rounded-lg hover:bg-[#27445D] transition">
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
