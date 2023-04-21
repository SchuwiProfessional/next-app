"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from "react";

import "styles/globals.css";
import "./custom.css";

export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productStock, setProductStock] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3002/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: productImage,
      category: productCategory,
      brand: productBrand,
      stock: productStock,
    };
    fetch("http://localhost:3002/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProducts([...products, data]); // Agregar el nuevo producto al estado de productos
      })
      .catch((error) => {
        console.error;
      });
  };

  const handleDeleteProduct = (uuid) => {
    fetch(`http://localhost:3002/delete/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProducts(products.filter((product) => product.uuid !== uuid)); // Eliminar el producto del estado de productos
      })
      .catch((error) => {
        console.error;
      });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white min-h-screen flex w-3/4">
        <div className="w-full">
          <div className="flex flex-wrap -mx-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 py-4"
              >
                <div className="border hover:shadow-lg rounded-lg overflow-hidden flex flex-col justify-between h-full">
                  <img
                    className="w-full h-48 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="px-6 py-4 flex-grow">
                    <h2 className="text-gray-900 font-bold text-2xl mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Category: {product.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Brand: {product.brand}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Stock: {product.stock}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Uuid: {product.uuid}
                    </p>
                    <div className="px-3 py-4 flex justify-between items-center">
                      <span className="text-gray-700 font-bold">
                        ${product.price}
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32 h-10">
                        Agregar al carrito
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.uuid)}
                        className="w-32 h-10"
                      >
                        Eliminar
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32 h-10"
                        onClick={() => handleEditProduct(product.uuid)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed inset-y-0 right-0 w-1/4 bg-white p-4 z-10 mt-8">
          {/* add product form */}
          <h2 className="text-gray-900 font-bold text-lg mb-2">
            Agregar Producto
          </h2>

          <form onSubmit={handleAddProduct}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nombre del producto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Descripción
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Descripción del producto"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
                type="text"
              >
                Categoría
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                placeholder="Categoría del producto"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="brand"
              >
                Marca
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="brand"
                type="text"
                placeholder="Marca del producto"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="stock"
                type="number"
              >
                Cantidad en Stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="number"
                placeholder="Cantidad en stock del producto"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                required
              />
            </div>
            {/* image */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Imagen
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="text"
                placeholder="Imagen del producto"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                required
              />
            </div>
            {/* price */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
                type="number"
                required
              >
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
            {/* button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleAddProduct}
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
