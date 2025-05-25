import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import VenueDetail from "./pages/VenueDetail";
import HighlightedVenues from "./components/layout/HighlightedVenues";
import Stories from "./pages/Stories";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import BookingPage from "./pages/BookingPage";
import CreateVenue from "./pages/CreateVenue";
import Settings from "./pages/Settings";
import AllVenues from "./pages/AllVenues";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="venues" element={<AllVenues />} />
          <Route path="venues/highlighted" element={<HighlightedVenues />} />
          <Route path="venues/:id" element={<VenueDetail />} />
          <Route path="/stories/bali" element={<Stories />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateVenue />
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
            path="booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking/:id"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
            <Route
            path="my-bookings"
            element={
           <ProtectedRoute>
           <MyBookings />
           </ProtectedRoute>
       }

          />

          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}