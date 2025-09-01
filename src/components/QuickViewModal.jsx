import React from 'react';
import { useCartWishlist } from './CartWishlistContext';
import { useNotification } from './NotificationContext';

const QuickViewModal = ({ open, onClose, product }) => {
  const { addToCart } = useCartWishlist();
  const { showNotification } = useNotification();
  if (!open || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.title} added to cart!`, 'success');
    onClose();
  };

  return (
    <div className="quick-view-modal open fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="quick-view-content bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
        <button className="quick-view-close absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
            <img src={product.image} alt={product.title} className="w-40 h-40 object-cover rounded" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(Math.floor(product.rating))].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                {product.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              </div>
              <span className="text-xs text-gray-500">({product.rating})</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-bold text-indigo-600">${product.price}</span>
              {product.originalPrice && <span className="text-sm line-through text-gray-400">${product.originalPrice}</span>}
            </div>
            <p className="mb-3 text-gray-600">{product.description || 'No description available.'}</p>
            {/* Color/size options can be added here if present */}
            <button
              className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal; 