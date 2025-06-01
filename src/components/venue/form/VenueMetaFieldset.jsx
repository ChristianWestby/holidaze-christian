import PropTypes from "prop-types";

export default function VenueMetaFieldset({ meta, setMeta }) {
  return (
    <fieldset className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-4 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
      <legend className="text-sm font-thin mb-4 px-1">Fasiliteter</legend>
      <div className="space-y-2">
        {Object.entries(meta).map(([key, value]) => (
          <label key={key} className="block text-sm font-thin">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setMeta({ ...meta, [key]: e.target.checked })}
              className="mr-2"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

VenueMetaFieldset.propTypes = {
  meta: PropTypes.object.isRequired,
  setMeta: PropTypes.func.isRequired,
};