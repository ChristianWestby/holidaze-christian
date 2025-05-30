import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminVenueIds from "@data/AdminVenuesId";
import ExploreButton from "@components/common/ui/buttons/ExploreButton";
import BackToLink from "@components/common/navigation/BackToLink";

export default function HighlightedVenues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const responses = await Promise.all(
          adminVenueIds.map((id) =>
            fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`).then((res) => res.json())
          )
        );
        setVenues(responses);
      } catch (err) {
        console.error("Feil ved henting av utvalgte venues:", err);
      }
    }
    fetchVenues();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-[120px]">
      <h1 className="text-3xl font-bold mb-6 border-b border-black pb-2">Våre utvalgte steder</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-[#f4f1ea] rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={venue.media?.[0] || "/fallback.jpg"}
              alt={venue.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="font-semibold text-lg mb-1 line-clamp-1">{venue.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {venue.location?.city}, {venue.location?.country}
                </p>
                <p className="text-sm text-black mt-2 font-medium">{venue.price} NOK / natt</p>
              </div>
              <div className="mt-4">
                <ExploreButton to={`/venues/${venue.id}`}>Utforsk stedet</ExploreButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
  <BackToLink to="/" label="← Tilbake til meny" />
</div>
    </div>
  );
}