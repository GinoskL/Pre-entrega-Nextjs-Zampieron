import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/tailwind.css";
import { CartProvider } from "./context/CartContext"; // Importamos el contexto del carrito

export const metadata = {
  title: "Mi Tienda",
  description: "E-commerce creado con Next.js y TailwindCSS",
};

export default function Layout({ children }) {
  return (
    <CartProvider>
      <html lang="es">
        <body className="bg-gray-100 text-gray-900">
          <Navbar />
          <div className="max-w-screen-xl mx-auto px-10"> {/* Aplica el margen */}
            <main className="min-h-screen">{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
}
