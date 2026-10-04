import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function Cart() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } =
    useCart();
  const [error, setError] = useState("");

  function changeQuantity(productId, quantity) {
    try {
      updateQuantity(productId, quantity);
      setError("");
    } catch (updateError) {
      setError(updateError.message || "Unable to update your bag.");
    }
  }

  function removeItem(productId) {
    try {
      removeFromCart(productId);
      setError("");
    } catch (removeError) {
      setError(removeError.message || "Unable to remove this item.");
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#121212] text-[#F4F1EB]">
      <section className="border-b border-white/10 bg-[#161616]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#C4A56A]">
            Your selection
          </p>
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            Your bag
          </h1>
          <p className="mt-3 text-sm text-[#B8B5AE]">
            {itemCount} {itemCount === 1 ? "piece" : "pieces"} in your bag
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_340px] lg:px-12">
        {items.length === 0 ? (
          <div className="border border-white/10 bg-[#1E1E1E] px-6 py-14 text-center lg:col-span-2">
            <h2 className="font-heading text-xl">Your bag is waiting.</h2>
            <p className="mt-3 text-sm text-[#AAA69E]">
              Browse the collection and add a piece you love.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {error && (
                <p
                  role="alert"
                  className="border border-[#A66D62]/40 bg-[#1E1E1E] px-4 py-3 text-sm text-[#E5B9AE]"
                >
                  {error}
                </p>
              )}

              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[96px_1fr] gap-4 border border-white/10 bg-[#1E1E1E] p-3 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6 sm:p-4"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="aspect-square bg-[#222222] p-2"
                    aria-label={`View ${item.title}`}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-center">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-heading text-sm font-medium leading-5 text-[#F4F1EB] transition-colors hover:text-[#D4B978] sm:text-base"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm text-[#D4B978]">
                      {formatPrice.format(item.price)}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <div
                        className="inline-flex items-center border border-white/15"
                        aria-label={`Quantity for ${item.title}`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease ${item.title} quantity`}
                          className="flex h-9 w-9 items-center justify-center text-[#D7D0C3] transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span
                          className="min-w-8 text-center text-sm"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.title} quantity`}
                          className="flex h-9 w-9 items-center justify-center text-[#D7D0C3] transition-colors hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="min-h-9 text-xs text-[#AAA69E] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="col-start-2 text-sm font-semibold text-[#F4F1EB] sm:col-start-auto sm:text-right">
                    {formatPrice.format(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </div>

            <aside className="h-fit border border-white/10 bg-[#1E1E1E] p-5 sm:p-6">
              <h2 className="font-heading text-lg font-medium">Order summary</h2>
              <div className="mt-5 flex justify-between text-sm text-[#B8B5AE]">
                <span>Subtotal</span>
                <span className="text-[#F4F1EB]">
                  {formatPrice.format(subtotal)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#8F8B84]">
                Shipping and taxes are calculated at checkout.
              </p>
              <button
                type="button"
                onClick={() =>
                  setError("Checkout is not connected in this practice store yet.")
                }
                className="mt-6 min-h-12 w-full rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
              >
                Continue to checkout
              </button>
              <Link
                to="/shop"
                className="mt-4 block text-center text-xs text-[#AAA69E] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
              >
                Continue shopping
              </Link>
            </aside>
          </>
        )}
      </section>
    </main>
  );
}

export default Cart;