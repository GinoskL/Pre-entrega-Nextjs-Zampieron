"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("Dispositivos Electrónicos");
  const [showNotification, setShowNotification] = useState(false); // Estado para notificación

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          router.push("/login");
        } else {
          setUser(currentUser);
          const userRef = doc(db, "usuarios", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().role === "admin") {
            setIsAdmin(true);
          } else {
            router.push("/");
          }
        }
      });
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, "productos"));
      setProductos(productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProductos();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !precio) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    try {
      await addDoc(collection(db, "productos"), {
        name: nombre,
        description: descripcion,
        price: parseFloat(precio),
        category: categoria,
      });

      // Mostrar la notificación
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

      // Resetear inputs
      setNombre("");
      setDescripcion("");
      setPrecio("");
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
    }
  };

  if (!user) return <p className="text-center text-[#EFE9D5]">Cargando...</p>;
  if (!isAdmin) return <p className="text-center text-[#EFE9D5]">No tienes permisos para acceder a esta página.</p>;

  return (
    <div className="p-6 min-h-screen bg-[#1B344B] text-[#EFE9D5]">
      {/* Notificación flotante */}
      {showNotification && (
        <div className="fixed top-5 right-5 bg-[#71BBB2] text-[#27445D] px-4 py-2 rounded shadow-lg">
          ✅ Producto agregado con éxito
        </div>
      )}

      <h1 className="text-3xl font-bold text-center">Panel de Administración</h1>
      <p className="mt-2 text-center">Bienvenido, <span className="font-semibold">{user.email}</span></p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition mx-auto block"
      >
        Cerrar Sesión
      </button>

      {/* 🔹 Formulario para agregar productos */}
      <div className="mt-8 bg-[#497D74] p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-center">Agregar Producto</h2>
        <form onSubmit={agregarProducto} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            className="border border-[#EFE9D5] p-2 rounded bg-[#71BBB2] text-[#27445D]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            className="border border-[#EFE9D5] p-2 rounded bg-[#71BBB2] text-[#27445D]"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="Precio"
            className="border border-[#EFE9D5] p-2 rounded bg-[#71BBB2] text-[#27445D]"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <select
            className="border border-[#EFE9D5] p-2 rounded bg-[#71BBB2] text-[#27445D]"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Dispositivos Electrónicos">Dispositivos Electrónicos</option>
            <option value="Periféricos">Periféricos</option>
          </select>
          <button className="bg-[#EFE9D5] text-[#27445D] p-2 rounded hover:bg-[#FFF4D9] transition">
            Agregar Producto
          </button>
        </form>
      </div>

      {/* 🔹 Lista de productos existentes */}
      <div className="mt-8 bg-[#497D74] p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-center">Productos en la Tienda</h2>
        <ul className="space-y-2 mt-4">
          {productos.map((producto) => (
            <li key={producto.id} className="bg-[#71BBB2] text-[#27445D] p-2 rounded shadow">
              {producto.name} - ${producto.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
