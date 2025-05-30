import PropTypes from "prop-types";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="flex flex-col items-center mt-12 gap-4 w-full">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 text-sm rounded transition-all min-w-[40px]
              ${
                currentPage === i + 1
                  ? "bg-white text-black"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};