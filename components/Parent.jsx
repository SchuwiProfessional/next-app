import React, { useState } from "react";
import AddProductModal from "./AddProductModal";

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    // Aquí se agregan los datos del producto
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Agregar producto</button>
      <AddProductModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default ParentComponent;
