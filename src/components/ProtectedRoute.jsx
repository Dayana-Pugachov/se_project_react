import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    console.error("You logged out");
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
