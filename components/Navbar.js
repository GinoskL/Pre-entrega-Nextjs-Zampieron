"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/app/context/CartContext"
import { UserMenu } from "./user-menu"

const routes = [
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Admin", path: "/admin" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useCart()
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    setCartItemCount(totalItems)
  }, [cart])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#27445D] text-white">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#27445D] text-white">
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1 text-lg hover:text-[#71BBB2] transition-colors"
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">TechStore</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => (
            <Link key={route.path} href={route.path} className="transition-colors hover:text-[#71BBB2]">
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <UserMenu />
          <Button variant="ghost" size="icon" asChild className="text-white hover:text-[#32413f] relative">
            <Link href="/carrito">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#71BBB2] text-[#27445D] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

