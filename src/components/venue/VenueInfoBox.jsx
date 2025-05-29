import PropTypes from "prop-types";

export default function VenueInfoBox({ venue }) {
  if (!venue) return null;

  return (
    <div className="space-y-2 text-sm">
      <p><strong>Pris:</strong> {venue.price} NOK / natt</p>
      <p><strong>Maks gjester:</strong> {venue.maxGuests}</p>
      <p><strong>Rating:</strong> {venue.rating}</p>
      <p><strong>Wifi:</strong> {venue.meta?.wifi ? "Ja" : "Nei"}</p>
      <p><strong>Parkering:</strong> {venue.meta?.parking ? "Ja" : "Nei"}</p>
      <p><strong>Frokost:</strong> {venue.meta?.breakfast ? "Ja" : "Nei"}</p>
      <p><strong>Kjæledyr:</strong> {venue.meta?.pets ? "Ja" : "Nei"}</p>
    </div>
  );
}

VenueInfoBox.propTypes = {
  venue: PropTypes.object,
};