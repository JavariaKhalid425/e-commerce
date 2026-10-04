import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import useFavorites from "../context/useFavorites";

function Wishlist() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-[70vh] bg-[#121212] text-[#F4F1EB]">
      <section className="border-b border-white/10 bg-[#161616]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-12">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C4A56A]">
            Kept close
          </p>
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            Your favourites
          </h1>
          <p className="mt-4 text-sm text-[#B8B5AE]">
            {favorites.length
              ? `${favorites.length} ${
                  favorites.length === 1 ? "piece" : "pieces"
                } saved for later.`
              : "A place for the pieces you’d like to come back to."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-[#1E1E1E] px-6 py-14 text-center">
            <p className="font-heading text-xl">Nothing saved just yet.</p>
            <p className="mt-3 text-sm leading-6 text-[#AAA69E]">
              Tap the heart on a product to keep it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
            >
              Explore the collection
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Wishlist;