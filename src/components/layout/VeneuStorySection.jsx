import { Link } from "react-router-dom";

export default function VenueStorySection() {
  return (
    <section className="mt-12 bg-white border-t border-gray-200 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Reportasje"
          className="w-full h-auto rounded-md shadow mb-6"
        />
        <h3 className="text-2xl font-semibold mb-2">Magiske minner fra Bali</h3>
        <p className="text-gray-600 mb-4">
          Bli med bak kulissene på en av våre mest eksklusive reiser, der tropiske netter og eventyrlige opplevelser møtes.
        </p>
        <Link
          to="/stories/bali"
          className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
        >
          Les reportasjen
        </Link>
      </div>
    </section>
  );
}