import { Link } from "react-router-dom";

const categories = [
  {
    title: "Furniture",
    description: "Comfortable forms and timeless pieces for living well.",
    slug: "furniture",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Home Decor",
    description: "Personal finishing touches, chosen to make a space yours.",
    slug: "home-decoration",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Kitchen & Living",
    description: "Useful everyday pieces with a considered point of view.",
    slug: "kitchen-accessories",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
];

function Categories() {
  return (
    <main className="min-h-[70vh] bg-[#121212] text-[#F4F1EB]">
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C4A56A]">
          Find your feeling
        </p>
        <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          Rooms, made yours.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#B8B5AE] sm:text-base">
          Explore considered pieces for the rooms and rituals that make a house
          feel like home.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group relative min-h-[360px] overflow-hidden bg-[#1E1E1E] sm:min-h-[440px]"
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-medium sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                  {category.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#E1C68E]">
                  Explore collection <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Categories;