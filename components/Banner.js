export default function Banner() {
  return (
    <div
      className="bg-cover bg-center h-64 flex items-center justify-center rounded-lg shadow-md"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <h1 className="text-4xl text-white font-bold bg-[var(--text-dark)] bg-opacity-70 px-6 py-3 rounded-lg">
        ¡Bienvenido a Mi Tienda!
      </h1>
    </div>
  );
}
