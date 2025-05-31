import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@utils/auth/AuthContext";

import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeroImage from "@components/venue/VenueHeroImage";
import VenueImageGallery from "@components/venue/VenueImageGallery";
import VenueBookingButton from "@components/venue/VenueBookingButton";
import VenueAvailability from "@components/venue/VenueAvailability";
import VenueLocationTitle from "@components/venue/form/VenueLocationTitle";
import VenueDescription from "@components/venue/VenueDescription";
import VenueDetailInfo from "@components/venue/VenueDetailInfo";
import BackToLink from "@components/common/navigation/BackToLink";
import PageSectionOne from "@components/layout/PageSectionOne";
import PageSectionTwo from "@components/layout/PageSectionTwo";
import VenueStorySection from "@components/layout/VeneuStorySection";
import FrontpageCarousel from "@components/common/carousel/FrontpageCarousel";
import FrontpageCarouselAll from "@components/common/carousel/FrontpageCarouselAll";
import FallbackLoader from "@components/common/ui/feedback/FallbackLoader";
import ShareLink from "@components/common/ui/ShareLink";

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { venue, bookings, loading } = useVenueAndBookingsResult(id, navigate, token);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    setMainImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <FallbackLoader />;
  if (!venue) return <p className="text-center mt-10">Fant ikke sted.</p>;

  return (
    <section className="venue-detail sectionmain">
      <VenueHeroImage
        image={venue.media?.[0]}
        name={venue.name}
        location={venue.location}
      />

      <VenueImageGallery
        media={venue.media}
        mainImageIndex={mainImageIndex}
        setMainImageIndex={setMainImageIndex}
      />

      <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Venstre kolonne */}
          <div className="flex-1">
            <VenueDescription description={venue.description} />
            <VenueDetailInfo venue={venue} />
            <div className="mt-6">
              <VenueBookingButton
                venueId={venue.id}
                onClick={() => navigate(`/booking/${venue.id}`)}
              />
            </div>
            <div className="mt-4">
              <ShareLink />
            </div>
          </div>

          {/* Høyre kolonne */}
          <div className="flex-1">
            <VenueAvailability bookings={bookings} />
          </div>
        </div>
      </div>

      <div className="mt-16 mb-10 px-4 md:px-6">
        <BackToLink to="/" label="← Tilbake til forsiden" />
      </div>

      <PageSectionTwo>
        <FrontpageCarouselAll />
      </PageSectionTwo>

      <VenueStorySection />

      <PageSectionOne>
        <FrontpageCarousel />
      </PageSectionOne>
    </section>
  );
}