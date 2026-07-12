import "./catalog.css"; 
import { useEffect, useState } from "react"; 
import DataService from "../services/DataService"; 
import QuantityPicker from "../QuantityPicker"; 

function Catalog() { 
    const [products, setProducts] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [productsToDisplay, setProductsToDisplay] = useState([]); 
    const [activeFilter, setActiveFilter] = useState("all");
    const [quantities, setQuantities] = useState({}); 
    const [cart, setCart] = useState(() => { 
        return JSON.parse(localStorage.getItem('ShoppingCart')) || []; 
    }); 

    // Fetch initial catalog data 
    useEffect(() => { 
        const service = new DataService(); 
        const data = service.getProducts(); 
        setProducts(data); 
        setProductsToDisplay(data); 

        // Extract dynamic categories from your actual product data stream
        const uniqueCategories = [...new Set(data.map(prod => prod.category))];
        setCategories(uniqueCategories); 

        // Initialize quantity tracking state to 1 for all products 
        const initialQuantities = {}; 
        data.forEach(prod => { 
            initialQuantities[prod.id] = 1; 
        }); 
        setQuantities(initialQuantities); 
    }, []); 

    // Save cart to local storage dynamically 
    useEffect(() => { 
        localStorage.setItem('ShoppingCart', JSON.stringify(cart)); 
    }, [cart]); 

    // Handle local quantity variations from QuantityPicker component 
    const handleQuantityChange = (productId, newQuantity) => { 
        setQuantities(prev => ({ ...prev, [productId]: newQuantity })); 
    }; 

    function filter(category) { 
        setActiveFilter(category);
        const list = products.filter(prod => prod.category === category); 
        setProductsToDisplay(list); 
    } 

    const reset = () => { 
        setActiveFilter("all");
        setProductsToDisplay(products); 
    }; 

    function AddToShoppingCart(id, name, price) { 
        const selectedQuantity = quantities[id] || 1; 
        setCart(prevCart => { 
            const existingItemIndex = prevCart.findIndex(item => item.id === id); 
            if (existingItemIndex > -1) { 
                return prevCart.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + selectedQuantity } 
                        : item 
                ); 
            } else { 
                return [...prevCart, { id, name, price, quantity: selectedQuantity }]; 
            } 
        }); 
    } 

    return ( 
        <div className="catalog-container"> 
            <h1 className="catalog-title">Catalog</h1> 
            
            {/* Category Filter Action Row */} 
            <div className="filter-buttons-row"> 
                <button 
                    onClick={reset} 
                    className={`custom-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                > 
                    All Products 
                </button> 
                {categories.map((cat, index) => ( 
                    <button 
                        key={index} 
                        onClick={() => filter(cat)} 
                        className={`custom-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    > 
                        {cat} 
                    </button> 
                ))} 
            </div> 

            {/* Grid Container */} 
            <div className="products-grid-container"> 
                {productsToDisplay.map((product) => ( 
                    <div key={product.id} className="custom-product-card"> 
                        <div className="image-wrapper"> 
                            <img 
                                src={product.image || 'https://placeholder.com'} 
                                alt={product.title} 
                                className="custom-product-img" 
                            /> 
                        </div> 
                        <h3 className="custom-product-title">{product.title}</h3> 
                        <span className="custom-product-tag">{product.category}</span> 
                        <div className="custom-product-price">${product.price.toFixed(2)}</div> 
                        
                        {/* Native Quantity Picker Hook */} 
                        <div className="picker-wrapper"> 
                            <QuantityPicker onChange={(qty) => handleQuantityChange(product.id, qty)} /> 
                        </div> 
                        
                        <div className="product-rating"> 
                            <span className="rating-score">★ {product.rating}</span> 
                            <span className="rating-count">({product.reviews} reviews)</span> 
                        </div> 
                        
                        {/* Fixed Duplicate Attributes and Label Text */}
                        <button 
                            onClick={() => AddToShoppingCart(product.id, product.title, product.price)} 
                            disabled={!product.inStock} 
                            className={`custom-add-btn product-button ${product.inStock ? 'in-stock' : 'out-of-stock'}`} 
                        > 
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'} 
                        </button> 
                    </div> 
                ))} 
            </div> 

            {/* Fallback View */} 
            {productsToDisplay.length === 0 && ( 
                <p className="empty-catalog-message">No items match this category.</p> 
            )} 
        </div> 
    ); 
} 

export default Catalog;


