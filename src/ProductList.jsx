import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

const products = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Succulents",
    price: 150,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 250,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Monstera",
    category: "Tropical Plants",
    price: 350,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
  },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <main className="product-list">
      <h1>Paradise Nursery Plants</h1>
      <p>Find beautiful plants for your home and garden.</p>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>Price: R{product.price.toFixed(2)}</p>
            <button onClick={() => dispatch(addItem(product))}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
