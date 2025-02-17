"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { db } from "../../../firebase/config"
import { doc, getDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProductDetails = () => {
  const params = useParams()
  const productId = decodeURIComponent(params.id)
  const { addToCart, notification, setNotification, removeFromCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", productId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() })
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error("Error obteniendo el producto:", error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) return <p className="text-center text-[#497D74] text-lg mt-10">Cargando...</p>
  if (!product) return <p className="text-center text-red-500 text-lg mt-10">Producto no encontrado</p>

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-[#EFE9D5]">
      {/* Notificación flotante */}
      {notification && (
        <div className="fixed top-4 right-4 bg-[#71BBB2] text-[#27445D] px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 border border-[#497D74] z-50">
          <p>
            {notification.quantity}x <strong>{notification.product.name}</strong> agregado al carrito
          </p>
          <Button onClick={() => removeFromCart(notification.product.id, true)} variant="destructive" size="sm">
            Deshacer
          </Button>
          <Link href="/carrito">
            <Button variant="secondary" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ver carrito
            </Button>
          </Link>
        </div>
      )}

      {/* Tarjeta del producto */}
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <Link href="/catalogo" className="inline-flex items-center text-[#497D74] hover:text-[#27445D] mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0">
            <h1 className="text-3xl font-semibold text-[#27445D]">{product.name}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-sm mt-1 font-semibold text-[#497D74]">Categoría: {product.category}</p>
            <p className="text-4xl font-bold text-[#497D74] mt-4">${product.price}</p>

            {/* Selector de cantidad */}
            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setCantidad((prev) => Math.max(prev - 1, 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-6 py-2 border border-[#497D74] text-lg font-semibold rounded-md">{cantidad}</span>
              <Button variant="outline" size="icon" onClick={() => setCantidad((prev) => prev + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Botón de agregar al carrito */}
            <Button
              className="mt-6 w-full bg-[#27445D] text-white hover:bg-[#142431] transition"
              size="lg"
              onClick={() => addToCart(product, cantidad)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

