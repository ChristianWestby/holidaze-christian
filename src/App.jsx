import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import VenueDetail from "./pages/VenueDetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <a href="/" className="text-blue-600 underline">Hjem</a>
        <a href="/about" className="text-blue-600 underline">Om</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/venue/:id" element={<VenueDetail />} />
      </Routes>
    </BrowserRouter>
  );
}