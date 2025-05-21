import { useState } from "react";

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
      console.log("🟡 SENDER TIL API:", venueData);
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
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-[120px] bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Opprett nytt venue</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">Venue opprettet!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Navn *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Beskrivelse *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Bilder (URLer) *</label>
          {media.map((url, i) => (
            <input
              key={i}
              type="url"
              value={url}
              onChange={(e) => updateMedia(i, e.target.value)}
              className="w-full border px-3 py-2 rounded mb-2"
              placeholder={`Bilde ${i + 1}`}
              required={i === 0}
            />
          ))}
          <button type="button" onClick={addMediaField} className="text-sm text-blue-600 hover:underline">
            + Legg til bilde
          </button>
        </div>

        <div>
          <label className="block mb-1">Pris per natt *</label>
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Maks gjester *</label>
          <input type="number" min="1" max="100" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>

        <fieldset className="border p-4 rounded">
          <legend className="text-sm font-semibold mb-2">Fasiliteter</legend>
          {Object.entries(meta).map(([key, value]) => (
            <label key={key} className="block text-sm">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setMeta({ ...meta, [key]: e.target.checked })}
                className="mr-2"
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </fieldset>

        <fieldset className="border p-4 rounded">
          <legend className="text-sm font-semibold mb-2">Lokasjon</legend>
          {["address", "city", "zip", "country", "continent", "lat", "lng"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border px-3 py-2 rounded mb-2"
              value={location[field]}
              onChange={(e) => setLocation({ ...location, [field]: e.target.value })}
              required={["city", "country", "continent"].includes(field)}
            />
          ))}
        </fieldset>

        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Opprett venue
        </button>
      </form>
    </div>
  );
}