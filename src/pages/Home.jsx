import { useEffect, useState } from "react";
<<<<<<< Updated upstream
=======
import Hero from "../components/Hero";
import VenueCard from "../components/VenueCard";
>>>>>>> Stashed changes

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

  return (
<<<<<<< Updated upstream
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏝️ Holidaze Venues</h1>
      <ul className="space-y-2">
        {venues.map((venue) => (
          <li key={venue.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{venue.name}</h2>
            <p>{venue.description}</p>
          </li>
        ))}
      </ul>
    </div>
=======
    <>
      <Hero />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">🏝️ Holidaze Venues</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </>
>>>>>>> Stashed changes
  );
}