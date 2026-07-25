import { useState } from 'react';
import { addProduct } from '../Services/ProductService';
import Catalog from './Catalog';
import ProductForm from './ProductForm';

function ProductCreationForm() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreate = (newProduct) => {
    addProduct(newProduct);
    setRefreshKey((prev) => prev + 1); // forces Catalog to re-fetch
  };

  return (
    <div>
      <ProductForm onProductCreate={handleProductCreate} />
      <Catalog key={refreshKey} />
    </div>
  );
}

export default ProductCreationForm;