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
    <div className="venue-detail">
      <Link to="/" className="venue-detail__back-link">
        Tilbake til oversikt
      </Link>

      <h1 className="venue-detail__title">{venue.name}</h1>

      {venue.media?.[0] && (
        <img
          src={venue.media[0]}
          alt={venue.name}
          className="venue-detail__image"
        />
      )}

      <p className="venue-detail__description">{venue.description}</p>

      <button className="venue-detail__book-button">
        Book nå
      </button>
    </div>
  );
}