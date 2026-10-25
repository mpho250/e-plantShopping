import React, { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import AboutUs from "./components/AboutUs";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div>
      {showProductList ? (
        <ProductList />
      ) : (
        <div className="background-image">
          <div className="landing-content">
            <h1>Welcome to Paradise Nursery</h1>

            <p>
              Discover beautiful plants to bring nature into your home.
            </p>

            <button onClick={() => setShowProductList(true)}>
              Get Started
            </button>

            <AboutUs />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
