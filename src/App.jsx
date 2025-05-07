import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VenueDetail from './pages/VenueDetail';

export default function App() {
  return (
    <>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/" className="text-blue-600 underline">Hjem</Link>
        <Link to="/about" className="text-blue-600 underline">Om</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/venue/:id" element={<VenueDetail />} />
      </Routes>
    </>
  );
}