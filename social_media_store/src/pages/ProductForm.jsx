import { useState } from 'react';
import './Productcreation.css';

const compressImage = (file, maxWidth = 600, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function ProductForm({ onProductCreate }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageError('');
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      setImageError('Image is too large. Please select a photo under 1.5MB.');
      return;
    }

    try {
      const compressed = await compressImage(file);
      setImageUrl(compressed);
    } catch (err) {
      console.error('Failed to process image:', err);
      setImageError('Failed to process image. Please try another photo.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !category) return;

    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      category,
      description: description.trim(),
      imageUrl,
      inStock: true,
    };

    onProductCreate(newProduct);
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageUrl('');
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
        Product Photo
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {imageError && <p className="product-form-error">{imageError}</p>}
      {imageUrl && (
        <div className="product-form-preview">
          <img src={imageUrl} alt="Product preview" className="product-form-preview-img" />
        </div>
      )}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;