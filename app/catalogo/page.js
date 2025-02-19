"use client"
import { useState, useEffect } from "react"
import { db } from "../../firebase/config"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { Search, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Catalogo() {
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const { addToCart } = useCart()

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

  const categorias = ["Todos", "Dispositivos Electrónicos", "Periféricos", "Accesorios"]

  const productosFiltrados = productos
    .filter((producto) => (categoriaSeleccionada === "Todos" ? true : producto.category === categoriaSeleccionada))
    .filter((producto) => producto.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price") return a.price - b.price
      return 0
    })

  return (
    <div className="p-6 bg-[#EFE9D5] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#27445D] mb-8 text-center">Catálogo de Productos</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de categorías y filtros */}
          <aside className="w-full lg:w-1/4 bg-[#447cad] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Filtros</h2>

            {/* Búsqueda */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-white mb-2">
                Buscar
              </label>
              <div className="relative">
                <Input
                  type="text"
                  id="search"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white text-[#27445D] placeholder-[#497D74] border-[#497D74]"
                />
                <Search className="absolute right-3 top-2.5 text-[#497D74]" size={20} />
              </div>
            </div>

            {/* Categorías */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-white">Categorías</h3>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={categoriaSeleccionada === categoria ? "default" : "outline"}
                    className={`w-full justify-start ${
                      categoriaSeleccionada === categoria
                        ? "bg-[#27445D] text-white"
                        : "bg-white text-[#27445D] border-[#27445D] hover:bg-[#71BBB2] hover:text-white"
                    }`}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </div>

            {/* Ordenar por */}
            <div>
              <h3 className="font-semibold mb-3 text-white">Ordenar por</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-white text-[#27445D] border-[#497D74]">
                  <SelectValue placeholder="Seleccionar orden" />
                </SelectTrigger>
                <SelectContent className="bg-white text-[#27445D]">
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </aside>

          {/* Sección de productos */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <Card
                    key={producto.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={producto.image || "/placeholder.jpg"}
                        alt={producto.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <Badge className="absolute top-2 right-2 bg-[#71BBB2] text-white">{producto.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold text-[#27445D] mb-2 truncate">{producto.name}</h2>
                      <p className="text-[#27445D] font-bold text-2xl mb-4">${producto.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
                      <Link href={`/catalogo/${producto.id}`}>
                        <Button
                          variant="outline"
                          className="text-[#27445D] border-[#27445D] hover:bg-[#71BBB2] hover:text-white"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver detalles
                        </Button>
                      </Link>
                      <Button
                        onClick={() => addToCart(producto)}
                        variant="default"
                        className="bg-[#27445D] text-white hover:bg-[#497D74]"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-center text-[#27445D] col-span-full text-xl">
                  No hay productos que coincidan con tu búsqueda.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

