# Proyecto Final Next.js - CoderHouse

Este es el proyecto final del curso de **Next.js** en **CoderHouse**. Se trata de una aplicación de comercio electrónico (e-commerce) desarrollada con **Next.js**, **TailwindCSS** y **Firebase**.

## 🚀 Tecnologías Utilizadas

- **Next.js 15** - Framework de React para aplicaciones web modernas.
- **React 19** - Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **TailwindCSS** - Framework CSS para estilización rápida y eficiente.
- **Firebase** - Backend como servicio para autenticación y base de datos Firestore.
- **Lucide-react** - Biblioteca de iconos para la UI.

## 📁 Estructura del Proyecto

```
ginoskl-pre-entrega-nextjs-zampieron/
├── app/                # Páginas y rutas principales
│   ├── admin/          # Panel de administración
│   ├── carrito/        # Página del carrito de compras
│   ├── catalogo/       # Listado de productos
│   ├── checkout/       # Proceso de pago
│   ├── context/        # Contexto global (Carrito de compras)
│   ├── login/          # Página de autenticación
│   ├── nosotros/       # Página informativa sobre la tienda
│   └── not-found/      # Página de error 404
├── components/         # Componentes reutilizables
├── firebase/           # Configuración de Firebase
├── lib/                # Utilidades generales
├── mock/               # Datos simulados para pruebas
├── public/             # Archivos estáticos
├── styles/             # Archivos CSS
├── .firebaserc         # Configuración de Firebase Hosting
├── package.json        # Dependencias y scripts del proyecto
├── next.config.mjs     # Configuración de Next.js
└── README.md           # Documentación del proyecto
```

## ⚙️ Instalación y Uso

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install
```

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en: [http://localhost:3000](http://localhost:3000).

## 🔑 Autenticación

El sistema de autenticación está implementado con **Firebase Authentication**. Se permite a los usuarios registrarse e iniciar sesión con email y contraseña. Además, hay un panel de administración accesible solo para usuarios con rol de **admin**.

## 🛒 Funcionalidades Principales

- **Catálogo de productos:** Listado de productos con filtrado por categoría.
- **Carrito de compras:** Añadir, eliminar y modificar cantidad de productos.
- **Checkout:** Proceso de compra con validación de datos.
- **Panel de Administración:** Gestión de productos para usuarios con permisos de administrador.
- **Autenticación:** Registro e inicio de sesión con Firebase Auth.
- **UI moderna:** Uso de TailwindCSS y componentes reutilizables para una experiencia fluida.

## 🚀 Despliegue

El proyecto puede ser desplegado fácilmente en **Vercel** con el siguiente comando:

```bash
vercel
```

También puedes revisar la documentación oficial de Next.js sobre despliegue: [Next.js Deployment](https://nextjs.org/docs/deployment)

## 📄 Licencia

Este proyecto es de uso libre y educativo para los alumnos del curso de CoderHouse.

---

_Desarrollado por **Gino Lionel Zampierón** como entrega final del curso de Next.js en CoderHouse._


