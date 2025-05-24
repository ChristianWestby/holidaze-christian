import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllVenues() {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        const data = await res.json();
        setVenues(data);
      } catch (err) {
        console.error("Feil ved henting av venues:", err);
      }
    }
    fetchVenues();
  }, []);

  const filtered = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      venue.media?.length > 0 && typeof venue.media[0] === "string"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Alle steder</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Søk steder..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((venue) => (
          <Link
            to={`/venues/${venue.id}`}
            key={venue.id}
            className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={venue.media[0]}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{venue.name}</h2>
              <p className="text-sm text-gray-600">{venue.location?.city}, {venue.location?.country}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
