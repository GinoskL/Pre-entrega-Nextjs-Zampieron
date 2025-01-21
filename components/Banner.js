export default function Banner() {
    return (
      <div className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
        <h1 className="text-4xl text-white font-bold bg-black bg-opacity-50 p-4 rounded">¡Bienvenido a Mi Tienda!</h1>
      </div>
    );
  }
  