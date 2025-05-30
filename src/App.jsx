import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";

// Sider
import Home from "@pages/Home";
import About from "@pages/About";
import CreateVenue from "@pages/CreateVenue";
import Login from "@pages/Login"; 
import Profile from "@pages/Profile";

// Utils
import ProtectedRoute from "@utils/ProtectedRoute";

// Dummy-sider midlertidig
const AllVenues = () => <div>All Venues</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout som wrapper alle sidene */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="venues" element={<AllVenues />} />
          <Route path="login" element={<Login />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback 404 */}
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}