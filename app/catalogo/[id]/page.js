"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

const ProductDetails = () => {
  const params = useParams();
  const productId = decodeURIComponent(params.id);
  const { addToCart, notification, setNotification, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("Producto no encontrado");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error obteniendo el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p className="text-center text-gray-500 text-lg mt-10">Cargando...</p>;
  if (!product) return <p className="text-center text-red-500 text-lg mt-10">Producto no encontrado</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Notificación flotante */}
      {notification && (
        <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-lg flex items-center gap-4 border-2 border-[#497D74]">
          <p className="text-[#27445D]">
            {notification.quantity}x <strong>{notification.product.name}</strong> agregado al carrito
          </p>
          <button
            onClick={() => removeFromCart(notification.product.id, true)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            ❌
          </button>
          <Link href="/carrito">
            <button className="button">🛒</button>
          </Link>
        </div>
      )}

      <div className="card max-w-2xl w-full text-[#27445D]">
        <div className="w-full flex justify-center">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-sm mt-2">{product.description}</p>
          <p className="text-sm mt-1">Categoría: {product.category}</p>
          <p className="text-3xl font-bold text-[#27445D] mt-4">${product.price}</p>
        </div>

        {/* Selector de cantidad */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-l"
            onClick={() => setCantidad((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <span className="px-4 py-2 border border-gray-300">{cantidad}</span>
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-r"
            onClick={() => setCantidad((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Botón de agregar al carrito */}
        <button
          className="mt-6 button w-full"
          onClick={() => addToCart(product, cantidad)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
