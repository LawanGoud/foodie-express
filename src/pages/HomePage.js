import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const foodData = [
  {
    id: 1,
    name: "Butter Chicken",
    category: "Lunch",
    price: 180,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "Breakfast",
    price: 80,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Paneer Tikka",
    category: "Dinner",
    price: 220,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Veg Biryani",
    category: "Lunch",
    price: 150,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Idli Sambar",
    category: "Breakfast",
    price: 60,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Chicken Biryani",
    category: "Dinner",
    price: 250,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
  },
];

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredFood = foodData
    .filter(
      (item) => activeCategory === "All" || item.category === activeCategory,
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div>
          <p className="home-greeting">Hi, Welcome back 👋</p>
          <h1 className="home-title">What's fresh today?</h1>
        </div>
        <button
          className="cart-btn"
          onClick={() => navigate("/cart", { state: { cart } })}
        >
          🛒 {cart.length}
        </button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Categories */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="food-grid">
        {filteredFood.map((item) => (
          <div key={item.id} className="food-card">
            <img src={item.image} alt={item.name} className="food-image" />
            <div className="food-info">
              <h3 className="food-name">{item.name}</h3>
              <p className="food-category">{item.category}</p>
              <div className="food-footer">
                <div>
                  <span className="food-rating">⭐ {item.rating}</span>
                  <span className="food-price">₹{item.price}</span>
                </div>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
