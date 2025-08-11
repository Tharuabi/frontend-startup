import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../style/Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Navigate to payment page with cart items
    const total = getCartTotal();
    const params = new URLSearchParams({
      cartItems: JSON.stringify(items),
      total: total.toString(),
      fromCart: 'true'
    });
    navigate(`/payment?${params.toString()}`);
  };

  // Test function to store payment in database
  const testPaymentStorage = async () => {
    try {
      const response = await fetch('/api/test-payment-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: 'test@example.com',
          customerName: 'Test User',
          totalAmount: 5000,
          fromCart: false,
          items: [{ title: 'Test Project', price: 5000, quantity: 1 }]
        })
      });
      
      const result = await response.json();
      alert(result.message || 'Test payment stored!');
    } catch (error) {
      console.error('Error testing payment storage:', error);
      alert('Error testing payment storage');
    }
  };

  // Clear cart after successful payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    if (paymentSuccess === 'true') {
      clearCart();
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Redirect to home page after successful payment
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
  }, [clearCart, navigate]);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h2>🛒 Your Cart is Empty</h2>
            <p>Add some amazing projects to get started!</p>
            <button 
              className="cart-browse-btn"
              onClick={() => navigate('/projectpage')}
            >
              Browse Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Shopping Cart</h1>
          <button 
            className="cart-clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/100x100?text=Project'} 
                    alt={item.title} 
                  />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.shortDescription}</p>
                  <div className="cart-item-category">{item.category}</div>
                </div>

                <div className="cart-item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <span className="price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  <span className="price-per-item">₹{item.price.toLocaleString('en-IN')} each</span>
                </div>

                <button 
                  className="cart-remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Items ({items.length}):</span>
              <span>{items.length}</span>
            </div>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row">
              <span>Processing Fee:</span>
              <span>₹0</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>

            <button 
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              💳 Proceed to Checkout
            </button>

            <button 
              className="cart-continue-shopping"
              onClick={() => navigate('/projectpage')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 