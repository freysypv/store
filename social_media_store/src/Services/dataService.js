const Catalog = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    inStock: true,
    imageUrl: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.99,
    category: "Furniture",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFtZSUzQSUyMCUyMkVyZ29ub21pYyUyME9mZmljZSUyMENoYWlyJTIyJTJDfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Fitness",
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1544003484-3cd181d17917?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    inStock: true,
    rating: 4.7,
    reviews: 124,
    imageUrl: "https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmFtZSUzQSUyMCUyMldpcmVsZXNzJTIwTm9pc2UtQ2FuY2VsaW5nJTIwSGVhZHBob25lcyUyMiUyQ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 249.50,
    category: "Furniture",
    inStock: true,
    rating: 4.5,
    reviews: 89,
    imageUrl: "https://images.unsplash.com/photo-1688578735122-f37256f1b8b0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmFtZSUzQSUyMCUyMkVyZ29ub21pYyUyME9mZmljZSUyMENoYWlyJTIyJTJDfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    category: "Fitness & Outdoor",
    inStock: false,
    rating: 4.2,
    reviews: 310,
    imageUrl: "https://plus.unsplash.com/premium_photo-1681154819686-43fcc4dc4df3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 7,
    name: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "Electronics",
    inStock: true,
    rating: 4.8,
    reviews: 56,
    imageUrl: "https://images.unsplash.com/photo-1632079003110-d694908500da?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVjaGFuaWNhbCUyMEdhbWluZyUyMEtleWJvYXJkfGVufDB8fDB8fHww"
  },
  {
    id: 8,
    name: "Smart Fitness Watch",
    price: 149.99,
    category: "Electronics",
    inStock: true,
    rating: 4.4,
    reviews: 215,
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBGaXRuZXNzJTIwV2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 9,
    name: "Ceramic Non-Stick Frying Pan",
    price: 45.00,
    category: "Kitchenware",
    inStock: true,
    rating: 4.6,
    reviews: 73,
    imageUrl: "https://images.unsplash.com/photo-1624031000828-dba1b7a3e4ce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2VyYW1pYyUyME5vbi1TdGljayUyMEZyeWluZyUyMFBhbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    name: "Leather Minimalist Wallet",
    price: 35.00,
    category: "Apparel & Accessories",
    inStock: true,
    rating: 4.3,
    reviews: 142,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyME1pbmltYWxpc3QlMjBXYWxsZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 12,
    name: "Running Shoes (All-Terrain)",
    price: 110.00,
    category: "Fitness & Outdoor",
    inStock: true,
    rating: 4.7,
    reviews: 95,
    imageUrl: "https://media.istockphoto.com/id/172767939/photo/muddy-shoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=b8Qp2Xx-yu9kZ6HTK-N-IskFEtQ8KUX1ybFV8ZFIqHY="
  },
  {
    id: 13,
    name: "Organic Cotton Hoodie",
    price: 55.00,
    category: "Apparel & Accessories",
    inStock: false,
    rating: 4.1,
    reviews: 64,
    imageUrl: "https://images.unsplash.com/photo-1650287052182-a13d8245c927?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T3JnYW5pYyUyMENvdHRvbiUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 14,
    name: "Dimmable LED Desk Lamp",
    price: 24.99,
    category: "Furniture",
    inStock: true,
    rating: 4.5,
    reviews: 188,
    imageUrl: "https://plus.unsplash.com/premium_photo-1681412205381-c0e9681bcbb8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGltbWFibGUlMjBMRUQlMjBEZXNrJTIwTGFtcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 15,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    inStock: true,
    rating: 4.6,
    reviews: 412,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFtZSUzQSUyMCUyMlBvcnRhYmxlJTIwQmx1ZXRvb3RoJTIwU3BlYWtlciUyMiUyQ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 16,
    name: "Pour-Over Coffee Maker",
    price: 32.50,
    category: "Kitchenware",
    inStock: true,
    rating: 4.8,
    reviews: 105,
    imageUrl: "https://images.unsplash.com/photo-1522675397120-8cb88c83ac16?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UG91ci1PdmVyJTIwQ29mZmVlJTIwTWFrZXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 17,
    name: "Yoga Mat (Extra Thick)",
    price: 39.99,
    category: "Fitness & Outdoor",
    inStock: true,
    rating: 4.4,
    reviews: 230,
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8WW9nYSUyME1hdCUyMChFeHRyYSUyMFRoaWNrKXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 18,
    name: "Classic Aviator Sunglasses",
    price: 75.00,
    category: "Apparel & Accessories",
    inStock: true,
    rating: 4.2,
    reviews: 87,
    imageUrl: "https://images.unsplash.com/photo-1562548726-43b650c82f8e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2xhc3NpYyUyMEF2aWF0b3IlMjBTdW5nbGFzc2VzfGVufDB8fDB8fHww"
  },
  {
    id: 159,
    name: "Electric Essential Oil Diffuser",
    price: 28.00,
    category: "Home Decor",
    inStock: false,
    rating: 4.5,
    reviews: 340,
    imageUrl: "https://images.unsplash.com/photo-1635749886064-8debe661b70e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RWxlY3RyaWMlMjBFc3NlbnRpYWwlMjBPaWwlMjBEaWZmdXNlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
];

class DataService {
  getProducts() {
    return Catalog;
  }

  addProduct(product) {
    const newId = Math.max(...Catalog.map(p => p.id), 0) + 1;
    Catalog.push({ id: newId, ...product });
    return Catalog;
  }
}

export default DataService;