"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "styles/globals.css";
import "./custom.css";

export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState("");
  const [productPriceSell, setProductPriceSell] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter]=useState("");
  const [editingProductUuid, setEditingProductUuid] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3002/products");
    const data = await response.json();

    setProducts(data);
  };
  fetchProducts();
}, []);

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(filter.toLowerCase()) ||
  product.code.toLowerCase().includes(filter.toLowerCase()) ||
  product.description.toLowerCase().includes(filter.toLowerCase()) ||
  product.brand_car.toLowerCase().includes(filter.toLowerCase())
);

const handleAddProduct = (e) => {
  e.preventDefault();

  // Asegurarse de que todos los campos no estén vacíos
  if (!productImage || !productName || !productCode || !productDescription || !productBrand || !productPriceBuy || !productPriceSell || !productStock) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newProduct = {
    name: productName,
    code: productCode,
    description: productDescription,
    image: productImage,
    brand_car: productBrand,
    price_buy: productPriceBuy,
    price_sell: productPriceSell,
    stock: productStock
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

      // Agregar el producto al estado del componente
      setProducts((prevProducts) => [...prevProducts, data]);

      // Restablecer el formulario
      setProductName("");
      setProductDescription("");
      setProductCode("");
      setProductBrand("");
      setProductPriceBuy("");
      setProductPriceSell("");
      setProductStock("");
      setProductImage("");
      setIsFormVisible(false);
    })
    .catch((error) => {
      console.error;
    });
};

