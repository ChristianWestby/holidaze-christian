import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import Loader from "../components/Loader";

export default function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Feil ved henting av venues:", error);
      }
    }

    fetchVenues();
  }, []);

  if (venues.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Hero />

      {/* Sticky bunnstripe rett etter hero */}
      <div className="sticky top-16 z-30 w-[90%] mx-auto -mt-20">
        <div className="bg-black bg-opacity-50 text-white py-6 px-8 rounded-xl flex flex-wrap items-center justify-center gap-6 text-sm shadow-lg backdrop-blur-sm">
          <button className="flex items-center gap-2 hover:underline transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Verdenskart
          </button>
          <button className="hover:underline transition">Lavest pris</button>
          <button className="hover:underline transition">Søk</button>
          <input
            type="text"
            placeholder="Søk sted, dato, gjester..."
            className="bg-white bg-opacity-20 text-white placeholder-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-white transition w-64"
          />
        </div>
      </div>

      {/* Venue cards */}
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Holidaze Venues</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </>
  );
}