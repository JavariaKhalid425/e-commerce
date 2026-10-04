import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFavorites from "../context/useFavorites";
import useCart from "../context/useCart";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function ProductDetails() {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedError, setRelatedError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setProduct(null);
      setRelatedProducts([]);
      setSelectedImage("");
      setIsLoading(true);
      setIsRelatedLoading(true);
      setError("");
      setRelatedError("");
      setCartMessage("");

      if (!/^\d+$/.test(id)) {
        setError("This product could not be found.");
        setIsLoading(false);
        setIsRelatedLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("We couldn't find this product.");
        }

        const productData = await response.json();
        setProduct(productData);
        setSelectedImage(productData.images?.[0] || productData.thumbnail);
        setIsLoading(false);

        try {
          const relatedResponse = await fetch(
            `https://dummyjson.com/products/category/${encodeURIComponent(productData.category)}?limit=6`,
            { signal: controller.signal },
          );

          if (!relatedResponse.ok) {
            throw new Error("Related products are unavailable right now.");
          }

          const relatedData = await relatedResponse.json();
          setRelatedProducts(
            relatedData.products
              .filter((item) => item.id !== productData.id)
              .slice(0, 4),
          );
        } catch (fetchError) {
          if (fetchError.name !== "AbortError") {
            setRelatedError(
              fetchError.message || "Unable to load related products.",
            );
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsRelatedLoading(false);
          }
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load this product.");
          setIsLoading(false);
          setIsRelatedLoading(false);
        }
      }
    }

    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => controller.abort();
  }, [id, retryCount]);

  function addToBag() {
    try {
      addToCart(product);
      setCartMessage(`${product.title} has been added to your bag.`);
      return true;
    } catch (storageError) {
      setCartMessage(
        storageError.message || "We couldn't add this item to your bag.",
      );
      return false;
    }
  }

  function handleBuyNow() {
    if (addToBag()) {
      navigate("/cart");
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-[70vh] bg-[#121212] px-5 py-12 text-[#F4F1EB] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] bg-[#222222]" />
          <div className="space-y-5 py-8">
            <div className="h-4 w-28 bg-[#222222]" />
            <div className="h-10 w-3/4 bg-[#222222]" />
            <div className="h-7 w-32 bg-[#222222]" />
            <div className="h-24 bg-[#222222]" />
            <div className="h-12 bg-[#222222]" />
            <div className="h-12 bg-[#222222]" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#121212] px-5 py-16 text-center text-[#F4F1EB]">
        <div className="max-w-md">
          <p className="font-heading text-2xl">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-6 rounded-sm bg-[#C4A56A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
          >
            Try again
          </button>
          <div>
            <Link
              to="/#shop"
              className="mt-5 inline-block text-sm text-[#B8B5AE] underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              Return to the collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const productImages = product.images?.length
    ? product.images
    : [product.thumbnail].filter(Boolean);
  const favorite = isFavorite(product.id);

  return (
    <main className="bg-[#121212] text-[#F4F1EB]">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12">
        <Link
          to="/#shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#AAA69E] transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span> Back to the collection
        </Link>

        <section className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className={
              productImages.length > 1
                ? "grid min-w-0 gap-4 sm:grid-cols-[88px_minmax(0,1fr)]"
                : "block min-w-0"
            }
          >
            {productImages.length > 1 && (
              <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
                {productImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === image}
                    className={`h-20 w-20 shrink-0 overflow-hidden border bg-[#222222] p-2 transition-colors sm:h-[88px] sm:w-[88px] ${
                      selectedImage === image
                        ? "border-[#C4A56A]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="order-1 aspect-square min-w-0 overflow-hidden bg-[#1E1E1E] sm:order-2 sm:aspect-[4/5]">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-contain p-6 sm:p-8 lg:p-10"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center py-2 lg:py-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4A56A]">
                {product.category.replaceAll("-", " ")}
              </p>
              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                aria-label={
                  favorite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                aria-pressed={favorite}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#D7D3CB] transition-colors hover:border-[#C4A56A] hover:text-[#D4B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
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
            </div>
            <h1 className="mt-4 font-heading text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div
                className="flex items-center gap-1 text-[#D4B978]"
                role="img"
                aria-label={`Rated ${product.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="m10 1.7 2.55 5.17 5.71.83-4.13 4.02.98 5.69L10 14.72l-5.11 2.69.98-5.69L1.74 7.7l5.71-.83L10 1.7Z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#B8B5AE]">
                {product.rating} / 5
              </span>
              <span className="text-sm text-[#77746F]">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="mt-7 text-2xl font-semibold text-[#D4B978] sm:text-3xl">
              {formatPrice.format(product.price)}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#B8B5AE] sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.stock > 0 ? "bg-[#9B9B74]" : "bg-[#A66D62]"
                }`}
              />
              <span className="text-[#D8D4CC]">
                {product.stock > 0
                  ? product.stock <= 5
                    ? `Only ${product.stock} left`
                    : product.availabilityStatus || "In stock"
                  : "Out of stock"}
              </span>
            </div>

            <div className="mt-8 grid gap-3">
              <button
                type="button"
                onClick={addToBag}
                disabled={product.stock <= 0}
                className="min-h-12 w-full rounded-sm bg-[#C4A56A] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#17140F] transition-colors hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="min-h-12 w-full rounded-sm border border-white/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#F4F1EB] transition-colors hover:border-[#C4A56A] hover:text-[#D4B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
              </button>
              {cartMessage && (
                <p
                  role="status"
                  className="text-sm leading-6 text-[#D7D0C3]"
                >
                  {cartMessage}
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs leading-5 text-[#8F8B84]">
              <p>{product.shippingInformation || "Carefully packed for delivery"}</p>
              <p>{product.warrantyInformation || "Thoughtfully made to last"}</p>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-white/10 pt-12 sm:mt-24 sm:pt-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#C4A56A]">
                Selected for you
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl">
                You may also like
              </h2>
            </div>
            <Link
              to="/#shop"
              className="hidden text-xs uppercase tracking-[0.14em] text-[#B8B5AE] transition-colors hover:text-white sm:inline-block"
            >
              Shop all
            </Link>
          </div>

          {isRelatedLoading && (
            <div
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
              aria-label="Loading related products"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/5] bg-[#222222]" />
                  <div className="mt-3 h-4 w-2/3 bg-[#222222]" />
                  <div className="mt-2 h-3 w-1/3 bg-[#222222]" />
                </div>
              ))}
            </div>
          )}

          {!isRelatedLoading && relatedError && (
            <p role="status" className="text-sm text-[#AAA69E]">
              {relatedError}
            </p>
          )}

          {!isRelatedLoading && !relatedError && relatedProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-[#1E1E1E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#222222] p-3 sm:p-5">
                    <img
                      src={relatedProduct.thumbnail}
                      alt={relatedProduct.title}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex min-h-[76px] items-start justify-between gap-2 p-3 sm:p-4">
                    <div>
                      <h3 className="font-heading text-sm font-medium leading-5 text-[#F4F1EB]">
                        {relatedProduct.title}
                      </h3>
                      <p className="mt-1 text-xs capitalize text-[#B8B5AE]">
                        {relatedProduct.category.replace("-", " ")}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-[#D4B978]">
                      {formatPrice.format(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isRelatedLoading &&
            !relatedError &&
            relatedProducts.length === 0 && (
              <p className="text-sm text-[#AAA69E]">
                There are no other products in this collection just yet.
              </p>
            )}
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
