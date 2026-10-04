import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-[#121212] text-[#F4F1EB]">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#C4A56A]">
            A little about VELORA
          </p>
          <h1 className="font-heading text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Make room for
            <br />
            what feels like you.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#B8B5AE]">
            VELORA is built around a simple idea: the things we live with should
            feel considered, comfortable and entirely at home in your space.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#8F8B84] sm:text-base">
            We bring together enduring shapes, honest materials and practical
            details to help make everyday rooms feel a little more personal.
            Not more things—just the right ones.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#C4A56A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E]"
          >
            Discover the collection <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden bg-[#1E1E1E]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85"
            alt="A calm, naturally styled living space"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#161616]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-16 lg:px-12">
          <article>
            <p className="font-heading text-lg text-[#E1C68E]">Considered</p>
            <p className="mt-3 text-sm leading-6 text-[#AAA69E]">
              Pieces chosen for their lasting appeal, not just the moment.
            </p>
          </article>
          <article>
            <p className="font-heading text-lg text-[#E1C68E]">Comfortable</p>
            <p className="mt-3 text-sm leading-6 text-[#AAA69E]">
              A home should look beautiful and feel even better to live in.
            </p>
          </article>
          <article>
            <p className="font-heading text-lg text-[#E1C68E]">Personal</p>
            <p className="mt-3 text-sm leading-6 text-[#AAA69E]">
              The finishing touches are yours to make a space your own.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default About;