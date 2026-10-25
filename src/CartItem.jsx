import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="shopping-cart">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. Explore Paradise Nursery to find your plants!</p>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div>
                <h2>{item.name}</h2>
                <p>Price: R{item.price.toFixed(2)}</p>
                <p>
                  Subtotal: R{(item.price * item.quantity).toFixed(2)}
                </p>

                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => {
                      const quantity = Number(event.target.value);
                      if (quantity >= 1) {
                        dispatch(
                          updateQuantity({ id: item.id, quantity })
                        );
                      }
                    }}
                  />
                </label>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}

          <h2>Total: R{total.toFixed(2)}</h2>
        </>
      )}

      <button onClick={() => (window.location.href = "/")}>
        Continue Shopping
      </button>
    </main>
  );
}
