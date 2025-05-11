import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("E-post må være en stud.noroff.no adresse");
      return;
    }

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.errors?.[0]?.message || "Noe gikk galt.");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Registrer deg</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Navn"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="E-post (stud.noroff.no)"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Passord"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="avatar"
          type="url"
          placeholder="Lenke til profilbilde (valgfritt)"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="flex items-center">
          <input
            name="venueManager"
            type="checkbox"
            checked={formData.venueManager}
            onChange={handleChange}
            className="mr-2"
          />
          Jeg er en Venue Manager
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Registrer deg
        </button>
      </form>
    </section>
  );
}
