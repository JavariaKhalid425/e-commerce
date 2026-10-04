import { Link } from "react-router-dom";

const footerLinkGroups = [
  {
    title: "Shop",
    links: [
      ["All Products", "/shop"],
      ["Furniture", "/shop?category=furniture"],
      ["Lighting", "/categories"],
      ["Home Decor", "/shop?category=home-decoration"],
      ["New Arrivals", "/new-arrivals"],
    ],
  },
  {
    title: "Customer Care",
    links: [
      ["Contact Us", "/#contact"],
      ["Shipping & Delivery", "/#shipping"],
      ["Returns", "/#returns"],
      ["FAQs", "/#faqs"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Our Story", "/about"],
      ["Privacy Policy", "/#privacy"],
      ["Terms & Conditions", "/#terms"],
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r=".7" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.3 1.4-1.3h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v1.9H8v2.8h2.5v7h3Z" />
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    icon: (
      <>
        <path d="M12 3.5a8.5 8.5 0 0 0-3.1 16.4c0-.7 0-1.6.2-2.4l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.8-2.3.8 0 1.2.6 1.2 1.4 0 .9-.6 2.2-.9 3.4-.3 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.7 0-2.4-1.7-4-4.1-4-2.8 0-4.5 2.1-4.5 4.3 0 .9.3 1.9.8 2.4.1.2.2.3.1.6l-.3 1.1c0 .2-.2.3-.4.2-1.3-.6-2.1-2.3-2.1-3.8 0-3.1 2.2-5.9 6.4-5.9 3.4 0 6 2.4 6 5.6 0 3.4-2.1 6.2-5 6.2-1 0-2-.6-2.4-1.2l-.7 2.6c-.2.8-.8 1.7-1.2 2.3A8.5 8.5 0 1 0 12 3.5Z" />
      </>
    ),
  },
];

function Footer() {
  function handleSubscribe(event) {
    event.preventDefault();
  }

  return (
    <footer className="border-t border-white/10 bg-[#121212] text-[#F4F1EB]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="text-xl font-medium tracking-[0.28em] transition-colors duration-200 hover:text-[#C9BEA9]"
              aria-label="VELORA home"
            >
              VELORA
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#AAA69E]">
              Designed for the way you live.
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h2 className="font-heading text-sm font-medium tracking-[0.08em] text-[#E7E3DC]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm leading-6 text-[#AAA69E] transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="font-heading text-sm font-medium tracking-[0.08em] text-[#E7E3DC]">
              Stay in the loop
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#AAA69E]">
              Be first to hear about new arrivals, seasonal edits and pieces
              worth making room for.
            </p>
            <form
              className="mt-3 flex max-w-md border-b border-white/25 transition-colors focus-within:border-[#C9BEA9]"
              onSubmit={handleSubscribe}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                required
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#77746F] focus-visible:outline-none"
              />
              <button
                type="submit"
                className="py-3 pl-3 text-sm font-medium uppercase tracking-[0.1em] text-[#D7D0C3] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8F8B84]">
            © 2026 VELORA. All rights reserved.
          </p>

          <nav className="flex items-center gap-3" aria-label="Social media">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="rounded-full p-2 text-[#AAA69E] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9BEA9]"
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
                  {social.icon}
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;