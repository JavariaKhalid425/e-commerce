import { Link } from "react-router-dom";
import useFavorites from "../../context/useFavorites";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <article className="group overflow-hidden bg-[#1E1E1E]">
      <div className="relative">
        <Link
          to={`/product/${product.id}`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          aria-label={`View ${product.title}`}
        >
          <div className="aspect-[4/5] overflow-hidden bg-[#222222] p-3 sm:p-5">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
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
      </div>
      <Link
        to={`/product/${product.id}`}
        className="flex min-h-[88px] items-start justify-between gap-2 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D4AF37] sm:min-h-[100px] sm:gap-3 sm:p-4"
      >
        <div>
          <h2 className="font-heading text-sm font-medium leading-5 text-[#F4F1EB] sm:text-base sm:leading-6">
            {product.title}
          </h2>
          <p className="mt-1.5 text-xs capitalize text-[#B8B5AE]">
            {product.category.replaceAll("-", " ")}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-[#D4B978] sm:text-base">
          {formatPrice.format(product.price)}
        </p>
      </Link>
    </article>
  );
}

export default ProductCard;