const handleEditProduct = (e) => {
  e.preventDefault();
  
  if (editingProductUuid) {
    const updatedProduct = {
      name: productName,
      code: productCode,
      description: productDescription,
      image: productImage,
      brand_car: productBrand,
      price_buy: productPriceBuy,
      price_sell: productPriceSell,
      stock: productStock,
    };

    fetch(`http://localhost:3002/products/${editingProductUuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        // Actualizar el producto en el estado del componente
        setProducts(products.map((product) => 
          product.uuid === editingProductUuid ? updatedProduct : product));
          
        // Restablecer el formulario y el estado de edición
        setProductName("");
        setProductDescription("");
        setProductCode("");
        setProductBrand("");
        setProductPriceBuy("");
        setProductPriceSell("");
        setProductStock("");
        setProductImage("");
        setIsFormVisible(false);
        setEditingProductUuid(null);
      })
      .catch((error) => {
        console.error;
      });
  }
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
       setProducts(products.filter((product) => product.uuid !== uuid));
    })

    .catch((error) => {
      console.error;
    });
};

const handleCartButtonClick = () => {
  setIsCartVisible(!isCartVisible);
};

const addToCart = (product) => {
  setCart((currentCart) => [...currentCart, product]);
};

function increaseQuantity(index) {
  setCart(currentCart => {
    const newCart = [...currentCart];
    newCart[index].quantity += 1;
    return newCart;
  });
}

function decreaseQuantity(index) {
  setCart(currentCart => {
    const newCart = [...currentCart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    return newCart;
  });
}

  return (
    //FORMULARIO PARA EDITAR ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
    <div className="mt-4 container mx-auto">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mr-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={() => setIsFormVisible(true)}
            >
              ➕  Agregar Nuevo Producto 
            </button>
          </div>
          <div className="ml-2">
            <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
            >
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 justify-center leading-tight focus:outline-none focus:shadow-outline mb-4 w-64"
                type="text"
                placeholder=" 🔎 Busqueda Avanzada"
                style={{ textAlign: 'center' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFilter(e.target.value);
                  }
                }}
              />
            </form>
          </div>
        </div>
      <div>
      <button
        onClick={() => setIsCartVisible(true)}
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        🛒 Carrito de Compras
      </button>      
      </div>

      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-80vw h-70vh max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">FRENOSA SAC</h2>
                <p>"LA CASA DE LOS FRENOS HUANCAYO"</p>
              </div>
              <div>
                <p>R.U.C. 20487519112</p>
                <h2 className="text-2xl font-bold">BOLETA DE VENTA</h2>
              </div>
            </div>

            {/* Aquí es donde el cliente puede ingresar su DNI o RUC, su nombre y la fecha */}
            <form className="mb-4 mt-2">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="customer-name">
                Nombre del cliente:
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customer-name" type="text" />

              <div className="flex justify-between items-center mt-2">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="customer-address">
                    Dirección:
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customer-address" type="text" />
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="customer-id">
                    DNI/RUC:
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="customer-id" type="text" />
                </div>

                <div className="w-1/2 pl-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="date">
                    Fecha:
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="date" type="date" />
                </div>
              </div>
            </form>


            {/* Aquí es donde se muestran los productos en el carrito */}
            <table className="table-auto w-full mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Cant. De Prod.</th>
                  <th className="px-4 py-2">Producto</th>
                  <th className="px-4 py-2">Codigo</th>
                  <th className="px-4 py-2">Marca de Auto</th>
                  <th className="px-4 py-2">Precio Unidad</th>
                  <th className="px-4 py-2">Precio Cantidad</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{product.quantity}</td>                    
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.code}</td>
                    <td className="border px-4 py-2">{product.brand_car}</td>
                    <td className="border px-4 py-2">{product.price_sell}</td>
                    <td className="border px-4 py-2">{product.price_sell * product.quantity}</td>
                    <td className="border px-4 py-2 flex justify-around">
                      <button
                        onClick={() => {
                          // Asegúrate de tener una función que aumente la cantidad de este producto en el carrito
                          increaseQuantity(index);
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          // Asegúrate de tener una función que disminuya la cantidad de este producto en el carrito
                          decreaseQuantity(index);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-full"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          setCart((currentCart) => currentCart.filter((_, i) => i !== index));
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Aquí es donde se muestra el total del carrito */}
            <div className="flex justify-center items-center mt-8 mb-4">
              <h2 className="text-xl font-bold">Total a pagar = S/ {cart.reduce((total, product) => total + product.price_sell, 0)}</h2>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsCartVisible(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Cerrar Carrito
              </button>
              <button
                onClick={() => {
                  // Agregar lógica para guardar el estado de pago en la base de datos
                  console.log('Pago registrado');
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Pagado
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>      
        
        <div className="bg-white min-h-screen px-2 py-2">
          <div className="flex flex-wrap -mx-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8"
              >
                <div>
                  <div className="px-4 py-2 flex flex-col border border-gray-200 rounded-md">
                    {product.image && (
                      <div className="mb-2">
                        <img src={product.image} alt={product.name} className="w-full object-cover h-48" />
                      </div>
                    )}
                    <h2 className="text-center text-gray-900 font-bold text-lg mb-1">
                      {product.name}
                    </h2>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 text-sm mb-1 overflow-ellipsis">{product.description}</p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 text-sm mb-1 overflow-ellipsis">Codigo: {product.code}</p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 text-sm mb-1 overflow-ellipsis">Marca de Auto: {product.brand_car}</p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="mr-5 text-gray-600 text-sm mb-1 overflow-ellipsis">Precio Compra : {product.price_buy}</p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-gray-600 text-sm mb-1 overflow-ellipsis">Stock: {product.stock}</p>
                    </div>
                    <p className="text-center font-bold text-xl mb-1">S/ {product.price_sell}</p>
                    <div className="flex flex-col items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-auto py-1 px-3 rounded-full mb-1"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full mr-1 mb-2"
                          onClick={() => {
                            setIsFormVisible(true);
                            setProductName(product.name);
                            setProductDescription(product.description);
                            setProductCode(product.code);
                            setProductBrand(product.brand_car);
                            setProductPriceBuy(product.price_buy);
                            setProductPriceSell(product.price_sell);
                            setProductStock(product.stock);
                            setProductImage(product.image);
                            setEditingProductUuid(product.uuid);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
                          onClick={() => handleDeleteProduct(product.uuid)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>              
              </div>
            ))}
          </div>
  
                {isFormVisible && (
                  <div className="fixed inset-y-0 right-0 w-1/4 bg-white p-8 z-10 mt-8">
                  {/* add/edit product form */}
                  <form className="form-container border border-gray-350 rounded-md" style={{ height: '93vh' }}>
                    <h2 className="text-gray-900 font-bold text-lg mb-5 text-center">
                      ➕ Agregando / Editando Producto
                      </h2>

                {/* CANCELL */}
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline closeButton"
                    onClick={() => setIsFormVisible(false)}
                  >
                    ❌ Cancelar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={editingProductUuid ? handleEditProduct : handleAddProduct}
                  >
                    {editingProductUuid ? "✔ Actualizar" : "✔ Agregar"}
                  </button>
                </div>


                <div className="bg-gray-90">
                  {/* NAME */}
                  <div className="mb-4">
                    <label
                      className="mt-5 block text-gray-700 font-bold mb-2"
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

                  {/* CODE */}
                  <div className="flex mb-4">
                  <div className="mr-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="code">
                      Código
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="code"
                      type="text"
                      placeholder="Código del producto"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                  </div>

                  {/* BRAND_CAR */}
                  <div className="ml-2">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="brand_car">
                      Marca del auto
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="brand_car"
                      type="text"
                      placeholder="Marca del auto / TOYOTA / HYUNDAI / etc."
                      value={productBrand}
                      onChange={(e) => setProductBrand(e.target.value)}
                    />
                  </div>
                </div>

                  {/* DESCRIPTION */}
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
                        placeholder="Descripción del producto : / Frenos / Pastillas / etc."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                      />
                    </div>

                  {/* PRICE_BUY */}
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="price_buy"
                      >
                        Precio de compra
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price_buy"
                        type="number"
                        placeholder="Precio de compra"
                        value={productPriceBuy}
                        onChange={(e) => setProductPriceBuy(Number(e.target.value))}
                      />
                    </div>
                    <div className="ml-2">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="price_sell"
                      >
                        Precio de venta
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price_sell"
                        type="number"
                        placeholder="Precio para venta"
                        value={productPriceSell}
                        onChange={(e) => setProductPriceSell(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* STOCK */}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="stock"
                      >
                        Stock
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="stock"
                        type="number"
                        placeholder="Cantidad disponible en Stock"
                        value={productStock}
                        onChange={(e) => setProductStock(Number(e.target.value))}
                      />
                    </div>

                  {/* IMAGE */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                      Imagen
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="image"
                      type="text"
                      placeholder="URL de la imagen del producto"
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                    />
                    {productImage && (
                      <div className="mt-2 w-full aspect-w-1 aspect-h-1">
                        <img src={productImage} alt="Vista previa" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </form>   
            </div>
          )}
        </div>
      </div>
  );
}