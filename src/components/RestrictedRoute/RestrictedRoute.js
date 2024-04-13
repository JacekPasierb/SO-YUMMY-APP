import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
const RestrictedRoute = ({ component: Component, redirectTo = "/", }) => {
    const { isLoggedIn } = useAuth();
    console.log("res zalogowany", isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(redirectTo);
        }
    }, [isLoggedIn, navigate, redirectTo]);
    return !isLoggedIn ? React.createElement(Route, { element: React.createElement(Component, null) }) : null;
};
export default RestrictedRoute;
