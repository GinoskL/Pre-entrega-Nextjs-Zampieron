// Componente de Catálogo con Estilos Mejorados
'use client';
import { productos } from "../../mock/data";
import { useState } from "react";

export default function Catalogo() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.nombre} agregado al carrito!`);
  };

  const categorias = ["Electrónica", "Ropa", "Hogar"];

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* Sección de Categorías */}
      <aside className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Categorías</h2>
        <ul className="space-y-2">
          {categorias.map((categoria, index) => (
            <li key={index}>
              <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                {categoria}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sección de Productos */}
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Catálogo de Productos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-lg shadow-md p-4 transform transition hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700">{producto.nombre}</h2>
              <p className="text-gray-600">${producto.precio}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
