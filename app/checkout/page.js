"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [ordenId, setOrdenId] = useState("");

  const confirmarCompra = async () => {
    if (!nombre || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    const orden = {
      cliente: { nombre, email },
      productos: cart.map((item) => ({
        id: item.id || "sin-id",
        nombre: item.name || "Producto sin nombre",
        precio: item.price ? Number(item.price).toFixed(2) : "0.00",
        cantidad: item.quantity || 1,
      })),
      total: cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toFixed(2),
      fecha: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "ordenes"), orden);
      setOrdenId(docRef.id);
      setModal(true);
      setError("");
      clearCart();
    } catch (error) {
      setError("Hubo un problema al procesar tu compra. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#EFE9D5] min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-[#27445D] text-center">Finalizar Compra</h1>

      {error && <div className="bg-red-200 text-red-800 p-3 rounded-md mt-4 text-center">{error}</div>}

      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        {cart.map((item, index) => (
          <div key={item.id || index} className="flex justify-between border-b py-4">
            <div>
              <h2 className="text-lg font-semibold">{item.name || "Producto sin nombre"}</h2>
              <p className="text-gray-600">Cantidad: {item.quantity || 1}</p>
              <p className="text-gray-800 font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
            </div>
          </div>
        ))}

        <p className="text-xl font-bold text-right mt-4">
          Total: ${cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toFixed(2)}
        </p>
      </div>

      <div className="mt-6">
        <input type="text" placeholder="Tu Nombre" className="w-full p-2 mb-4 border rounded-lg" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Tu Correo" className="w-full p-2 mb-4 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button className="w-full bg-[#497D74] text-white py-3 rounded-lg hover:bg-[#27445D] transition" onClick={confirmarCompra}>
          Confirmar Compra
        </button>
      </div>

      {/* 🔹 Modal de Confirmación */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-[#27445D]">¡Compra Confirmada!</h2>
            <p className="text-gray-600 mt-2">Tu orden ha sido procesada con éxito.</p>
            <p className="text-gray-800 font-bold">ID de Orden: {ordenId}</p>
            <button className="mt-4 bg-[#497D74] text-white px-6 py-2 rounded-lg hover:bg-[#27445D] transition" onClick={() => setModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

