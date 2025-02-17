"use client"
import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export default function Home() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosCollection = collection(db, "productos")
      const productosSnapshot = await getDocs(productosCollection)
      const productosLista = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProductos(productosLista)
    }

    obtenerProductos()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-lg overflow-hidden mb-12 bg-[#497D74]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center">
          <div className="p-8 md:p-12 lg:p-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Bienvenido a TechStore</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Descubre lo último en tecnología y gadgets. Calidad premium, precios competitivos.
            </p>
            <Button size="lg" asChild className="bg-[#71BBB2] hover:bg-[#497D74]">
              <Link href="/catalogo">
                Comprar Ahora
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Productos Destacados */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-[#27445D]">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.length > 0 ? (
            productos.slice(0, 6).map((producto) => (
              <Card key={producto.id} className="group overflow-hidden bg-[#f8f6f1] p-4">
                <div className="aspect-square relative bg-gray-100 rounded-lg mb-4">
                  <img
                    src={producto.image || "/placeholder.svg?height=400&width=400"}
                    alt={producto.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#27445D]">{producto.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{producto.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#497D74]">${producto.price}</span>
                    <Button variant="outline" size="sm" asChild className="hover:bg-[#71BBB2] hover:text-white">
                      <Link href={`/catalogo/${producto.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">Cargando productos...</p>
          )}
        </div>
      </section>
    </div>
  )
}

