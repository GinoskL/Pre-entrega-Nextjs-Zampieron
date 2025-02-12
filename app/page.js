"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosLista = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosLista);
    };

    obtenerProductos();
  }, []);

  return (
    <div className="p-6 bg-[var(--primary-bg)] text-[var(--text-dark)]">
      {/* Imagen y mensaje "Somos..." */}
      <div className="relative w-full h-64 bg-[var(--card-bg)] flex items-center justify-center mb-6 rounded-lg shadow-md">
        <span className="text-3xl font-bold">Aquí irá una imagen</span>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Somos una tienda de tecnología</h1>

      {/* Sección de Productos */}
      <h2 className="text-2xl font-bold mb-6 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.length > 0 ? (
          productos.slice(0, 6).map((producto) => (
            <div key={producto.id} className="bg-[var(--card-bg)] rounded-lg shadow-md p-4 flex gap-4 items-center">
              {/* Imagen a la izquierda */}
              <img
                src={producto.image || "/placeholder.jpg"}
                alt={producto.name}
                className="w-32 h-32 object-cover rounded-lg shadow"
              />

              {/* Información del producto */}
              <div>
                <h2 className="text-lg font-semibold">{producto.name}</h2>
                <p className="text-sm">{producto.category}</p>
                <p className="text-gray-700">{producto.description}</p>
                <p className="font-bold mt-2">${producto.price}</p>
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
          <button className="bg-[var(--button-bg)] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#27445D] transition">
            Ver más productos
          </button>
        </Link>
      </div>
    </div>
  );
}
