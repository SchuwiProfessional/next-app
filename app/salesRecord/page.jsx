"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Navbar from "../../components/navbar";  

function SalesRecord() {
  const [salesData, setSalesData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const saleData = JSON.parse(localStorage.getItem('saleData')) || [];
    setSalesData((currentSalesData) => [...currentSalesData, ...saleData]);
  }, []);

  const handleRowClick = (sale) => {
    localStorage.setItem('selectedSale', JSON.stringify(sale)); // Cambio aquí
    setSelectedSale(sale);
  }

  return (
    <>
      <Navbar />      
      <div className="my-4 mx-2 flex">
        <div className="w-3/5">
          <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Nº de Registro</th>
                <th className="px-4 py-2">Nombre del Cliente</th>
                <th className="px-4 py-2">DNI/RUC</th>
                <th className="px-4 py-2">Fecha de Venta</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index} onClick={() => handleRowClick(sale)}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{sale.customerName}</td>
                  <td className="border px-4 py-2">{sale.customerId}</td>
                  <td className="border px-4 py-2">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/5 ml-8">
          {selectedSale && (
            <>
              <h2 className="text-xl font-bold mb-4">Detalles de la Venta</h2>
              {selectedSale.cart.map((product, index) => (
                <div key={index}>
                  {product.quantity} x {product.name}: {product.price_sell}
                </div>
              ))}
              <h2 className="text-xl font-bold mt-4">Total de la Venta: {
                selectedSale.cart.reduce((total, product) => total + product.price_sell * product.quantity, 0)
                .toLocaleString('en-US', { minimumFractionDigits: 2 })
              }</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SalesRecord;
