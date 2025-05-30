
import PropTypes from "prop-types";

export default function VenueSearchFilter({ searchTerm, setSearchTerm, continent, setContinent }) {
  return (
    <div className="bg-white/5 rounded-lg p-6 mb-10 shadow-inner backdrop-blur-md">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Søk..."
          className="w-full sm:w-1/2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="">Alle verdensdeler</option>
          <option value="Europa">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Afrika">Afrika</option>
          <option value="Nord-Amerika">Nord-Amerika</option>
          <option value="Sør-Amerika">Sør-Amerika</option>
          <option value="Oseania">Oseania</option>
        </select>
      </div>
    </div>
  );
}

VenueSearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  continent: PropTypes.string.isRequired,
  setContinent: PropTypes.func.isRequired,
};