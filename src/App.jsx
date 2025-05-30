import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";

// Sider
import Home from "@pages/Home";
import About from "@pages/About";
import CreateVenue from "@pages/CreateVenue";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import AllVenues from "@pages/AllVenues";
import HighlightedVenuesPage from "@pages/HighlightedVenuesPage";
import VenueDetail from "@pages/VenueDetail";
import BookingPage from "@pages/BookingPage";

// Utils
import ProtectedRoute from "@utils/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="venues" element={<AllVenues />} />
          <Route path="booking/:venueId" element={<BookingPage />} />
          <Route path="venues/:id" element={<VenueDetail />} /> {/* Viktig */}
          <Route path="highlighted-venues" element={<HighlightedVenuesPage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}