import { useState } from "react";
import DataService from "../services/DataService";
import ProductCreationForm from "./ProductCreationForm";
import Catalog from "./Catalog";

function AdminInventory() {
  const service = new DataService();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreate = (newProduct) => {
    service.addProduct(newProduct);
    setRefreshKey(prev => prev + 1); // forces Catalog to re-fetch
  };

  return (
    <div>
      <ProductCreationForm onProductCreate={handleProductCreate} />
      <Catalog key={refreshKey} />
    </div>
  );
}

export default AdminInventory;