import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VenueGridCard from "@components/venue/VenueGridCard";

export default function AllVenues() {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [continent, setContinent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;

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
      (continent === "" || venue.location?.continent === continent) &&
      venue.media?.length > 0 &&
      typeof venue.media[0] === "string"
  );

  const indexOfLast = currentPage * venuesPerPage;
  const indexOfFirst = indexOfLast - venuesPerPage;
  const currentVenues = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / venuesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-[120px]">
      <h1 className="text-3xl font-bold mb-4 border-b border-black pb-2">Alle steder</h1>

      {/* Søk og filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Søk..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Alle verdensdeler</option>
          <option value="Europa">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Afrika">Afrika</option>
          <option value="Nord-Amerika">Nord-Amerika</option>
          <option value="Sør-Amerika">Sør-Amerika</option>
          <option value="Oseania">Oseania</option>
        </select>
      </div>

      {/* Tilbake-lenke øverst */}
      <Link to="/" className="text-sm underline hover:text-black mb-6 block">
        ← Tilbake til meny
      </Link>

      {/* Kortvisning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentVenues.map((venue) => (
          <VenueGridCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Paginering + Tilbake-lenke nederst */}
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border text-sm rounded transition-all ${
                currentPage === i + 1
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <Link to="/" className="text-sm underline hover:text-black">
          ← Tilbake til meny
        </Link>
      </div>
    </div>
  );
}