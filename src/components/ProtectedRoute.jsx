import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, openLoginModal }) {
  if (!isLoggedIn) {
    openLoginModal();
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
