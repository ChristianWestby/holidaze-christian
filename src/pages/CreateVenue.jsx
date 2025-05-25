import { useEffect, useState } from "react";
import PrimaryButton from "../components/common/ui/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function CreateVenue() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [meta, setMeta] = useState({ wifi: false, parking: false, breakfast: false, pets: false });
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

    const token = localStorage.getItem("accessToken");

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
    <div className="min-h-screen bg-[#1c1c1c] text-black pt-[120px] pb-20 px-4">
      <div className="max-w-2xl mx-auto bg-[#f4f1ea] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Opprett nytt sted</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-700 mb-4 text-center">Sted opprettet! Du sendes videre...</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Navn *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Beskrivelse *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bilder (URLer) *</label>
            {media.map((url, i) => (
              <input
                key={i}
                type="url"
                value={url}
                onChange={(e) => updateMedia(i, e.target.value)}
                placeholder={`Bilde ${i + 1}`}
                required={i === 0}
                className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black mb-2"
              />
            ))}
            <button type="button" onClick={addMediaField} className="text-sm text-blue-600 hover:underline">
              + Legg til nytt bilde
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Pris per natt *</label>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Maks gjester *</label>
              <input
                type="number"
                min="1"
                max="100"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                required
                className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <fieldset className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-4 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
            <legend className="text-sm font-semibold mb-4 px-1">Lokasjon</legend>
            <div className="space-y-4">
              {[
                { label: "Adresse", key: "address" },
                { label: "By (city) *", key: "city" },
                { label: "Postnummer (zip)", key: "zip" },
                { label: "Land (country) *", key: "country" },
                { label: "Verdensdel (continent) *", key: "continent" },
                { label: "Breddegrad (lat)", key: "lat" },
                { label: "Lengdegrad (lng)", key: "lng" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block mb-1 font-medium">{label}</label>
                  <input
                    type="text"
                    value={location[key]}
                    onChange={(e) => setLocation({ ...location, [key]: e.target.value })}
                    required={["city", "country", "continent"].includes(key)}
                    className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-4 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
            <legend className="text-sm font-semibold mb-4 px-1">Fasiliteter</legend>
            <div className="space-y-2">
              {Object.entries(meta).map(([key, value]) => (
                <label key={key} className="block text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setMeta({ ...meta, [key]: e.target.checked })}
                    className="mr-2"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
          </fieldset>

          <PrimaryButton text="Opprett sted" type="submit" full={true} />
        </form>
      </div>
    </div>
  );
}