
import PropTypes from "prop-types";
import { backgroundImages } from "@assets/image/images";

export default function BookingWrapper({ children }) {
  return (
    <div
      className="min-h-screen pt-[120px] flex flex-col lg:flex-row bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImages.venuebooking})`,
      }}
    >
      {children}
    </div>
  );
}

BookingWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};