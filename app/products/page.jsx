"use client";
import React, { useState, useEffect } from "react";
import "styles/globals.css";
import "./products.css";
import Link from "next/link";
import Navbar from "../../components/navbar";


export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState("");
  const [productPriceSell, setProductPriceSell] = useState("");
  const [productStock, setProductStock] = useState("");  
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter]=useState("");
  const [editingProductUuid, setEditingProductUuid] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [productImage, setProductImage] = useState("null");
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dni, setDni] = useState('');
  const [date, setDate] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');

useEffect(() => {
  const fetchProducts = async () => {
    const response = await fetch("https://frenosa-backend.onrender.com/products");
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
  if (
    !productName || 
    !productCode || 
    !productDescription || 
    !productBrand || 
    !productPriceBuy || 
    !productPriceSell || 
    !productStock) {
    alert("Hay campos obligatorios sin rellenar...");
    return;
  }

const newProduct = {
  name: productName,
  code: productCode,
  description: productDescription,
  image: productImage,
  brand_car: productBrand,
  price_buy: parseFloat(productPriceBuy),
  price_sell: parseFloat(productPriceSell),
  stock: parseInt(productStock)
};

fetch("https://frenosa-backend.onrender.com/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newProduct),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
      setProducts((prevProducts) => [...prevProducts, data]);
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

    fetch(`https://frenosa-backend.onrender.com/update/${editingProductUuid}`, {  // Aquí es donde cambió la ruta
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProducts(products.map((product) => 
          product.uuid === editingProductUuid ? { ...updatedProduct, uuid: product.uuid } : product
        ));
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
        console.log(updatedProduct) 
      })
      .catch((error) => {
        console.error;
      });
  }
};
 


const handleDeleteProduct = (uuid) => {
  fetch(`https://frenosa-backend.onrender.com/delete/${uuid}`, {
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

/*Agregar carrito , STOCK*/ 
const addToCart = (product) => {
  setCart((currentCart) => {
    const productWithQuantity = { ...product, quantity: 1 };
    const updatedProduct = { ...product, stock: product.stock - 1 };

    
    fetch(`https://frenosa-backend.onrender.com/update/${product.uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.uuid === product.uuid ? updatedProduct : p))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return [...currentCart, productWithQuantity];
  });
};
/*Remueve el stock de delete */

const removeFromCart = (index) => {
  setCart((currentCart) => {
    const productToRemove = currentCart[index];
    const updatedProduct = { ...productToRemove, stock: productToRemove.stock + 0 };

    
    fetch(`https://frenosa-backend.onrender.com/update/${productToRemove.uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.uuid === productToRemove.uuid ? updatedProduct : p))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return currentCart.filter((_, i) => i !== index);
  });
};



/*cart error */
const handlePayment = () => {
  const saleData = {
    customer: {
      name: name,
      address: address,
      dni: dni,
    },
    vehicle: {
      marca: marca,
      placa: placa,
    },
    date: date,
    cart: cart,
  };

  fetch("localhost3002:cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Aquí puedes redirigir al usuario a la página de registro de ventas o mostrar un mensaje de confirmación
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};




const updateQuantity = (index, quantity) => {
  setCart((currentCart) => {
    const updatedCart = [...currentCart];
    updatedCart[index].quantity = parseInt(quantity);
    return updatedCart;
  });
};

const [extraCharges, setExtraCharges] = useState([
  { concept: '', amount: 0 },
]);

const addRow = () => {
  setExtraCharges([...extraCharges, { concept: '', amount: 0 }]);
};

const deleteRow = () => {
  if (extraCharges.length > 1) {
    setExtraCharges(extraCharges.slice(0, -1));
  }
};

const handleExtraChargeChange = (index, field, value) => {
  const newExtraCharges = [...extraCharges];
  newExtraCharges[index][field] = value;
  setExtraCharges(newExtraCharges);
};




return (
  <>
    <Navbar/>
    <div className="mt-6 mx-4">
      <div className="flex justify-between">
        <div className="flex">
          <>
            {isFormVisible && (
              <div
                className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 mr-4"
                onClick={() => setIsFormVisible(false)}
              />        
            )}

            <div className="mr-2">
              <button
                className="bg-orange-400 hover:bg-orange-500 transition duration-100 ease-in text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={() => setIsFormVisible(true)}
              >
                ➕ Agregar Nuevo Producto
              </button>
            </div>
          </>
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
              className="ml-2 bg-yellow-500 hover:bg-yellow-600 transition duration-100 ease-in text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              🛒 Carrito de Compras
            </button>
          </div>
          {isCartVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-5 rounded-lg w-80vw h-70vh max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-bold">LA CASA DEL FRENO HUANCAYO E.I.R.L.</h2>
                    <p>Jr. Panamá 1615-1621 / El Tambo-Huancayo</p>
                  </div>
                  <div>
                    <h2 className="text-m font-bold">PROFORMA DE VENTA</h2>
                  </div>
                </div>

                {/* DNI o RUC, nombre y la fecha */}                
                <form className="mb-4 mt-1">
                  <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="customer-name">
                    Nombre del cliente:
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="customer-name" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="w-full mt-1">
                      <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="customer-address">
                        Dirección:
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customer-address"
                      type="text" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2 mt-2">
                      <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="customer-brand">
                        Marca del Vehículo
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      id="customer-brand"
                      type="text" 
                      value={marca} 
                      onChange={(e) => setMarca(e.target.value)}/>
                    </div>
                    <div className="w-1/2 pl-2 mt-2">
                      <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="customer-plate">
                        Placa del Vehículo
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      id="customer-plate"
                      type="text" 
                      value={placa} 
                      onChange={(e) => setPlaca(e.target.value)}/>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2">
                      <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="customer-id">
                        DNI/RUC:
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      id="customer-id" 
                      type="text" 
                      value={dni} 
                      onChange={(e) => setDni(e.target.value)}/>
                    </div>

                    <div className="w-1/2 pl-2">
                      <label className="block mb-2 text-xs font-bold text-gray-700" htmlFor="date">
                        Fecha:
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-1 px-2 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      id="date" 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}/>
                    </div>
                  </div>
                </form>

                {/* Aquí es donde se muestran los productos en el carrito */}
                <div className="relative max-h-[16rem] overflow-y-auto">
                  <table className="table-auto w-full mb-2">
                    <thead>
                      <tr>
                        <th className="text-xs px-4 py-2">Cantidad</th>
                        <th className="text-xs px-4 py-2">Producto</th>
                        <th className="text-xs px-4 py-2">Codigo</th>
                        <th className="text-xs px-4 py-2">Marca de Auto</th>
                        <th className="text-xs px-4 py-2">Precio Unidad</th>
                        <th className="text-xs px-4 py-2">Precio Cantidad</th>
                        <th className="text-xs px-4 py-2 print-hide"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product, index) => (
                        <tr key={index}>
                          <td className="text-xs border px-2 py-2">
                            <input
                              type="number"
                              min="0"
                              value={product.quantity}
                              onChange={(e) => {
                                updateQuantity(index, e.target.value);
                              }}
                              className="text-center w-16 px-2 py-1"
                            />
                          </td>                     
                          <td className="text-xs text-center border px-4 py-2">{product.name}</td>
                          <td className="text-xs text-center border px-4 py-2">{product.code}</td>
                          <td className="text-xs text-center border px-4 py-2">{product.brand_car}</td>
                          <td className="text-xs text-center border w-16 px-2 py-1">{product.price_sell}</td>                      
                          <td className="text-xs text-center border w-16 px-2 py-1">{product.price_sell * product.quantity}</td>
                          <td className="text-xs text-center border-transparent px-4 py-2 flex justify-around print-hide">
                          <button
  onClick={() => removeFromCart(index)}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
>
  Eliminar
</button>
                            
                          </td>
                          
                        </tr>
                      ))}
                      {extraCharges.map((charge, index) => (
                        <tr key={index}>
                          <td className="text-xs border px-4 py-2" colSpan={5}>
                            <input
                              type="text"
                              placeholder="Nuevo concepto de cobro"
                              className="w-full px-2 py-1"
                              value={charge.concept}
                              onChange={(e) => handleExtraChargeChange(index, 'concept', e.target.value)}
                            />
                          </td>
                          <td className="text-xs border px-4 py-2" colSpan={1}>
                          <input
                            type="text"
                            placeholder="S/. 0"
                            className="text-center w-full px-2 py-1"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={charge.amount || ''}
                            onChange={(e) => handleExtraChargeChange(index, 'amount', parseFloat(e.target.value))}
                          />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <td className="text-center py-2 print-hide" colSpan={6}>
                      <div className="flex justify-center">
                        <button onClick={addRow}>➕</button>
                        <button onClick={deleteRow}>➖</button>
                      </div>
                    </td>
                  </table>
                </div>
                {/* Aquí es donde se muestra el total del carrito */}
                <div className="flex justify-center items-center">
                  <h2 className="text-s text-xl font-bold">
                    Total = S/
                    {
                      (cart.reduce((total, product) => total + product.price_sell * product.quantity, 0) +
                      extraCharges.reduce((total, charge) => total + charge.amount, 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })
                    }
                  </h2>
                </div>
                <div className="flex justify-between items-center print-hide">
                  <button
                    onClick={() => setIsCartVisible(false)}
                    className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cerrar Carrito
                  </button>

                  <div className="flex gap-2">
    <button
      onClick={handlePayment}
      className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Pagar
    </button>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Boleta Venta Electrónica
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>    
        <div className="px-4 py-2">
          <div className="flex flex-wrap -mx-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 mb-4"
            >
              <div>
                <div className="px-4 py-2 flex flex-col border border-gray-300 rounded-md bg-purple-50 hover:shadow-lg transition duration-100 ease-in text-sm">
                  
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
                      className="bg-green-600 hover:bg-green-700 transition duration-100 ease-in text-white font-bold py-auto py-1 px-3 rounded-full mb-1"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 transition duration-100 ease-in text-white font-bold py-1 px-3 rounded-full mr-1 mb-2"
                        onClick={() => {
                          setIsFormVisible(true);
                          setProductName(product.name);
                          setProductDescription(product.description);
                          setProductCode(product.code);
                          setProductBrand(product.brand_car);
                          setProductPriceBuy(product.price_buy);
                          setProductPriceSell(product.price_sell);
                          setProductStock(product.stock); //por jugaar y mazamorrear _________________________________________________
                          setProductImage(product.image);
                          setEditingProductUuid(product.uuid);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 transition duration-100 ease-in text-white font-bold py-1 px-3 rounded-full"
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
        <div className="flex justify-center items-center h-screen pt-4 pb-4">
          {isFormVisible && (
            <div className="" style={{width: '60%', margin: 'auto'}}>
              <form className="form-container border border-gray-350 rounded-md px-2 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-8 mr-4" style={{width: '450px'}}>
                <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-900 font-bold text-m mb-5 text-center">
                  ➕ Agregando / Editando Producto
                </h2>
                {/* CANCELL */}
                <div className="flex justify-center space-x-8">
                  <button
                    className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline closeButton"
                    onClick={() => setIsFormVisible(false)}
                  >
                    ❌ Cancelar
                  </button>
                  {/* AGREGAR / ACTUALIZAR */}
                  <button
                    className="text-xs bg-blue-500 hover:bg-blue-600 transition duration-100 ease-in text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={editingProductUuid ? handleEditProduct : handleAddProduct}
                  >
                    {editingProductUuid ? "✔ Actualizar" : "✔ Agregar"}
                  </button>
                </div>
              
                <div className="bg-gray-90">                
                  {/* NAME */}
                  <div className="mb-2">
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
                  <div className="flex mb-2">
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
                      <a
                        className="ml-2 text-blue-500 cursor-pointer"
                        href="https://www.eleconomista.es/ecomotor/marcas/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        VER
                      </a>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="brand_car"
                      type="text"
                      placeholder="TOYOTA / HYUNDAI / etc."
                      value={productBrand}
                      onChange={(e) => setProductBrand(e.target.value)}
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Freno Cerámico / Pastillas / Aceite / etc."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                {/* PRICE_BUY */}
                <div className="flex mb-2">
                  <div className="mr-2">
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
                
                  {/* PRICE_SELL */}
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
                </div>
              </form>   
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);
}