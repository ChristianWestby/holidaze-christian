import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";

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
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        const data = await res.json();

        // 🔐 Sjekk eierskap
        if (data.owner?.name !== user?.name) {
          setError("Du har ikke tilgang til å redigere dette venue.");
          return;
        }

        setVenue(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          maxGuests: data.maxGuests || 1,
          media: data.media || [],
          meta: data.meta || {},
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
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Kunne ikke oppdatere venue");
      navigate(`/venues/${id}`);
    } catch (err) {
      console.error(err);
      setError("Noe gikk galt. Prøv igjen.");
    }
  }

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!venue) return <p className="text-center mt-20 text-gray-500">Laster venue...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-[#f4f1ea] shadow-xl rounded-2xl p-8 mt-[120px] font-sans">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Rediger Venue</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Navn"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded px-4 py-2"
          required
        />

        <textarea
          name="description"
          placeholder="Beskrivelse"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-400 rounded px-4 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Pris per natt"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded px-4 py-2"
        />

        <input
          type="number"
          name="maxGuests"
          placeholder="Maks antall gjester"
          value={formData.maxGuests}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded px-4 py-2"
        />

        <input
          type="text"
          name="media"
          placeholder="Bildelenker (komma-separert)"
          value={formData.media.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, media: e.target.value.split(", ") }))
          }
          className="w-full border border-gray-400 rounded px-4 py-2"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["wifi", "parking", "breakfast", "pets"].map((key) => (
            <label key={key} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name={key}
                checked={formData.meta[key] || false}
                onChange={handleChange}
                className="accent-black"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>

        <PrimaryButton text="Lagre endringer" type="submit" />
      </form>
    </div>
  );
}