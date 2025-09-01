import React from 'react';
import { useCartWishlist } from './CartWishlistContext';
import { useTheme } from './ThemeContext';

const Header = ({ onCartClick }) => {
  const { cartCount, wishlistCount } = useCartWishlist();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
          <i className="fas fa-shopping-bag"></i>
          <span>StyleHub</span>
        </div>
        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li><a href="#home" className="hover:text-indigo-600">Home</a></li>
            <li><a href="#products" className="hover:text-indigo-600">Shop</a></li>
            <li><a href="#about" className="hover:text-indigo-600">About</a></li>
            <li><a href="#contact" className="hover:text-indigo-600">Contact</a></li>
          </ul>
        </nav>
        {/* Actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Wishlist */}
          <div className="relative cursor-pointer text-gray-500 hover:text-pink-500">
            <i className="fas fa-heart text-lg"></i>
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">{wishlistCount}</span>
          </div>
          {/* Cart */}
          <div className="relative cursor-pointer text-gray-500 hover:text-indigo-600" onClick={onCartClick}>
            <i className="fas fa-shopping-cart text-lg"></i>
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1.5">{cartCount}</span>
          </div>
          {/* Theme Toggle */}
          <button className="ml-2 text-gray-500 hover:text-yellow-400 focus:outline-none" onClick={toggleTheme}>
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 