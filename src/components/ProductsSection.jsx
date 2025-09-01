import React from 'react';
import { useCartWishlist } from './CartWishlistContext';
import { useNotification } from './NotificationContext';

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    category: 'Clothing',
    title: 'Premium Cotton Shirt',
    rating: 4.5,
    price: 39.99,
    originalPrice: 49.99,
    badge: 'New',
    discount: '-20%',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Shoes',
    title: 'Athletic Running Shoes',
    rating: 5.0,
    price: 89.99,
    badge: 'Bestseller',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    title: 'Designer Graphic T-Shirt',
    rating: 4.2,
    price: 24.99,
    originalPrice: 34.99,
    badge: 'Sale',
    discount: '-30%',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Accessories',
    title: 'Luxury Smartwatch',
    rating: 4.7,
    price: 299.99,
    badge: 'Limited',
  },
];

const ProductsSection = ({ onQuickView, filter, view, productsToShow, setProductsToShow }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const { showNotification } = useNotification();
  const filtered = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter);
  const visible = filtered.slice(0, productsToShow);
  const canLoadMore = productsToShow < filtered.length;

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`${product.title} added to cart!`, 'success');
  };
  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
    showNotification(
      isInWishlist(product.id)
        ? `${product.title} removed from wishlist`
        : `${product.title} added to wishlist!`,
      isInWishlist(product.id) ? 'info' : 'success'
    );
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
          {visible.map(product => (
            <div
              key={product.id}
              className={
                view === 'grid'
                  ? 'bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group'
                  : 'flex bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group'
              }
            >
              <div className={view === 'grid' ? 'relative' : 'flex-shrink-0 w-40 h-40 relative'}>
                <img src={product.image} alt={product.title} className={view === 'grid' ? 'w-full h-56 object-cover' : 'w-40 h-40 object-cover'} />
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">{product.badge}</span>
                )}
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow">{product.discount}</span>
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition">
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-pink-100"
                    onClick={() => handleToggleWishlist(product)}
                    aria-label="Add to wishlist"
                  >
                    <i className={isInWishlist(product.id) ? 'fas fa-heart text-pink-500' : 'far fa-heart'}></i>
                  </button>
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-indigo-100"
                    onClick={() => onQuickView(product)}
                    aria-label="Quick view"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="bg-white rounded-full p-2 shadow hover:bg-yellow-100"
                    aria-label="Compare"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                </div>
              </div>
              <div className={view === 'grid' ? 'p-4' : 'flex-1 p-4 flex flex-col justify-between'}>
                <div>
                  <div className="text-xs text-gray-400 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.title}</h3>
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
                </div>
                <button
                  className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {canLoadMore && (
          <div className="load-more-container flex justify-center mt-8">
            <button
              className="load-more-btn flex items-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-indigo-50 transition"
              onClick={() => setProductsToShow(n => n + 4)}
            >
              <i className="fas fa-plus"></i>
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection; 