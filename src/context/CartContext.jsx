import { useState } from "react";
import CartContext from "./cartStore";

function readSavedCart() {
  try {
    const savedCart = localStorage.getItem("velora-cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(parsedCart)) {
      throw new Error("Saved cart data is not a list.");
    }

    return parsedCart.filter(
      (item) =>
        item &&
        Number.isFinite(Number(item.id)) &&
        typeof item.title === "string" &&
        Number.isFinite(Number(item.price)) &&
        Number.isFinite(Number(item.quantity)) &&
        Number(item.quantity) > 0,
    );
  } catch (error) {
    console.error("Unable to read the saved cart.", error);
    return [];
  }
}

function CartProvider({ children }) {
  const [items, setItems] = useState(readSavedCart);

  function saveCart(updatedItems) {
    localStorage.setItem("velora-cart", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }

  function addToCart(product) {
    const existingItem = items.find((item) => item.id === product.id);
    const updatedItems = existingItem
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [
          ...items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail || product.images?.[0] || "",
            quantity: 1,
          },
        ];

    saveCart(updatedItems);
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be at least one.");
    }

    const updatedItems = items.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );

    saveCart(updatedItems);
  }

  function removeFromCart(productId) {
    saveCart(items.filter((item) => item.id !== productId));
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
