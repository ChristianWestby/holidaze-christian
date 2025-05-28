import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VenueGridCard from "@components/venue/VenueGridCard";
import BackToMenuButton from "@components/common/ui/buttons/BackToMenuButton";

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
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative pt-[120px] pb-20 px-4"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2025/03/31/21/18/tiber-river-9505401_1280.jpg")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Innhold */}
      <div className="relative z-10 max-w-7xl mx-auto text-white">
        <h1 className="text-3xl font-light mb-6 border-b border-white/20 pb-2">
          Alle våre eksklusive og fantastiske opplevelser
        </h1>

        {/* Søk og filter */}
        <div className="bg-white/5 rounded-lg p-6 mb-10 shadow-inner backdrop-blur-md">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søk..."
              className="w-full sm:w-1/2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />

            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
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
        </div>

        <BackToMenuButton />

        {/* Venuekort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentVenues.map((venue) => (
            <VenueGridCard key={venue.id} venue={venue} />
          ))}
        </div>

        {/* Paginering */}
        <div className="flex flex-col items-center mt-12 gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 text-sm rounded transition-all ${
                  currentPage === i + 1
                    ? "bg-white text-black"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <BackToMenuButton />
        </div>
      </div>
    </div>
  );
}