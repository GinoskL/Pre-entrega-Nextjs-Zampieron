"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Carrito() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [notification, setNotification] = useState(null);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setNotification({ message: "El carrito está vacío", type: "error" });
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#EFE9D5] min-h-screen">
      <h1 className="text-3xl font-bold text-[#27445D] text-center mb-6">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 mt-6 text-lg">Tu carrito está vacío.</p>
      ) : (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          {cart.map((item) => (
            <div key={item.uniqueId} className="flex justify-between items-center border-b py-4">
              {/* Imagen del producto */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-[#27445D]">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-3">
                <button
                  className="bg-[#497D74] text-white px-3 py-1 rounded hover:bg-[#71BBB2] transition"
                  onClick={() => removeFromCart(item.uniqueId)}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-[#27445D]">{item.quantity}</span>
                <button
                  className="bg-[#497D74] text-white px-3 py-1 rounded hover:bg-[#71BBB2] transition"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>

              {/* Botón para eliminar SOLO este producto */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => removeFromCart(item.uniqueId, true)}
              >
                🗑
              </button>
            </div>
          ))}

          {/* Botones de Vaciar Carrito y Finalizar Compra */}
          <div className="mt-6 flex justify-between">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>
            <button
              className="bg-[#30524c] text-white px-6 py-3 rounded-lg hover:bg-[#497D74] transition"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}

      {/* Notificación estilizada */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-md text-white text-lg font-semibold transition-opacity duration-300 ${
            notification.type === "error" ? "bg-red-600" : "bg-green-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

