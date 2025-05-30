import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Feil brukernavn eller passord");
      }

      const data = await response.json();

      console.log("Login response data:", data);  // Sjekk struktur

      login(data);  // Send hele data-objektet til login

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/holidaze-auth-bg.jpg')",
      }}
    >
      <div className="max-w-md w-full bg-black/70 text-white p-8 shadow-xl backdrop-blur font-sans mt-[120px]">
        <h1 className="text-2xl font-semibold mb-6 text-center tracking-wide">Velkommen tilbake</h1>
        {error && <p className="text-red-400 mb-4 text-center text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-white/80">E-postadresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="din@epost.no"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Passord</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 pr-10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white transition"
                aria-label={showPassword ? "Skjul passord" : "Vis passord"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md border border-transparent hover:bg-black hover:text-white hover:border-white transition"
          >
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
}