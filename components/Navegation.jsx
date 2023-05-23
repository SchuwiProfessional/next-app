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
      <nav className="bg-gradient-to-r from-orange-300 to-orange-800 p-3 shadow-md">
        <ul className="flex justify-center space-x-8 text-white text-base font-medium">
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/products">Productos</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/notification">Notificaciones</Link>
          </li>
          <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
            <Link href="/salesRecord">Registro de Ventas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}