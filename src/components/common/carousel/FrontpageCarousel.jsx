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
  
  <button
    onClick={prevSlide}
    className="absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 z-20 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white transition"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute -right-6 sm:-right-10 top-1/2 -translate-y-1/2 z-20 bg-white border border-black w-10 h-16 flex items-center justify-center hover:bg-black hover:text-white transition"
  >
    <ChevronRight className="w-6 h-6" />
  </button>

  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    <div className="md:w-1/2 w-full text-center md:text-left">
      <div className="border-t border-black/20 mb-6"></div>
      <h3 className="uppercase text-sm tracking-widest text-black/80 mb-1">Utvalgte steder</h3>
      <h1 className="text-2xl text-black font-thin mb-3 leading-snug">{current.name}</h1>
      <div className="border-t border-black/20 mb-6"></div>
      <p className="text-black/70 text-sm mb-4">
        {current.description?.slice(0, 160)}...
      </p>
      <Link
        to={`/venues/${current.id}`}
        className="inline-block px-4 py-2 border mt-4 border-black text-black text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
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
      <div className="flex justify-center gap-4 mt-4">
        {venues.map((_, i) => (
          <div
            key={i}
            className={`w-5 h-1 rounded-sm transition-all duration-300 ${
              i === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  </div>
</section>
  );
}