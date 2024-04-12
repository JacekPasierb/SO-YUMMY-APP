import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

const RestrictedRoute: React.FC = ({ component: Component, redirectTo = "/" }) => {
  const { isLoggedIn } = useAuth();
console.log("res zalogowany", isLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
};

export default RestrictedRoute;
