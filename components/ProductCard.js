export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <h2 className="mt-4 text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Agregar al Carrito
      </button>
    </div>
  );
}
