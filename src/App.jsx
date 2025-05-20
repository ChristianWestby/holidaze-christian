import Settings from "./pages/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import VenueDetail from "./pages/VenueDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreateVenue from "./pages/CreateVenue";

export default function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="venue/:id" element={<VenueDetail />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route path="create" element={
        <ProtectedRoute>
          <CreateVenue />
        </ProtectedRoute>
      }
    />
    <Route path="settings" element={
        <ProtectedRoute>
          <Settings />
       </ProtectedRoute>
   } 
 />
  </Route>
</Routes>
    </Router>
  );
}
