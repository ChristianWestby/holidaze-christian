import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import { backgroundImages } from "@assets/image/images";

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
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url('${backgroundImages.editprofileimage}')` }}
    >
      <div className="w-full max-w-xl bg-[#1c293a] text-white p-6 sm:p-8 rounded shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-light text-center mb-6">Endre profil</h1>

        {success && <p className="text-green-400 mb-4 text-center">Profil oppdatert!</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-white/80">Ny avatar-URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              className="w-full border border-white/20 bg-white/10 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Bio (kort tekst)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="w-full border border-white/20 bg-white/10 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full sm:w-1/2 bg-white/10 text-white py-2 rounded hover:bg-white/20 transition"
            >
              Tilbake
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-white text-black py-2 rounded hover:bg-white/90 transition"
            >
              Oppdater
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}