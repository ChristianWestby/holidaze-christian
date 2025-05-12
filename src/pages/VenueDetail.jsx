import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import BookingModal from "../components/BookingModal";
import { Users, MapPin, Wallet } from "lucide-react";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

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

  if (!venue) return <Loader />;

  const heroImage = activeImage || venue.media?.[0] || "https://placehold.co/1200x600";
  const otherImages = venue.media?.filter((img) => img !== heroImage) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[90vh] overflow-hidden mb-6">
        <div className="absolute inset-0 transform scale-[1.75] animate-zoom-slow z-0 transition-transform duration-500">
          <img
            src={heroImage}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 w-full h-full bg-black bg-opacity-40 flex flex-col justify-end">
          <div className="p-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">{venue.name}</h1>
            <div className="flex justify-center gap-6 text-sm md:text-base bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-md">
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{venue.maxGuests} gjester</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={20} />
                <span>{venue.price} NOK/natt</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{venue.location?.city || "Ukjent"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thumbnail Grid */}
      {otherImages.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {otherImages.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className="aspect-video overflow-hidden rounded hover:opacity-80 transition"
              >
                <img
                  src={img}
                  alt={`Bilde ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {otherImages.length > 4 && (
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2">
                {otherImages.slice(4).map((img, index) => (
                  <button
                    key={`extra-${index}`}
                    onClick={() => setActiveImage(img)}
                    className="w-40 h-24 flex-shrink-0 overflow-hidden rounded hover:opacity-80 transition"
                  >
                    <img
                      src={img}
                      alt={`Ekstra bilde ${index + 5}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Innhold */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-700 text-lg mb-4">{venue.description || "Ingen beskrivelse tilgjengelig."}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm text-gray-500">Sted</h3>
            <p className="text-gray-800">{venue.location?.city || "Ukjent"}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Pris per natt</h3>
            <p className="text-gray-800">{venue.price} NOK</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Maks gjester</h3>
            <p className="text-gray-800">{venue.maxGuests}</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Book nå
        </button>
      </main>

      {showModal && <BookingModal venue={venue} onClose={() => setShowModal(false)} />}
    </>
  );
}