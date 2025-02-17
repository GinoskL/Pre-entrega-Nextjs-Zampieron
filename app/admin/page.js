"use client"
import { useEffect, useState } from "react"
import { auth, db } from "../../firebase/config"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Admin() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [categoria, setCategoria] = useState("Dispositivos Electrónicos")
  const [editingProduct, setEditingProduct] = useState(null)
  const [notification, setNotification] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          router.push("/login")
        } else {
          setUser(currentUser)
          const userRef = doc(db, "usuarios", currentUser.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists() && userSnap.data().role === "admin") {
            setIsAdmin(true)
          } else {
            router.push("/")
          }
        }
      })
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const fetchProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, "productos"))
      setProductos(productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    fetchProductos()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const agregarProducto = async (e) => {
    e.preventDefault()
    if (!nombre || !descripcion || !precio) {
      showNotification("Todos los campos son obligatorios.", "error")
      return
    }
    try {
      if (editingProduct) {
        await updateDoc(doc(db, "productos", editingProduct.id), {
          name: nombre,
          description: descripcion,
          price: Number.parseFloat(precio),
          category: categoria,
        })
        setProductos(
          productos.map((p) =>
            p.id === editingProduct.id
              ? { ...p, name: nombre, description: descripcion, price: Number.parseFloat(precio), category: categoria }
              : p,
          ),
        )
      } else {
        const docRef = await addDoc(collection(db, "productos"), {
          name: nombre,
          description: descripcion,
          price: Number.parseFloat(precio),
          category: categoria,
        })
        setProductos([
          ...productos,
          {
            id: docRef.id,
            name: nombre,
            description: descripcion,
            price: Number.parseFloat(precio),
            category: categoria,
          },
        ])
      }
      showNotification(editingProduct ? "Producto actualizado con éxito" : "Producto agregado con éxito")
      setNombre("")
      setDescripcion("")
      setPrecio("")
      setCategoria("Dispositivos Electrónicos")
      setEditingProduct(null)
    } catch (error) {
      console.error("❌ Error al agregar producto:", error)
      showNotification("Hubo un problema al guardar el producto.", "error")
    }
  }

  const editarProducto = (producto) => {
    setEditingProduct(producto)
    setNombre(producto.name)
    setDescripcion(producto.description)
    setPrecio(producto.price.toString())
    setCategoria(producto.category)
  }

  const eliminarProducto = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteDoc(doc(db, "productos", id))
      setProductos(productos.filter((p) => p.id !== id))
      showNotification("Producto eliminado con éxito")
    }
  }

  if (!user) return <p className="text-center text-[#EFE9D5]">Cargando...</p>
  if (!isAdmin) return <p className="text-center text-[#EFE9D5]">No tienes permisos para acceder a esta página.</p>

  return (
    <div className="p-6 min-h-screen bg-[#1B344B] text-[#EFE9D5]">
      {notification && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-md ${notification.type === "error" ? "bg-red-500" : "bg-green-500"} text-white`}
        >
          {notification.message}
        </div>
      )}

      <Card className="bg-[#497D74] mb-8">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">Panel de Administración</h2>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Bienvenido, <span className="font-semibold">{user.email}</span>
          </p>
          <Button variant="destructive" className="mx-auto block" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-[#497D74]">
          <CardHeader>
            <h2 className="text-2xl font-bold">{editingProduct ? "Editar Producto" : "Agregar Producto"}</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={agregarProducto} className="space-y-4">
              <Input
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="bg-[#71BBB2] text-[#27445D] placeholder-[#27445D]"
              />
              <Textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="bg-[#71BBB2] text-[#27445D] placeholder-[#27445D]"
              />
              <Input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="bg-[#71BBB2] text-[#27445D] placeholder-[#27445D]"
              />
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger className="bg-[#71BBB2] text-[#27445D]">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dispositivos Electrónicos">Dispositivos Electrónicos</SelectItem>
                  <SelectItem value="Periféricos">Periféricos</SelectItem>
                  <SelectItem value="Accesorios">Accesorios</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full bg-[#EFE9D5] text-[#27445D] hover:bg-[#FFF4D9]">
                {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#497D74]">
          <CardHeader>
            <h2 className="text-2xl font-bold">Productos en la Tienda</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {productos.map((producto) => (
                <li
                  key={producto.id}
                  className="bg-[#71BBB2] text-[#27445D] p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{producto.name}</h3>
                    <p className="text-sm">
                      {producto.category} - ${producto.price}
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" onClick={() => editarProducto(producto)} className="mr-2">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => eliminarProducto(producto.id)}>
                      Eliminar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

