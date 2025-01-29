export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-100 py-6">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  