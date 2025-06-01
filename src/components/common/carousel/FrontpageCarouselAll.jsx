import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FrontpageCarouselAll() {
  const [venues, setVenues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?limit=15`);
        if (!res.ok) throw new Error("Klarte ikke hente venues");
        const data = await res.json();
        setVenues(data);
      } catch (err) {
        console.error("Feil ved henting av venues:", err);
      }
    }

    fetchVenues();
  }, []);

  function prevSlide() {
    setCurrentIndex((prev) => (prev === 0 ? venues.length - 1 : prev - 1));
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev === venues.length - 1 ? 0 : prev + 1));
  }

  if (venues.length === 0 || !venues[currentIndex]) return null;

  const current = venues[currentIndex];
  const image =
    typeof current.media?.[0] === "string"
      ? current.media[0]
      : current.media?.[0]?.url;

  return (
    <section className="max-w-6xl mx-auto px-6 relative">
      {/* Navigasjonsknapper */}
      <button
        onClick={prevSlide}
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="uppercase text-sm tracking-widest text-gray-500 mb-1">Utforsk</h3>
          <h1 className="text-2xl font-bold mb-3 leading-snug">{current.name}</h1>
          <p className="text-gray-600 text-sm mb-4">
            {current.description?.slice(0, 160)}...
          </p>
          <Link
            to={`/venues/${current.id}`}
            className="inline-block px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
          >
            Utforsk stedet
          </Link>
        </div>
        <div className="md:w-1/2 relative">
          {image && (
            <img
              src={image}
              alt={current.name}
              className="w-full rounded-sm shadow-lg object-cover h-[300px] md:h-[400px]"
            />
          )}
          {/* Indikatorer */}
          <div className="flex justify-center gap-2 mt-4">
            {venues.map((_, i) => (
              <div
                key={i}
                className={`w-5 h-1 rounded-sm transition-all duration-300 ${
                  i === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}