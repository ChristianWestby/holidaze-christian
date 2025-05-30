import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backgroundImages } from "../assets/image/images";  


import VenueGridCard from "@components/venue/VenueGridCard";
import BackToMenuButton from "@components/common/ui/buttons/BackToMenuButton";
import VenueSearchFilter from "../components/venue/VenueSearchFilter";
import Pagination from "../components/common/navigation/Pagination";


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
      backgroundImage: `url("${backgroundImages.allvenuesbilde}")`,
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
        <VenueSearchFilter
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         continent={continent}
         setContinent={setContinent}
       />

        <BackToMenuButton />

        {/* Venuekort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentVenues.map((venue) => (
            <VenueGridCard key={venue.id} venue={venue} />
          ))}
        </div>

        {/* Paginering */}
        <Pagination
         totalPages={totalPages}
         currentPage={currentPage}
         onPageChange={setCurrentPage}
        />
       </div>
       </div>
      );
    }