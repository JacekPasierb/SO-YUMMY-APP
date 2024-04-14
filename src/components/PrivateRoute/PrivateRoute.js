import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const PrivateRoute = ({ component, redirectTo = "/welcome", }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    const navigate = useNavigate();
    if (isRefreshing) {
        return _jsx("div", { children: "Loading..." });
    }
    // const shouldRedirect = !isLoggedIn && !isRefreshing;
    const shouldRedirect = !isLoggedIn;
    if (shouldRedirect) {
        navigate(redirectTo);
        return null; // Możesz zwrócić pusty komponent lub null, ponieważ przekierowanie już się dokonało
    }
    else {
        return component;
    }
};
export default PrivateRoute;
