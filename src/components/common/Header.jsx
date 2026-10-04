import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFavorites from "../../context/useFavorites";
import useCart from "../../context/useCart";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/about" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { itemCount } = useCart();

  function handleSearch(event) {
    event.preventDefault();
    const query = searchTerm.trim();

    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#121212] text-[#F4F1EB]">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        <Link
          to="/"
          className="w-fit text-lg font-medium tracking-[0.28em] transition-colors duration-200 hover:text-[#C9BEA9] sm:text-xl"
          aria-label="VELORA home"
        >
          VELORA
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="py-2 text-sm text-[#B8B5AE] transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2 lg:col-start-3 lg:gap-3">
          <button
            type="button"
            onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
            className="rounded-full p-2 text-[#D7D3CB] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9]"
            aria-label={isSearchOpen ? "Close search" : "Open search"}
            aria-expanded={isSearchOpen}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            to="/wishlist"
            className="relative rounded-full p-2 text-[#D7D3CB] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9]"
            aria-label={`Favourites${favorites.length ? `, ${favorites.length} saved` : ""}`}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M20.8 8.7c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C4A56A] px-1 text-[9px] font-semibold text-[#17140F]">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-full p-2 text-[#D7D3CB] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9]"
            aria-label={`Shopping cart${itemCount ? `, ${itemCount} items` : ""}`}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 4.5h2l2.1 11h10.8l2.1-8H6.2" />
              <circle cx="9" cy="19.5" r="1" />
              <circle cx="17" cy="19.5" r="1" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C4A56A] px-1 text-[9px] font-semibold text-[#17140F]">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="ml-1 rounded-full p-2 text-[#D7D3CB] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9] lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <form
          onSubmit={handleSearch}
          className="border-t border-white/10 bg-[#161616] px-5 py-4 sm:px-8 lg:px-12"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <label className="sr-only" htmlFor="site-search">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search furniture, decor..."
              autoFocus
              className="min-w-0 flex-1 border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#8F8B84] focus:border-[#C4A56A]"
            />
            <button
              type="submit"
              className="min-h-11 rounded-sm bg-[#C4A56A] px-5 text-xs font-medium uppercase tracking-[0.12em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {isMenuOpen && (
        <nav
          className="border-t border-white/10 bg-[#121212] px-5 py-4 sm:px-8 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col divide-y divide-white/5">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="py-3 text-sm text-[#B8B5AE] transition-colors duration-200 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;