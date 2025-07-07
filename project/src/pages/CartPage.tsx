import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, loading, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-8">You need to be signed in to view your cart</p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product?.image_url}
                        alt={item.product?.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product?.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            ${item.product?.price.toFixed(2)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {total > 50 ? 'Free' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(total + (total > 50 ? 0 : 5.99) + (total * 0.1)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center block"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/products"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {total < 50 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - total).toFixed(2)} more to get free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;