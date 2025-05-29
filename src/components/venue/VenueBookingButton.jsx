import PropTypes from "prop-types";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function VenueBookingButton({ venueId }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 flex-wrap items-center mb-4">
      <PrimaryButton
        text="Book nå"
        onClick={() => navigate(`/booking/${venueId}`)}
        variant="secondary"
      />
    </div>
  );
}

VenueBookingButton.propTypes = {
  venueId: PropTypes.string.isRequired,
};