import { useState } from "react";

export default function CreateVenue() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([""]);
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("accessToken");

    const venueData = {
      name,
      description,
      media: media.filter((url) => url.trim() !== ""),
      price: Number(price),
      maxGuests: Number(maxGuests),
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
        throw new Error(data.message || "Opprettelse feilet.");
      }

      setSuccess(true);
      setName("");
      setDescription("");
      setMedia([""]);
      setPrice("");
      setMaxGuests(1);
    } catch (err) {
      setError(err.message);
    }
  }

  function updateMedia(index, value) {
    const newMedia = [...media];
    newMedia[index] = value;
    setMedia(newMedia);
  }

  function addMediaField() {
    setMedia([...media, ""]);
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Opprett nytt venue</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">Venue opprettet!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Navn</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Beskrivelse</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Bilder (URLer)</label>
          {media.map((url, index) => (
            <input
              key={index}
              type="url"
              value={url}
              onChange={(e) => updateMedia(index, e.target.value)}
              className="w-full border px-3 py-2 rounded mb-2"
              placeholder={`Bilde ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addMediaField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Legg til bilde
          </button>
        </div>

        <div>
          <label className="block mb-1">Pris per natt</label>
          <input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Maks antall gjester</label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Opprett venue
        </button>
      </form>
    </div>
  );
}