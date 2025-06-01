import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import { backgroundImages } from "@assets/image/images";

export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [venue, setVenue] = useState(null);
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
    if (!id || !user?.name) return;

    async function fetchVenue() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true`);
        if (!res.ok) throw new Error("Venue finnes ikke");

        const data = await res.json();

        if (!data.owner?.name || data.owner.name !== user.name) {
          setError("Du har ikke tilgang til å redigere dette venue.");
          return;
        }

        setVenue(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          maxGuests: data.maxGuests || 1,
          media: Array.isArray(data.media)
            ? data.media.map((m) => ({
                url: typeof m === "string" ? m : m.url,
                alt: typeof m === "object" && m.alt ? m.alt : "Venue image",
              }))
            : [],
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
        console.error("Feil ved henting:", err);
        setError("Kunne ikke laste venue.");
      }
    }

    fetchVenue();
  }, [id, user?.name]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = {
        ...formData,
        media: formData.media.map((item) => ({
          url: typeof item === "string" ? item.trim() : item.url.trim(),
          alt: item.alt?.trim() || "Venue image",
        })),
      };

      console.log("Body som sendes til API:", body);

      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API-feil:", JSON.stringify(errorData, null, 2));
        throw new Error("Kunne ikke oppdatere venue");
      }

      navigate(`/venues/${id}`);
    } catch (err) {
      console.error(err);
      setError("Noe gikk galt. Prøv igjen.");
    }
  }

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!venue) return <p className="text-center mt-20 text-gray-500">Laster venue...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-[120px] px-4"
      style={{ backgroundImage: `url('${backgroundImages.editvenueimage}')` }}
    >
      <div className="w-full max-w-3xl bg-[#1c293a] text-white shadow-lg p-8">
        <h1 className="text-3xl font-thin mb-6 text-center">Rediger sted</h1>
        <div className="border-t border-white/20 my-6"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Navn" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 text-black" required />
          <textarea name="description" placeholder="Beskrivelse" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded px-4 py-2 text-black" />
          <input type="number" name="price" placeholder="Pris per natt" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 text-black" />
          <input type="number" name="maxGuests" placeholder="Maks antall gjester" value={formData.maxGuests} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 text-black" />

          <textarea
            name="media"
            placeholder="Bildelenker (én per linje)"
            value={formData.media.map((m) => m.url).join("\n")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                media: e.target.value
                  .split("\n")
                  .map((url) => ({ url: url.trim(), alt: "Venue image" }))
                  .filter((m) => m.url),
              }))
            }
            rows={5}
            className="w-full border border-gray-300 rounded px-4 py-2 text-black"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["address", "city", "zip", "country", "continent"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData.location[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black"
                required
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["wifi", "parking", "breakfast", "pets"].map((key) => (
              <label key={key} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" name={key} checked={formData.meta[key]} onChange={handleChange} className="accent-white" />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>

          <PrimaryButton text="Lagre endringer" type="submit" full />
        </form>
      </div>
    </div>
  );
}