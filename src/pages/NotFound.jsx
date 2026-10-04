import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#121212] px-5 py-16 text-center text-[#F4F1EB]">
      <div className="max-w-lg">
        <p className="text-xs uppercase tracking-[0.24em] text-[#C4A56A]">
          404 — Page not found
        </p>
        <h1 className="mt-5 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          This page is out of place.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#AAA69E] sm:text-base">
          The link may have changed, or the page may no longer be here. Let’s
          find something that feels more at home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#C4A56A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#17140F] transition-colors hover:bg-[#D3B77E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Back to home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
