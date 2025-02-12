"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          router.push("/login"); // Si no hay usuario, lo manda a login
        } else {
          setUser(currentUser);

          // 🔹 Revisamos si el usuario es admin en Firestore
          const userRef = doc(db, "usuarios", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().role === "admin") {
            setIsAdmin(true);
          } else {
            router.push("/"); // 🔥 Si no es admin, lo manda a la página principal
          }
        }
      });
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) return <p>Cargando...</p>;
  if (!isAdmin) return <p>No tienes permisos para acceder a esta página.</p>;

  return (
    <div className="p-6 text-center bg-[var(--primary-bg)] min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--text-dark)]">Panel de Administración</h1>
      <p className="mt-2">Bienvenido, <span className="font-semibold">{user.email}</span></p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
