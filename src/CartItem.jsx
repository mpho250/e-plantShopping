import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(
      CartSlice.actions.updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        CartSlice.actions.updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        })
      );
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(CartSlice.actions.removeItem(item.name));
  };

  const total = items.reduce((sum, item) => {
    const price = Number(String(item.cost).replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>

                <button onClick={() => handleIncrement(item)}>+</button>

                <button onClick={() => handleDecrement(item)}>−</button>

                <button onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}

          <h2>Cart Total: ${total.toFixed(2)}</h2>
        </>
      )}

      <button
        onClick={() => window.alert("Checkout coming soon!")}
      >
        Checkout
      </button>

      <button
        onClick={() => {
          if (onContinueShopping) {
            onContinueShopping();
          } else {
            window.location.href = "/";
          }
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
