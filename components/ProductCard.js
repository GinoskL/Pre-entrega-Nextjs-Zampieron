import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-[#EFE9D5] shadow-lg rounded-lg p-5 text-[#27445D] hover:scale-105 transition-transform duration-200">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      <Link href={`/catalogo/${product.id}`}>
        <button className="mt-4 w-full bg-[#497D74] text-white py-2 px-4 rounded-lg hover:bg-[#71BBB2] transition">
          Ver Producto
        </button>
      </Link>
    </div>
  );
}
