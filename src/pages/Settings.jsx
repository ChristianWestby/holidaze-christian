import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";

export default function Settings() {
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar, bio }),
      });

      if (!response.ok) throw new Error("Oppdatering feilet");

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-[120px] bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Endre profil</h1>

      {success && <p className="text-green-600 mb-4 text-center">Profil oppdatert!</p>}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Ny avatar-URL</label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Bio (kort tekst)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-1/2 bg-gray-200 text-black py-2 rounded hover:bg-gray-300 transition"
          >
            Tilbake
          </button>
          <button
            type="submit"
            className="w-1/2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Oppdater
          </button>
        </div>
      </form>
    </div>
  );
}