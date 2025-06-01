import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import adminVenueIds from "@data/AdminVenuesId";

export default function FrontpageCarousel() {
  const [venues, setVenues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const fetched = await Promise.all(
          adminVenueIds.map((id) =>
            fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`).then((res) => res.json())
          )
        );
        setVenues(fetched);
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
  const image = typeof current.media?.[0] === "string" ? current.media[0] : current.media?.[0]?.url;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Navigasjonsknapper */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h3 className="uppercase text-sm tracking-widest text-white/80 mb-1">Utvalgt</h3>
          <h1 className="text-2xl text-white font-bold mb-3 leading-snug">{current.name}</h1>
          <p className="text-white/70 text-sm mb-4">
            {current.description?.slice(0, 160)}...
          </p>
          <Link
            to={`/venues/${current.id}`}
            className="inline-block px-4 py-2 border mt-4 border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
          >
            Utforsk stedet
          </Link>
        </div>

        <div className="md:w-1/2 w-full relative">
          {image && (
            <img
              src={image}
              alt={current.name}
              className="w-full max-w-full rounded-sm shadow-lg object-cover h-[250px] sm:h-[300px] md:h-[400px]"
            />
          )}
          {/* Indikatorer */}
          <div className="flex justify-center gap-2 mt-4">
            {venues.map((_, i) => (
              <div
                key={i}
                className={`w-5 h-1 rounded-sm transition-all duration-300 ${
                  i === currentIndex ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}