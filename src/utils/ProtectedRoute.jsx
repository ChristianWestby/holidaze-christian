import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Naviger til login, men behold info om hvor man kom fra
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}