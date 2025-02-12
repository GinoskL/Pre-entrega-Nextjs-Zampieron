"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para el menú en móviles

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

  const categorias = ["Todos", "Dispositivos Electrónicos", "Periféricos"];

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((producto) => producto.category === categoriaSeleccionada);

  return (
    <div className="p-6 bg-[var(--primary-bg)] min-h-screen flex flex-col md:flex-row gap-6">
      {/* Botón menú hamburguesa (solo en móviles) */}
      <button
        className="md:hidden bg-[var(--button-bg)] text-white px-4 py-2 rounded-lg"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "Cerrar Categorías" : "Ver Categorías"}
      </button>

      {/* Sidebar de categorías (visible en desktop, hamburguesa en móvil) */}
      <aside
        className={`${
          menuAbierto ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-[var(--card-bg)] p-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">Categorías</h2>
        <ul className="space-y-2">
          {categorias.map((categoria) => (
            <li key={categoria}>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${
                  categoriaSeleccionada === categoria
                    ? "bg-[var(--button-bg)] text-white"
                    : "bg-gray-200 text-[var(--text-dark)]"
                } hover:bg-[var(--button-bg)] hover:text-white transition`}
                onClick={() => {
                  setCategoriaSeleccionada(categoria);
                  setMenuAbierto(false); // Cerrar menú en móviles al seleccionar
                }}
              >
                {categoria}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sección de productos */}
      <main className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-6 text-center">Catálogo de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden p-4 transform transition duration-300 hover:scale-105"
              >
                <img
                  src={producto.image || "/placeholder.jpg"}
                  alt={producto.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold text-[var(--text-dark)] mt-2">{producto.name}</h2>
                <p className="text-gray-500 text-sm">{producto.category}</p>
                <p className="text-gray-800 font-bold mt-2">${producto.price}</p>

                {/* Botón para ver detalles */}
                <Link href={`/catalogo/${producto.id}`} className="block mt-4">
                  <button className="w-full bg-[var(--button-bg)] text-white px-4 py-2 rounded-lg hover:bg-[#27445D] transition">
                    Ver detalles
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No hay productos en esta categoría.</p>
          )}
        </div>
      </main>
    </div>
  );
}
