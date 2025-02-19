"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { db } from "../../../firebase/config"
import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ProductDetails = () => {
  const params = useParams()
  const productId = decodeURIComponent(params.id)
  const { addToCart, setNotification } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantidad, setCantidad] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", productId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() }
          setProduct(productData)
          fetchRelatedProducts(productData.category)
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

  const fetchRelatedProducts = async (category) => {
    try {
      const q = query(
        collection(db, "productos"),
        where("category", "==", category),
        where("id", "!=", productId),
        limit(4),
      )
      const querySnapshot = await getDocs(q)
      setRelatedProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error("Error obteniendo productos relacionados:", error)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, cantidad)
    setNotification({
      product: product,
      quantity: cantidad,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
  }

  if (loading) return <p className="text-center text-[#497D74] text-lg mt-10">Cargando...</p>
  if (!product) return <p className="text-center text-red-500 text-lg mt-10">Producto no encontrado</p>

  return (
    <div className="min-h-screen bg-[#EFE9D5] p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/catalogo" className="inline-flex items-center text-[#497D74] hover:text-[#27445D] mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Galería de imágenes */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.images?.[currentImageIndex] || product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images?.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - imagen ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                        index === currentImageIndex ? "ring-2 ring-[#497D74]" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Detalles del producto */}
            <div className="md:w-1/2 p-6">
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-[#27445D] mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= (product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews || 0} reseñas)</span>
              </div>
              <p className="text-2xl font-bold text-[#497D74] mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Selector de cantidad */}
              <div className="flex items-center space-x-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => setCantidad((prev) => Math.max(prev - 1, 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold">{cantidad}</span>
                <Button variant="outline" size="icon" onClick={() => setCantidad((prev) => prev + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Botón de agregar al carrito */}
              <Button
                className="w-full bg-[#27445D] text-white hover:bg-[#142431] transition"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#27445D] mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden">
                  <img
                    src={relatedProduct.image || "/placeholder.jpg"}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#27445D] mb-2 truncate">{relatedProduct.name}</h3>
                    <p className="text-[#497D74] font-bold">${relatedProduct.price.toFixed(2)}</p>
                    <Link href={`/catalogo/${relatedProduct.id}`}>
                      <Button className="w-full mt-2" variant="outline">
                        Ver detalles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails



