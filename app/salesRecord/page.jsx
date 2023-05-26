import React from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";  

export default function NotificationPage() {
  return (
    <>
      <Navbar />      
      <div className="container mx-auto px-4 py-8">        
        <h1 className="text-3xl font-bold mb-4">Registro de ventas</h1>
        <p className="text-gray-600 mb-4">
          Aquí se encontrará todos los registros de ventas.
        </p>        
      </div>
    </>
  );
}