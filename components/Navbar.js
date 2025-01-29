"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo y nombre de la página */}
        <Link href="/" className="text-white text-2xl font-bold">
          Mi Tienda
        </Link>

        {/* Botón Hamburguesa para móviles */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú de navegación */}
        <ul
          className={`${
            menuAbierto ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:flex md:space-x-6`}
        >
          <li>
            <Link href="/" className="block py-2 px-4 text-white hover:text-gray-300">Inicio</Link>
          </li>
          <li>
            <Link href="/catalogo" className="block py-2 px-4 text-white hover:text-gray-300">Catálogo</Link>
          </li>
          <li>
            <Link href="/carrito" className="block py-2 px-4 text-white hover:text-gray-300">Carrito</Link>
          </li>
          <li>
            <Link href="/admin" className="block py-2 px-4 text-white hover:text-gray-300">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
