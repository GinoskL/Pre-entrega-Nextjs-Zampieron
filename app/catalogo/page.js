"use client"
import { useState, useEffect } from "react"
import { db } from "../../firebase/config"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const categorias = ["Todos", "Dispositivos Electrónicos", "Periféricos"]

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
        <h1 className="text-3xl font-bold text-[#27445D] mb-8 text-center">Catálogo de Productos</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de categorías y filtros */}
          <aside className="w-full md:w-1/4 bg-[#447cad] p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-[#27445D] mb-4">Filtros</h2>

            {/* Búsqueda */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-[#27445D] mb-1">
                Buscar
              </label>
              <div className="relative">
                <Input
                  type="text"
                  id="search"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-[#27445D] placeholder-[#497D74] border-[#497D74]"
                />
                <Search className="absolute right-3 top-2.5 text-[#497D74]" size={20} />
              </div>
            </div>

            {/* Categorías */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-[#27445D]">Categorías</h3>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    variant={categoriaSeleccionada === categoria ? "default" : "outline"}
                    className={`w-full justify-start ${
                      categoriaSeleccionada === categoria
                        ? "bg-[#27445D] text-[#EFE9D5]"
                        : "bg-[#EFE9D5] text-[#27445D] border-[#27445D] hover:bg-[#71BBB2] hover:text-[#27445D]"
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
              <h3 className="font-semibold mb-2 text-[#27445D]">Ordenar por</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full text-[#27445D] border-[#497D74]">
                  <SelectValue placeholder="Seleccionar orden" />
                </SelectTrigger>
                <SelectContent className="bg-[#EFE9D5] text-[#27445D]">
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </aside>

          {/* Sección de productos */}
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-[#f8f5ec] rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
                  >
                    <img
                      src={producto.image || "/placeholder.jpg"}
                      alt={producto.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-[#27445D] mb-2">{producto.name}</h2>
                      <p className="text-[#497D74] text-sm mb-2">{producto.category}</p>
                      <p className="text-[#27445D] font-bold mb-4">${producto.price.toFixed(2)}</p>
                      <div className="flex justify-between items-center">
                        <Link href={`/catalogo/${producto.id}`}>
                          <Button
                            variant="outline"
                            className="text-[#27445D] border-[#27445D] hover:bg-[#71BBB2] hover:text-white"
                          >
                            Ver detalles
                          </Button>
                        </Link>
                        <Button
                          onClick={() => addToCart(producto)}
                          variant="default"
                          className="bg-[#27445D] text-white hover:bg-[#497D74]"
                        >
                          Agregar al carrito
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-[#27445D] col-span-full">
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

