const Catalog = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    inStock: true,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.99,
    category: "Furniture",
    inStock: true,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Fitness",
    inStock: false,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    inStock: true,
    rating: 4.7,
    reviews: 124,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.50,
    category: "Furniture",
    inStock: true,
    rating: 4.5,
    reviews: 89,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Fitness & Outdoor",
    inStock: false,
    rating: 4.2,
    reviews: 310,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "Electronics",
    inStock: true,
    rating: 4.8,
    reviews: 56,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    price: 149.99,
    category: "Electronics",
    inStock: true,
    rating: 4.4,
    reviews: 215,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 6,
    name: "Ceramic Non-Stick Frying Pan",
    price: 45.00,
    category: "Kitchenware",
    inStock: true,
    rating: 4.6,
    reviews: 73,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 7,
    name: "Leather Minimalist Wallet",
    price: 35.00,
    category: "Apparel & Accessories",
    inStock: true,
    rating: 4.3,
    reviews: 142,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 8,
    name: "Running Shoes (All-Terrain)",
    price: 110.00,
    category: "Fitness & Outdoor",
    inStock: true,
    rating: 4.7,
    reviews: 95,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 9,
    name: "Organic Cotton Hoodie",
    price: 55.00,
    category: "Apparel & Accessories",
    inStock: false,
    rating: 4.1,
    reviews: 64,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 10,
    name: "Dimmable LED Desk Lamp",
    price: 24.99,
    category: "Furniture",
    inStock: true,
    rating: 4.5,
    reviews: 188,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    inStock: true,
    rating: 4.6,
    reviews: 412,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 12,
    name: "Pour-Over Coffee Maker",
    price: 32.50,
    category: "Kitchenware",
    inStock: true,
    rating: 4.8,
    reviews: 105,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 13,
    name: "Yoga Mat (Extra Thick)",
    price: 39.99,
    category: "Fitness & Outdoor",
    inStock: true,
    rating: 4.4,
    reviews: 230,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 14,
    name: "Classic Aviator Sunglasses",
    price: 75.00,
    category: "Apparel & Accessories",
    inStock: true,
    rating: 4.2,
    reviews: 87,
    imageUrl: "https://placeholder.com"
  },
  {
    id: 15,
    name: "Electric Essential Oil Diffuser",
    price: 28.00,
    category: "Home Decor",
    inStock: false,
    rating: 4.5,
    reviews: 340,
    imageUrl: "https://placeholder.com"
  },
];

class dataService {
  
  getProducts() {
    
    return Catalog;
  }
};

export default dataService;