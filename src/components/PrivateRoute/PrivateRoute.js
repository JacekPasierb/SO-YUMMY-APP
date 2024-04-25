import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const PrivateRoute = ({ component: Component, redirectTo = "/welcome", }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    return shouldRedirect ? _jsx(Navigate, { to: redirectTo }) : Component;
};
export default PrivateRoute;
