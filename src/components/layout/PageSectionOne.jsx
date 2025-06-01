import PropTypes from "prop-types";

export default function PageSectionOne({ children }) {
  return (
    <div className="bg-[#1c1c1c] text-white py-10 px-4 rounded-lg shadow-inner max-w-7xl mx-auto">
      {children}
    </div>
  );
}


PageSectionOne.propTypes = {
  children: PropTypes.node.isRequired,
};