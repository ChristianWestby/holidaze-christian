import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";

export default function useVenueForm() {
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
      resetForm();
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  function resetForm() {
    setName("");
    setDescription("");
    setMedia([""]);
    setPrice("");
    setMaxGuests(1);
    setMeta({ wifi: false, parking: false, breakfast: false, pets: false });
    setLocation({
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    });
  }

  return {
    name,
    setName,
    description,
    setDescription,
    media,
    updateMedia,
    addMediaField,
    price,
    setPrice,
    maxGuests,
    setMaxGuests,
    meta,
    setMeta,
    location,
    setLocation,
    error,
    success,
    handleSubmit,
  };
}