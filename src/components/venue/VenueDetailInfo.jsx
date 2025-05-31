import PropTypes from "prop-types";

export default function VenueDetailInfo({ venue }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-10 text-sm text-white-800 border-t pt-6 border-white/40 rounded-s-none">
      <div>
        <p><span className="font-semibold">Pris:</span> {venue.price} NOK / natt</p>
        <p><span className="font-semibold">Maks gjester:</span> {venue.maxGuests}</p>
      </div>
      <div>
        <p><span className="font-semibold">Wifi:</span> {venue.meta.wifi ? "Ja" : "Nei"}</p>
        <p><span className="font-semibold">Parkering:</span> {venue.meta.parking ? "Ja" : "Nei"}</p>
        <p><span className="font-semibold">Frokost:</span> {venue.meta.breakfast ? "Ja" : "Nei"}</p>
        <p><span className="font-semibold">Kjæledyr:</span> {venue.meta.pets ? "Ja" : "Nei"}</p>
      </div>
    </div>
  );
}

VenueDetailInfo.propTypes = {
  venue: PropTypes.shape({
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};