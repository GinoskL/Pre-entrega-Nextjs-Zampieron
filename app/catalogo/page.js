"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext"; // Importamos el carrito

export default function Catalogo() {
  const { addToCart } = useCart(); // Usamos el carrito
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

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

  const categorias = ["Todos", "Dispositivos Electrónicos", "Periféricos"];

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter(producto => producto.category === categoriaSeleccionada);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Catálogo de Productos</h1>

      <div className="flex justify-center gap-4 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`px-4 py-2 rounded-lg ${
              categoriaSeleccionada === categoria ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            } transition duration-300`}
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={producto.image || "/placeholder.jpg"}
              alt={producto.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">{producto.name}</h2>
              <p className="text-gray-500 text-sm">{producto.category}</p>
              <p className="text-gray-600">{producto.description}</p>
              <p className="text-gray-800 font-bold mt-2">${producto.price}</p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                onClick={() => addToCart(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
