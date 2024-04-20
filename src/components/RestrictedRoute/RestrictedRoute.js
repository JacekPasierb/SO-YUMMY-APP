import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
const RestrictedRoute = ({ component: Component, redirectTo = "/", }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    return isLoggedIn ? _jsx(Navigate, { to: redirectTo }) : Component;
};
export default RestrictedRoute;
