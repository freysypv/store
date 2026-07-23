import { useState } from 'react';
import DataService from '../services/DataService';
import Catalog from './Catalog';
import ProductForm from './ProductForm';
import { addProduct } from '../Services/ProductService';

const service = new DataService();

function ProductCreationForm() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreate = (newProduct) => {
    service.addProduct(newProduct);
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