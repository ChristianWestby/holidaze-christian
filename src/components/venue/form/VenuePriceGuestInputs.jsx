import PropTypes from "prop-types";

export default function VenuePriceGuestInputs({ price, setPrice, maxGuests, setMaxGuests }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-thin">Pris per natt *</label>
        <input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-thin">Maks gjester *</label>
        <input
          type="number"
          min="1"
          max="100"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
        />
      </div>
    </div>
  );
}

VenuePriceGuestInputs.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setPrice: PropTypes.func.isRequired,
  maxGuests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setMaxGuests: PropTypes.func.isRequired,
};