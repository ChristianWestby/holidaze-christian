// src/components/venue/form/VenueFormWrapper.jsx

import PropTypes from "prop-types";

export default function VenueFormWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-black pt-[120px] pb-20 px-4">
      <div className="max-w-2xl mx-auto bg-[#f4f1ea] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Opprett nytt sted</h1>
        {children}
      </div>
    </div>
  );
}

VenueFormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};