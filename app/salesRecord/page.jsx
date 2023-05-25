import React from "react";
import Link from "next/link";

export default function NotificationPage() {
  return (
    <div className="auto auto auto auto">
      <header>
        <nav className="bg-gradient-to-r from-orange-300 to-orange-800 p-3 shadow-md">
          <ul className="flex justify-center space-x-8 text-white text-base font-medium">
            <li className="hover:text-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
              <Link href="/start">Inicio</Link>
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
      <h1 className="text-3xl font-bold mb-4">Registro de ventas</h1>
      <p className="text-gray-600 mb-4">
        Aquí se encontrará todos los registros de ventas.
      </p>
    </div>
  );
}