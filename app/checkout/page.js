"use client"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { db } from "../../firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Package, CreditCard, User, Mail, Phone, MapPin } from "lucide-react"

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [ordenId, setOrdenId] = useState("")
  const [modal, setModal] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const subtotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
  const envio = subtotal > 0 ? 10 : 0
  const total = subtotal + envio

  const confirmarCompra = async () => {
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
      setError("Por favor completa todos los campos requeridos.")
      return
    }

    if (cart.length === 0) {
      setError("El carrito está vacío.")
      return
    }

    setLoading(true)
    setError("")

    const orden = {
      cliente: formData,
      productos: cart.map((item) => ({
        id: item.id || "sin-id",
        nombre: item.name || "Producto sin nombre",
        precio: item.price ? Number(item.price).toFixed(2) : "0.00",
        cantidad: item.quantity || 1,
      })),
      subtotal: subtotal.toFixed(2),
      envio: envio.toFixed(2),
      total: total.toFixed(2),
      fecha: serverTimestamp(),
    }

    try {
      const docRef = await addDoc(collection(db, "ordenes"), orden)
      setOrdenId(docRef.id)
      setModal(true)
      clearCart()
    } catch (error) {
      setError("Hubo un problema al procesar tu compra. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#27445D] text-center mb-8">Finalizar Compra</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Formulario de Datos */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="bg-[#EFE9D5] rounded-t-lg">
              <CardTitle className="text-[#27445D]">Información de Contacto</CardTitle>
              <CardDescription>Ingresa tus datos para procesar el pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[#71BBB2]" />
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="pl-9 border-gray-200 focus:border-[#71BBB2] focus:ring-[#71BBB2]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#71BBB2]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-9 border-gray-200 focus:border-[#71BBB2] focus:ring-[#71BBB2]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-[#71BBB2]" />
                  <Input
                    id="telefono"
                    name="telefono"
                    placeholder="+54 11 1234-5678"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="pl-9 border-gray-200 focus:border-[#71BBB2] focus:ring-[#71BBB2]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección de envío</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#71BBB2]" />
                  <Input
                    id="direccion"
                    name="direccion"
                    placeholder="Calle 123, Ciudad"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="pl-9 border-gray-200 focus:border-[#71BBB2] focus:ring-[#71BBB2]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de Compra */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="bg-[#EFE9D5] rounded-t-lg">
                <CardTitle className="text-[#27445D]">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Resumen del Pedido
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {cart.map((item) => (
                  <div key={item.uniqueId} className="flex justify-between py-2">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-lg border border-gray-100 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#27445D]">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-[#27445D]">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator className="bg-gray-200" />
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>${envio.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="flex justify-between text-lg font-bold text-[#27445D]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 rounded-b-lg">
                <Button
                  className="w-full bg-[#71BBB2] hover:bg-[#497D74] transition-colors"
                  onClick={confirmarCompra}
                  disabled={loading}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {loading ? "Procesando..." : "Confirmar Compra"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full border-0 shadow-xl">
            <CardHeader className="bg-[#EFE9D5] rounded-t-lg">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle2 className="h-8 w-8 text-[#71BBB2]" />
                <CardTitle className="text-[#27445D]">¡Compra Confirmada!</CardTitle>
              </div>
              <CardDescription className="text-center">Tu pedido ha sido procesado con éxito</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">ID de Orden:</p>
                <p className="font-mono font-medium text-[#27445D]">{ordenId}</p>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Recibirás un correo electrónico con los detalles de tu compra
              </p>
            </CardContent>
            <CardFooter className="flex gap-4 justify-center bg-gray-50 rounded-b-lg">
              <Button
                variant="outline"
                onClick={() => {
                  setModal(false)
                  router.push("/")
                }}
                className="border-[#71BBB2] text-[#27445D] hover:bg-[#EFE9D5]"
              >
                Volver al inicio
              </Button>
              <Button
                className="bg-[#71BBB2] hover:bg-[#497D74]"
                onClick={() => {
                  setModal(false)
                  router.push("/catalogo")
                }}
              >
                Seguir comprando
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

