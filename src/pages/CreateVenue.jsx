

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";

import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import VenueFormWrapper from "@components/venue/form/VenueFormWrapper";
import VenueTextInputs from "@components/venue/form/VenueTextInputs";
import VenueImageInputs from "@components/venue/form/VenueImageInputs";
import VenuePriceGuest from "@components/venue/form/VenuePriceGuest";
import VenueLocationInputs from "@components/venue/form/VenueLocationInputs";
import VenueFacilities from "@components/venue/form/VenueFacilities";

export default function CreateVenue() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [location, setLocation] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: "",
    lng: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function updateMedia(index, value) {
    const updated = [...media];
    updated[index] = value;
    setMedia(updated);
  }

  function addMediaField() {
    setMedia([...media, ""]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const venueData = {
      name: name.trim(),
      description: description.trim(),
      media: media.filter((url) => url.trim() !== ""),
      price: Number(price),
      maxGuests: Number(maxGuests),
      meta,
      location: {
        address: location.address.trim(),
        city: location.city.trim(),
        zip: location.zip.trim(),
        country: location.country.trim(),
        continent: location.continent.trim(),
        lat: parseFloat(location.lat) || 0,
        lng: parseFloat(location.lng) || 0,
      },
    };

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Noe gikk galt");
      }

      setSuccess(true);
      setName("");
      setDescription("");
      setMedia([""]);
      setPrice("");
      setMaxGuests(1);
      setMeta({ wifi: false, parking: false, breakfast: false, pets: false });
      setLocation({ address: "", city: "", zip: "", country: "", continent: "", lat: "", lng: "" });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <VenueFormWrapper>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-700 mb-4 text-center">Sted opprettet! Du sendes videre...</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <VenueTextInputs name={name} setName={setName} description={description} setDescription={setDescription} />
        <VenueImageInputs media={media} updateMedia={updateMedia} addMediaField={addMediaField} />
        <VenuePriceGuest price={price} setPrice={setPrice} maxGuests={maxGuests} setMaxGuests={setMaxGuests} />
        <VenueLocationInputs location={location} setLocation={setLocation} />
        <VenueFacilities meta={meta} setMeta={setMeta} />
        <PrimaryButton text="Opprett sted" type="submit" full={true} />
      </form>
    </VenueFormWrapper>
  );
}