import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.Context";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;