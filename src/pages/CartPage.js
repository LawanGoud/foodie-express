import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCart = location.state?.cart || [];

  const groupItems = (items) =>
    items.reduce((acc, item) => {
      const existing = acc.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);

  const [cartItems, setCartItems] = useState(groupItems(initialCart));

  const increase = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Back
        </button>
        <h1 className="cart-title">Your Cart 🛒</h1>
      </div>

      {/* Order Success */}
      {ordered && (
        <div className="order-success">
          <p>🎉 Order Placed Successfully!</p>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>
            Your food is on the way!
          </p>
          <button className="order-btn" onClick={() => navigate("/home")}>
            Order More Food
          </button>
        </div>
      )}

      {/* Empty Cart */}
      {!ordered && cartItems.length === 0 && (
        <div className="cart-empty">
          <p>🍽️ Your cart is empty!</p>
          <button className="order-btn" onClick={() => navigate("/home")}>
            Browse Food
          </button>
        </div>
      )}

      {/* Cart Content */}
      {!ordered && cartItems.length > 0 && (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">₹{item.price} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => decrease(item.id)}>
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increase(item.id)}>
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cartItems.length})</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className="order-btn" onClick={handleOrder}>
              Place Order 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
