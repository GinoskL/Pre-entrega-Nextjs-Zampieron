import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { productos } from "../mock/data";

export default function Home() {
    return (
        <div>
            <Banner />
            <h1 className="text-2xl font-bold my-6 text-center">Productos Destacados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            {productos.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
            ))}
        </div>
    );
}

 