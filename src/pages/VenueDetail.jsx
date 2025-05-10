import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${id}`
        );
        if (!response.ok) {
          throw new Error("Klarte ikke å hente venue");
        }
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Feil ved henting av venue:", error);
        setError("Noe gikk galt. Prøv igjen senere.");
      }
    }

    fetchVenue();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (!venue) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Tilbake til oversikt
      </Link>

      <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>

      {venue.media?.[0] && (
        <img
          src={venue.media[0]}
          alt={venue.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-700 mb-6">{venue.description}</p>

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Book nå
      </button>
    </div>
  );
}