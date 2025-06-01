import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import { backgroundImages } from "@assets/image/images";

const API_KEY = "227d4ff6-0c0b-4587-8d71-a0ca6528e73f";

export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 1,
    media: [],
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    async function fetchVenue() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
          },
        });

        if (!res.ok) throw new Error("Venue finnes ikke");
        const data = await res.json();

        if (data.owner?.name !== user?.name) {
          setError("Du har ikke tilgang til å redigere dette stedet.");
          return;
        }

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          maxGuests: data.maxGuests || 1,
          media: (data.media || []).map((m) =>
            typeof m === "string" ? { url: m, alt: "Venue image" } : m
          ),
          location: {
            address: data.location?.address || "",
            city: data.location?.city || "",
            zip: data.location?.zip || "",
            country: data.location?.country || "",
            continent: data.location?.continent || "",
            lat: data.location?.lat || 0,
            lng: data.location?.lng || 0,
          },
          meta: {
            wifi: data.meta?.wifi || false,
            parking: data.meta?.parking || false,
            breakfast: data.meta?.breakfast || false,
            pets: data.meta?.pets || false,
          },
        });
      } catch (err) {
        setError("Kunne ikke hente data for stedet.");
      }
    }

    fetchVenue();
  }, [id, token, user?.name]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (["wifi", "parking", "breakfast", "pets"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, [name]: checked },
      }));
    } else if (name in formData.location) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  }

  function handleMediaChange(e) {
    const lines = e.target.value
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      media: lines.map((url) => ({ url, alt: "Venue image" })),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          ...formData,
          media: formData.media.map((m) => m.url),
        }),
      });

      if (!res.ok) throw new Error("Kunne ikke oppdatere venue");

      navigate(`/venues/${id}`);
    } catch {
      setError("Oppdatering feilet. Sjekk feltene.");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center pt-[120px] px-4"
      style={{ backgroundImage: `url('${backgroundImages.editvenueimage}')` }}
    >
      <div className="w-full max-w-3xl bg-[#1c293a] text-white shadow-lg p-6 sm:p-8 rounded-xl font-sans">
        <h1 className="text-3xl font-light mb-6 text-center">Rediger sted</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}

          <input name="name" value={formData.name} onChange={handleChange} placeholder="Navn" required className="w-full p-3 rounded-lg text-black" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Beskrivelse" rows={3} className="w-full p-3 rounded-lg text-black" />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Pris" className="w-full p-3 rounded-lg text-black" />
          <input name="maxGuests" type="number" value={formData.maxGuests} onChange={handleChange} placeholder="Gjester" className="w-full p-3 rounded-lg text-black" />

          <textarea
            name="media"
            value={formData.media.map((m) => m.url).join("\n")}
            onChange={handleMediaChange}
            placeholder="Bildelenker (én per linje)"
            rows={4}
            className="w-full p-3 rounded-lg text-black"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["address", "city", "zip", "country", "continent"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData.location[field]}
                onChange={handleChange}
                placeholder={field}
                className="p-3 rounded-lg text-black"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {Object.entries(formData.meta).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input type="checkbox" name={key} checked={value} onChange={handleChange} className="accent-white" />
                <span>{key}</span>
              </label>
            ))}
          </div>

          <PrimaryButton text="Lagre endringer" type="submit" full />
        </form>
      </div>
    </div>
  );
}