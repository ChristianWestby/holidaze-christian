import PropTypes from "prop-types";

export default function VenueLocationFieldset({ location, setLocation }) {
  const fields = [
    { label: "Adresse", key: "address" },
    { label: "By (city) *", key: "city" },
    { label: "Postnummer (zip)", key: "zip" },
    { label: "Land (country) *", key: "country" },
    { label: "Verdensdel (continent) *", key: "continent" },
    { label: "Breddegrad (lat)", key: "lat" },
    { label: "Lengdegrad (lng)", key: "lng" },
  ];

  return (
    <fieldset className="w-full border border-[#d2c6b2] mt-6 bg-white text-black px-6 py-4 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
     <legend className="text-sm font-thin mt-6 mb-2 px-1">Lokasjon</legend>
      <div className="space-y-4">
        {fields.map(({ label, key }) => (
          <div key={key}>
            <label className="block mb-1 font-thin">{label}</label>
            <input
              type="text"
              value={location[key]}
              onChange={(e) => setLocation({ ...location, [key]: e.target.value })}
              required={["city", "country", "continent"].includes(key)}
              className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

VenueLocationFieldset.propTypes = {
  location: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};