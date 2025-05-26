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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
  backgroundImage: "url('/images/holidaze-auth-bg.jpg')",
}}
    >
      <div className="max-w-md w-full bg-black/70 text-white p-8 rounded-2xl shadow-xl backdrop-blur font-sans mt-[120px]">
        <h1 className="text-2xl font-semibold mb-6 text-center tracking-wide">Opprett konto</h1>
        {error && <p className="text-red-400 mb-4 text-center text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-white/80">Navn (unikt)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="f.eks. sofiejones"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">E-post (stud.noroff.no)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="din@stud.noroff.no"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Passord</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Bekreft passord</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="••••••••"
            />
            <label className="text-sm mt-2 flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="accent-white"
              />
              Vis passord
            </label>
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Profilbilde (URL)</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="https://..."
            />
          </div>

          <label className="text-sm flex items-center gap-2 text-white/80">
            <input
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
              className="accent-orange-500"
            />
            Registrer som venue manager
          </label>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-white/90 transition"
          >
            Registrer
          </button>

          <div className="text-center mt-4 space-y-2 text-sm">
            <Link to="/login" className="text-white/60 hover:underline block">
              Allerede registrert? Logg inn her
            </Link>
            <Link to="/" className="text-white/40 hover:underline block">
              Tilbake til forsiden
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}