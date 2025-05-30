import PropTypes from "prop-types";

export default function PageSectionTwo({ children }) {
  return (
    <div className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner">
      {children}
    </div>
  );
}

PageSectionTwo.propTypes = {
  children: PropTypes.node.isRequired,
};