import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProductCard({ product }) {
  return (
    <Card className="group overflow-hidden bg-white p-4">
      <div className="aspect-square relative bg-gray-100 rounded-lg mb-4">
        <img
          src={product.image || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[#27445D]">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#497D74]">${product.price}</span>
          <Button variant="outline" size="sm" asChild className="hover:bg-[#71BBB2] hover:text-white">
            <Link href={`/catalogo/${product.id}`}>Ver Detalles</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

