import Link from "next/link";
import "tailwindcss/tailwind.css";
import Style from "../components/Navegation.module.css";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Products",
    route: "/products",
  },
  {
    label: "Notification",
    route: "/notification ",
  },
];

export default function NavigationPage() {
  return (
    <header>
      <nav className="bg-gray-100">
        <ul className="flex justify-center space-x-6 text-gray-600 text-lg font-medium py-4">
          <li className="hover:text-gray-900 transition duration-300 ease-in-out">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hover:text-gray-900 transition duration-300 ease-in-out">
            <Link href="/products">Productos</Link>
          </li>
          <li className="hover:text-gray-900 transition duration-300 ease-in-out">
            <Link href="/notification">Notificaciones</Link>
          </li>
          <li className="hover:text-gray-900 transition duration-300 ease-in-out">
            <Link href="/login">Iniciar Sesión</Link>
          </li>
          <li className="hover:text-gray-900 transition duration-300 ease-in-out">
            <Link href="/register">Registrar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
