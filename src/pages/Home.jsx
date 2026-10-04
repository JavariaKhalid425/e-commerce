import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFavorites from "../context/useFavorites";

const categoryCards = [
  {
    title: "Furniture",
    detail: "Made to live with",
    href: "/shop?category=furniture",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Lighting",
    detail: "A softer kind of light",
    href: "/shop?category=home-decoration",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Home Decor",
    detail: "The finishing touch",
    href: "/shop?category=home-decoration",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ProductCard({ product, onQuickView }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <article className="group overflow-hidden bg-[#1E1E1E]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#222222] p-3 sm:p-5">
        <Link
          to={`/product/${product.id}`}
          className="block h-full w-full"
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <span className="pointer-events-none absolute left-3 top-3 bg-[#121212]/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#E7E3DC] sm:left-4 sm:top-4">
          Curated
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-label={
            favorite
              ? `Remove ${product.title} from favourites`
              : `Add ${product.title} to favourites`
          }
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#121212]/85 text-[#E7E3DC] transition-colors hover:text-[#D4B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] sm:right-4 sm:top-4"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M20.8 8.7c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 min-h-11 rounded-sm bg-[#C4A56A] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inset-x-5 sm:bottom-5 md:translate-y-2 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        >
          Quick view
        </button>
      </div>
      <Link
        to={`/product/${product.id}`}
        className="flex min-h-[88px] items-start justify-between gap-2 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D4AF37] sm:min-h-[100px] sm:gap-3 sm:p-4"
      >
        <div>
          <h3 className="font-heading text-sm font-medium leading-5 text-[#F4F1EB] sm:text-base sm:leading-6">
            {product.title}
          </h3>
          <p className="mt-1.5 text-xs capitalize text-[#B8B5AE]">
            {product.category.replace("-", " ")}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-[#D4B978] sm:text-base">
          {money.format(product.price)}
        </p>
      </Link>
    </article>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      try {
        const categories = ["furniture", "home-decoration"];
        const responses = await Promise.all(
          categories.map((category) =>
            fetch(
              `https://dummyjson.com/products/category/${category}?limit=4`,
              { signal: controller.signal },
            ),
          ),
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error("We couldn't load the collection right now.");
        }

        const collections = await Promise.all(
          responses.map((response) => response.json()),
        );
        const collection = collections.flatMap((result) => result.products);

        if (collection.length === 0) {
          throw new Error("There are no products to show right now.");
        }

        setProducts(collection);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load products.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [retryCount]);

  return (
    <main className="overflow-hidden bg-[#121212] text-[#F4F1EB]">
      <section
        id="home"
        className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:px-12 lg:py-20"
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-6 text-xs uppercase tracking-[0.24em] text-[#B7AA93]">
            Considered pieces for everyday living
          </p>
          <h1 className="font-heading text-5xl leading-[1.08] tracking-[-0.04em] text-[#F4F1EB] sm:text-6xl lg:text-7xl">
            A quieter kind
            <br />
            of <span className="text-[#B7AA93]">beautiful.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#AAA69E]">
            Thoughtful furniture and home accents, chosen to make the everyday
            feel a little more like yours.
          </p>
          <a
            href="#shop"
            className="mt-9 inline-flex min-h-12 items-center gap-4 rounded-sm bg-[#C4A56A] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#17140F] transition-colors duration-200 hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore the collection
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-12 text-sm italic text-[#8F8B84]">
            Designed for the way you live.
          </p>
        </div>

        <div className="relative h-[400px] overflow-hidden bg-[#1E1E1E] sm:h-[500px] lg:h-[570px]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90"
            alt="A warm, considered living room with contemporary furniture"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/50 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] text-white/80">
            The art of feeling at home
          </p>
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-12"
      >
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B7AA93]">
              Find your feeling
            </p>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            to="/categories"
            className="hidden border-b border-[#B7AA93]/50 pb-1 text-xs uppercase tracking-[0.14em] text-[#D7D0C3] transition-colors hover:text-white sm:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {categoryCards.map((category) => (
            <Link
              key={category.title}
              to={category.href}
              className="group relative block aspect-[4/3] overflow-hidden bg-[#1E1E1E]"
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <h3 className="font-heading text-2xl text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-white/75">{category.detail}</p>
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-6 right-5 text-lg text-white transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="shop"
        className="border-y border-white/10 bg-[#161616] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex items-end justify-between gap-4 sm:mb-11">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B7AA93]">
                Pieces to keep
              </p>
              <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
                The considered edit
              </h2>
            </div>
            <a
              href="#categories"
              className="hidden border-b border-[#B7AA93]/50 pb-1 text-xs uppercase tracking-[0.14em] text-[#D7D0C3] transition-colors hover:text-white sm:inline-flex"
            >
              Browse categories
            </a>
          </div>

          {isLoading && (
            <div
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4"
              aria-label="Loading products"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index}>
                  <div className="aspect-[4/5] animate-pulse bg-[#222222]" />
                  <div className="mt-4 h-4 w-2/3 animate-pulse bg-[#222222]" />
                  <div className="mt-2 h-3 w-1/3 animate-pulse bg-[#222222]" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div
              className="border border-white/10 bg-[#141413] px-6 py-10 text-center"
              role="alert"
            >
              <p className="text-base text-[#D7D0C3]">{error}</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-5 border-b border-[#B7AA93]/60 pb-1 text-xs uppercase tracking-[0.14em] text-[#B7AA93] transition-colors hover:text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12"
      >
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B7AA93]">
            Less, but considered
          </p>
          <h2 className="font-heading max-w-lg text-4xl leading-tight tracking-tight sm:text-5xl">
            A home is made in the details.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[#AAA69E] sm:text-base">
            We believe the things we live with should earn their place. VELORA
            brings together enduring forms, honest materials and little details
            that make a space feel unmistakably yours.
          </p>
          <a
            href="#about"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            A little about us <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="order-1 aspect-[5/4] overflow-hidden bg-[#1E1E1E] lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=85"
            alt="Natural materials and calm details in a modern interior"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setQuickViewProduct(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="relative grid w-full max-w-3xl overflow-hidden border border-white/10 bg-[#1E1E1E] sm:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={quickViewProduct.images?.[0] || quickViewProduct.thumbnail}
              alt={quickViewProduct.title}
              className="h-72 w-full bg-[#222222] object-contain p-5 sm:h-full sm:min-h-[380px]"
            />
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close quick view"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-xl text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                ×
              </button>
              <p className="text-xs capitalize tracking-[0.16em] text-[#B8B5AE]">
                {quickViewProduct.category.replace("-", " ")}
              </p>
              <h2
                id="quick-view-title"
                className="mt-3 font-heading text-2xl font-medium leading-snug text-[#F4F1EB]"
              >
                {quickViewProduct.title}
              </h2>
              <p className="mt-4 text-lg font-semibold text-[#D4B978]">
                {money.format(quickViewProduct.price)}
              </p>
              <p className="mt-5 text-sm leading-6 text-[#B8B5AE]">
                {quickViewProduct.description}
              </p>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="mt-8 min-h-12 rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Continue browsing
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Home;
