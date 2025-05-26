import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  const [venues, setVenues] = useState([]);
  const [continent, setContinent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        const data = await res.json();

        // Legg inn dummy lat/lng hvis mangler
        const withCoords = data.map((venue, i) => ({
          ...venue,
          lat: venue.location?.lat ?? (59.91 + i * 0.01),
          lng: venue.location?.lng ?? (10.75 + i * 0.01),
        }));

        setVenues(withCoords);
      } catch (err) {
        console.error("Feil ved henting av venues:", err);
      }
    }
    fetchVenues();
  }, []);

  const filteredVenues = continent
    ? venues.filter((v) => v.location?.continent === continent)
    : venues;

  return (
    <div className="mt-[120px] h-[calc(100vh-120px)] relative">
      {/* Filterpanel */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[500] bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded shadow text-sm w-60">
        <label className="block mb-1 font-medium">Filtrer verdensdel:</label>
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          className="w-full px-3 py-1 rounded border border-gray-300 focus:outline-none"
        >
          <option value="">Alle</option>
          <option value="Europa">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Afrika">Afrika</option>
          <option value="Nord-Amerika">Nord-Amerika</option>
          <option value="Sør-Amerika">Sør-Amerika</option>
          <option value="Oseania">Oseania</option>
        </select>
      </div>

      {/* Kartet */}
      <MapContainer
        center={[59.91, 10.75]}
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />

        {filteredVenues.map((venue) => (
          <Marker key={venue.id} position={[venue.lat, venue.lng]}>
            <Popup>
              <div className="text-sm">
                <strong>{venue.name}</strong>
                <br />
                {venue.location?.city}, {venue.location?.country}
                <br />
                <button
                  onClick={() => navigate(`/venues/${venue.id}`)}
                  className="mt-1 text-blue-600 underline hover:text-blue-800"
                >
                  Vis detaljer
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
