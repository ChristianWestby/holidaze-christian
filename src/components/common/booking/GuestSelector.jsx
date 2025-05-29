import PropTypes from "prop-types";

export default function GuestSelector({ guests, maxGuests, onChange }) {
  const minGuests = 1;

  function handleDecrease() {
    if (guests > minGuests) {
      onChange(guests - 1);
    }
  }

  function handleIncrease() {
    if (guests < maxGuests) {
      onChange(guests + 1);
    }
  }

  return (
    <div className="flex items-center justify-between bg-white p-3 border shadow">
      <label className="font-semibold">Antall gjester</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-3 py-1 bg-black text-white rounded disabled:opacity-30"
          onClick={handleDecrease}
          disabled={guests <= minGuests}
        >
          −
        </button>
        <span className="w-6 text-center">{guests}</span>
        <button
          type="button"
          className="px-3 py-1 bg-black text-white rounded disabled:opacity-30"
          onClick={handleIncrease}
          disabled={guests >= maxGuests}
        >
          +
        </button>
      </div>
    </div>
  );
}

GuestSelector.propTypes = {
  guests: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};