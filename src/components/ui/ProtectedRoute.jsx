import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.Context";

  // Get user from auth context
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;