"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';

function SalesRecord() {
  const [salesData, setSalesData] = useState([]);
  //const [salesData, setSalesData] = useState({});  {} modifica cosas...
  const [selectedSale, setSelectedSale] = useState(null);
  const [productIndex, setProductIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/cart');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSalesData(data);
        } else {
          console.error('Los datos de ventas no son un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };
    

    {/* CON ESTO MASOMENOS SIRVE, SE INVOCA LA UUID.
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/cart');
        const data = await response.json();
        if (Array.isArray(data)) {
          const salesObj = {};
          data.forEach((sale) => {
            salesObj[sale.uuid] = sale;
          });
          setSalesData(salesObj);
        } else {
          console.error('Los datos de ventas no son un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };

    */}

    fetchData();
  }, []);

  const handleProductClick = (index) => {
    setProductIndex(index);
  };

  const handleRowClick = (sale) => {
    setSelectedSale(sale);
    setProductIndex(null);
    const selectedSaleData = salesData[sale.uuid];
    console.log(selectedSaleData);
  };

  return (
    <>
      <Navbar />
      <div className="my-4 mx-auto flex">
        <div className="w-4/6">
          <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Nº de Registro</th>
                <th className="px-4 py-2">Marca de Vehículo</th>
                <th className="px-4 py-2">Placa de Vehículo</th>
                <th className="px-4 py-2">DNI/RUC</th>
                <th className="px-4 py-2">Fecha de Venta</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index} onClick={() => handleRowClick(sale)}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="text-center border px-4 py-2">{sale.brand}</td>
                  <td className="text-center border px-4 py-2">{sale.plate}</td>
                  <td className="text-center border px-4 py-2">{sale.dni}</td>
                  <td className="text-center border px-4 py-2">{sale.date}</td>
                </tr>              
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/6 ml-8">
          {selectedSale && (
            <>
              <h2 className="text-xl font-bold mb-4">Nombre del Cliente: {selectedSale.name}</h2>

              <h2 className="text-xl font-bold mt-4">Total de la Venta:</h2>
              <button className="bg-red-500 text-white font-bold py-2 px-4 mt-4">
                Eliminar Registro de Venta
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SalesRecord;