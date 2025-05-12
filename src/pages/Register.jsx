import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passordene samsvarer ikke.");
      return;
    }

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar, password, venueManager }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Registrering feilet");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Registrer bruker</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Navn (unikt):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">E-post (stud.noroff.no):</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Passord:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Bekreft passord:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <div className="mt-2">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Vis passord
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1">Profilbilde (URL):</label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={venueManager}
            onChange={(e) => setVenueManager(e.target.checked)}
          />
          <label>Registrer som venue manager</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrer
        </button>
        <div className="text-center mt-4 space-y-2">
          <Link to="/login" className="text-blue-600 hover:underline block">
            Allerede registrert? Logg inn her
          </Link>
          <Link to="/" className="text-gray-600 hover:underline block">
            Tilbake til forsiden
          </Link>
        </div>
      </form>
    </div>
  );
}