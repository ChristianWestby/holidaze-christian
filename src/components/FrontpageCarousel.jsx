// src/components/FrontpageCarousel.jsx
import { useEffect, useState } from "react";
import VenueCard from "./VenueCard"; // evt. bytt til egen FrontpageVenueCard senere

const VENUE_IDS = [
  "your-id-1",
  "your-id-2",
  "your-id-3",
  "your-id-4",
  "your-id-5",
];

export default function FrontpageCarousel() {
  const [venues, setVenues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const results = await Promise.all(
          VENUE_IDS.map((id) =>
            fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`).then((res) =>
              res.json()
            )
          )
        );
        setVenues(results);
      } catch (err) {
        console.error("Feil ved henting av spesifikke venues:", err);
      }
    }

    fetchVenues();
  }, []);

  function next() {
    setCurrentIndex((prev) => (prev + 1) % venues.length);
  }

  function prev() {
    setCurrentIndex((prev) => (prev - 1 + venues.length) % venues.length);
  }

  if (venues.length === 0) return null;

  return (
    <div className="relative max-w-4xl mx-auto mt-20 px-4">
      <div className="relative">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black bg-white p-2 rounded-full shadow hover:scale-105 transition z-10"
        >
          &larr;
        </button>

        <div className="mx-12">
          <VenueCard venue={venues[currentIndex]} />
        </div>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black bg-white p-2 rounded-full shadow hover:scale-105 transition z-10"
        >
          &rarr;
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {venues.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}