import React from 'react';
import { useCartWishlist } from './CartWishlistContext';
import { useNotification } from './NotificationContext';

const CartSidebar = ({ open, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity } = useCartWishlist();
  const { showNotification } = useNotification();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (item) => {
    removeFromCart(item.id, item.selectedColor, item.selectedSize);
    showNotification(`${item.title} removed from cart`, 'info');
  };
  const handleUpdateQty = (item, change) => {
    updateCartQuantity(item.id, item.selectedColor, item.selectedSize, change);
    if (change > 0) {
      showNotification(`Increased quantity of ${item.title}`, 'info');
    } else {
      showNotification(`Decreased quantity of ${item.title}`, 'info');
    }
  };

  return (
    <div className={`cart-sidebar${open ? ' open' : ''}`} id="cartSidebar">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button className="cart-close" id="closeCart" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="cart-items" id="cartItems">
        {cart.length === 0 ? (
          <div className="empty-cart text-center py-8 text-gray-400">
            <i className="fas fa-shopping-cart text-3xl mb-2"></i>
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-item flex items-center justify-between py-2 border-b" key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}> 
              <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded" />
              <div className="flex-1 ml-3">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <div className="text-xs text-gray-500">
                  {item.selectedSize && <>Size: {item.selectedSize} </>}
                  {item.selectedColor && <>&bull; Color: <span style={{background:item.selectedColor,display:'inline-block',width:12,height:12,borderRadius:'50%',verticalAlign:'middle'}}></span></>}
                </div>
                <div className="flex items-center mt-1">
                  <button className="px-2" onClick={() => handleUpdateQty(item, -1)}>-</button>
                  <span className="px-2">{item.quantity}</span>
                  <button className="px-2" onClick={() => handleUpdateQty(item, 1)}>+</button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
                <button className="remove-btn text-xs text-red-500 mt-2" onClick={() => handleRemove(item)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total: $<span id="cartTotal">{total.toFixed(2)}</span></span>
        </div>
        <button className="checkout-btn">
          <i className="fas fa-credit-card"></i>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar; 