import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";

// Sider
import Home from "@pages/Home";
import About from "@pages/About";
import CreateVenue from "@pages/CreateVenue";
import BookingDetail from "@pages/BookingDetail";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import AllVenues from "@pages/AllVenues";
import HighlightedVenuesPage from "@pages/HighlightedVenuesPage";
import VenueDetail from "@pages/VenueDetail";
import BookingPage from "@pages/BookingPage";
import EditVenue from "@pages/EditVenue";
import Settings from "@pages/Settings";
import Stories from "@pages/Stories";  
import MapPage from "@pages/MapPage"; 
import Register from "@pages/Register";

// Utils
import ProtectedRoute from "@utils/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Offentlige sider */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="booking-detail/:id" element={<BookingDetail />} />
          <Route path="venues" element={<AllVenues />} />
          <Route path="venues/:id" element={<VenueDetail />} />
          <Route path="booking/:id" element={<BookingPage />} />
          <Route path="highlighted-venues" element={<HighlightedVenuesPage />} />
          <Route path="login" element={<Login />} />
          <Route path="stories" element={<Stories />} />
          <Route path="map" element={<MapPage />} /> 
          <Route path="register" element={<Register />} />

          {/* Beskyttede ruter */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-venue"
            element={
              <ProtectedRoute requiredRole="manager">
                <CreateVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="venues/edit/:id"
            element={
              <ProtectedRoute requiredRole="manager">
                <EditVenue />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={<h1 className="text-center mt-40 text-xl">404 - Page not found</h1>}
          />
        </Route>
      </Routes>
    </Router>
  );
}