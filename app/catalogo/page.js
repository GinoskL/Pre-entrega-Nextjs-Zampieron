'use client';
import { productos } from "../../mock/data";
import { useState } from "react";

export default function Catalogo() {
  const [carrito, setCarrito] = useState([]);  

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);  
    alert(`${producto.nombre} agregado al carrito!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">${producto.precio}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
