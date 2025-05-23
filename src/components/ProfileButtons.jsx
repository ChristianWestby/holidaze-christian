import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function ProfileButtons({ venueManager }) {
  const navigate = useNavigate();

  return (
    <>
      <PrimaryButton onClick={() => navigate("/settings")} label="Endre profil" />
      {venueManager && <PrimaryButton onClick={() => navigate("/create")} label="Opprett nytt venue" />}
      <PrimaryButton onClick={() => navigate("/")} label="Til forsiden" />
      <PrimaryButton onClick={() => navigate("/booking")} label="Booking" />
    </>
  );
}