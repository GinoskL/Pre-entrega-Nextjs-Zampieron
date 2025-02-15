"use client";
import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "usuarios", user.uid), {
          email: user.email,
          role: "user",
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/admin");
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-bg)]">
      <div className="bg-[var(--card-bg)] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-[var(--text-dark)] mb-4 text-center">
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-[var(--button-bg)] text-white py-2 rounded-lg hover:bg-[#27445D] transition">
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <button
          className="w-full mt-4 text-[var(--text-dark)] underline"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
}

