'use client';
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marca que el cliente está listo
  }, []);

  if (!isClient) return null; // No renderiza nada hasta que el cliente esté listo

  return (
    <nav className="bg-blue-600 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-10" />

        {/* Botón Hamburguesa */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuAbierto ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú */}
        <ul
          className={`${
            menuAbierto ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-blue-600 md:static md:flex md:space-x-6 md:w-auto md:top-0`}
        >
          <li className="border-b md:border-none">
            <a
              href="/"
              className="block py-2 px-4 text-white hover:text-gray-300"
            >
              Inicio
            </a>
          </li>
          <li className="border-b md:border-none">
            <a
              href="/catalogo"
              className="block py-2 px-4 text-white hover:text-gray-300"
            >
              Catálogo
            </a>
          </li>
          <li className="border-b md:border-none">
            <a
              href="/carrito"
              className="block py-2 px-4 text-white hover:text-gray-300"
            >
              Carrito
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
