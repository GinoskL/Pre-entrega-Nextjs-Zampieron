"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase/config"; // Importamos Firebase
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"; // Para navegación en Next.js

export default function Home() {
  const [productos, setProductos] = useState([]);

  // Función para obtener productos desde Firestore
  useEffect(() => {
    const obtenerProductos = async () => {
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosLista = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosLista);
    };

    obtenerProductos();
  }, []);

  return (
    <div className="p-6">
      {/* Imagen y mensaje "Somos..." */}
      <div className="relative w-full h-64 bg-gray-300 flex items-center justify-center mb-6">
        {/* Aquí se agregará la imagen cuando la tengas */}
        <span className="text-2xl text-gray-700 font-semibold">Aquí irá una imagen</span>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Somos una tienda de tecnología</h1>

      {/* Sección de Productos */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {productos.length > 0 ? (
          productos.slice(0, 6).map((producto) => ( // Mostramos solo 6 productos
            <div key={producto.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4 items-center">
              {/* Imagen a la izquierda */}
              <img
                src={producto.image || "/placeholder.jpg"} // Imagen por defecto si no hay imagen en Firestore
                alt={producto.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* Información del producto */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{producto.name}</h2>
                <p className="text-gray-500 text-sm">{producto.category}</p>
                <p className="text-gray-600">{producto.description}</p>
                <p className="text-gray-800 font-bold mt-2">${producto.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Cargando productos...</p>
        )}
      </div>

      {/* Botón para ir al catálogo */}
      <div className="text-center mt-8">
        <Link href="/catalogo">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
            Ver más productos
          </button>
        </Link>
      </div>
    </div>
  );
}
