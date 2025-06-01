import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === "manager" && !user.venueManager) {
    return <Navigate to="/" replace />;
  }

  return children;
}