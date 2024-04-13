import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const PrivateRoute = ({ component: Component, redirectTo = "/welcome", }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    if (isRefreshing) {
        return React.createElement("div", null, "Loading...");
    }
    // const shouldRedirect = !isLoggedIn && !isRefreshing;
    const shouldRedirect = !isLoggedIn;
    return shouldRedirect ? (React.createElement(Navigate, { to: redirectTo })) : Component;
};
export default PrivateRoute;
