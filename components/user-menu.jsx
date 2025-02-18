"use client"

import { useState, useEffect } from "react"
import { auth } from "@/firebase/config"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function UserMenu() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-[#32413f]">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-[#27445D] text-white border-[#71BBB2]">
        {user ? (
          <>
            <DropdownMenuItem className="text-sm font-medium text-white/70">{user.email}</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-white hover:text-[#71BBB2] hover:bg-[#1a2c3d] cursor-pointer"
            >
              Cerrar Sesión
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login" className="text-white hover:text-[#71BBB2] hover:bg-[#1a2c3d] cursor-pointer w-full">
              Iniciar Sesión
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

