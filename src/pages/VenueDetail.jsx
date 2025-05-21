// Fullstendig VenueDetail.jsx med:
// - Zoomende hero
// - Lokasjon, stramt hovedbilde med navigasjon og thumbnails
// - BookModal direkte i komponenten
// - Dark carousel med beige bakgrunn
// - Ekstra seksjon med "fiktiv reportasje"

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FrontpageCarousel from "../components/FrontpageCarousel";
import FrontpageCarouselAll from "../components/FrontpageCarouselAll";
import BookingModal from "../components/BookingModal";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(1);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Feil ved henting av venue:", error);
      }
    }

    fetchVenue();
  }, [id]);

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handlePrevImage = () => {
    if (!venue?.media) return;
    setMainImageIndex((prevIndex) =>
      prevIndex === 1 ? venue.media.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    if (!venue?.media) return;
    setMainImageIndex((prevIndex) =>
      prevIndex === venue.media.length - 1 ? 1 : prevIndex + 1
    );
  };

  if (!venue) {
    return <p>Laster detaljer...</p>;
  }

  return (
    <div className="venue-detail">
      {/* HERO */}
      {venue.media && venue.media[0] && (
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={venue.media[0]}
            alt="Hero"
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-5xl font-semibold drop-shadow-lg text-center px-4">
              {venue.name}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 mt-8">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700">
            {venue.location.city}, {venue.location.country}
          </h2>
        </div>

        {/* Hovedbilde */}
        {venue.media && venue.media[mainImageIndex] && (
          <div className="relative max-w-3xl mx-auto mb-6">
            <img
              src={venue.media[mainImageIndex]}
              alt="Hovedbilde"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-1 rounded-r-xl shadow"
            >
              ◀
            </button>
            <button
              onClick={handleNextImage}
              className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-1 rounded-l-xl shadow"
            >
              ▶
            </button>
          </div>
        )}

        {/* Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {venue.media &&
            venue.media.slice(1).map((url, index) => (
              <img
                key={index + 1}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-auto rounded-sm cursor-pointer p-1 transition ${
                  mainImageIndex === index + 1 ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleThumbnailClick(index + 1)}
              />
            ))}
        </div>

        {/* Beskrivelse */}
        <p className="text-gray-600 text-lg mb-6">{venue.description}</p>

        {/* Ekstrainformasjon */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <p><span className="font-semibold">Pris:</span> {venue.price} NOK / natt</p>
            <p><span className="font-semibold">Maks gjester:</span> {venue.maxGuests}</p>
          </div>
          <div>
            <p><span className="font-semibold">Wifi:</span> {venue.meta.wifi ? "Ja" : "Nei"}</p>
            <p><span className="font-semibold">Parkering:</span> {venue.meta.parking ? "Ja" : "Nei"}</p>
            <p><span className="font-semibold">Frokost:</span> {venue.meta.breakfast ? "Ja" : "Nei"}</p>
            <p><span className="font-semibold">Kjæledyr tillatt:</span> {venue.meta.pets ? "Ja" : "Nei"}</p>
          </div>
        </div>

        {/* Book knapp */}
        <button
          onClick={() => setShowBooking(true)}
          className="inline-block px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
        >
          Book nå
        </button>

        {/* Modal */}
        {showBooking && (
          <BookingModal venueId={venue.id} onClose={() => setShowBooking(false)} />
        )}

        {/* Tilbake-lenke */}
        <div className="mt-12 mb-4">
          <Link to="/" className="text-sm text-gray-500 underline hover:text-black">
            ← Tilbake til forside
          </Link>
        </div>

        {/* Karusell med beige bakgrunn */}
        <div className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner">
          <FrontpageCarouselAll />
        </div>

        {/* Reportasjeseksjon */}
        <div className="mt-12 bg-white border-t border-gray-200 py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Reportasje"
              className="w-full h-auto rounded-md shadow mb-6"
            />
            <h3 className="text-2xl font-semibold mb-2">Magiske minner fra Bali</h3>
            <p className="text-gray-600 mb-4">
              Bli med bak kulissene på en av våre mest eksklusive reiser, der tropiske netter og
              eventyrlige opplevelser møtes.
            </p>

            <Link
            to="/stories/bali"
            className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
          >
            Les reportasjen
          </Link>
           

             {/* Karusell med beige bakgrunn */}
        <div className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner">
          <FrontpageCarousel />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
