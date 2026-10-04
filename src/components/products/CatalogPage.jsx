import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const catalogCategories = [
  { label: "All pieces", value: "" },
  { label: "Furniture", value: "furniture" },
  { label: "Home decor", value: "home-decoration" },
  { label: "Kitchen & living", value: "kitchen-accessories" },
];

const availableCategories = catalogCategories
  .map((category) => category.value)
  .filter(Boolean);

function CatalogPage({ mode = "shop" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = (searchParams.get("search") || "").trim();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const isNewArrivals = mode === "new-arrivals";

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      const categories =
        selectedCategory && availableCategories.includes(selectedCategory)
          ? [selectedCategory]
          : availableCategories;

      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const query = isNewArrivals
              ? "?limit=100&sortBy=meta.createdAt&order=desc"
              : "?limit=100";
            const response = await fetch(
              `https://dummyjson.com/products/category/${category}${query}`,
              { signal: controller.signal },
            );

            if (!response.ok) {
              throw new Error("We couldn't load the collection right now.");
            }

            const data = await response.json();
            return data.products;
          }),
        );

        const catalog = results.flat().sort((first, second) => {
          const firstDate = Date.parse(first.meta?.createdAt || "");
          const secondDate = Date.parse(second.meta?.createdAt || "");
          return (secondDate || 0) - (firstDate || 0);
        });

        if (catalog.length === 0) {
          throw new Error("There are no products in this collection yet.");
        }

        setProducts(isNewArrivals ? catalog.slice(0, 12) : catalog);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load products.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [isNewArrivals, retryCount, selectedCategory]);

  const title = isNewArrivals ? "Just arrived" : "The collection";
  const description = isNewArrivals
    ? "A fresh edit of thoughtful pieces for the spaces you call home."
    : "Furniture and finishing touches, chosen to bring a little more intention to everyday living.";
  const normalizedQuery = searchQuery.toLowerCase();
  const visibleProducts = products.filter((product) => {
    const searchableText = [
      product.title,
      product.description,
      product.category.replaceAll("-", " "),
      product.brand || "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  function selectCategory(category) {
    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  }

  return (
    <main className="min-h-[70vh] bg-[#121212] text-[#F4F1EB]">
      <section className="border-b border-white/10 bg-[#161616]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C4A56A]">
            {isNewArrivals ? "The latest from VELORA" : "Made for the everyday"}
          </p>
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#B8B5AE] sm:text-base">
            {description}
          </p>
          {searchQuery && (
            <p className="mt-4 text-sm text-[#D7D0C3]">
              Results for <span className="text-[#D4B978]">“{searchQuery}”</span>
              <button
                type="button"
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);
                  nextParams.delete("search");
                  setSearchParams(nextParams);
                }}
                className="ml-3 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Clear search
              </button>
            </p>
          )}
          <p className="mt-3 text-sm italic text-[#8F8B84]">
            Designed for the way you live.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        {!isNewArrivals && (
          <nav
            className="mb-8 flex gap-2 overflow-x-auto pb-2"
            aria-label="Filter by product category"
          >
            {catalogCategories.map((category) => {
              const isSelected = selectedCategory === category.value;

              return (
                <button
                  key={category.value || "all"}
                  type="button"
                  onClick={() => selectCategory(category.value)}
                  aria-pressed={isSelected}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors ${
                    isSelected
                      ? "border-[#C4A56A] bg-[#C4A56A] text-[#17140F]"
                      : "border-white/15 text-[#B8B5AE] hover:border-white/40 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </nav>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl sm:text-2xl">
            {selectedCategory
              ? catalogCategories.find(
                  (category) => category.value === selectedCategory,
                )?.label || "Our selection"
              : isNewArrivals
                ? "Freshly selected"
                : "All pieces"}
          </h2>
          {!isLoading && !error && (
            <p className="text-xs text-[#8F8B84]">
              {visibleProducts.length}{" "}
              {visibleProducts.length === 1 ? "piece" : "pieces"}
            </p>
          )}
        </div>

        {isLoading && (
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4"
            aria-label="Loading products"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] bg-[#222222]" />
                <div className="mt-4 h-4 w-2/3 bg-[#222222]" />
                <div className="mt-2 h-3 w-1/3 bg-[#222222]" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="border border-white/10 bg-[#1E1E1E] px-6 py-12 text-center">
            <p role="alert" className="text-sm text-[#D7D0C3]">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] hover:bg-[#D3B77E]"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && visibleProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && !error && visibleProducts.length === 0 && (
          <div className="border border-white/10 bg-[#1E1E1E] px-6 py-12 text-center">
            <p className="font-heading text-xl">No pieces found.</p>
            <p className="mt-3 text-sm text-[#AAA69E]">
              Try another search, or browse the full collection.
            </p>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-5 rounded-sm bg-[#C4A56A] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
            >
              Show all pieces
            </button>
          </div>
        )}
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">
        <Link
          to="/categories"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-[#B8B5AE] transition-colors hover:text-[#D4B978]"
        >
          Explore our categories <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

export default CatalogPage;
