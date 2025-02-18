"use client"
import { useState } from "react"
import { auth, db } from "../../firebase/config"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await setDoc(doc(db, "usuarios", user.uid), {
          email: user.email,
          role: "user",
        })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push("/")
    } catch (err) {
      let errorMessage = "Ha ocurrido un error. Por favor, intenta de nuevo."

      switch (err.code) {
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido."
          break
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada."
          break
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico."
          break
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta."
          break
        case "auth/email-already-in-use":
          errorMessage = "Ya existe una cuenta con este correo electrónico."
          break
        case "auth/weak-password":
          errorMessage = "La contraseña debe tener al menos 6 caracteres."
          break
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE9D5] px-4">
      <Card className="w-full max-w-md bg-[#f8f6f1]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#27445D]">
            {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </CardTitle>
          <CardDescription className="text-center text-[#27445D]">
            {isRegistering ? "Ingresa tus datos para crear una cuenta" : "Ingresa tus credenciales para acceder"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#27445D] hover:bg-[#1a2c3d] text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : isRegistering ? (
                "Registrarse"
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-[#27445D] hover:text-[#32413f]"
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError("")
            }}
          >
            {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

