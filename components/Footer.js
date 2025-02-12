export default function Footer() {
  return (
    <footer className="bg-[var(--text-dark)] text-[var(--primary-bg)] py-6 text-center">
      <p>© {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
    </footer>
  );
}
