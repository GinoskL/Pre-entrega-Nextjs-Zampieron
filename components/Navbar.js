"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-[var(--text-dark)] shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo y nombre de la página */}
        <Link href="/" className="text-[var(--primary-bg)] text-2xl font-bold">
          Mi Tienda
        </Link>

        {/* Botón Hamburguesa para móviles */}
        <button
          className="block md:hidden text-[var(--primary-bg)] focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú de navegación */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-[var(--text-dark)] md:flex md:space-x-6
            ${menuAbierto ? "block" : "hidden"} md:block transition-all`}
        >
          {[
            { name: "Inicio", href: "/" },
            { name: "Catálogo", href: "/catalogo" },
            { name: "Carrito", href: "/carrito" },
            { name: "Admin", href: "/admin" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block py-3 px-6 text-[var(--primary-bg)] hover:text-[var(--card-bg)] transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
