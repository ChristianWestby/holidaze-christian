import PropTypes from "prop-types";

export default function MediaInputList({ media, updateMedia, addMediaField }) {
  return (
    <div>
      <label className="block mb-1 font-medium">Bilder (URLer) *</label>
      {media.map((url, i) => (
        <input
          key={i}
          type="url"
          value={url}
          onChange={(e) => updateMedia(i, e.target.value)}
          placeholder={`Bilde ${i + 1}`}
          required={i === 0}
          className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black mb-2"
        />
      ))}
      <button
        type="button"
        onClick={addMediaField}
        className="text-sm text-blue-600 hover:underline"
      >
        + Legg til nytt bilde
      </button>
    </div>
  );
}

MediaInputList.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateMedia: PropTypes.func.isRequired,
  addMediaField: PropTypes.func.isRequired,
};