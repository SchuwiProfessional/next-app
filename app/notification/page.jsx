import React from "react";

export default function NotificationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Notificaciones</h1>
      <p className="text-gray-600 mb-4">
        Aquí encontrarás las últimas promociones y los repuestos que se están
        agotando.
      </p>
      <div className="border border-gray-300 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Promociones</h2>
        <ul className="list-disc pl-4">
          <li>Descuento del 10% en todos los frenos</li>
          <li>Gratis instalación de baterías</li>
        </ul>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Repuestos agotándose</h2>
        <ul className="list-disc pl-4">
          <li>Filtro de aceite</li>
          <li>Correa de alternador</li>
        </ul>
      </div>
    </div>
  );
}
