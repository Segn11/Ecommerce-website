import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    if (!product) return;

    try {
      await addToCart(product.id, quantity);
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images for demo
  const images = [product.image_url, product.image_url, product.image_url];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <span className="text-sm text-gray-600 ml-2">(4.0) 24 reviews</span>
                  </div>
                  {product.is_featured && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <Link
                  to={`/products?category=${product.category_id}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {product.category?.name}
                </Link>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock_quantity} available
                  </span>
                  <span className={`text-sm font-medium ${
                    product.stock_quantity > 10 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {product.stock_quantity > 10 ? 'In Stock' : 'Limited Stock'}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock_quantity === 0}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      product.stock_quantity === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </span>
                  </button>
                </div>

                {/* Product Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                    <span className="text-sm text-gray-600">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;