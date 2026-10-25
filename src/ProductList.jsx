import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice } from "../CartSlice";
import "./ProductList.css";

const plantCategories = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", cost: "$15", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b8e" },
      { name: "Peace Lily", cost: "$18", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee" },
      { name: "Spider Plant", cost: "$12", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333" },
      { name: "Areca Palm", cost: "$25", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78" },
      { name: "Rubber Plant", cost: "$22", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
      { name: "Boston Fern", cost: "$16", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" }
    ]
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      { name: "Lavender", cost: "$14", image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec" },
      { name: "Jasmine", cost: "$17", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946" },
      { name: "Rosemary", cost: "$10", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662" },
      { name: "Mint Plant", cost: "$8", image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec" },
      { name: "Eucalyptus", cost: "$20", image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683" },
      { name: "Gardenia", cost: "$19", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" }
    ]
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      { name: "Aloe Vera", cost: "$11", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { name: "ZZ Plant", cost: "$21", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
      { name: "Jade Plant", cost: "$13", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78" },
      { name: "Pothos", cost: "$12", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e" },
      { name: "Cactus", cost: "$9", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
      { name: "Monstera", cost: "$24", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" }
    ]
  }
];

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cartItems.reduce((total, item) => {
    const price = Number(
      String(item.cost).replace(/[^0-9.]/g, "")
    );

    return total + price * item.quantity;
  }, 0);

  const handleAddToCart = (plant) => {
    const alreadyInCart = cartItems.some(
      (item) => item.name === plant.name
    );

    if (!alreadyInCart) {
      dispatch(CartSlice.actions.addItem(plant));
    }
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            if (onHomeClick) onHomeClick();
          }}
        >
          Home
        </a>

        <a
          href="#plants"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("plants")?.scrollIntoView({
              behavior: "smooth"
            });
          }}
        >
          Plants
        </a>

        <a
          href="#cart"
          onClick={(event) => {
            event.preventDefault();
            if (onCartClick) onCartClick();
          }}
          aria-label={`Shopping cart, ${totalItems} items`}
        >
          <span role="img" aria-label="Shopping cart">
            🛒
          </span>{" "}
          Cart (
          <span id="cart_quantity_count">
            {totalItems}
          </span>
          )
        </a>

        <span>Total: ${totalCost.toFixed(2)}</span>
      </nav>

      <h1 id="plants">Our Plants</h1>

      {plantCategories.map((category) => (
        <section
          className="category-section"
          key={category.category}
        >
          <h2 className="category-name">
            {category.category}
          </h2>

          <div className="plants-grid">
            {category.plants.map((plant) => {
              const addedToCart = cartItems.some(
                (item) => item.name === plant.name
              );

              return (
                <article
                  className="plant-card"
                  key={plant.name}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <h3>{plant.name}</h3>
                  <p>Price: {plant.cost}</p>

                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart}
                  >
                    {addedToCart
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
