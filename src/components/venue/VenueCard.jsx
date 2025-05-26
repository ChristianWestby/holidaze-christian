import { useState } from "react";
import BookingModal from "@components/common/booking/BookingModal";
import VenueImage from "@components/venue/VenueImage";
import VenueInfo from "@components/venue/VenueInfo";
import VenueButtons from "@components/common/ui/buttons/VenueButtons";

export default function VenueCard({ venue }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="bg-black text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <VenueImage image={venue.media?.[0] || "/fallback.jpg"} alt={venue.name} />
      <div className="p-5 flex flex-col justify-between gap-3 h-full">
        <VenueInfo name={venue.name} description={venue.description} />
        <VenueButtons venueId={venue.id} onBook={handleOpen} />
      </div>

      {isOpen && <BookingModal venue={venue} onClose={handleClose} />}
    </div>
  );
}