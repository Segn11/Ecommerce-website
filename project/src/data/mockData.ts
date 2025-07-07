export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string;
  stock_quantity: number;
  is_featured: boolean;
  category?: Category;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image_url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Clothing',
    description: 'Fashion and apparel for all occasions',
    image_url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Books',
    description: 'Educational and entertainment books',
    image_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Home & Garden',
    description: 'Furniture and home decoration items',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who need crystal clear audio quality.',
    price: 299.99,
    category_id: '1',
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 50,
    is_featured: true,
    category: categories[0]
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking, GPS, and long battery life. Stay connected and monitor your fitness goals.',
    price: 399.99,
    category_id: '1',
    image_url: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 30,
    is_featured: true,
    category: categories[0]
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for work and gaming with latest graphics card and fast processor. Perfect for professionals and gamers.',
    price: 1299.99,
    category_id: '1',
    image_url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 20,
    is_featured: true,
    category: categories[0]
  },
  {
    id: '4',
    name: 'Smartphone',
    description: 'Latest smartphone with advanced camera system, fast processor, and all-day battery life.',
    price: 899.99,
    category_id: '1',
    image_url: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 45,
    is_featured: false,
    category: categories[0]
  },
  {
    id: '5',
    name: 'Designer T-Shirt',
    description: 'Premium cotton t-shirt with modern design. Comfortable fit and stylish look for casual occasions.',
    price: 29.99,
    category_id: '2',
    image_url: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 100,
    is_featured: false,
    category: categories[1]
  },
  {
    id: '6',
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans for casual wear. Durable material with comfortable fit and timeless style.',
    price: 79.99,
    category_id: '2',
    image_url: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 75,
    is_featured: false,
    category: categories[1]
  },
  {
    id: '7',
    name: 'Winter Jacket',
    description: 'Warm and stylish winter jacket with water-resistant material. Perfect for cold weather and outdoor activities.',
    price: 149.99,
    category_id: '2',
    image_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 40,
    is_featured: true,
    category: categories[1]
  },
  {
    id: '8',
    name: 'Programming Book',
    description: 'Learn modern web development techniques with this comprehensive guide. Perfect for beginners and experienced developers.',
    price: 49.99,
    category_id: '3',
    image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 40,
    is_featured: false,
    category: categories[2]
  },
  {
    id: '9',
    name: 'Fiction Novel',
    description: 'Bestselling fiction novel with captivating story and memorable characters. Perfect for leisure reading.',
    price: 24.99,
    category_id: '3',
    image_url: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 60,
    is_featured: false,
    category: categories[2]
  },
  {
    id: '10',
    name: 'Coffee Table',
    description: 'Modern wooden coffee table for living room. Elegant design with sturdy construction and beautiful finish.',
    price: 299.99,
    category_id: '4',
    image_url: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 25,
    is_featured: true,
    category: categories[3]
  },
  {
    id: '11',
    name: 'Plant Pot',
    description: 'Decorative ceramic plant pot for indoor plants. Beautiful design that complements any home decor style.',
    price: 24.99,
    category_id: '4',
    image_url: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 60,
    is_featured: false,
    category: categories[3]
  },
  {
    id: '12',
    name: 'Table Lamp',
    description: 'Modern table lamp with adjustable brightness. Perfect for reading and creating ambient lighting.',
    price: 89.99,
    category_id: '4',
    image_url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock_quantity: 35,
    is_featured: false,
    category: categories[3]
  }
];