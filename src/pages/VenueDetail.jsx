import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${id}`
        );
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Feil ved henting av venue:", error);
      }
    }

    fetchVenue();
  }, [id]);

  if (!venue) {
    return <p>Laster detaljer...</p>;
  }

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 underline text-sm">
        Tilbake til oversikt
      </Link>
      <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
      {venue.media?.[0] && (
        <img
          src={venue.media[0]}
          alt={venue.name}
          className="w-full max-w-xl rounded mb-4"
        />
      )}
      <p>{venue.description}</p>
    </div>
  );
}