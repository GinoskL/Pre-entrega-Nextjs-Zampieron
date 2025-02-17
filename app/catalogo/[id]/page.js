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
    <div className="flex justify-center items-center min-h-screen p-6 bg-[#EFE9D5]">
      {/* 🔹 Notificación flotante mejorada */}
      {notification && (
        <div className="fixed top-4 right-4 bg-[#71BBB2] text-[#27445D] px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 border border-[#497D74]">
          <p>
            {notification.quantity}x <strong>{notification.product.name}</strong> agregado al carrito
          </p>
          <button
            onClick={() => removeFromCart(notification.product.id, true)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            ❌
          </button>
          <Link href="/carrito">
            <button className="bg-[#497D74] text-white px-3 py-1 rounded hover:bg-[#27445D] transition">
              🛒
            </button>
          </Link>
        </div>
      )}

      {/* 🔹 Tarjeta del producto */}
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="w-full flex justify-center">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-semibold text-[#27445D]">{product.name}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-sm mt-1 font-semibold">Categoría: {product.category}</p>
          <p className="text-4xl font-bold text-[#497D74] mt-4">${product.price}</p>
        </div>

        {/* 🔹 Selector de cantidad mejorado */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            className="bg-[#497D74] text-white px-3 py-2 rounded-l hover:bg-[#294742] transition"
            onClick={() => setCantidad((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <span className="px-6 py-2 border border-[#497D74] text-lg font-semibold">{cantidad}</span>
          <button
            className="bg-[#497D74] text-white px-3 py-2 rounded-r hover:bg-[#294742] transition"
            onClick={() => setCantidad((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* 🔹 Botón de agregar al carrito mejorado */}
        <button
          className="mt-6 w-full bg-[#27445D] text-white py-3 rounded-lg hover:bg-[#142431] transition font-semibold text-lg"
          onClick={() => addToCart(product, cantidad)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

