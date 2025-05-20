import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // henter setter fra context

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

      // lagre i localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("venueManager", data.venueManager);

      // oppdater global auth state
      setUser({
        accessToken: data.accessToken,
        name: data.name,
        email: data.email,
        venueManager: data.venueManager,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-[120px] bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Logg inn</h1>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">E-post:</label>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Logg inn
        </button>
      </form>
    </div>
  );
}