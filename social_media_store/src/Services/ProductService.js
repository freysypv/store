const STORAGE_KEY = 'products';

// Get all products from localStorage
export function getProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read products from localStorage:', err);
    return [];
  }
}

// Add a new product and save the updated list
export function addProduct(product) {
  try {
    const products = getProducts();
    const updated = [...products, product];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save product to localStorage:', err);
    return getProducts();
  }
}

// Delete a product by id
export function deleteProduct(id) {
  try {
    const products = getProducts().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
  } catch (err) {
    console.error('Failed to delete product from localStorage:', err);
    return getProducts();
  }
}

// Update an existing product by id
export function updateProduct(id, updates) {
  try {
    const products = getProducts().map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products;
  } catch (err) {
    console.error('Failed to update product in localStorage:', err);
    return getProducts();
  }
}

// Clear all products
export function clearProducts() {
  localStorage.removeItem(STORAGE_KEY);
}