import { useState } from 'react';
import './Productcreation.css';

function ProductForm({ onProductCreate }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !category) return;

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      category,
      description: description.trim(),
      image: image.trim(),
    };

    onProductCreate(newProduct);
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add a Product</h2>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Price
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select a category</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="home">Home</option>
          <option value="electronics">Electronics</option>
          <option value="beauty">Beauty</option>
          <option value="other">Other</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="fitness">Fitness</option>
          <option value="fitness-outdoor">Fitness & Outdoor</option>
          <option value="kitchenware">Kitchenware</option>
          <option value="apparel-accessories">Apparel & Accessories</option>
          <option value="home-decor">Home Decor</option>
        </select>
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Image URL
        <input value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;