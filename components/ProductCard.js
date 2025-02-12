import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-[var(--card-bg)] shadow-lg rounded-lg p-5 text-[var(--text-dark)]">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
      <p className="text-lg font-bold">${product.price}</p>
      <Link href={`/catalogo/${product.id}`}>
        <button className="mt-4 w-full bg-[var(--button-bg)] text-white py-2 px-4 rounded-lg hover:bg-[#27445D] transition">
          Ver Producto
        </button>
      </Link>
    </div>
  );
}
