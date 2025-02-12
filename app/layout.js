import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/tailwind.css";
import { CartProvider } from "./context/CartContext"; // Importamos el carrito

export const metadata = {
  title: "Mi Tienda",
  description: "E-commerce creado con Next.js y TailwindCSS",
};

export default function Layout({ children }) {
  return (
    <CartProvider>
      <html lang="es">
        <body className="bg-[var(--primary-bg)] text-[var(--text-dark)] min-h-screen amp-mask">
          <Navbar />
          <div className="max-w-screen-xl mx-auto px-6">
            <main className="min-h-screen">{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
}
