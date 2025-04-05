import { Navigate } from "react-router-dom";

// will check if user is logged in to access a page that needs authorization
export default function RouteGuard({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}