"use client"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Plus, Minus, Trash2, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Carrito() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  const router = useRouter()
  const [notification, setNotification] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCheckout = () => {
    if (cart.length === 0) {
      setNotification({ message: "El carrito está vacío", type: "error" })
      return
    }
    router.push("/checkout")
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const envio = cart.length > 0 ? 10 : 0
  const total = subtotal + envio

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="h-6 w-6 text-[#71BBB2] mr-2" />
          <h1 className="text-3xl font-bold text-[#27445D]">Carrito de Compras</h1>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center p-8 border-0 shadow-lg bg-white">
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-[#27445D]">Tu carrito está vacío</h2>
              <p className="text-gray-500">¡Explora nuestro catálogo y encuentra productos increíbles!</p>
              <Button className="bg-[#71BBB2] hover:bg-[#497D74] mt-4" onClick={() => router.push("/catalogo")}>
                Ir al catálogo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="bg-[#EFE9D5] rounded-t-lg">
                  <CardTitle className="text-[#27445D]">Productos en tu carrito</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {cart.map((item) => (
                    <div
                      key={item.uniqueId}
                      className="py-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-24 w-24 rounded-lg border border-gray-100 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#27445D] truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#71BBB2] text-[#71BBB2] hover:bg-[#71BBB2] hover:text-white"
                          onClick={() => removeFromCart(item.uniqueId)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-[#71BBB2] text-[#71BBB2] hover:bg-[#71BBB2] hover:text-white"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromCart(item.uniqueId, true)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg justify-between">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vaciar carrito
                  </Button>
                  <Link href="/catalogo">
                    <Button
                      variant="outline"
                      className="border-[#71BBB2] text-[#71BBB2] hover:bg-[#71BBB2] hover:text-white"
                    >
                      Seguir comprando
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-lg bg-white sticky top-4">
                <CardHeader className="bg-[#EFE9D5] rounded-t-lg">
                  <CardTitle className="text-[#27445D]">Resumen de compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío estimado</span>
                      <span>${envio.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg font-bold text-[#27445D]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg">
                  <Button className="w-full bg-[#71BBB2] hover:bg-[#497D74]" onClick={handleCheckout}>
                    Finalizar compra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            {notification.message}
          </div>
        )}
      </div>
    </div>
  )
}

