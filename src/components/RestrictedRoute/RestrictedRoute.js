import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
const RestrictedRoute = ({ component: Component, redirectTo = "/", }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? _jsx(Navigate, { to: redirectTo }) : Component;
};
export default RestrictedRoute;
