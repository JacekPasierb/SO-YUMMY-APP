import { jsx as _jsx } from "react/jsx-runtime";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
const RestrictedRoute = ({ component, redirectTo = "/", }) => {
    const { isLoggedIn } = useAuth();
    console.log("res zalogowany", isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(redirectTo);
        }
    }, [isLoggedIn, navigate, redirectTo]);
    return !isLoggedIn ? _jsx(Route, { element: component }) : null;
};
export default RestrictedRoute;
