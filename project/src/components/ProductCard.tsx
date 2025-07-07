import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    try {
      await addToCart(product.id);
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Product added to cart!';
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
          {product.is_featured && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            product.stock_quantity === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;